import type { NextApiRequest, NextApiResponse } from "next";
import validateSession from "~/utils/hirezAPI/validateSession";
import withErrorHandler from "../../../utils/errorHandler";
import { info } from "~/utils/logging";
import { db } from "~/server/db";
import getMatchDetailsBatch from "~/utils/hirezAPI/getMatchDetailsBatch";
import { type GetMatchDetailsBatchResponse } from "~/types/apiResponses";

export default withErrorHandler(async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const sessionID = await validateSession(req, res);
  const { ids } = req.query;
  if (!ids || typeof ids !== "string") {
    throw new Error(`No specified ids`);
  }

  const matchesFromDB = await db
    .selectFrom("matches")
    .select("match_id")
    .where("date", "like", "%2023-04-21%")
    .execute();
  // transform matches id into array strings
  const matchesIds = matchesFromDB.map((match) => String(match.match_id));

  // const champions = await calculateChampsAverage(sessionID, matchesIds);

  const players = [];
  // const matchesIds = ids.split(",");

  // split ids into chunks of 10 ids each to avoid exceeding API limits
  const chunkSize = 10;
  const idsChunks = [];
  let idChunk: string[] = [];

  for (const id of matchesIds) {
    if (idChunk.length < chunkSize) {
      idChunk.push(id);
    } else {
      idsChunks.push(idChunk);
      idChunk = [id];
    }
  }
  if (idChunk.length > 0) {
    idsChunks.push(idChunk);
  }

  // split api requests into chunks of 20 to avoid getting time out
  let promises: Promise<GetMatchDetailsBatchResponse>[] = [];
  const apiRequestsAtOnce = 100;
  console.time("fetch2");
  for (const idsChunk of idsChunks) {
    if (promises.length < apiRequestsAtOnce) {
      promises.push(getMatchDetailsBatch(sessionID, idsChunk));
    } else {
      const matchesChunk = await Promise.all(promises);
      players.push(...matchesChunk.flat());
      promises = [getMatchDetailsBatch(sessionID, idsChunk)];
    }
  }
  if (promises.length > 0) {
    const matchesChunk = await Promise.all(promises);
    players.push(...matchesChunk.flat());
  }
  console.timeEnd("fetch2");

  //  calculate match tier for each match
  const matches: { match: GetMatchDetailsBatchResponse; matchTier: number }[] =
    [];
  let match = [];
  console.log(matches);
  let matchTier = 0;

  for (const [i, player] of players.entries()) {
    matchTier += player.League_Tier;
    match.push(player);
    if ((i + 1) % 10 === 0) {
      matches.push({ match, matchTier: Math.round(matchTier / 10) });
      match = [];
      matchTier = 0;
    }
  }

  // take all necessary data from matches and split it into matchesData and playersMatchData
  const playersMatchData = [];
  const matchesData = [];

  for (const { match, matchTier } of matches) {
    for (const player of match) {
      playersMatchData.push({
        Account_Level: player.Account_Level,
        ActiveId1: player.ActiveId1,
        ActiveId2: player.ActiveId2,
        ActiveId3: player.ActiveId3,
        ActiveId4: player.ActiveId4,
        ActiveLevel1: player.ActiveLevel1,
        ActiveLevel2: player.ActiveLevel2,
        ActiveLevel3: player.ActiveLevel3,
        ActiveLevel4: player.ActiveLevel4,
        ActivePlayerId: player.ActivePlayerId,
        Assists: player.Assists,
        ChampionId: player.ChampionId,
        Damage_Done_In_Hand: player.Damage_Done_In_Hand,
        Damage_Done_Physical: player.Damage_Done_Physical,
        Damage_Mitigated: player.Damage_Mitigated,
        Damage_Player: player.Damage_Player,
        Damage_Taken: player.Damage_Taken,
        Deaths: player.Deaths,
        Gold_Earned: player.Gold_Earned,
        Gold_Per_Minute: player.Gold_Per_Minute,
        Healing: player.Healing,
        Healing_Player_Self: player.Healing_Player_Self,
        ItemId1: player.ItemId1,
        ItemId2: player.ItemId2,
        ItemId3: player.ItemId3,
        ItemId4: player.ItemId4,
        ItemId5: player.ItemId5,
        ItemId6: player.ItemId6,
        ItemLevel1: player.ItemLevel1,
        ItemLevel2: player.ItemLevel2,
        ItemLevel3: player.ItemLevel3,
        ItemLevel4: player.ItemLevel4,
        ItemLevel5: player.ItemLevel5,
        ItemLevel6: player.ItemLevel6,
        Killing_Spree: player.Killing_Spree,
        Kills_Bot: player.Kills_Bot,
        Kills_Double: player.Kills_Double,
        Kills_Triple: player.Kills_Triple,
        Kills_Quadra: player.Kills_Quadra,
        Kills_Penta: player.Kills_Penta,
        Kills_Player: player.Kills_Player,
        League_Tier: player.League_Tier,
        Multi_kill_Max: player.Multi_kill_Max,
        Objective_Assists: player.Objective_Assists,
        PartyId: player.PartyId,
        SkinId: player.SkinId,
        playerId: player.playerId,
        playerPortalUserId: player.playerPortalUserId,
        Win_Status: player.Win_Status,
        championsAvailable: player.Mastery_Level,
      });
    }
    const matchMeta = match[0];
    if (!matchMeta) throw new Error("No match meta");
    matchesData.push({
      BanId1: matchMeta.BanId1,
      BanId2: matchMeta.BanId2,
      BanId3: matchMeta.BanId3,
      BanId4: matchMeta.BanId4,
      BanId5: matchMeta.BanId5,
      BanId6: matchMeta.BanId6,
      Match: matchMeta.Match,
      Match_Duration: matchMeta.Match_Duration,
      Minutes: matchMeta.Minutes,
      Map_Game: matchMeta.Map_Game,
      Region: matchMeta.Region,
      Team1Score: matchMeta.Team1Score,
      Team2Score: matchMeta.Team2Score,
      Time_In_Match_Seconds: matchMeta.Time_In_Match_Seconds,
      hasReplay: matchMeta.hasReplay,
      matchTier,
    });
  }
  // res.status(200).json(1);
  res.status(200).json({ playersMatchData, matchesData });
});
