import { Router } from "express";
import {
  renderAboutPage,
  renderHomePage,
} from "../controllers/page.controller.js";

const router = new Router();

router.get("/", renderHomePage);
router.get("/about", renderAboutPage);

export default router;
