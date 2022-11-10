import { getAllCabins } from "../api/cabins/getAllCabins";
import { getCabinGallery } from "../api/cabins/getCabinGallery";
import { writeFile } from "fs/promises";
import extraData from "../data/extra-data.json";

export async function generateJson() {
  const cabins = await getAllCabins({ cached: false });

  const cabinsExtraData = await Promise.all(
    cabins.map(async (cabin) => {
      if (cabin.name === "Big Cabin on Deer Run") return [];
      if (cabin.name === "Little Cabin on Deer Run") return [];
      if (cabin.name === "Mountain Modern on Balsam") return [];
      const gallery = await getCabinGallery(cabin.uid);
      const extra = extraData.find((e) => e.uid === cabin.uid);
      return {
        ...cabin,
        ...extra,
        gallery,
      };
    })
  );

  await writeFile(
    "./src/data/cabins.json",
    JSON.stringify(cabinsExtraData.flatMap((c) => c))
  );
}

await generateJson();
