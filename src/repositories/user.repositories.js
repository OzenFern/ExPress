import pool from "../db/pool.js";

export async function findUserById(userId) {
  const { rows } = await pool.query("SELECT * FROM users WHERE user_id=$1", [
    userId,
  ]);

  return rows[0];
}

export async function findUserByEmail(email) {
  const { rows } = await pool.query("SELECT * FROM users WHERE email=$1", [
    email,
  ]);

  return rows[0];
}

export async function createUser(email, password) {
  const { rows } = await pool.query(
    "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING user_id, email",
    [email, password],
  );

  return rows[0];
}
