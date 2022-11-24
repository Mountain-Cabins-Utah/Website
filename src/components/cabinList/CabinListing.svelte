<script lang="ts">
  import { fade, slide } from "svelte/transition";

  import { searchResult } from "../../stores/cabins";

  function truncate(input: string, length: number) {
    if (input.length > length) {
      return input.substring(0, length) + "...";
    }
    return input;
  }

  $: cabins = $searchResult;
</script>

<div class="cabins wrapper">
  {#each cabins as { name, maximumGuests: guestsMax, baseGuests: guestsMin, bedrooms, bathrooms, picture, description, uid } (uid)}
    <div class="cabin" in:slide out:fade>
      <a href={`/cabins/${name}`}
        ><img src={picture} alt={`picture of ${name}`} /></a
      >
      <div class="info">
        <h3><a href={`/cabins/${name}`}>{name}</a></h3>
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
        <a href={`/cabins/${name}`} class="btn"> See Property </a>
      </div>
    </div>
  {/each}
</div>

<style>
  .cabins {
    display: grid;
    padding-top: 64px;
    padding-bottom: 64px;
    gap: 64px;
  }

  .cabin {
    display: grid;
    grid-template-columns: minmax(350px, 1fr) 2fr;
    flex-direction: row;
    gap: 2em;
  }

  .cabin img {
    aspect-ratio: 4/3;
    border: 12px solid #f4f9f4;
    filter: drop-shadow(1px 1px 2px rgba(0, 0, 0, 0.2));
  }

  .cabin .info {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }

  .cabin .detail {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
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

  .cabin .btn {
    border: 2px solid var(--primary-900);
    background-color: rgba(255, 255, 255, 0);
    color: var(--primary-900);
  }

  .cabin .btn:hover {
    background-color: rgba(39, 64, 40, 0.15);
  }

  @media only screen and (max-width: 1023px) {
    .cabins {
      grid-template-columns: 1fr 1fr;
      gap: 32px;
    }

    .cabin {
      grid-template-columns: 1fr;
    }
  }

  @media only screen and (max-width: 767px) {
    .cabins {
      grid-template-columns: 1fr;
      gap: 4em;
    }
  }
</style>
