import type { Cabin } from "../types/cabin";
import { getApiKey } from "../utils/consts";
import { fetchCabin } from "./fetchCabin";

type CabinIdList = {
  propertiesUids: string[];
};

async function fetchAllCabinsId({
  limit = 20,
  offset = 0,
} = {}): Promise<CabinIdList> {
  const agencyUid = "c90e1f86-6740-4f3a-ae44-38a80a314edb";

  const url = `https://api.hostfully.com/v2/properties?agencyUid=${agencyUid}&limit=${limit}&offset=${offset}`;

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

export async function fetchAllCabins({ limit = 20, offset = 0 } = {}): Promise<
  Cabin[]
> {
  const { propertiesUids } = await fetchAllCabinsId({ limit, offset });

  const allCabins = await Promise.all(
    propertiesUids.map(async (uid) => {
      return await fetchCabin(uid);
    })
  );

  const cabinsToSkip = [
    "Big Cabin on Deer Run",
    // "Little Cabin on Deer Run",
    "Mountain Modern on Balsam",
  ];

  return allCabins.filter(
    (cabin) =>
      cabin.uid !== undefined &&
      cabin.isActive &&
      !cabinsToSkip.includes(cabin.name)
  ) as Cabin[];
}
