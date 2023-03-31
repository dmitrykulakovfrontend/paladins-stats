import { env } from "~/env.mjs";
import { Kysely } from "kysely";
import { PlanetScaleDialect } from "kysely-planetscale";
import { type DB } from "~/types/db";

export const db = new Kysely<DB>({
  dialect: new PlanetScaleDialect({
    host: env.DATABASE_HOST,
    username: env.DATABASE_USERNAME,
    password: env.DATABASE_PASSWORD,
  }),
});
