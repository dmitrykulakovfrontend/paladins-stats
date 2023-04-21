import { type Player } from "~/types/apiResponses";
import getChampions from "./hirezAPI/getChampions";
import getMatchDetailsBatch from "./hirezAPI/getMatchDetailsBatch";
import { info } from "./logging";

export default async function calculateChampsAverage(
  sessionID: string,
  ids: string[]
) {
  if (!ids) {
    throw new Error(`No specified ids`);
  }
  // split ids into chunks of 10 id each and for each chunk push promise from getMatchDetailsBatch into array of promises
  const chunks = [];
  while (ids.length) {
    chunks.push(ids.splice(0, 10).filter((id) => id));
  }
  // iterate through chunks where they are grouped by 10 at a time and Promise.all them
  const results = [];
  while (chunks.length) {
    const promises = chunks.splice(0, 20).map((chunk) => {
      return getMatchDetailsBatch(sessionID, chunk);
    });
    const result = await Promise.all(promises);
    results.push(result);
  }
  info(results);

  // const promises = chunks.map((chunk) => {
  //   return getMatchDetailsBatch(sessionID, chunk);
  // });

  // get default champions info and players from all promises
  const champions = await getChampions(sessionID);
  const players = results.flat(2);

  // split players by matches
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

  // Calculate average ranked for each match
  matches.forEach(
    (match) => (match.averageRanked = Math.round((match.averageRanked /= 10)))
  );

  const matchesAmount = matches.length;

  info(matches.length);

  type AdditionalInfo = {
    loses: number;
    wins: number;
    timesPicked: number;
  };

  // each champions get initial additional information
  const updatedChampions = champions.map((champion) => {
    return {
      ...champion,
      loses: 0,
      wins: 0,
      timesPicked: 0,
      pickrate: -1,
      winrate: -1,
      tiers: {} as { [tier: number]: AdditionalInfo },
    };
  });

  // update champions stats
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
  // calculate champion pickrate and winrate
  updatedChampions.forEach((champion) => {
    const pickrate = (champion.timesPicked / matchesAmount) * 100;
    const winrate = (champion.wins / (champion.wins + champion.loses)) * 100;
    champion.pickrate = Math.round(pickrate);
    champion.winrate = Math.round(winrate);
  });

  return updatedChampions
    .filter(({ timesPicked }) => timesPicked > 0)
    .sort(
      (championA, championB) => championB.timesPicked - championA.timesPicked
    );
  // res
  //   .status(200)
  //   .json(
  // updatedChampions
  //   .filter(({ timesPicked }) => timesPicked > 0)
  //   .sort(
  //     (championA, championB) =>
  //       championB.timesPicked - championA.timesPicked
  //   )
  //   );
}
