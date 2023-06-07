import dotenv from "dotenv";
dotenv.config();

export function getApiKey() {
  let apiKey = "";
  if (import.meta.env && import.meta.env.HOSTFULLY_API_KEY) {
    apiKey = import.meta.env.HOSTFULLY_API_KEY;
  } else if (process.env.HOSTFULLY_API_KEY) {
    apiKey = process.env.HOSTFULLY_API_KEY;
  }

  if (apiKey === "") throw new Error("HOSTFULLY_API_KEY is not defined");
  return apiKey;
}
