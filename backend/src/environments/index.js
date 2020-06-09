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
export const NODE_ENV = process.env.NODE_ENV || DEVELOPMENT;
export const BACKEND_PORT = NODE_ENV === PRODUCTION ? process.env.REACT_APP_BACKEND_PORT_PROD : process.env.REACT_APP_BACKEND_PORT_DEV

export const accessKeyId = "AKIAJFG5GO3YJ5QZDOQA";
export const secretAccessKey = "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";
export const region = "eu--north-1";