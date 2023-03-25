/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { env } from "~/env.mjs";
import { Pool } from "pg";

let conn: undefined | Pool;

if (!conn) {
  conn = new Pool({
    user: env.PGSQL_USER,
    password: env.PGSQL_PASSWORD,
    host: env.PGSQL_HOST,
    port: +env.PGSQL_PORT,
    database: env.PGSQL_DATABASE,
  });
}

export default conn;
