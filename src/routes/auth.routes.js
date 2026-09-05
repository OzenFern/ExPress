import { Router } from "express";
import passport from "passport";
import {
  logoutUser,
  register,
  showLogin,
  showRegister,
} from "../controllers/auth.controller.js";
import { cache } from "../middlewares/cache.middleware.js";

const router = Router();

router.get("/register", cache(3600), showRegister);
router.get("/login", cache(3600), showLogin);

router.post("/register", register);

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/posts",
    failureRedirect: "/auth/login",
  }),
);

router.post("/logout", logoutUser);

export default router;
