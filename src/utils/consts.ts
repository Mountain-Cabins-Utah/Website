import dotenv from "dotenv";
dotenv.config();

export function getApiKey() {
  if (import.meta.env) {
    return import.meta.env.HOSTFULLY_API_KEY;
  }
  return process.env.HOSTFULLY_API_KEY;
}
