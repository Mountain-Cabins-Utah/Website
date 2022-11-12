<script>
  import { slide, fade } from "svelte/transition";
  export let baseDailyRate;

  let show = false;
  function toggleForm() {
    show = !show;
  }
</script>

<div class="form-responsive">
  <div class="price-dates">
    <div class="price">
      <span class="number">${baseDailyRate}</span>
      <span class="week">/ Weeknight</span>
    </div>
  </div>
  {#if !show}
    <button on:click={toggleForm}>Book now</button>
  {:else}
    <div class="close" on:click={toggleForm}>X</div>
  {/if}

  {#if show}
    <div in:slide out:slide class="form">
      <div class="dates">
        <input type="date" name="" id="check-in" />
        <input type="date" name="" id="check-out" />
      </div>
      <input type="number" id="guest" placeholder="Guests" />
      <input type="email" name="" id="email" placeholder="Email" required />
      <input type="text" name="" id="name" placeholder="Name" required />
      <input type="text" placeholder="Phone" id="phone" />
      <button on:click={toggleForm} class:hide={!toggleForm}>Book now</button>
    </div>
  {/if}
</div>

<style>
  .form-responsive {
    display: grid;
    grid-template-columns: 1fr auto;
    justify-content: space-around;
    align-items: center;
    padding: 16px 32px;
    gap: 24px;
    background: var(--primary-50);
    box-shadow: var(--shadow);
    border: 0.5px solid #696973;
    border-radius: 4px 4px 0px 0px;
    position: sticky;
    bottom: 0px;
    width: 100%;
  }

  .price-dates {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .hide {
    display: none;
  }

  .price {
    font-weight: bold;
    font-size: 1.2rem;
  }

  button {
    width: 100%;
    padding: 8px 32px;
    color: var(--light);
    background: var(--primary-800);
    border-radius: 5px;
    align-self: flex-start;
  }

  button:hover {
    background: var(--primary-900);
  }

  .close {
    font-size: 1.125rem;
    font-weight: bold;
  }

  .dates {
    display: grid;
    align-items: center;
    grid-template-columns: 1fr 1fr;
    gap: 2em;
    width: 100%;
  }

  .dates #check-in {
    border-right: 0.5px;
    border-radius: 4px 0px 0px 0px;
  }

  .dates #check-out {
    border-radius: 0px 4px 0px 0px;
  }

  .form input {
    width: 100%;
  }

  .form {
    display: flex;
    flex-direction: column;
    align-items: center;
    grid-column: 1/3;
  }

  input,
  .dates {
    margin-bottom: 1em;
  }

  input[type="date"] {
    margin-bottom: 0;
  }

  @media only screen and (min-width: 769px) {
    .form-responsive {
      display: none;
    }
  }

  @media only screen and (max-width: 320px) {
    .form-responsive {
      gap: 1em;
    }

    .price {
      font-size: 0.75rem;
    }
  }
</style>
