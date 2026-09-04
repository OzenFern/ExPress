import bcrypt from "bcryptjs";
import { createUser } from "../repositories/user.repositories.js";

const saltRounds = 12;

export async function registerUser(username, password) {
  try {
    return await createUser(username, bcrypt.hash(password, saltRounds));
  } catch (err) {
    console.error(err.stack);
  }
}
