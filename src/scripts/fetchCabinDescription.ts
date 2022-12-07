import type { HostfullyDescription } from "../types/cabin";
import { getApiKey } from "../utils/consts";

export async function fetchCabinDescription(
  uid: string
): Promise<HostfullyDescription> {
  const url = `https://api.hostfully.com/v2/propertydescriptions?propertyUid=${uid}`;

  const headers = {
    "Content-Type": "application/json",
    "X-HOSTFULLY-APIKEY": getApiKey(),
  };

  const response = await fetch(url, {
    method: "GET",
    headers,
  });

  const data = await response.json();

  return data[0];
}
