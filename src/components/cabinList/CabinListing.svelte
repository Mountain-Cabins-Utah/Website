<script lang="ts">
  import { fade, slide } from "svelte/transition";
  import Mountain from "../svgs/Mountain.svelte";

  import { searchResult } from "../../stores/cabins";

  function truncate(input: string, length: number) {
    if (input.length > length) {
      return input.substring(0, length) + "...";
    }
    return input;
  }

  $: cabins = $searchResult;
</script>

<div class="cabins">
  {#each cabins as { name, maximumGuests: guestsMax, baseGuests: guestsMin, bedrooms, bathrooms, picture, description, uid } (uid)}
    <div class="cabin wrapper" in:slide out:fade>
      <img src={picture} alt={`picture of ${name}`} />
      <div class="info">
        <h3>{name}</h3>
        <div class="detail">
          <div class="basic">
            <p class="size">
              <b>Size -</b>
              {bedrooms}
              {bedrooms > 1 ? "bedrooms" : "bedroom"} • {bathrooms}
              {+bathrooms > 1 ? "bathrooms" : "bathroom"} • Sleeps
              {guestsMin != guestsMax ? guestsMin + "-" + guestsMax : guestsMax}
            </p>
            <p class="amenities">
              <b>Amenities</b> Parking • Jacuzzi • Private Entrance • Amazing Views
            </p>
          </div>
          <p>{truncate(description, 200)}</p>
        </div>
        <a href={`/cabins/${name}`} class="btn"> Detail </a>
      </div>
    </div>
  {/each}
</div>

<style>
  .cabins {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 64px 0px;
    gap: 40px;
  }

  .cabin {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 8px;
  }

  .cabin .detail {
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    gap: 8px;
  }

  .cabin img {
    box-sizing: border-box;
    min-width: 400px;
    max-width: 400px;
    aspect-ratio: 4/3;

    border: 12px solid #f4f9f4;
    /* Shadow */

    filter: drop-shadow(1px 1px 2px rgba(0, 0, 0, 0.2));
  }

  .cabin .info {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 24px;
    gap: 16px;
  }

  .info h3 {
    text-align: left;
  }

  .basic .size {
    font-family: var(--font-heading);
    font-size: 14px;
  }

  .basic .amenities {
    font-size: 12px;
  }

  .cabin a {
    border: 2px solid var(--primary-900);
    background-color: rgba(255, 255, 255, 0);
    color: var(--primary-900);
  }

  .cabin a:hover {
    background-color: rgba(39, 64, 40, 0.15);
  }

  /* RESPONSIVE */
  @media only screen and (max-width: 1024px) {
    .cabin img {
      box-sizing: border-box;
      min-width: 300px;
      max-width: 300px;
      aspect-ratio: 1/1;

      border: 8px solid #f4f9f4;
    }
  }

  @media only screen and (max-width: 845px) {
    .cabins {
      padding: 64px 24px;
    }

    .cabin {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 4px;

      border: 0.5px solid var(--secondary-400);
    }

    .cabin img {
      box-sizing: border-box;
      min-width: 400px;
      max-width: 400px;
      aspect-ratio: 2/1;

      border: 12px solid #f4f9f4;
      margin-top: 24px;
    }

    .cabin .info {
      max-width: 600px;
    }

    .info h3 {
      text-align: center;
    }

    .cabin a {
      align-self: center;
    }
  }

  @media only screen and (max-width: 480px) {
    .cabin img {
      box-sizing: border-box;
      min-width: 250px;
      max-width: 250px;
    }
  }
</style>
