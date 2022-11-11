<script lang="ts">
  import { searchResult } from "../../stores/cabins";
  import cabins from "../../data/cabins.json";
  import { onMount } from "svelte";
  import Close from "../svgs/Close.svelte";
  import Mountain from "../svgs/Mountain.svelte";

  type priceOrder = "asc" | "desc" | "";
  type location = "north" | "south" | "";

  let term = "";
  let priceOrder: priceOrder = "";
  let location: location = "";

  onMount(() => {
    const urlParams = new URLSearchParams(window.location.search);

    if (urlParams.has("term")) {
      term = urlParams.get("term") || "";
    }

    if (urlParams.has("price")) {
      const price = urlParams.get("price") || "";
      if (price === "asc" || price === "desc") {
        priceOrder = price;
      }
    }

    if (urlParams.has("location")) {
      const locationParam = urlParams.get("location") || "";
      if (locationParam === "north" || locationParam === "south") {
        location = locationParam;
      }
    }

    search();
  });

  let timerId: NodeJS.Timeout;

  function search() {
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      $searchResult = cabins;
      filterByTerm();
      sortByPrice();
      filterByLocation();
    }, 250);
  }

  function filterByTerm() {
    if (term.trim() === "") return;
    $searchResult = $searchResult.filter((cabin) => {
      return cabin.name.toLowerCase().includes(term.toLowerCase());
    });
  }

  function clearTerm() {
    term = "";
    search();
  }

  function sortByPrice() {
    if (priceOrder === "") return;
    if (priceOrder === "asc") {
      $searchResult = $searchResult.sort(
        (a, b) => a.baseDailyRate - b.baseDailyRate
      );
    } else if (priceOrder === "desc") {
      $searchResult = $searchResult.sort(
        (a, b) => b.baseDailyRate - a.baseDailyRate
      );
    }
  }

  function filterByLocation() {
    if (location === "") return;
    if (location === "north") {
      $searchResult = $searchResult.filter(
        (cabin) => cabin.city.toLocaleLowerCase() === "sundance"
      );
    } else if (location === "south") {
      $searchResult = $searchResult.filter(
        (cabin) => cabin.city.toLocaleLowerCase() === "beaver"
      );
    }
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
      on:input={search}
    />
    {#if term}
      <div on:click={clearTerm} class="close"><Close /></div>
    {/if}
  </div>
  <select name="" id="" bind:value={priceOrder} on:change={search}>
    <option value="" selected={true} disabled={true}>Sort by Location</option>
    <option value="asc"> Price (Low to High) </option>
    <option value="desc"> Price (High to Low) </option>
  </select>
  <select name="location" bind:value={location} on:change={search}>
    <option value="" selected={true} disabled={true}>Sort by Location</option>
    <option value="north">Sundance (North)</option>
    <option value="south">Beaver (South)</option>
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
