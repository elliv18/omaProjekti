import * as dotenv from "dotenv";
dotenv.config();

export const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS) || 9;
export const JWT_SECRET = parseInt(process.env.JWT_SECRET)