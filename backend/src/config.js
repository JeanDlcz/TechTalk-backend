import { config } from "dotenv";
import { resolve } from "path";
config({ path: resolve(__dirname, "..", ".env") });

export const MONGODB_URI = process.env.MONGODB_URI;
export const PORT = process.env.PORT;
export const SECRET = process.env.SECRET;
export const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
export const ADMIN_USERNAME = process.env.ADMIN_USERNAME;
export const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
export const FrontendUrl = process.env.BASE_URL_FRONTEND;
export const CLOUD_NAME = process.env.CLOUD_NAME;
export const API_KEY = process.env.API_KEY;
export const API_SECRET = process.env.API_SECRET;
