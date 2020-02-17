import * as dotenv from "dotenv";
dotenv.config();

export const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS) || 9;
export const JWT_SECRET = process.env.JWT_SECRET || "3rZL8BhBNh1kT@F4C0QFDj9dVC1zx!@"
export const USE_AUTH = process.env.USE_AUTH || true