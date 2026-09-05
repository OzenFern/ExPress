import { Router } from "express";
import { requireAuth } from "../middlewares/auth.middleware.js";
import {
  createNewPost,
  getSinglePost,
  getPosts,
  renderCreatePostForm,
  deleteSinglePost,
  editSinglePost,
  renderEditPostForm,
} from "../controllers/post.controller.js";
import { loadPost } from "../middlewares/post.middleware.js";
import { noCache } from "../middlewares/cache.middleware.js";

const router = Router();

router.use(requireAuth);
// Prevents post pages from being cached
router.use(noCache);

router.get("/", getPosts);
router.get("/new", renderCreatePostForm);

router.post("/create", createNewPost);

router.get("/:id", loadPost, getSinglePost);
router.get("/:id/edit", loadPost, renderEditPostForm);

router.post("/:id/edit", editSinglePost);

router.get("/:id/delete", loadPost, deleteSinglePost);

export default router;
