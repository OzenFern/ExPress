import express from "express";
import morgan from "morgan";

const app = express();
const port = 3000;

let posts = [];
let postId = 0;

/**
 * Creates a new post and automatically handles the id
 *
 * @param {Object} postBody
 * @param {string} postBody.title
 * @param {string} postBody.blurb
 * @param {string} postBody.content
 */
function createPost({ title, blurb, content }) {
  posts.push({ id: postId++, title, blurb, content });
}

/**
 * Gets post by their id from the posts array
 *
 * @param {number} id - id of the post
 * @returns
 */
function getPost(id) {
  return posts.find((post) => post.id === id);
}

/**
 * Deletes a post by their id from the posts array
 *
 * @param {number} id
 */
function deletePost(id) {
  posts = posts.filter((post) => post.id !== id);
}

/**
 * Redirects to posts with action and title specified in the query
 *
 * @param {*} res - response
 * @param {string} action - action performed
 * @param {string} title - title of post
 */
function redirectWithMessage(res, action, title) {
  res.redirect(
    `/posts?action=${encodeURIComponent(action)}&title=${encodeURIComponent(title)}`,
  );
}

/**
 * Renders a custom 404 page for 404 status code
 *
 * @param {*} res - response from the server
 * @returns
 */
function render404(res) {
  return res.status(404).render("404.ejs");
}

/**
 * Checks if the post exists and assigns it to request post
 * Custom middleware
 *
 * @param {*} req
 * @param {*} res
 * @param {function} next
 */
function loadPost(req, res, next) {
  const post = getPost(Number(req.params.id));
  if (!post) return render404(res); // Throw a 404 error if post is not found
  req.post = post;
  next();
}

// Middleware
app.use(express.static("public")); // Displays static files
app.use(express.urlencoded({ extended: true })); // Parses user data
app.use(morgan("dev")); // Logs HTTP requests

// Renders the homepage
app.get("/", (req, res) => {
  res.render("index.ejs");
});

// Displays all posts
app.get("/posts", (req, res) => {
  res.render("posts.ejs", {
    posts,
    title: req.query.title,
    action: req.query.action,
  });
});

// Directs user to a form to create new post
app.get("/posts/new", (req, res) => {
  res.render("new.ejs");
});

// Handles creation of new posts
app.post("/posts/create", (req, res) => {
  const post = req.body;
  createPost(post);

  redirectWithMessage(res, "created", post.title);
});

// Displays selected post
app.get("/posts/:id", loadPost, (req, res) => {
  res.render("post.ejs", {
    post: req.post,
  });
});

// Display a page for editing post
app.get("/posts/:id/edit", loadPost, (req, res) => {
  res.render("edit.ejs", {
    post: req.post,
  });
});

// Handles editing of the post
app.post("/posts/:id/edit", loadPost, (req, res) => {
  const post = getPost(Number(req.params.id));
  // Update the post with the values entered by the user
  req.post.title = req.body.title;
  req.post.blurb = req.body.blurb;
  req.post.content = req.body.content;

  redirectWithMessage(res, "edited", post.title);
});

// Handles deletion of a post
app.get("/posts/:id/delete", loadPost, (req, res) => {
  deletePost(req.post.id);

  redirectWithMessage(res, "deleted", req.post.title);
});

app.use((req, res) => {
  // Render 404 to handle all invalid routes
  render404(res);
});

// Default posts
createPost({
  title: "Welcome to My Blog",
  blurb: "A quick intro to what this blog is about",
  content: `This is the first post on the blog. It serves as a welcome message and an introduction to the platform.

Here you'll find posts about web development, backend engineering, and personal learning notes as I build projects.

Stay tuned for more updates!`,
});

createPost({
  title: "Understanding Express.js Basics",
  blurb: "A beginner-friendly overview of Express.js concepts",
  content: `Express.js is a lightweight web framework for Node.js that helps you build server-side applications quickly.

In this post, we explore routing, middleware, and how requests flow through an Express app.

By the end, you'll understand how to structure a simple backend using Express.`,
});

createPost({
  title: "Why I’m Building This Blog",
  blurb: "Thoughts on learning by building projects",
  content: `Building projects is one of the best ways to learn programming.

This blog exists as a hands-on project to practice backend development, routing, and templating with EJS.

Each feature added here represents a small step toward understanding full-stack development better.`,
});

// Sets up server at specified port
app.listen(port, () => {
  console.log(`Server running at http://localhost:3000`);
});
