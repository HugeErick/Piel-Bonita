<script lang="ts">
// +page.svelte
  import { LayoutPanelLeft } from "@lucide/svelte"
  import { List } from "@lucide/svelte";
  import { Button } from "$lib/components/ui/button/index.js";
  import WaveIcon from "$lib/components/WaveIcon.svelte";

  let layout = "grid";

  function debugg(): void {
    console.log(layout)
  }
</script>

<main class="w-full mt-12">
  <div class="mb-4 mx-auto flex flex-col gap-4 items-center justify-center px-4">
    <h1 class="m-1 sm:text-5xl text-4xl font-extrabold">
      Piel Bonita
    </h1>
    <div class="flex gap-2 p-1 rounded-lg border border-(--mBlack)">
      <Button class="px-4 py-2 {layout === "grid" ? "bg-zinc-500 " : "bg-zinc-600"}"
        onclick={() => layout = "grid" }
        aria-label="Grid view"
      >
        <WaveIcon active={layout === "grid"}>
          <LayoutPanelLeft />        
        </WaveIcon>
      </Button>

      <Button class="px-4 py-2 {layout === "list" ? "bg-zinc-500 " : "bg-zinc-600"}"
        onclick={() => layout = "list" }
        aria-label="List view"
      >
        <WaveIcon active={layout === "list"}>
          <List />        
        </WaveIcon>
      </Button>

      <Button onclick={debugg}>
        Debugg
      </Button>
    </div>
  </div>

  <div class="max-w-5xl my-4 p-4 min-h-fit mx-auto bg-(--darkGray) border-2 rounded-md border-zinc-600">
    <section class="grid gap-6 sm:gap-10 {layout === "grid" ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1"} grid-rows-4 ">
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


