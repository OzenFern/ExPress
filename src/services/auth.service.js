import bcrypt from "bcryptjs";
import { createUser } from "../repositories/user.repositories.js";
import { asyncTryCatch } from "../utils/error.utils.js";

const saltRounds = 12;

export const registerUser = asyncTryCatch((username, password) =>
  createUser(username, bcrypt.hash(password, saltRounds)),
);
