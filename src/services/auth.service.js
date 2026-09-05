import bcrypt from "bcryptjs";
import { createUser } from "../repositories/user.repositories.js";
import { asyncTryCatch } from "../utils/error.utils.js";

const saltRounds = 12;

export const registerUser = asyncTryCatch(async (email, password) =>
  createUser(email, await bcrypt.hash(password, saltRounds)),
);
