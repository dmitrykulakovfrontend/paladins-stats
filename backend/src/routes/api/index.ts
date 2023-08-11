import { Router } from "express";
import { db } from "../../model/db.js";
import { discordNotification, error } from "../../utils/logging.js";
import { catchErrors } from "../../utils/errorHandler.js";
import { sql } from "kysely";
import { createSession } from "../../utils/hirezAPI/session.js";
import getMatchIdsByQueue from "../../utils/hirezAPI/getMatchIdsByQueue.js";
import calculateChampsAverage from "../../utils/calculateChampsAverage.js";
import insertDailyStats from "../../utils/insertDailyStats.js";
import { HirezApiError } from "../../utils/fetchAPI.js";
import { DatabaseError } from "@planetscale/database";

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
    // const players = [];
    const matchesArr = await getMatchIdsByQueue(session);
    // transform matches id into array strings
    const matchesIds = matchesArr.map((match) => String(match.Match));
    const champions = await calculateChampsAverage(session, matchesIds);
  })
);
router.get(
  "/champions",
  catchErrors(async (req, res) => {
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

router.get(
  "/cronjob",
  catchErrors(async (req, res) => {
    try {
      await discordNotification({
        started: true,
      });
      await insertDailyStats();
      await discordNotification({
        finished: true,
      });
    } catch (err) {
      if (err instanceof HirezApiError) {
        const { name, message, stack, url, status } = err;
        error({
          name,
          message,
          url,
          status,
          stack,
        });
      } else if (err instanceof DatabaseError) {
        const { name, message, stack, status } = err;
        error({
          name,
          message,
          status,
          stack,
        });
      } else if (err instanceof Error) {
        const { name, message, stack } = err;
        error({
          name,
          message,
          stack,
        });
        await discordNotification({
          name,
          message,
          stack,
        });
      }
    }
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
