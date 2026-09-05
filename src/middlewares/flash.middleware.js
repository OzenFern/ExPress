export function viewFlashMessage(req, res, next) {
  res.locals.messages = req.flash();
  const successMessage = res.locals.messages.success?.[0];

  if (successMessage && typeof successMessage === "object") {
    res.locals.title = successMessage.title;
    res.locals.action = successMessage.action;
  }

  next();
}
