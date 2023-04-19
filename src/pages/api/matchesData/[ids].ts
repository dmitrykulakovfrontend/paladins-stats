import type { NextApiRequest, NextApiResponse } from "next";
import validateSession from "~/utils/hirezAPI/validateSession";
import withErrorHandler from "../../../utils/errorHandler";
import { info } from "~/utils/logging";
import getMatchDetailsBatch from "~/utils/hirezAPI/getMatchDetailsBatch";
import getChampions from "~/utils/hirezAPI/getChampions";

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
  const [champions, matches] = await Promise.all([
    getChampions(sessionID),
    getMatchDetailsBatch(sessionID, ids),
  ]);
  const updatedChampions = champions.map((champion) => {
    return { ...champion, loses: 0, wins: 0 };
  });
  matches.forEach((player) => {
    const champion = updatedChampions.find(
      (champion) => champion.id === player.ChampionId
    );
    if (!champion) {
      throw new Error(`No found champion for ${player.ChampionId}`);
    }
    player.Win_Status === "Winner"
      ? (champion.wins += 1)
      : (champion.loses += 1);
  });
  res
    .status(200)
    .json(
      updatedChampions
        .filter((champion) => champion.loses > 0 || champion.wins > 0)
        .sort((championA, championB) => championA.wins - championB.wins)
    );
});
