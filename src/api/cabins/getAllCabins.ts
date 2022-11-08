import { apiKey } from "../../utils/consts";
import { getCabin } from "./getCabin";

type CabinIdList = {
  propertiesUids: string[];
};

export async function getAllCabinsId(
  limit = 20,
  offset = 0
): Promise<CabinIdList> {
  const agencyUid = "c90e1f86-6740-4f3a-ae44-38a80a314edb";

  const url = `https://api.hostfully.com/v2/properties?agencyUid=${agencyUid}&limit=${limit}&offset=${offset}`;

  const headers = {
    "Content-Type": "application/json",
    "X-HOSTFULLY-APIKEY": apiKey,
  };

  const response = await fetch(url, {
    method: "GET",
    headers,
  });

  const data = await response.json();
  return data;
}

export async function getAllCabins(limit = 20, offset = 0) {
  const { propertiesUids } = await getAllCabinsId(limit, offset);

  const allCabins = await Promise.all(
    propertiesUids.map(async (uid) => {
      return await getCabin(uid);
    })
  );

  return allCabins;
}
