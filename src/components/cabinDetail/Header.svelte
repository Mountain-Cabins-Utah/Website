<script lang="ts">
  import type { Picture } from "../../api/cabins/getCabin";
  import Location from "../svgs/Location.svelte";
  import Gallery from "./Gallery.svelte";

  export let name: string;
  export let city: string;
  export let state: string;
  export let fullGallery: Picture[];
</script>

<section class="header wrapper">
  <h1>{name}</h1>
  <div class="location">
    <div class="icon">
      <Location />
    </div>
    <p>{`${city}, ${state}`}</p>
  </div>
  <Gallery {fullGallery} />
</section>

<style>
  .header {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
    margin-bottom: 48px;
  }

  .header h1 {
    color: var(--primary-800);
    font-size: 48px;
    text-align: center;
  }

  .header .location {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 8px;
  }

  .location .icon {
    width: 1.5rem;
    height: 1.5rem;
    color: var(--text-50);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.25rem;
  }

  @media only screen and (max-width: 425px) {
    .header h1 {
      font-size: 2em;
    }
  }
</style>
