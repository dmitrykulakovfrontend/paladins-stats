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
  catchErrors(async () => {
    // const matchesFromDB = await db
    //   .selectFrom("matches")
    //   .selectAll()
    //   .where("date","=", "2023-04-24")
    //   .limit(10)
    //   .execute();
  }),
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
  }),
);
router.get(
  "/dataused",
  catchErrors(async (_req, res) => {
    const session = await createSession();
    const dataUsed = await getDataUsed(session);
    res.status(200).json(dataUsed);
  }),
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
        "gds.id",
      )
      .where(sql`ds.date >= DATE_SUB(CURRENT_DATE, INTERVAL 7 DAY)`)
      .select([
        "c.id",
        "c.name",
        "c.role",
        "c.icon",
        sql`ROUND(AVG(ds.wins / (ds.wins + ds.loses) * 100), 2)`.as("winrate"),
        sql`ROUND(AVG((ds.wins + ds.loses) / gds.matches * 100), 2)`.as(
          "pickrate",
        ),
        sql`ROUND(AVG((ds.kills + (ds.assists / 2)) / ds.deaths), 2)`.as("KDA"),
        sql`ROUND(AVG(ds.damage / (ds.match_duration / 60) * 10), 2)`.as(
          "damage_10_min",
        ),
        sql`ROUND(AVG(ds.deaths / (ds.match_duration / 60) * 10), 2)`.as(
          "deaths_10_min",
        ),
        sql`ROUND(AVG(ds.assists / (ds.match_duration / 60) * 10), 2)`.as(
          "assists_10_min",
        ),
        sql`ROUND(AVG(ds.kills / (ds.match_duration / 60) * 10), 2)`.as(
          "kills_10_min",
        ),
        sql`ROUND(AVG(ds.solo_kills / (ds.match_duration / 60) * 10), 2)`.as(
          "solo_kills_10_min",
        ),
        sql`ROUND(AVG(ds.self_healing / (ds.match_duration / 60) * 10), 2)`.as(
          "self_healing_10_min",
        ),
        sql`ROUND(AVG(ds.gold_per_minute / (ds.match_duration / 60) * 10), 2)`.as(
          "gold_per_minute_10_min",
        ),
        sql`ROUND(AVG(ds.healing / (ds.match_duration / 60) * 10), 2)`.as(
          "healing_10_min",
        ),
        sql`ROUND(AVG(ds.shielding / (ds.match_duration / 60) * 10), 2)`.as(
          "shielding_10_min",
        ),
        sql`ROUND(AVG(ds.objective_time / (ds.match_duration / 60) * 10), 2)`.as(
          "objective_time_10_min",
        ),
      ])
      .groupBy("c.id")
      .execute();
    res.status(200).json(response);
  }),
);

router.get(
  "/champions/:id",
  catchErrors(async (req, res) => {
    const globalStats = await db
      .selectFrom("champions as c")
      .innerJoin("daily_stats as ds", "c.id", "ds.champion_id")
      .innerJoin(
        "global_daily_stats as gds",
        "ds.the_day_total_matches_id",
        "gds.id",
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
          "pickrate",
        ),
        sql`ROUND(AVG((ds.kills + (ds.assists / 2)) / ds.deaths), 2)`.as("KDA"),
        sql`ROUND(AVG(ds.damage / (ds.match_duration / 60) * 10), 2)`.as(
          "damage_10_min",
        ),
        sql`ROUND(AVG(ds.deaths / (ds.match_duration / 60) * 10), 2)`.as(
          "deaths_10_min",
        ),
        sql`ROUND(AVG(ds.assists / (ds.match_duration / 60) * 10), 2)`.as(
          "assists_10_min",
        ),
        sql`ROUND(AVG(ds.kills / (ds.match_duration / 60) * 10), 2)`.as(
          "kills_10_min",
        ),
        sql`ROUND(AVG(ds.solo_kills / (ds.match_duration / 60) * 10), 2)`.as(
          "solo_kills_10_min",
        ),
        sql`ROUND(AVG(ds.self_healing / (ds.match_duration / 60) * 10), 2)`.as(
          "self_healing_10_min",
        ),
        sql`ROUND(AVG(ds.gold_per_minute / (ds.match_duration / 60) * 10), 2)`.as(
          "gold_per_minute_10_min",
        ),
        sql`ROUND(AVG(ds.healing / (ds.match_duration / 60) * 10), 2)`.as(
          "healing_10_min",
        ),
        sql`ROUND(AVG(ds.shielding / (ds.match_duration / 60) * 10), 2)`.as(
          "shielding_10_min",
        ),
        sql`ROUND(AVG(ds.objective_time / (ds.match_duration / 60) * 10), 2)`.as(
          "objective_time_10_min",
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
        "gds.id",
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
      globalStats: globalStats,
      weeklyStats,
    });
  }),
);

router.get(
  "/roles",
  catchErrors(async (_req, res) => {
    const rolesData = await db
      .selectFrom("champions as c")
      .innerJoin("daily_stats as ds", "c.id", "ds.champion_id")
      .innerJoin(
        "global_daily_stats as gds",
        "ds.the_day_total_matches_id",
        "gds.id",
      )
      .select([
        "c.role",
        sql`ROUND(AVG(ds.wins / (ds.wins + ds.loses) * 100), 2)`.as("winrate"),
        sql`ROUND(SUM(ds.wins + ds.loses) / (select sum(gds2.matches) from global_daily_stats as gds2 where gds2.date >= DATE_SUB(CURRENT_DATE, INTERVAL 7 DAY)) * 100, 2)`.as(
          "pickrate",
        ),
        sql`ROUND(AVG((ds.kills + (ds.assists / 2)) / ds.deaths), 2)`.as("KDA"),
        sql`ROUND(AVG(ds.damage / (ds.match_duration / 60) * 10), 2)`.as(
          "damage_10_min",
        ),
        sql`ROUND(AVG(ds.deaths / (ds.match_duration / 60) * 10), 2)`.as(
          "deaths_10_min",
        ),
        sql`ROUND(AVG(ds.assists / (ds.match_duration / 60) * 10), 2)`.as(
          "assists_10_min",
        ),
        sql`ROUND(AVG(ds.kills / (ds.match_duration / 60) * 10), 2)`.as(
          "kills_10_min",
        ),
        sql`ROUND(AVG(ds.solo_kills / (ds.match_duration / 60) * 10), 2)`.as(
          "solo_kills_10_min",
        ),
        sql`ROUND(AVG(ds.self_healing / (ds.match_duration / 60) * 10), 2)`.as(
          "self_healing_10_min",
        ),
        sql`ROUND(AVG(ds.gold_per_minute / (ds.match_duration / 60) * 10), 2)`.as(
          "gold_per_minute_10_min",
        ),
        sql`ROUND(AVG(ds.healing / (ds.match_duration / 60) * 10), 2)`.as(
          "healing_10_min",
        ),
        sql`ROUND(AVG(ds.shielding / (ds.match_duration / 60) * 10), 2)`.as(
          "shielding_10_min",
        ),
        sql`ROUND(AVG(ds.objective_time / (ds.match_duration / 60) * 10), 2)`.as(
          "objective_time_10_min",
        ),
      ])
      .where(sql`ds.date >= DATE_SUB(CURRENT_DATE, INTERVAL 7 DAY)`)
      .groupBy("c.role")
      .orderBy("pickrate", "desc")
      .execute();

    res.status(200).json({
      rolesData,
    });
  }),
);

export default router;
