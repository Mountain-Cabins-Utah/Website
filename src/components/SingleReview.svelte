<script lang="ts">
  import { onMount } from "svelte";
  import reviews from "../data/reviews.json";

  // const randomReview = reviews[Math.floor(Math.random() * reviews.length)];
  // randomize the array
  // remove repeat author
  const filteredReviews = reviews.filter(
    (review, index, self) =>
      index ===
      self.findIndex(
        (t) => t.author === review.author && review.content.length < 270
      )
  );
  const randomizedReviews = filteredReviews.sort(() => Math.random() - 0.5);

  let author = "";
  let content = "";

  onMount(() => {
    author = randomizedReviews[0].author;
    content = randomizedReviews[0].content;
  });
</script>

{#if author && content}
  <blockquote>
    <cite>{content}</cite>
    <p>{author}</p>
  </blockquote>
{/if}

<style>
  cite {
    display: block;
    margin-bottom: 1rem;
  }

  p {
    text-transform: capitalize;
    text-align: end;
  }
</style>
