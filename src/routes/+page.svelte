<script lang="ts">
  // +page.svelte (Homepage)
  import { onMount } from "svelte";
  import { catalogue, initCatalogue } from "$lib/stores/catalogue";

  const BOX_COUNT = 5;

  onMount(() => {
    initCatalogue();
  });
</script>

<main class="w-full mt-12">
  <div class="mb-4 mx-auto flex flex-col gap-4 items-center justify-center px-4">
    <h1 class="m-1 sm:text-5xl text-4xl font-extrabold">
      Piel Bonita
    </h1>
  </div>

  <div class="max-w-5xl my-4 p-4 min-h-fit mx-auto bg-(--darkGray) border-2 rounded-md border-zinc-600">
    <section
      class="grid gap-6 sm:gap-10 grid-rows-4
      {$catalogue.layout === 'grid'
        ? 'grid-cols-1 sm:grid-cols-2'
        : 'grid-cols-1'}"
    >
      {#each Array(BOX_COUNT) as _, i}
        <div class="relative catalogue-box overflow-hidden {i === 0 ? 'row-start-1 row-end-5' : ''}">
          {#if $catalogue.previews[i]}
            <img
              src={$catalogue.previews[i]}
              alt="Catalogue box {i + 1}"
              class="w-full h-full object-cover"
            />
          {:else}
            <div class="w-full h-full flex items-center justify-center text-muted-foreground text-sm select-none">
              Catalogue box #{i + 1}
            </div>
          {/if}
        </div>
      {/each}
    </section>
  </div>

</main>


