export function requireAuth(req, res) {
  if (req.isAuthenticated()) {
    return next();
  }

  res.redirect("auth/login");
}
