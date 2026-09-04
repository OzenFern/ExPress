import { Router } from "express";
import passport from "passport";
import {
  logoutUser,
  register,
  showLogin,
  showRegister,
} from "../controllers/auth.controller.js";

const router = Router();

router.get("/register", showRegister);
router.get("/login", showLogin);

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
