import calculateTotalMatches from "./calculateTotalMatches.js";
import dailyStatsTestData from "../../daily_stats_test_data.json" assert { type: 'json' };
import { db } from "../model/db.js";
import { DateTime } from 'luxon';

export default async function insertDailyStats(dayOffset: number) {
  try {
      const totalMatchesInOneDay = calculateTotalMatches(dailyStatsTestData as any);


    
    // Calculate the date based on the dayOffset
    const date = DateTime.now().minus({ days: dayOffset }).toJSDate();

    const globalDailyData = {
      matches: totalMatchesInOneDay,
      date
    };

    // Insert data into the 'global_daily_data' table
    const { insertId } = await db.insertInto('global_daily_stats').values(globalDailyData).executeTakeFirst();
    if (!insertId) throw new Error("No InsertId");

    // Create data to insert into 'daily_stats' table
    const dataToInsert = dailyStatsTestData.map(obj => ({
      champion_id: obj.id,
      the_day_total_matches_id: Number(insertId),
      loses: obj.loses,
      wins: obj.wins,
      date
    }));

    // Insert data into the 'daily_stats' table
    // TODO: add verification for each champion that he is exists, in case where there might be 0 data for champion, just use a blank object with 0 data
    const result = await db.insertInto('daily_stats').values(dataToInsert).execute();
    
    return result; // Returning the result of the insertion
  } catch (error) {
    throw error;
  }
}