<script lang="ts">
  import { searchResult } from "../stores/cabins";
  import cabins from "../data/cabins.json";
  import { onMount } from "svelte";
  import Close from "../components/svgs/Close.svelte";
  import type { Cabin } from "../api/cabins/getCabin";
  import Mountain from "../components/svgs/Mountain.svelte";

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

<div class="separator">
  <div class="line" />
  <Mountain />
  <div class="line" />
</div>
<h2>All Cabins</h2>
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
  .separator {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 24px;

    padding: 0px;
    margin: 48px 0px;
  }

  .separator .line {
    border-bottom: 2px solid rgb(0 0 0 / 50%);
    height: 2px;
    width: 100%;
  }

  .wrapper {
    padding: 40px 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .search {
    position: relative;
  }

  input,
  select {
    padding: 10px;
    border: 1px solid var(--light);
    background-color: var(--light);
    border-radius: 5px;
    margin: 0 10px;

    min-width: 300px;
  }

  .close {
    display: flex;
    cursor: pointer;
    position: absolute;
    right: 18px;
    top: 50%;
    transform: translateY(-50%);
  }

  /* RESPONSIVE */
  @media only screen and (max-width: 768px) {
    input,
    select {
      min-width: 200px;
    }
  }

  @media only screen and (max-width: 480px) {
    .wrapper {
      flex-direction: column;
      gap: 8px;
    }

    input,
    select {
      min-width: 300px;
    }
  }
</style>
