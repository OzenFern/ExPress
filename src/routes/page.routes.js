import { Router } from "express";
import {
  renderAboutPage,
  renderHomePage,
} from "../controllers/page.controller.js";
import { cache } from "../middlewares/cache.middleware.js";

const router = new Router();

router.get("/", cache(3600), renderHomePage);
router.get("/about", cache(86400), renderAboutPage);

export default router;
