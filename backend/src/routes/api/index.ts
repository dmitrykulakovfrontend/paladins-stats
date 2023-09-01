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
    const response = await sql`
    SELECT 
        c.name,
        c.id,
        c.role,
        c.icon,
        ROUND(AVG(CASE 
                WHEN gds.date BETWEEN DATE_SUB(CURRENT_DATE(), INTERVAL 8 DAY) AND CURRENT_DATE() THEN (ds.wins / (ds.wins + ds.loses) * 100)
                ELSE NULL
            END), 2) AS winrate,
        ROUND(AVG(CASE 
                WHEN gds.date BETWEEN DATE_SUB(CURRENT_DATE(), INTERVAL 8 DAY) AND CURRENT_DATE() THEN (ds.wins + ds.loses) / gds.matches * 100
                ELSE NULL
            END), 2) AS pickrate,
        ROUND(AVG(CASE 
                WHEN gds.date BETWEEN DATE_SUB(CURRENT_DATE(), INTERVAL 8 DAY) AND CURRENT_DATE() THEN (ds.kills + (ds.assists / 2)) / ds.deaths
                ELSE NULL
            END), 2) AS KDA,
        ROUND(AVG(CASE 
                WHEN gds.date BETWEEN DATE_SUB(CURRENT_DATE(), INTERVAL 8 DAY) AND CURRENT_DATE() THEN ds.damage / (ds.match_duration / 60) * 10
                ELSE NULL
            END), 2) AS damage_10_min,
        ROUND(AVG(CASE 
                WHEN gds.date BETWEEN DATE_SUB(CURRENT_DATE(), INTERVAL 8 DAY) AND CURRENT_DATE() THEN ds.deaths / (ds.match_duration / 60) * 10
                ELSE NULL
            END), 2) AS deaths_10_min,
        ROUND(AVG(CASE 
                WHEN gds.date BETWEEN DATE_SUB(CURRENT_DATE(), INTERVAL 8 DAY) AND CURRENT_DATE() THEN ds.assists / (ds.match_duration / 60) * 10
                ELSE NULL
            END), 2) AS assists_10_min,
        ROUND(AVG(CASE 
                WHEN gds.date BETWEEN DATE_SUB(CURRENT_DATE(), INTERVAL 8 DAY) AND CURRENT_DATE() THEN ds.kills / (ds.match_duration / 60) * 10
                ELSE NULL
            END), 2) AS kills_10_min,
        ROUND(AVG(CASE 
                WHEN gds.date BETWEEN DATE_SUB(CURRENT_DATE(), INTERVAL 8 DAY) AND CURRENT_DATE() THEN ds.solo_kills / (ds.match_duration / 60) * 10
                ELSE NULL
            END), 2) AS solo_kills_10_min,
        ROUND(AVG(CASE 
                WHEN gds.date BETWEEN DATE_SUB(CURRENT_DATE(), INTERVAL 8 DAY) AND CURRENT_DATE() THEN ds.self_healing / (ds.match_duration / 60) * 10
                ELSE NULL
            END), 2) AS self_healing_10_min,
        ROUND(AVG(CASE 
                WHEN gds.date BETWEEN DATE_SUB(CURRENT_DATE(), INTERVAL 8 DAY) AND CURRENT_DATE() THEN ds.gold_per_minute / (ds.match_duration / 60) * 10
                ELSE NULL
            END), 2) AS gold_per_minute_10_min,
        ROUND(AVG(CASE 
                WHEN gds.date BETWEEN DATE_SUB(CURRENT_DATE(), INTERVAL 8 DAY) AND CURRENT_DATE() THEN ds.healing / (ds.match_duration / 60) * 10
                ELSE NULL
            END), 2) AS healing_10_min,
        ROUND(AVG(CASE 
                WHEN gds.date BETWEEN DATE_SUB(CURRENT_DATE(), INTERVAL 8 DAY) AND CURRENT_DATE() THEN ds.shielding / (ds.match_duration / 60) * 10
                ELSE NULL
            END), 2) AS shielding_10_min,
        ROUND(AVG(CASE 
                WHEN gds.date BETWEEN DATE_SUB(CURRENT_DATE(), INTERVAL 8 DAY) AND CURRENT_DATE() THEN ds.objective_time / (ds.match_duration / 60) * 10
                ELSE NULL
            END), 2) AS objective_time_10_min
    FROM 
        champions AS c
    INNER JOIN 
        daily_stats AS ds ON ds.champion_id = c.id
    INNER JOIN 
        global_daily_stats AS gds ON gds.id = ds.the_day_total_matches_id
    GROUP BY 
        c.id
    ORDER BY 
        winrate;
        
    `.execute(db);
    res.status(200).json(response.rows);
  })
);

router.get(
  "/champions/:id",
  catchErrors(async (req, res) => {
    const response = await sql`
    SELECT 
        c.name,
        c.id,
        c.role,
        c.icon,
        ROUND(AVG(CASE 
                WHEN gds.date BETWEEN DATE_SUB(CURRENT_DATE(), INTERVAL 8 DAY) AND CURRENT_DATE() THEN (ds.wins / (ds.wins + ds.loses) * 100)
                ELSE NULL
            END), 2) AS winrate,
        ROUND(AVG(CASE 
                WHEN gds.date BETWEEN DATE_SUB(CURRENT_DATE(), INTERVAL 8 DAY) AND CURRENT_DATE() THEN (ds.wins + ds.loses) / gds.matches * 100
                ELSE NULL
            END), 2) AS pickrate,
        ROUND(AVG(CASE 
                WHEN gds.date BETWEEN DATE_SUB(CURRENT_DATE(), INTERVAL 8 DAY) AND CURRENT_DATE() THEN (ds.kills + (ds.assists / 2)) / ds.deaths
                ELSE NULL
            END), 2) AS KDA,
        ROUND(AVG(CASE 
                WHEN gds.date BETWEEN DATE_SUB(CURRENT_DATE(), INTERVAL 8 DAY) AND CURRENT_DATE() THEN ds.damage / (ds.match_duration / 60) * 10
                ELSE NULL
            END), 2) AS damage_10_min,
        ROUND(AVG(CASE 
                WHEN gds.date BETWEEN DATE_SUB(CURRENT_DATE(), INTERVAL 8 DAY) AND CURRENT_DATE() THEN ds.deaths / (ds.match_duration / 60) * 10
                ELSE NULL
            END), 2) AS deaths_10_min,
        ROUND(AVG(CASE 
                WHEN gds.date BETWEEN DATE_SUB(CURRENT_DATE(), INTERVAL 8 DAY) AND CURRENT_DATE() THEN ds.assists / (ds.match_duration / 60) * 10
                ELSE NULL
            END), 2) AS assists_10_min,
        ROUND(AVG(CASE 
                WHEN gds.date BETWEEN DATE_SUB(CURRENT_DATE(), INTERVAL 8 DAY) AND CURRENT_DATE() THEN ds.kills / (ds.match_duration / 60) * 10
                ELSE NULL
            END), 2) AS kills_10_min,
        ROUND(AVG(CASE 
                WHEN gds.date BETWEEN DATE_SUB(CURRENT_DATE(), INTERVAL 8 DAY) AND CURRENT_DATE() THEN ds.solo_kills / (ds.match_duration / 60) * 10
                ELSE NULL
            END), 2) AS solo_kills_10_min,
        ROUND(AVG(CASE 
                WHEN gds.date BETWEEN DATE_SUB(CURRENT_DATE(), INTERVAL 8 DAY) AND CURRENT_DATE() THEN ds.self_healing / (ds.match_duration / 60) * 10
                ELSE NULL
            END), 2) AS self_healing_10_min,
        ROUND(AVG(CASE 
                WHEN gds.date BETWEEN DATE_SUB(CURRENT_DATE(), INTERVAL 8 DAY) AND CURRENT_DATE() THEN ds.gold_per_minute / (ds.match_duration / 60) * 10
                ELSE NULL
            END), 2) AS gold_per_minute_10_min,
        ROUND(AVG(CASE 
                WHEN gds.date BETWEEN DATE_SUB(CURRENT_DATE(), INTERVAL 8 DAY) AND CURRENT_DATE() THEN ds.healing / (ds.match_duration / 60) * 10
                ELSE NULL
            END), 2) AS healing_10_min,
        ROUND(AVG(CASE 
                WHEN gds.date BETWEEN DATE_SUB(CURRENT_DATE(), INTERVAL 8 DAY) AND CURRENT_DATE() THEN ds.shielding / (ds.match_duration / 60) * 10
                ELSE NULL
            END), 2) AS shielding_10_min,
        ROUND(AVG(CASE 
                WHEN gds.date BETWEEN DATE_SUB(CURRENT_DATE(), INTERVAL 8 DAY) AND CURRENT_DATE() THEN ds.objective_time / (ds.match_duration / 60) * 10
                ELSE NULL
            END), 2) AS objective_time_10_min
    FROM 
        champions AS c
    INNER JOIN 
        daily_stats AS ds ON ds.champion_id = c.id
    INNER JOIN 
        global_daily_stats AS gds ON gds.id = ds.the_day_total_matches_id
    WHERE
        c.id = ${req.params.id}
    `.execute(db);
    res.status(200).json(response.rows[0]);
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
