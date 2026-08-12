<script lang="ts">
  import { catalogue } from "$lib/stores/catalogue";
  import PielBonitaTitle from "$lib/components/PielBonitaTitle.svelte";

  let filled = $derived(
    $catalogue.previews
      .map((url, i) => ({ url, i }))
      .filter((b): b is {url: string; i: number } => b.url !== null)
  );
  let count = $derived(filled.length);
</script>

<div class="widget-preview max-w-5xl mx-auto my-6 p-4 bg-(--darkGray) border-2 rounded-md border-(--customGold)">
  <div class="mb-4 flex flex-col items-center justify-center gap-2">
    <PielBonitaTitle />
    <span class="text-xs uppercase tracking-wide text-muted-foreground">
      Widget preview
    </span>
  </div>

  {#if count === 0}
    <div class="flex items-center justify-center min-h-50 text-muted-foreground text-sm select-none">
      No images yet
    </div>
  {:else if count === 1}
    <div class="catalogue-box overflow-hidden min-h-100 w-full">
      <img
        src={filled[0].url}
        alt="Widget box {filled[0].i + 1}"
        class="w-full h-full object-contain"
      />
    </div>
  {:else if count === 2}
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 min-h-75">
      {#each filled as box (box.i)}
        <div class="catalogue-box overflow-hidden">
          <img
            src={box.url}
            alt="Widget box {box.i + 1}"
            class="w-full h-full object-contain"
          />
        </div>
      {/each}
    </div>
  {:else}
    <!-- 3+ images: fall back to the chosen layout (grid/list) -->
    <section
      class="grid gap-4 sm:gap-6
      {$catalogue.layout === 'grid' ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1'}"
      style={$catalogue.layout === 'grid'
        ? `grid-template-rows: repeat(${count - 1}, minmax(0, 1fr));`
        : ''}
    >
      {#each filled as box, idx (box.i)}
        <div
          class="relative catalogue-box overflow-hidden
          {idx === 0 && $catalogue.layout === 'grid' ? `row-start-1` : ''}"
          style={idx === 0 && $catalogue.layout === 'grid' ? `grid-row-end: ${count};` : ''}
        >
          <img
            src={box.url}
            alt="Widget box {box.i + 1}"
            class="w-full h-full object-contain"
          />
        </div>
      {/each}
    </section>
  {/if}
</div>
