<script lang="ts">
// +page.svelte
  import { LayoutPanelLeft } from "@lucide/svelte"
  import { List } from "@lucide/svelte";
  import { Button } from "$lib/components/ui/button/index.js";

  let layout = "grid";

  function debugg(): void {
    console.log(layout)
  }
</script>

<main class="w-screen mt-12">
  <div class="mb-4 mx-auto flex flex-col gap-4 items-center justify-center">
    <h1 class="m-1 text-4xl font-extrabold">
      Piel Bonita
    </h1>
    <div class="flex gap-2 p-1 rounded-lg border border-zinc-700">
      <Button class="px-4 py-2 {layout === 'grid' ? 'bg-zinc-500' : 'bg-zinc-600'} text-white"
        size="icon"
        onclick={() => layout = "grid" }
        aria-label="Grid view"
      >
        <LayoutPanelLeft/>        
      </Button>

      <Button class="px-4 py-2 {layout === 'list' ? 'bg-zinc-500' : 'bg-zinc-600'} text-white"
        size="icon"
        onclick={() => layout = "list" }
        aria-label="List view"
      >
        <List/>        
      </Button>

      <Button onclick={debugg}>
        Debugg
      </Button>
    </div>
  </div>

  <div class="w-5xl my-4 p-4 min-h-fit mx-auto bg-(--darkGray) border-2 rounded-md border-zinc-600">
    <section class="grid gap-10 {layout === 'grid' ? 'grid-cols-2' : 'grid-cols-1'} grid-rows-4 ">
      <div class="catalogue-box row-start-1 row-end-5">
        Catalogue box #1
      </div>

      <div class="catalogue-box">
        Catalogue box #2
      </div>

      <div class="catalogue-box">
        Catalogue box #3
      </div>

      <div class="catalogue-box">
        Catalogue box #4
      </div>

      <div class="catalogue-box">
        Catalogue box #5
      </div>
    </section>
  </div> 

</main>


