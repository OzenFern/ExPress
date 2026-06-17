import express from "express";
import morgan from "morgan";

const app = express();
const port = 3000;

let posts = [];
let postId = 0;

/**
 * Creates a new post and automatically handles the id
 * @param {string} postBody - Metadata and contents of post
 */
function createPost({ title, blurb, content }) {
  posts.push({ id: postId++, title: title, blurb: blurb, content: content });
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
 * Renders a custom 404 page for 404 status code
 *
 * @param {*} res - response from the server
 * @returns
 */
function render404(res) {
  return res.status(404).render("404.ejs");
}

// Middleware
app.use(express.static("public")); // Displays static files
app.use(express.urlencoded({ extended: true })); // Parses user data
app.use(morgan("dev")); // Logs HTTP requests

// Sets up server at specified port
app.listen(port, () => {
  console.log(`Server running at http://localhost:3000`);
});

// Renders the homepage
app.get("/", (req, res) => {
  res.render("index.ejs");
});

// Displays all posts
app.get("/posts", (req, res) => {
  res.render("posts.ejs", {
    blogs: posts,
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
  res.redirect(`/posts?action=created&title=${encodeURIComponent(post.title)}`);
});

// Displays selected post
app.get("/posts/:id", (req, res) => {
  const post = getPost(Number(req.params.id));
  if (!post) {
    return render404(res);
  } // Throw a 404 error if post is not found
  res.render("post.ejs", {
    post,
  });
});

// Display a page for editing post
app.get("/posts/:id/edit", (req, res) => {
  const post = getPost(Number(req.params.id));
  if (!post) {
    return render404(res);
  }
  res.render("edit.ejs", {
    post,
  });
});

// Handles editing of the post
app.post("/posts/:id/edit", (req, res) => {
  const post = getPost(Number(req.params.id));
  // Update the post with the values entered by the user
  post.title = req.body.title;
  post.blurb = req.body.blurb;
  post.content = req.body.content;

  res.redirect(`/posts?action=edited&title=${encodeURIComponent(post.title)}`);
});

// Handles deletion of a post
app.get("/posts/:id/delete", (req, res) => {
  const id = Number(req.params.id); // Explicitly convert id to a number
  const post = getPost(id);
  if (!post) {
    return render404(res);
  } // Throw a 404 error if post is not found

  deletePost(id);
  res.redirect(`/posts?action=deleted&title=${encodeURIComponent(post.title)}`);
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
