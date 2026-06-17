import express from "express";
import morgan from "morgan";

const app = express();
const port = 3000;

let posts = [];
let blogId = 0;

class Blog {
  constructor(title, blurb, content) {
    // Constructs Blog object and auto handles the id
    this.id = blogId++;
    this.title = title;
    this.blurb = blurb;
    this.content = content;
  }
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
  });
});

// Directs user to a form to create new post
app.get("/posts/new", (req, res) => {
  res.render("new.ejs");
});

// Handles creation of new posts
app.post("/post/create", (req, res) => {
  const post = req.body;
  posts.push(new Blog(post.title, post.blurb, post.content));
  res.render("posts.ejs", {
    title: post.title,
    action: "create",
    blogs: posts,
  });
});

// Handles deletion of a post
app.get("/posts/:id/delete", (req, res) => {
  const id = Number(req.params.id); // Explicitly convert id to a number
  const post = posts.find((post) => post.id === id);
  if (!post) res.sendStatus(404, "Post not found"); // Throw a 404 error if post is not found
  posts = posts.filter((post) => post.id !== id);
  res.render("posts.ejs", {
    title: post.title,
    action: "delete",
    blogs: posts,
  });
});

// Default posts
posts.push(
  new Blog(
    "Welcome to My Blog",
    "A quick intro to what this blog is about",
    `This is the first post on the blog. It serves as a welcome message and an introduction to the platform. 

Here you'll find posts about web development, backend engineering, and personal learning notes as I build projects.

Stay tuned for more updates!`,
  ),
);

posts.push(
  new Blog(
    "Understanding Express.js Basics",
    "A beginner-friendly overview of Express.js concepts",
    `Express.js is a lightweight web framework for Node.js that helps you build server-side applications quickly.

In this post, we explore routing, middleware, and how requests flow through an Express app.

By the end, you'll understand how to structure a simple backend using Express.`,
  ),
);

posts.push(
  new Blog(
    "Why I’m Building This Blog",
    "Thoughts on learning by building projects",
    `Building projects is one of the best ways to learn programming.

This blog exists as a hands-on project to practice backend development, routing, and templating with EJS.

Each feature added here represents a small step toward understanding full-stack development better.`,
  ),
);
