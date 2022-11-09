import { getApiKey } from "../../utils/consts";
import { Cabin, getCabin } from "./getCabin";
import cachedCabins from "../../data/cabins.json";

type CabinIdList = {
  propertiesUids: string[];
};

export async function getAllCabinsId({
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

export async function getAllCabins({
  cached = true,
  limit = 20,
  offset = 0,
} = {}): Promise<Cabin[]> {
  if (cached) {
    return cachedCabins as Cabin[];
  }

  const { propertiesUids } = await getAllCabinsId({ limit, offset });

  const allCabins = await Promise.all(
    propertiesUids.map(async (uid) => {
      return await getCabin(uid);
    })
  );

  return allCabins;
}
