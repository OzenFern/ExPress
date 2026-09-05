import * as ps from "../services/post.service.js";
import { redirectWithMessage } from "../utils/redirect.utils.js";

export async function getPosts(req, res) {
  const posts = await ps.getAllPosts(req.user.id);

  res.render("posts/posts", {
    posts,
    title: req.query.title,
    action: req.query.action,
  });
}

export function renderCreatePostForm(req, res) {
  res.render("posts/new");
}

export async function createNewPost(req, res) {
  const { post: postPayload } = req.body;
  const post = await ps.createPost(postPayload, req.user.id);

  redirectWithMessage(req, res, "created", post.title);
}

export async function getPost(req, res) {
  res.render("posts/post", {
    post: req.post,
  });
}

export function renderEditPostForm(req, res) {
  res.render("posts/edit", {
    post: req.post,
  });
}

export async function editPost(req, res) {
  const post = await ps.updatePost(Number(req.params.id), req.user.id);

  redirectWithMessage(req, res, "edited", post.title);
}

export async function deletePost(req, res) {
  await ps.deletePost(req.post.id);

  redirectWithMessage(req, res, "deleted", req.post.title);
}
