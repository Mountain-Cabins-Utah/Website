import { writable } from "svelte/store";
import type { Cabin } from "../api/cabins/getCabin";
import allCabins from "../data/cabins.json";

const cabins: Cabin[] = allCabins.filter((cabin) => cabin.isActive);

export const searchResult = writable(cabins);
