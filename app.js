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

// Displays about page
app.get("/about", (req, res) => {
  res.render("about.ejs");
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
app.post("/posts/:id/delete", loadPost, (req, res) => {
  deletePost(req.post.id);

  redirectWithMessage(res, "deleted", req.post.title);
});

app.use((req, res) => {
  // Render 404 to handle all invalid routes
  render404(res);
});

// Default posts
createPost({
  title: "Welcome to ExPress",
  blurb: "Share your thoughts, ideas, and stories with the world.",
  content: `Let your curiosity run free!

This platform is built for one simple purpose: giving people a place to write and share what matters to them.

Whether it's a project you're working on, a lesson you've learned, an opinion you want to discuss, or simply a thought worth recording, ExPress gives you a space to put it into words.

Feel free to create, edit, and delete posts as you explore the platform. This post is here to help you get started.

Happy writing!`,
});

createPost({
  title: "Why Writing Things Down Matters",
  blurb: "A quick thought on turning ideas into something tangible.",
  content: `Ideas are fragile.

A great idea can appear during a walk, while studying, or in the middle of a conversation. The problem is that ideas disappear just as quickly as they arrive.

Writing helps transform thoughts into something more permanent. It forces us to organize our thinking, identify gaps in our understanding, and communicate more clearly.

You don't need to be a professional writer to benefit from writing. Sometimes a few paragraphs are enough to clarify an idea that has been floating around in your head for days.

The next time inspiration strikes, consider writing it down before it slips away.`,
});

createPost({
  title: "My First Project Reflection",
  blurb: "Lessons learned while building a small web application.",
  content: `Every project teaches something new.

When starting a project, it's easy to focus only on the finished product. In reality, most of the learning happens during the process itself.

You learn how to debug problems, read documentation, structure your code, and make decisions when there isn't an obvious answer.

Progress can feel slow at times, but every challenge solved becomes part of your experience.

Small projects may not look impressive at first glance, but they often provide the foundation for much larger ones in the future.

The key is to keep building.`,
});

// Sets up server at specified port
app.listen(port, () => {
  console.log(`Server running at http://localhost:3000`);
});
