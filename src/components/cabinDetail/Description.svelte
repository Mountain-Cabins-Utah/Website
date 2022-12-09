<script lang="ts">
  import type { Cabin } from "../../types/cabin";

  export let cabin: Cabin;

  const { description } = cabin;

  let showAllText = false;
  const maxLength = 700;

  const summary = description.summary;
  const excerpt = summary.substring(0, maxLength);

  if (summary.length < maxLength) showAllText = true;
</script>

<div class="description">
  <h2>Cabin Description</h2>
  {#if showAllText}
    <p>{description.summary}</p>
    {#if summary.length > maxLength}
      <button on:click={() => (showAllText = false)}>Show less</button>
    {/if}
  {:else}
    <p>
      {excerpt}...
    </p>
    <button on:click={() => (showAllText = true)}>Show more</button>
  {/if}
</div>

<style>
  .description {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0px;
    gap: 16px;
  }

  .description h2 {
    color: var(--primary-800);
  }

  p {
    text-align: justify;
  }

  button {
    background-color: transparent;
    color: var(--primary-800);
    border: none;
    padding: 0;
  }
</style>
