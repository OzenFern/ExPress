import * as pr from "../repositories/post.repositories.js";
import { asyncTryCatch } from "../utils/error.utils.js";

const safe = asyncTryCatch;

export const getAllPosts = safe((userId) => pr.getAllPosts(userId));

export const getPost = safe((postId, userId) => pr.getPost(postId, userId));

export const createPost = safe((post, userId) => pr.createPost(post, userId));

export const updatePost = safe((postId, post, userId) =>
  pr.updatePost(postId, post, userId),
);

export const deletePost = safe((postId, userId) =>
  pr.deletePost(postId, userId),
);
