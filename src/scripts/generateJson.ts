import { fetchAllCabins } from "./fetchAllCabins";
import { fetchCabinGallery } from "./fetchCabinGallery";
import { writeFile } from "fs/promises";

import type { Cabin, CMSData } from "../types/cabin";
import { fetchCabinDescription } from "./fetchCabinDescription";

export async function generateJson() {
  const cabins = await fetchAllCabins();

  const cmsData = await generateCMSJson(cabins);
  const hostfullyData = await generateHostfullyJson(cabins);

  const cabinData = cabins.map((cabin) => {
    return {
      ...cabin,
      ...cmsData.find((c) => c.uid === cabin.uid),
      ...hostfullyData.find((c) => c.uid === cabin.uid),
    };
  });

  await writeFile("./src/data/cabins.json", JSON.stringify(cabinData, null, 2));
}

async function generateCMSJson(cabins: Cabin[]): Promise<CMSData[]> {
  return Promise.all(
    cabins.map(async (cabin) => {
      let cabinData: CMSData;
      try {
        const file = (await import(`../../src/data/cms/${cabin.uid}.json`))
          .default;

        cabinData = {
          ...file,
          uid: cabin.uid,
          name: cabin.name,
        };
      } catch (error) {
        cabinData = {
          uid: cabin.uid,
          name: cabin.name,
        };
      }

      await writeFile(
        `./src/data/cms/${cabin.uid}.json`,
        JSON.stringify(cabinData, null, 2)
      );

      return cabinData;
    })
  );
}

async function generateHostfullyJson(cabins: Cabin[]) {
  return Promise.all(
    cabins.map(async (cabin) => {
      const gallery = await fetchCabinGallery(cabin.uid);
      const description = await fetchCabinDescription(cabin.uid);

      const cabinData = {
        ...cabin,
        gallery,
        description,
      };

      await writeFile(
        `./src/data/hostfully/${cabin.uid}.json`,
        JSON.stringify(cabinData, null, 2)
      );

      return cabinData;
    })
  );
}

await generateJson();
