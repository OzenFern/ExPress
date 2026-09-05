import passport from "passport";
import { Strategy } from "passport-local";
import bcrypt from "bcryptjs";
import {
  findUserByEmail,
  findUserById,
} from "../repositories/user.repositories.js";

// Serialize user
passport.serializeUser((user, done) => {
  done(null, user.user_id);
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
  new Strategy({ usernameField: "email" }, async (email, password, done) => {
    try {
      const user = await findUserByEmail(email);
      if (!user) return done(null, false);

      const { password: hashedPassword } = user;
      const isMatch = await bcrypt.compare(password, hashedPassword);
      if (!isMatch) return done(null, false);

      done(null, user);
    } catch (error) {
      done(error);
    }
  }),
);
