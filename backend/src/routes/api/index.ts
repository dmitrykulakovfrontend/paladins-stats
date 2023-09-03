import { Router } from "express";
import { db } from "../../model/db.js";
import { catchErrors } from "../../utils/errorHandler.js";
import { sql } from "kysely";
import insertDailyStats from "../../utils/insertDailyStats.js";
import { createSession } from "../../utils/hirezAPI/session.js";
import getDataUsed from "../../utils/hirezAPI/getDataUsed.js";

const router = Router();

router.get(
  "/",
  catchErrors(async (_req, _res) => {
    // const matchesFromDB = await db
    //   .selectFrom("matches")
    //   .selectAll()
    //   .where("date","=", "2023-04-24")
    //   .limit(10)
    //   .execute();
  })
);
router.get(
  "/daily",
  catchErrors(async (_req, res) => {
    // const matchesFromDB = await db
    //   .selectFrom("matches")
    //   .selectAll()
    //   .where("date","=", "2023-04-24")
    //   .limit(10)
    //   .execute();
    await insertDailyStats();
    res.status(200).json({ success: true });
  })
);
router.get(
  "/dataused",
  catchErrors(async (_req, res) => {
    const session = await createSession();
    const dataUsed = await getDataUsed(session);
    res.status(200).json(dataUsed);
  })
);
router.get(
  "/champions",
  catchErrors(async (_req, res) => {
    const response = await db
      .selectFrom("champions as c")
      .innerJoin("daily_stats as ds", "c.id", "ds.champion_id")
      .innerJoin(
        "global_daily_stats as gds",
        "ds.the_day_total_matches_id",
        "gds.id"
      )
      .where(sql`ds.date >= DATE_SUB(CURRENT_DATE, INTERVAL 7 DAY)`)
      .select([
        "c.id",
        "c.name",
        "c.role",
        "c.icon",
        sql`ROUND(AVG(ds.wins / (ds.wins + ds.loses) * 100), 2)`.as("winrate"),
        sql`ROUND(AVG((ds.wins + ds.loses) / gds.matches * 100), 2)`.as(
          "pickrate"
        ),
        sql`ROUND(AVG((ds.kills + (ds.assists / 2)) / ds.deaths), 2)`.as("KDA"),
        sql`ROUND(AVG(ds.damage / (ds.match_duration / 60) * 10), 2)`.as(
          "damage_10_min"
        ),
        sql`ROUND(AVG(ds.deaths / (ds.match_duration / 60) * 10), 2)`.as(
          "deaths_10_min"
        ),
        sql`ROUND(AVG(ds.assists / (ds.match_duration / 60) * 10), 2)`.as(
          "assists_10_min"
        ),
        sql`ROUND(AVG(ds.kills / (ds.match_duration / 60) * 10), 2)`.as(
          "kills_10_min"
        ),
        sql`ROUND(AVG(ds.solo_kills / (ds.match_duration / 60) * 10), 2)`.as(
          "solo_kills_10_min"
        ),
        sql`ROUND(AVG(ds.self_healing / (ds.match_duration / 60) * 10), 2)`.as(
          "self_healing_10_min"
        ),
        sql`ROUND(AVG(ds.gold_per_minute / (ds.match_duration / 60) * 10), 2)`.as(
          "gold_per_minute_10_min"
        ),
        sql`ROUND(AVG(ds.healing / (ds.match_duration / 60) * 10), 2)`.as(
          "healing_10_min"
        ),
        sql`ROUND(AVG(ds.shielding / (ds.match_duration / 60) * 10), 2)`.as(
          "shielding_10_min"
        ),
        sql`ROUND(AVG(ds.objective_time / (ds.match_duration / 60) * 10), 2)`.as(
          "objective_time_10_min"
        ),
      ])
      .groupBy("c.id")
      .execute();
    res.status(200).json(response);
  })
);

router.get(
  "/champions/:id",
  catchErrors(async (req, res) => {
    const globalStatsResponse = await db
      .selectFrom("champions as c")
      .innerJoin("daily_stats as ds", "c.id", "ds.champion_id")
      .innerJoin(
        "global_daily_stats as gds",
        "ds.the_day_total_matches_id",
        "gds.id"
      )
      .where(sql`ds.date >= DATE_SUB(CURRENT_DATE, INTERVAL 7 DAY)`)
      .where("c.id", "=", +req.params.id)
      .select([
        "c.id",
        "c.name",
        "c.role",
        "c.icon",
        sql`ROUND(AVG(ds.wins / (ds.wins + ds.loses) * 100), 2)`.as("winrate"),
        sql`ROUND(AVG((ds.wins + ds.loses) / gds.matches * 100), 2)`.as(
          "pickrate"
        ),
        sql`ROUND(AVG((ds.kills + (ds.assists / 2)) / ds.deaths), 2)`.as("KDA"),
        sql`ROUND(AVG(ds.damage / (ds.match_duration / 60) * 10), 2)`.as(
          "damage_10_min"
        ),
        sql`ROUND(AVG(ds.deaths / (ds.match_duration / 60) * 10), 2)`.as(
          "deaths_10_min"
        ),
        sql`ROUND(AVG(ds.assists / (ds.match_duration / 60) * 10), 2)`.as(
          "assists_10_min"
        ),
        sql`ROUND(AVG(ds.kills / (ds.match_duration / 60) * 10), 2)`.as(
          "kills_10_min"
        ),
        sql`ROUND(AVG(ds.solo_kills / (ds.match_duration / 60) * 10), 2)`.as(
          "solo_kills_10_min"
        ),
        sql`ROUND(AVG(ds.self_healing / (ds.match_duration / 60) * 10), 2)`.as(
          "self_healing_10_min"
        ),
        sql`ROUND(AVG(ds.gold_per_minute / (ds.match_duration / 60) * 10), 2)`.as(
          "gold_per_minute_10_min"
        ),
        sql`ROUND(AVG(ds.healing / (ds.match_duration / 60) * 10), 2)`.as(
          "healing_10_min"
        ),
        sql`ROUND(AVG(ds.shielding / (ds.match_duration / 60) * 10), 2)`.as(
          "shielding_10_min"
        ),
        sql`ROUND(AVG(ds.objective_time / (ds.match_duration / 60) * 10), 2)`.as(
          "objective_time_10_min"
        ),
      ])
      .groupBy("c.id")
      .executeTakeFirst();

    const weeklyStats = await db
      .selectFrom("champions as c")
      .innerJoin("daily_stats as ds", "c.id", "ds.champion_id")
      .innerJoin(
        "global_daily_stats as gds",
        "ds.the_day_total_matches_id",
        "gds.id"
      )
      .where("c.id", "=", +req.params.id)
      .where(sql`ds.date >= DATE_SUB(CURRENT_DATE, INTERVAL 7 DAY)`)
      .select([
        sql`ROUND(ds.wins / (ds.wins + ds.loses) * 100,2)`.as("winrate"),
        sql`ROUND((ds.wins + ds.loses) / gds.matches * 100,2)`.as("pickrate"),
        "ds.date",
      ])
      .execute();
    res.status(200).json({
      globalStats: globalStatsResponse,
      weeklyStats,
    });
  })
);

// const { Query } = require('kysely');

// const query = new Query()
//   .select([
//     'pet_id',
//     'DATE_TRUNC("week", walk_date) AS week_start_date',
//     'SUM(distance_walked_km) AS total_distance_walked',
//     'COUNT(walk_date) AS days_walked',
//     'AVG(distance_walked_km) AS weekly_average_distance'
//   ])
//   .from('pet_walks')
//   .groupBy(['pet_id', 'DATE_TRUNC("week", walk_date)']);

// console.log(query.toString());

//   `
//   `
export default router;
