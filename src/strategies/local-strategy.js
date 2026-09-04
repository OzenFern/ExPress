import passport from "passport";
import { Strategy } from "passport-local";
import bcrypt from "bcryptjs";
import {
  findUserByEmail,
  findUserById,
} from "../repositories/user.repositories.js";

// Serialize user
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user
passport.deserializeUser(async (id, done) => {
  try {
    const user = await findUserById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

// Setup local strategy
export default passport.use(
  "local",
  new Strategy(async (username, password, done) => {
    console.log(`Username: ${username}`);
    console.log(`Password: ${password}`);

    try {
      const { password: hashedPassword } = findUserByEmail(username);
      const isMatch = await bcrypt.compare(password, hashedPassword);
      if (!isMatch) throw new Error("Invalid Credentials");

      done(null, user);
    } catch (error) {
      done(error, null);
    }
  }),
);
