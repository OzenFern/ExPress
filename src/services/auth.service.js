import bcrypt from "bcryptjs";
import {
  createUser,
  findUserByEmail,
} from "../repositories/user.repositories.js";

const saltRounds = 12;

export async function registerUser(email, password) {
  const existingUser = await findUserByEmail(email);
  if (existingUser) return null;

  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return createUser(email, hashedPassword);
}
