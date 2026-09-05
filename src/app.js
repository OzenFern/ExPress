import express from "express";
import morgan from "morgan";
import session from "express-session";
import env from "./config/env.config.js";
import flash from "connect-flash";
import passport from "passport";
import helmet from "helmet";
import compression from "compression";
import "./strategies/local-strategy.js";
import path from "path";
import { fileURLToPath } from "url";
import { notFound } from "./middlewares/notFound.middleware.js";
import authRouter from "./routes/auth.routes.js";
import pageRouter from "./routes/page.routes.js";
import postRouter from "./routes/post.routes.js";
import { errorHandler } from "./middlewares/errorHandler.middleware.js";
import { viewFlashMessage } from "./middlewares/flash.middleware.js";

const app = express();
const port = env.port;

// Setup __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Configure EJS template engine for server-side rendering
 */
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware
app.use(helmet());
app.use(compression());
app.use(express.static(path.join(__dirname, "../public"), { maxAge: "30d" }));
app.use(express.urlencoded({ extended: true })); // Parses user data
app.use(morgan("dev")); // Logs HTTP requests

/*
  Set up express-session
  Save cookies for 1 day
 */
app.use(
  session({
    secret: env.sessionSecret,
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 86400000,
    },
  }),
);

// Set up flash messages
app.use(flash());

// Attach flash messages to response object
app.use(viewFlashMessage);

// Set up passport
app.use(passport.initialize());
app.use(passport.session());

app.use("/", pageRouter);
app.use("/auth", authRouter);
app.use("/posts", postRouter);

app.use(notFound);
app.use(errorHandler);

// Sets up server at specified port
app.listen(port, () => {
  console.log(`ExPress running at http://localhost:3000`);
});
