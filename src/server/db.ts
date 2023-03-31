import { env } from "~/env.mjs";
import { Kysely } from "kysely";
import { PlanetScaleDialect } from "kysely-planetscale";

const db = new Kysely({
  dialect: new PlanetScaleDialect({
    host: env.DATABASE_HOST,
    username: env.DATABASE_USERNAME,
    password: env.DATABASE_PASSWORD,
  }),
});
