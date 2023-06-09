import { Kysely } from "kysely";
import { PlanetScaleDialect } from "kysely-planetscale";
import { ColumnType } from "kysely";
import dotenv from "dotenv";
dotenv.config();
if (!process.env.DATABASE_HOST) throw new Error("DATABASE_HOST not set");
if (!process.env.DATABASE_USERNAME)
  throw new Error("DATABASE_USERNAME not set");
if (!process.env.DATABASE_PASSWORD)
  throw new Error("DATABASE_PASSWORD not set");

export interface Matches {
  match_id: number;
  date: ColumnType<Date, string, never>;
  region: string;
}

export interface DB {
  matches: Matches;
}
export const db = new Kysely<DB>({
  dialect: new PlanetScaleDialect({
    host: process.env.DATABASE_HOST,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
  }),
});
