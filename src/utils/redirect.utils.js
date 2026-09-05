/**
 * Redirects to posts with a flash message.
 *
 * @param {*} req - request
 * @param {*} res - response
 * @param {string} action - action performed
 * @param {string} title - title of post
 */
export function redirectWithMessage(req, res, action, title) {
  req.flash("success", `Post "${title}" ${action} successfully.`);

  res.redirect("/posts");
}
