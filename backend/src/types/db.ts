import type { ColumnType } from "kysely";

export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;

export interface Champions {
  id: number;
  name: string;
  icon: string;
  role: string | null;
}

export interface DailyStats {
  id: Generated<number>;
  champion_id: number;
  the_day_total_matches_id: number;
  loses: number;
  wins: number;
  date: Date;
}

export interface GlobalDailyStats {
  id: Generated<number>;
  matches: number;
  date: Date;
}

export interface DB {
  champions: Champions;
  daily_stats: DailyStats;
  global_daily_stats: GlobalDailyStats;
}
