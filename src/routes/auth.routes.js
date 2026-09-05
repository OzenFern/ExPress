import { Router } from "express";
import passport from "passport";
import {
  logoutUser,
  register,
  showLogin,
  showRegister,
} from "../controllers/auth.controller.js";
import { noCache } from "../middlewares/cache.middleware.js";

const router = Router();

router.get("/register", noCache, showRegister);
router.get("/login", noCache, showLogin);

router.post("/register", register);

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/posts",
    failureRedirect: "/auth/login",
    failureFlash:
      "We could not sign you in. Check your details or register for an account.",
  }),
);

router.post("/logout", logoutUser);

export default router;
