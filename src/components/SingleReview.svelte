<script>
  import { onMount } from "svelte";
  import reviews from "../data/reviews.json";

  // const randomReview = reviews[Math.floor(Math.random() * reviews.length)];
  // randomize the array
  // remove repeat author
  const filteredReviews = reviews.filter(
    (review, index, self) =>
      index === self.findIndex((t) => t.author === review.author)
  );
  const randomizedReviews = filteredReviews.sort(() => Math.random() - 0.5);

  let author = "";
  let content = "";
  let reviewsIndex = 0;

  // function generateReview() {
  //   const randomReview = reviews[Math.floor(Math.random() * reviews.length)];
  //   author = randomReview.author;
  //   content = randomReview.content;
  // }

  onMount(() => {
    author = randomizedReviews[0].author;
    content = randomizedReviews[0].content;
  });

  function nextReview() {
    reviewsIndex++;
    const review = randomizedReviews[reviewsIndex];
    author = review.author;
    content = review.content;
  }

  function prevReview() {
    reviewsIndex--;
    const review = randomizedReviews[reviewsIndex];
    author = review.author;
    content = review.content;
  }
</script>

{#if author && content}
  <div class="nav">
    <button on:click={prevReview} disabled={reviewsIndex === 0}>Prev</button>
    <button
      on:click={nextReview}
      disabled={reviewsIndex === randomizedReviews.length - 1}>Next</button
    >
  </div>
  <blockquote>
    <p>{author}:</p>
    <cite>{content}</cite>
  </blockquote>
{/if}

<style>
  p {
    margin-bottom: 1rem;
  }

  .nav {
    display: flex;
    justify-content: space-between;
  }

  .nav button {
    font-weight: 700;
    font-size: 10px;
    padding: 4px 16px;
    margin-bottom: 1rem;
  }
</style>
