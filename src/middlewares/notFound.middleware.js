/**
 * Renders a custom 404 page for 404 status code
 *
 * @param {*} res - response from the server
 * @returns
 */
export function notFound(req, res) {
  console.warn(`[ExPress 404] Cannot ${req.originalUrl}`);
  return res.status(404).render("errors/404");
}
