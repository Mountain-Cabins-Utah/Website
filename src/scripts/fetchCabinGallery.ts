import type { HostfullyPropertyGallery } from "../types/cabin";
import { getApiKey } from "../utils/consts";

export async function fetchCabinGallery(
  uid: string
): Promise<HostfullyPropertyGallery> {
  const url = `https://api.hostfully.com/v2/photos?propertyUid=${uid}`;
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
