import passport from "passport";
import { Strategy } from "passport-local";
import bcrypt from "bcryptjs";
import pool from "../db/pool.js";

// Serialize user
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user
passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

// Setup local strategy
export default passport.use(
  "local",
  new Strategy(async (username, password, done) => {
    console.log(`Username: ${username}`);
    console.log(`Password: ${password}`);

    try {
      const { rows } = await pool.query(
        `SELECT password FROM users WHERE email=$1`,
        [username],
      );
      if (rows.length === 0) throw new Error("User not Registered!");

      const hashedPassword = rows[0];

      const isMatch = await bcrypt.compare(password, hashedPassword);
      if (!isMatch) throw new Error("Invalid Credentials");

      done(null, user);
    } catch (error) {
      done(error, null);
    }
  }),
);
