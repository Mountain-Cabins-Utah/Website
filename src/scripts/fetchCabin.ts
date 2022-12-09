import type { Cabin } from "../types/cabin";
import { getApiKey } from "../utils/consts";

export async function fetchCabin(id: string): Promise<Cabin> {
  const url = `https://api.hostfully.com/v2/properties/${id}`;

  const headers = {
    "Content-Type": "application/json",
    "X-HOSTFULLY-APIKEY": getApiKey(),
  };

  const response = await fetch(url, {
    method: "GET",
    headers,
  });

  const data = await response.json();
  return data;
}
