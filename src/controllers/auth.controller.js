import { registerUser } from "../services/auth.service.js";

export function showLogin(req, res) {
  res.render("auth/login");
}

export function showRegister(req, res) {
  res.render("auth/register");
}

export async function register(req, res, next) {
  try {
    const { username, password } = req.body;
    const { user } = await registerUser(username, password);

    req.login(user, (err) => {
      if (err) return next(err);
    });

    res.redirect("/posts");
  } catch (err) {
    next(err);
  }
}

export function logoutUser(req, res, next) {
  req.logout((err) => {
    if (err) return next(err);
  });

  res.redirect("/");
}
