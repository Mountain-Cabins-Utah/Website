import { getApiKey } from "../../utils/consts";

export type Gallery = Picture[];

export interface Picture {
  uid: string;
  description: string;
  url: string;
  displayOrder: number;
  airbnbRoomId: null;
}

export async function getCabinGallery(uid: string): Promise<Gallery> {
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
