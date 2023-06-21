export interface Matches {
  match_id: number;
  date: ColumnType<Date, string, never>;
  region: string;
}

export interface DB {
  matches: Matches;
}
