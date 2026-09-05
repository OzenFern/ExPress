import { registerUser } from "../services/auth.service.js";

export function showLogin(req, res) {
  res.render("auth/login");
}

export function showRegister(req, res) {
  res.render("auth/register");
}

export async function register(req, res, next) {
  try {
    const { email, password } = req.body;
    const user = await registerUser(email, password);
    if (!user) return res.redirect("/auth/register");

    req.login(user, (err) => {
      if (err) return next(err);
      return res.redirect("/posts");
    });
  } catch (err) {
    next(err);
  }
}

export function logoutUser(req, res, next) {
  req.logout((err) => {
    if (err) return next(err);
    return res.redirect("/");
  });
}
