import express from "express";
import morgan from "morgan";

const app = express();
const port = 3000;

const posts = [];
let blogId = 0;

class Blog {
  constructor(title, blurb, content) {
    this.id = blogId++;
    this.title = title;
    this.blurb = blurb;
    this.content = content;
  }
}

app.use(express.static("public"));

app.listen(port, () => {
  console.log(`Server running at http://localhost:3000`);
});

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.get("/posts", (req, res) => {
  // Pass some dummy data
  res.render("posts.ejs", {
    blogs: posts,
  });
});

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
