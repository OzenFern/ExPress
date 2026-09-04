import { Router } from "express";
import {showLogin, showRegister} from "../controllers/auth.controller.js";
import passport from "passport";

const router = Router();

router.get("/register", showRegister);
router.get("/login", showLogin);

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/posts",
    failureRedirect: "/auth/login",
  }),
);

export default router;
