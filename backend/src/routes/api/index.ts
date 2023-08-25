import { Router } from "express";
import { db } from "../../model/db.js";
import { catchErrors } from "../../utils/errorHandler.js";
import { sql } from "kysely";
import insertDailyStats from "../../utils/insertDailyStats.js";

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
  catchErrors(async (_req, _res) => {
    // const matchesFromDB = await db
    //   .selectFrom("matches")
    //   .selectAll()
    //   .where("date","=", "2023-04-24")
    //   .limit(10)
    //   .execute();
    await insertDailyStats();
  })
);
router.get(
  "/champions",
  catchErrors(async (_req, res) => {
    const response = await sql`
    SELECT 
        c.name,
        c.role,
        c.icon,
        ROUND(AVG(CASE 
                WHEN gds.date BETWEEN DATE_SUB(CURRENT_DATE(), INTERVAL 8 DAY) AND CURRENT_DATE() THEN (ds.wins / (ds.wins + ds.loses) * 100)
                ELSE NULL
            END), 2) AS winrate,
        ROUND(AVG(CASE 
                WHEN gds.date BETWEEN DATE_SUB(CURRENT_DATE(), INTERVAL 8 DAY) AND CURRENT_DATE() THEN (ds.wins + ds.loses) / gds.matches * 100
                ELSE NULL
            END), 2) AS pickrate
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
