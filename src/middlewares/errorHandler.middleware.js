export function errorHandler(err, req, res, next) {
  console.error(`[ExPress Internal Error] ${err.message}`);
  console.error(err.stack);

  if (res.headersSent) {
    return next(err);
  }

  return res.status(500).render("errors/500");
}
