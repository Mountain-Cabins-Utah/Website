<script>
  import { slide, fade } from "svelte/transition";
  export let baseDailyRate;

  let shown = false;
  function show() {
    shown = !shown;

    console.log(shown);
  }
</script>

<div class="form-responsive">
  <div class="inputs">
    <div class="price-dates">
      <div class="price">
        <b
          ><span class="number">${baseDailyRate}</span>
          <span class="week">/ Weeknight</span>
        </b>
      </div>
      <div class="dates">
        <input type="date" name="" id="check-in" />
        <input type="date" name="" id="check-out" />
      </div>
    </div>

    {#if shown}
      <div in:slide out:slide class="form">
        <input type="number" id="guest" placeholder="Guests" />
        <input type="email" name="" id="email" placeholder="Email" required />
        <input type="text" name="" id="name" placeholder="Name" required />
        <input type="text" placeholder="Phone" id="phone" />
        <button class="book">Book now</button>
      </div>
    {/if}
  </div>
  <button class="show" on:click={show}>^</button>
</div>

<style>
  .form-responsive {
    display: none;
    padding: 16px 32px;
    gap: 24px;
    background: var(--primary-50);
    /* background: var(--secondary-200); */
    box-shadow: var(--shadow);
    border: 0.5px solid #696973;
    border-radius: 4px 4px 0px 0px;
  }

  button {
    width: 100%;
    padding: 8px 32px;
    color: var(--light);
    background: var(--primary-800);
    border-radius: 5px;
  }

  .form-responsive .show {
    position: absolute;
    padding: 0px;
    width: 25px;
    height: 25px;
    border-radius: 100px;

    right: 10px;
  }

  button:hover {
    background: var(--primary-900);
  }

  .dates {
    display: flex;
    flex-direction: row;
    align-items: center;
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
  .form .book {
    width: 100%;
  }

  /* RESPONSIVE */
  @media only screen and (max-width: 820px) {
    .form-responsive {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;

      justify-content: space-between;
      position: sticky;
      bottom: 0px;
      width: 100%;
    }

    .price-dates input[type="date"] {
      min-width: 160px;
    }
    .price-dates {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .form {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    button {
      width: fit-content;
      height: fit-content;
      padding: 8px 32px;

      align-self: flex-start;
    }
  }

  @media only screen and (max-width: 600px) {
    .price-dates input[type="date"] {
      min-width: 80px;
    }
  }

  @media only screen and (max-width: 435px) {
    .price-dates input[type="date"] {
      min-width: 40px;
    }
  }
</style>
