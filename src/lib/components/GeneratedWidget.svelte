<script lang="ts">
  import { catalogue } from "$lib/stores/catalogue";
  import PielBonitaTitle from "$lib/components/PielBonitaTitle.svelte";

  const BOX_COUNT = 5;
</script>

<div class="widget-preview max-w-5xl mx-auto my-6 p-4 bg-(--darkGray) border-2 rounded-md border-(--customGold)">
  <div class="mb-4 flex flex-col items-center justify-center gap-2">
    <PielBonitaTitle />
    <span class="text-xs uppercase tracking-wide text-muted-foreground">
      Widget preview
    </span>
  </div>

  <section
    class="grid gap-4 sm:gap-6 grid-rows-4
      {$catalogue.layout === 'grid' ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1'}"
  >
    {#each Array(BOX_COUNT) as _, i}
      <div class="relative catalogue-box overflow-hidden {i === 0 ? 'row-start-1 row-end-5' : ''}">
        {#if $catalogue.previews[i]}
          <img
            src={$catalogue.previews[i]}
            alt="Widget box {i + 1}"
            class="w-full h-full object-contain"
          />
        {:else}
          <div class="w-full h-full flex items-center justify-center text-muted-foreground text-sm select-none">
            Box #{i + 1}
          </div>
        {/if}
      </div>
    {/each}
  </section>
</div>
