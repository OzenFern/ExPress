import pg from "pg";
import env from "../config/env.config.js";

const pool = new pg.Pool({
  connectionString: env.dbConnection,
});

export default pool;
