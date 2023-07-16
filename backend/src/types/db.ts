import type { ColumnType } from "kysely";

export type Decimal = ColumnType<string, string | number, string | number>;

export interface Champions {
  id: number;
  name: string;
  icon: string;
  pickrate: Decimal;
  winrate: Decimal;
}

export interface Matches {
  match_id: number;
  date: Date | null;
  region: string;
}

export interface DB {
  champions: Champions;
  matches: Matches;
}
