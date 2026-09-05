import pg from "pg";
import env from "../config/env.config.js";

const pool = new pg.Pool({
  connectionString: env.dbConnection,
  ssl: env.dbConnection?.includes("neon.tech")
    ? { rejectUnauthorized: false }
    : undefined,
});

export default pool;
