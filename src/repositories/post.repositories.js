import pool from "../db/pool.js";

/**
 * Gets all posts of a particular from the posts table
 *
 * @param {number} user_id - id of the user
 * @returns
 */

export async function getAllPosts(user_id) {
  const { rows } = await pool.query("SELECT * FROM posts WHERE user_id=$1", [
    user_id,
  ]);

  return rows;
}

/**
 * Gets post by their id from the posts table
 *
 * @param {number} post_id - id of the post
 * @param {number} user_id - id of the user
 * @returns
 */

export async function getPost(post_id, user_id) {
  const { rows } = await pool.query("SELECT * FROM posts WHERE post_id=$1 AND user_id=$2", [
    post_id, user_id
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
 * @param {number} user_id
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
 * @param {number} user_id
 */
export async function updatePost(post_id, post, user_id) {
  const fields = Object.keys(post);
  const values = Object.values(post);
  const setClause = fields.map((field, index) => `${field}=${index + 1}`);

  //   Add post_id & user_id at the back of values
  values.push(post_id, user_id);

  const query = `UPDATE posts SET ${setClause.join(",")} 
            WHERE post_id=$${fields.length + 1} AND user_id=$${fields.length + 2} 
            RETURNING *`;
  const { rows } = await pool.query(query, values);

  return rows[0];
}

/**
 * Deletes a post by their id from the posts table
 *
 * @param {number} post_id
 * @param {number} user_id
 */
export async function deletePost(post_id, user_id) {
  await pool.query("DELETE FROM posts WHERE post_id=$1 AND user_id=$2", [
    post_id,
    user_id,
  ]);
}
