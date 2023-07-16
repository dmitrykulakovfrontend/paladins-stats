import { Router } from "express";
import { StatusCodes } from "http-status-codes";
import { db } from "../../model/db.js";
import axios from "axios";
import { error } from "../../utils/logging.js";
import { catchErrors } from "../../utils/errorHandler.js";
import { sql } from "kysely";
import { createSession } from "../../utils/hirezAPI/session.js";
import { GetMatchDetailsBatchResponse } from "../../types/apiResponses.js";
import getMatchDetailsBatch from "../../utils/hirezAPI/getMatchDetailsBatch.js";
import getMatchIdsByQueue from "../../utils/hirezAPI/getMatchIdsByQueue.js";
import fs from "fs";
import calculateChampsAverage from "../../utils/calculateChampsAverage.js";
const router = Router();

router.get(
  "/",
  catchErrors(async (req, res) => {
    // const matchesFromDB = await db
    //   .selectFrom("matches")
    //   .selectAll()
    //   .where("date","=", "2023-04-24")
    //   .limit(10)
    //   .execute();
    const session = await createSession();
    console.log(session);
    const players = [];
    const matchesArr = await getMatchIdsByQueue(session, { hour: 20 });
    // transform matches id into array strings
    const matchesIds = matchesArr.map((match) => String(match.Match));
    const champions = await calculateChampsAverage(session, matchesIds);
    const databaseChampions = champions.map(champion => ({
      id: champion.id,
      name: champion.name,
      icon: champion.icon,
      pickrate: champion.pickrate,
      winrate: champion.winrate,
    }))
    const result = await db.insertInto('champions').values(databaseChampions).execute();

    

    res.status(StatusCodes.OK).json(champions)
    // // const matchesIds = ids.split(",");

    // // split ids into chunks of 10 ids each to avoid exceeding API limits
    // const chunkSize = 10;
    // const idsChunks = [];
    // let idChunk: string[] = [];

    // for (const id of matchesIds) {
    //   if (idChunk.length < chunkSize) {
    //     idChunk.push(id);
    //   } else {
    //     idsChunks.push(idChunk);
    //     idChunk = [id];
    //   }
    // }
    // if (idChunk.length > 0) {
    //   idsChunks.push(idChunk);
    // }
    // // const data = await getMatchDetailsBatch(session, idsChunks[0]);
    // // console.log(data);
    // // return res.status(StatusCodes.OK).json(data);
    // let promises: Promise<GetMatchDetailsBatchResponse>[] = [];
    // const apiRequestsAtOnce = 25;
    // for (const idsChunk of idsChunks) {
    //   if (promises.length < apiRequestsAtOnce) {
    //     promises.push(getMatchDetailsBatch(session, idsChunk));
    //   } else {
    //     const matchesChunk = await Promise.all(promises);
    //     players.push(...matchesChunk.flat());
    //     promises = [getMatchDetailsBatch(session, idsChunk)];
    //   }
    // }
    // if (promises.length > 0) {
    //   const matchesChunk = await Promise.all(promises);
    //   players.push(...matchesChunk.flat());
    // }

    // //  calculate match tier for each match
    // const matches: {
    //   match: GetMatchDetailsBatchResponse;
    //   matchTier: number;
    // }[] = [];
    // let match = [];
    // let matchTier = 0;

    // for (const [i, player] of players.entries()) {
    //   matchTier += player.League_Tier;
    //   match.push(player);
    //   if ((i + 1) % 10 === 0) {
    //     matches.push({ match, matchTier: Math.round(matchTier / 10) });
    //     match = [];
    //     matchTier = 0;
    //   }
    // }

    // // take all necessary data from matches and split it into matchesData and playersMatchData
    // const playersMatchData = [];
    // const matchesData = [];

    // for (const { match, matchTier } of matches) {
    //   for (const player of match) {
    //     playersMatchData.push({
    //       Account_Level: player.Account_Level,
    //       ActiveId1: player.ActiveId1,
    //       ActiveId2: player.ActiveId2,
    //       ActiveId3: player.ActiveId3,
    //       ActiveId4: player.ActiveId4,
    //       ActiveLevel1: player.ActiveLevel1,
    //       ActiveLevel2: player.ActiveLevel2,
    //       ActiveLevel3: player.ActiveLevel3,
    //       ActiveLevel4: player.ActiveLevel4,
    //       ActivePlayerId: player.ActivePlayerId,
    //       Assists: player.Assists,
    //       ChampionId: player.ChampionId,
    //       Damage_Done_In_Hand: player.Damage_Done_In_Hand,
    //       Damage_Done_Physical: player.Damage_Done_Physical,
    //       Damage_Mitigated: player.Damage_Mitigated,
    //       Damage_Player: player.Damage_Player,
    //       Damage_Taken: player.Damage_Taken,
    //       Deaths: player.Deaths,
    //       Gold_Earned: player.Gold_Earned,
    //       Gold_Per_Minute: player.Gold_Per_Minute,
    //       Healing: player.Healing,
    //       Healing_Player_Self: player.Healing_Player_Self,
    //       ItemId1: player.ItemId1,
    //       ItemId2: player.ItemId2,
    //       ItemId3: player.ItemId3,
    //       ItemId4: player.ItemId4,
    //       ItemId5: player.ItemId5,
    //       ItemId6: player.ItemId6,
    //       ItemLevel1: player.ItemLevel1,
    //       ItemLevel2: player.ItemLevel2,
    //       ItemLevel3: player.ItemLevel3,
    //       ItemLevel4: player.ItemLevel4,
    //       ItemLevel5: player.ItemLevel5,
    //       ItemLevel6: player.ItemLevel6,
    //       Killing_Spree: player.Killing_Spree,
    //       Kills_Bot: player.Kills_Bot,
    //       Kills_Double: player.Kills_Double,
    //       Kills_Triple: player.Kills_Triple,
    //       Kills_Quadra: player.Kills_Quadra,
    //       Kills_Penta: player.Kills_Penta,
    //       Kills_Player: player.Kills_Player,
    //       League_Tier: player.League_Tier,
    //       Multi_kill_Max: player.Multi_kill_Max,
    //       Objective_Assists: player.Objective_Assists,
    //       PartyId: player.PartyId,
    //       SkinId: player.SkinId,
    //       playerId: player.playerId,
    //       playerPortalUserId: player.playerPortalUserId,
    //       Win_Status: player.Win_Status,
    //       championsAvailable: player.Mastery_Level,
    //     });
    //   }
    //   const matchMeta = match[0];
    //   if (!matchMeta) throw new Error("No match meta");
    //   matchesData.push({
    //     BanId1: matchMeta.BanId1,
    //     BanId2: matchMeta.BanId2,
    //     BanId3: matchMeta.BanId3,
    //     BanId4: matchMeta.BanId4,
    //     BanId5: matchMeta.BanId5,
    //     BanId6: matchMeta.BanId6,
    //     Match: matchMeta.Match,
    //     Match_Duration: matchMeta.Match_Duration,
    //     Minutes: matchMeta.Minutes,
    //     Map_Game: matchMeta.Map_Game,
    //     Region: matchMeta.Region,
    //     Team1Score: matchMeta.Team1Score,
    //     Team2Score: matchMeta.Team2Score,
    //     Time_In_Match_Seconds: matchMeta.Time_In_Match_Seconds,
    //     hasReplay: matchMeta.hasReplay,
    //     matchTier,
    //   });
    // }
    // return res.status(StatusCodes.OK).json({ playersMatchData, matchesData });
  })
);

export default router;
