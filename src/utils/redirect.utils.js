/**
 * Redirects to posts with action and title specified in the query
 *
 * @param {*} res - response
 * @param {string} action - action performed
 * @param {string} title - title of post
 */
export function redirectWithMessage(res, action, title) {
  res.redirect(
    `/posts?action=${encodeURIComponent(action)}&title=${encodeURIComponent(title)}`,
  );
}
