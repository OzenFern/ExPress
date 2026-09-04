import pool from "../db/pool.js";

/**
 * Gets post by their id from the posts table
 *
 * @param {number} post_id - id of the post
 * @returns
 */

export async function getPost(post_id) {
  const { rows } = await pool.query("SELECT * FROM posts WHERE post_id=$1", [
    post_id,
  ]);

  return rows[0];
}

/**
 * Creates a new post
 *
 * @param {Object} post
 * @param {string} post.title
 * @param {string} post.blurb
 * @param {string} post.content
 *
 * @param {*} user_id
 */
export async function createPost(post, user_id) {
  const { rows } = await pool.query(
    "INSERT INTO posts (title, blurb, content, user) VALUES ($1, $2, $3, $4) RETURNING *",
    [post.title, post.blurb, post.content, user_id],
  );

  return rows[0];
}

/**
 * Updates a new post
 *
 * @param {*} post_id
 * @param {Object} post
 * @param {string} post.title
 * @param {string} post.blurb
 * @param {string} post.content
 */
export async function updatePost(post_id, post) {
  const fields = Object.keys(post);
  const values = Object.values(post);
  const setClause = fields.map((field, index) => `${field}=${index + 1}`);

  //   Add id at the back of values
  values.push(post_id);

  const query = `UPDATE posts SET ${setClause.join(",")} WHERE post_id=$${fields.length + 1} RETURNING *`;
  const { rows } = await pool.query(query, values);

  return rows[0];
}

/**
 * Deletes a post by their id from the posts table
 *
 * @param {number} post_id
 */
export async function deletePost(post_id) {
  await pool.query("DELETE FROM posts WHERE post_id=$1", [post_id]);
}
