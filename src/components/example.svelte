<script>
  import { onMount } from "svelte";

  import "photoswipe/style.css";

  let galleryID = 10;
  let images = [
    {
      uid: "ae712a73-af19-41fa-aae9-9270017ed9b5",
      description:
        "The Carriage House.  A beautiful place to come to.  A covered place to park your car and a beautiful circular stairway lthat eads up to the entrance to your home away from home!  Welcome.  \n ",
      url: "https://orbirental-images.s3.amazonaws.com/ae712a73-af19-41fa-aae9-9270017ed9b5",
      displayOrder: 0,
      airbnbRoomId: null,
    },
    {
      uid: "76bee241-15a3-4e92-ad68-a404485c0226",
      description:
        "Queen size adjustable bed with access to outside covered large deck.  ",
      url: "https://orbirental-images.s3.amazonaws.com/76bee241-15a3-4e92-ad68-a404485c0226",
      displayOrder: 1,
      airbnbRoomId: null,
    },
    {
      uid: "1e8ac7b6-c837-49b4-a219-eeda2e92b5b7",
      description: "Common area, bedroom and bathroom plus butler's kitchen. ",
      url: "https://orbirental-images.s3.amazonaws.com/1e8ac7b6-c837-49b4-a219-eeda2e92b5b7",
      displayOrder: 2,
      airbnbRoomId: null,
    },
    {
      uid: "44a49c18-0197-40ad-ba97-c96e1bb703b6",
      description:
        "Hidden office in the armoire, mini fridge, Keurig coffee maker, microwave and toaster oven.  Or how about an electric hot water kettle for tea!",
      url: "https://orbirental-images.s3.amazonaws.com/44a49c18-0197-40ad-ba97-c96e1bb703b6",
      displayOrder: 3,
      airbnbRoomId: null,
    },
    {
      uid: "5ccda7ef-bbd7-4056-92b9-f6c45cdd88a7",
      description: "Cozy and well equipped to meet your needs.  ",
      url: "https://orbirental-images.s3.amazonaws.com/5ccda7ef-bbd7-4056-92b9-f6c45cdd88a7",
      displayOrder: 4,
      airbnbRoomId: null,
    },
  ];

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

<div class="pswp-gallery" id={galleryID} bind:this={galleryId}>
  {#each images as image}
    <a
      href={image.url}
      data-pswp-width={900}
      data-pswp-height={900}
      target="_blank"
      rel="noreferrer"
    >
      <img src={image.url} alt="" />
    </a>
  {/each}
</div>
