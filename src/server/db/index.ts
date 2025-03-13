import { drizzle } from "drizzle-orm/singlestore";
import { createPool, Pool } from "mysql2";

import { env } from "~/env";

const globalForDb = globalThis as unknown as {
  conn: Pool | undefined;
};

const conn = 
  globalForDb.conn ??
  createPool({
    host: env.SINGLESTORE_HOST,
    port: parseInt(env.SINGLESTORE_HOST),
    user: env.SINGLESTORE_USER,
    password: env.SINGLESTORE_PASS,
    database: env.SINGLESTORE_DB_NAME,
    ssl: {},
    maxIdle: 0
});

const db = drizzle({ client: connection });
