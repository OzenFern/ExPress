import * as ps from "../services/post.service.js";
import { redirectWithMessage } from "../utils/redirect.utils.js";

export async function getPosts(req, res) {
  const posts = await ps.getAllPosts(req.user.user_id);

  res.render("posts/posts", { posts });
}

export function renderCreatePostForm(req, res) {
  res.render("posts/new");
}

export async function createNewPost(req, res) {
  const post = await ps.createPost(req.body, req.user.user_id);

  redirectWithMessage(req, res, "created", post.title);
}

export async function getSinglePost(req, res) {
  res.render("posts/post", {
    post: req.post,
  });
}

export function renderEditPostForm(req, res) {
  res.render("posts/edit", {
    post: req.post,
  });
}

export async function editSinglePost(req, res) {
  const post = await ps.updatePost(
    Number(req.params.id),
    req.body,
    req.user.user_id,
  );

  redirectWithMessage(req, res, "edited", post.title);
}

export async function deleteSinglePost(req, res) {
  await ps.deletePost(req.post.post_id, req.user.user_id);

  redirectWithMessage(req, res, "deleted", req.post.title);
}
