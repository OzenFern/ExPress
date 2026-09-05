import pool from "../db/pool.js";

/**
 * Gets all posts of a particular from the posts table
 *
 * @param {*} userId - id of the user
 * @returns
 */

export async function getAllPosts(userId) {
  const { rows } = await pool.query("SELECT * FROM posts WHERE user_id=$1", [
    userId,
  ]);

  return rows;
}

/**
 * Gets post by their id from the posts table
 *
 * @param {number} postId - id of the post
 * @param {*} userId - id of the user
 * @returns
 */

export async function getPost(postId, userId) {
  const { rows } = await pool.query(
    "SELECT * FROM posts WHERE post_id=$1 AND user_id=$2",
    [postId, userId],
  );

  return rows[0];
}

/**
 * Creates a new post
 *
 * @param {Object} post
 * @param {string} post.title
 * @param {string} post.blurb
 * @param {string} post.content
 * @param {*} userId
 */
export async function createPost(post, userId) {
  const { rows } = await pool.query(
    "INSERT INTO posts (title, blurb, content, user_id) VALUES ($1, $2, $3, $4) RETURNING *",
    [post.title, post.blurb, post.content, userId],
  );

  return rows[0];
}

/**
 * Updates a new post
 *
 * @param {*} postId
 * @param {Object} post
 * @param {string} post.title
 * @param {string} post.blurb
 * @param {string} post.content
 * @param {*} userId
 */
export async function updatePost(postId, post, userId) {
  const allowedFields = ["title", "blurb", "content"];
  const fields = Object.keys(post).filter((field) =>
    allowedFields.includes(field),
  );
  const values = fields.map((field) => post[field]);

  if (fields.length === 0) return getPost(postId, userId);

  const setClause = fields.map((field, index) => `${field}=$${index + 1}`);

  //   Add post_id & user_id at the back of values
  values.push(postId, userId);

  const query = `UPDATE posts SET ${setClause.join(",")} 
            WHERE post_id=$${fields.length + 1} AND user_id=$${fields.length + 2} 
            RETURNING *`;
  const { rows } = await pool.query(query, values);

  return rows[0];
}

/**
 * Deletes a post by their id from the posts table
 *
 * @param {number} postId
 * @param {*} userId
 */
export async function deletePost(postId, userId) {
  await pool.query("DELETE FROM posts WHERE post_id=$1 AND user_id=$2", [
    postId,
    userId,
  ]);
}
