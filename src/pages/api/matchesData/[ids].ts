import type { NextApiRequest, NextApiResponse } from "next";
import validateSession from "~/utils/hirezAPI/validateSession";
import withErrorHandler from "../../../utils/errorHandler";
import { info } from "~/utils/logging";
import getMatchDetailsBatch from "~/utils/hirezAPI/getMatchDetailsBatch";
import getChampions from "~/utils/hirezAPI/getChampions";
import { type Player } from "~/types/apiResponses";

export default withErrorHandler(async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const sessionID = await validateSession(req, res);
  const { ids } = req.query;
  if (!ids || typeof ids !== "string") {
    throw new Error(`No specified ids`);
  }
  info(ids.split(","));
  const [champions, players] = await Promise.all([
    getChampions(sessionID),
    getMatchDetailsBatch(sessionID, ids),
  ]);
  const matches: {
    players: Player[];
    averageRanked: number;
    matchId: number;
  }[] = [];
  for (let i = 0; i < players.length; i++) {
    const player = players[i];
    if (!player) {
      throw new Error(`No such player`);
    }
    const match = matches.find((match) => match.matchId === player.Match);
    if (!match) {
      matches.push({
        players: [player],
        averageRanked: player.League_Tier,
        matchId: player.Match,
      });
      continue;
    }
    match.players.push(player);
    match.averageRanked += player.League_Tier;
  }
  matches.forEach(
    (match) => (match.averageRanked = Math.round((match.averageRanked /= 10)))
  );
  type AdditionalInfo = {
    loses: number;
    wins: number;
    timesPicked: number;
  };
  const updatedChampions = champions.map((champion) => {
    return {
      ...champion,
      loses: 0,
      wins: 0,
      timesPicked: 0,
      tiers: {} as { [tier: number]: AdditionalInfo },
    };
  });
  matches.forEach((match) => {
    match.players.forEach((player) => {
      const champion = updatedChampions.find(
        (champion) => champion.id === player.ChampionId
      );
      if (!champion) {
        throw new Error(`No found champion for ${player.ChampionId}`);
      }
      // update global stats
      player.Win_Status === "Winner"
        ? (champion.wins += 1)
        : (champion.loses += 1);
      champion.timesPicked++;
      // update ranked tier stats
      const tier = champion.tiers[match.averageRanked];
      if (tier !== undefined) {
        player.Win_Status === "Winner" ? (tier.wins += 1) : (tier.loses += 1);
        tier.timesPicked++;
      } else {
        champion.tiers[match.averageRanked] = {
          loses: player.Win_Status === "Winner" ? 0 : 1,
          wins: player.Win_Status === "Winner" ? 1 : 0,
          timesPicked: 1,
        };
      }
    });
  });
  res
    .status(200)
    .json(
      updatedChampions
        .filter(({ timesPicked }) => timesPicked > 0)
        .sort(
          (championA, championB) =>
            championB.timesPicked - championA.timesPicked
        )
    );
});
