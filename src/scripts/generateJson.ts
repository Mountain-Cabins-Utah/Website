import { getAllCabins } from "../api/cabins/getAllCabins";
import { writeFile } from "fs/promises";

export async function generateJson() {
  const cabins = await getAllCabins({ cached: false });
  await writeFile("./src/data/cabins.json", JSON.stringify(cabins));
}

await generateJson();
