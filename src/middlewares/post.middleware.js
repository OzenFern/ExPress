import { getPost } from "../services/post.service.js";
import { notFound } from "./notFound.middleware.js";

export const loadPost = async (req, res, next) => {
  const post = await getPost(Number(req.params.id), req.user.id);

  if (!post) return notFound(req, res);

  req.post = post;
  next();
};
