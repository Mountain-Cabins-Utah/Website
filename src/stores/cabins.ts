import { writable } from "svelte/store";
import type { Cabin } from "../types/cabin";
import allCabins from "../data/cabins.json";

const cabins: Cabin[] = allCabins.filter(
  (cabin) => cabin.isActive
) as unknown as Cabin[];

export const searchResult = writable(cabins);
