<script lang="ts">
  import { onMount } from "svelte";
  import "photoswipe/style.css";
  import type { Picture } from "../../types/cabin";

  export let fullGallery: Picture[];
  let galleryID = "gallery-ps";

  let galleryId: HTMLDivElement;

  let loadAllImages = false;

  onMount(async () => {
    // @ts-ignore
    const PhotoSwipeLightbox = (await import("photoswipe/lightbox")).default;
    let lightbox = new PhotoSwipeLightbox({
      gallery: galleryId,
      children: "a",
      pswpModule: () => import("photoswipe"),
    });
    lightbox.init();
    lightbox.on("beforeOpen", () => {
      loadAllImages = true;
    });
    lightbox.on("close", () => {
      loadAllImages = false;
    });
  });
</script>

<div class="gallery pswp-gallery" id={galleryID} bind:this={galleryId}>
  {#each fullGallery as image, i}
    {#if i < 6}
      <a
        href={image.url}
        data-pswp-width={900}
        data-pswp-height={900}
        target="_blank"
        rel="noreferrer"
        class="item"
      >
        <img class="thumbnail" src={image.url} alt={image.description} />
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
        {#if loadAllImages}
          <img src={image.url} alt={image.description} />
        {/if}
      </a>
    {/if}
  {/each}
</div>

<style>
  .gallery {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
  }

  .gallery .hidden-img {
    display: none;
  }

  .thumbnail {
    width: 100%;
    height: 100%;
    object-fit: cover;
    aspect-ratio: 16 / 9;
  }

  /* RESPONSIVE */
  @media only screen and (max-width: 768px) {
    .gallery {
      grid-template-columns: repeat(2, 1fr);
    }
  }
</style>
