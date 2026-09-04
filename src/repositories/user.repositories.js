import pool from "../db/pool.js";

// TODO: Implement try-catch in services
export async function findUserByEmail(email) {
  const { rows } = await pool.query(
    "SELECT user_id FROM users WHERE email=$1",
    [email],
  );

  return rows[0].user_id;
}

export async function createUser(email, password) {
  const { rows } = await pool.query(
    "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING user_id, email",
    [email, password],
  );

  return rows[0];
}
