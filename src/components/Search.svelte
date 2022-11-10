<script lang="ts">
  import { searchResult } from "../stores/cabins";
  import cabins from "../data/cabins.json";
  import { onMount } from "svelte";
  import Close from "../components/svgs/Close.svelte";
  import type { Cabin } from "../api/cabins/getCabin";

  let term = "";
  let priceOrder: "asc" | "desc" | "" = "";
  type priceOrder = "asc" | "desc" | "";

  onMount(() => {
    const urlParams = new URLSearchParams(location.search);

    if (urlParams.has("term")) {
      term = urlParams.get("term") || "";
    }

    search();
  });

  let timerId: NodeJS.Timeout;

  function search({ priceOrder = "" }: { priceOrder?: priceOrder } = {}) {
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      let filtered: Cabin[];

      filtered = filterSearch();
      filtered = sortByPrice(priceOrder, filtered);
      $searchResult = filtered;
    }, 250);
  }

  function filterSearch() {
    if (term.trim() === "") return cabins;
    return cabins.filter((cabin) => {
      return cabin.name.toLowerCase().includes(term.toLowerCase());
    });
  }

  function sortByPrice(priceOrder: string, filtered: Cabin[]): Cabin[] {
    if (priceOrder === "asc") {
      return filtered.sort((a, b) => a.baseDailyRate - b.baseDailyRate);
    } else if (priceOrder === "desc") {
      return filtered.sort((a, b) => b.baseDailyRate - a.baseDailyRate);
    }
    return filtered;
  }

  function clearSearch() {
    term = "";
    search();
  }
</script>

<div class="wrapper">
  <div class="search">
    <input
      type="text"
      name="search"
      placeholder="Search"
      bind:value={term}
      on:input={() => search({})}
    />
    {#if term}
      <div on:click={clearSearch} class="close"><Close /></div>
    {/if}
  </div>
  <select
    name=""
    id=""
    bind:value={priceOrder}
    on:change={() => search({ priceOrder })}
  >
    <option value="">Sort by</option>
    <option value="asc"> Price (Low to High) </option>
    <option value="desc"> Price (High to Low) </option>
  </select>
</div>

<style>
  .wrapper {
    padding: 40px 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .search {
    position: relative;
  }

  input {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin: 0 10px;
  }

  .close {
    display: flex;
    cursor: pointer;
    position: absolute;
    right: 18px;
    top: 50%;
    transform: translateY(-50%);
  }
</style>
