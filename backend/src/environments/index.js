import * as dotenv from "dotenv";
dotenv.config();

export const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS) || 9;
export const JWT_SECRET = process.env.JWT_SECRET || "3rZL8BhBNh1kT@F4C0QFDj9dVC1zx!@"
export const USE_AUTH = process.env.USE_AUTH || true

//Root admin
export const ROOT_ADMIN_EMAIL = process.env.ROOT_ADMIN_EMAIL || "1";
export const ROOT_ADMIN_PASS = process.env.ROOT_ADMIN_PASS || "1";
export const ROOT_ADMIN_NAME = process.env.ROOT_ADMIN_NAME || "Root";

export const DEVELOPMENT = "development";
export const PRODUCTION = "production";