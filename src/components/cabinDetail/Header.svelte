<script>
  import { onMount } from "svelte";
  import "photoswipe/style.css";

  import Location from "../svgs/Location.svelte";
  let cabin;
  export let name;
  export let city;
  export let state;
  export let fullGallery;

  const images = fullGallery;

  let galleryID = 10;
  let galleryId;

  onMount(async () => {
    const PhotoSwipeLightbox = (await import("photoswipe/lightbox")).default;
    let lightbox = new PhotoSwipeLightbox({
      gallery: galleryId,
      children: "a",
      pswpModule: () => import("photoswipe"),
    });
    lightbox.init();
  });
</script>

<section class="header wrapper">
  <h1>{name}</h1>
  <div class="location">
    <div class="icon">
      <Location />
    </div>
    <p>{`${city}, ${state}`}</p>
  </div>
  <div class="gallery pswp-gallery" id={galleryID} bind:this={galleryId}>
    {#each images as image, i}
      {#if i < 6}
        <a
          href={image.url}
          data-pswp-width={900}
          data-pswp-height={900}
          target="_blank"
          rel="noreferrer"
          class="item"
        >
          <img class="image{i + 1}" src={image.url} alt={image.description} />
        </a>
      {:else}
        <a
          href={image.url}
          data-pswp-width={900}
          data-pswp-height={900}
          target="_blank"
          rel="noreferrer"
          class="item hidden-img"
        >
          <img src={image.url} alt={image.description} />
        </a>
      {/if}
    {/each}
  </div>
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

  .header .gallery {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;

    align-self: center;
  }

  .gallery img {
    max-width: 200px;
    aspect-ratio: 1/1;
  }

  .gallery .hidden-img {
    display: none;
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

  /* RESPONSIVE */
  @media only screen and (max-width: 740px) {
    .header .gallery {
      grid-template-columns: repeat(2, 1fr);
      gap: 1rem;
    }
  }
</style>
