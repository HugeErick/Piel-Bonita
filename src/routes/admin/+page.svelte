<script lang="ts">
  // admin/+page.svelte (adminpage)
  import { onMount } from "svelte";
  import { LayoutPanelLeft, List, Trash2 } from "@lucide/svelte";
  import * as Drawer from "$lib/components/ui/drawer/index.js";
  import { Button } from "$lib/components/ui/button/index.js";
  import { Label } from "$lib/components/ui/label/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
  import WaveIcon from "$lib/components/WaveIcon.svelte";
  import {
    catalogue,
    initCatalogue,
    saveBoxImage,
    deleteBoxImage,
    saveLayout,
  } from "$lib/stores/catalogue";

  const BOX_COUNT = 5;

  let drawerOpen = $state<boolean[]>(Array(BOX_COUNT).fill(false));

  onMount(() => {
    initCatalogue();
  });

  async function handleFile(index: number, e: Event) {
    const input = e.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return
    await saveBoxImage(index, file);
    drawerOpen[index] = false;
  }

  async function handleDelete(index: number, e?: MouseEvent) {
    // stop the click from bubbling up to the Drawer.Trigger
    e?.stopPropagation();
    await deleteBoxImage(index);
    drawerOpen[index] = false;
  }

  async function setLayout(value: "grid" | "list") {
    await saveLayout(value);
  }


  const layoutBtnClasses = {
    gridBtn: "bg-zinc-600",
    gridBtnInactive: "bg-zinc-700",
    listBtn: "bg-zinc-600",
    listBtnInactive: "bg-zinc-700",
  }
</script>

<main class="w-full mt-12">
  <div class="mb-4 mx-auto flex flex-col gap-4 items-center justify-center px-4">
    <h1 class="m-1 sm:text-5xl text-4xl font-extrabold">
      Piel Bonita
    </h1>
    <div class="flex gap-2 p-1 rounded-lg border border-(--mBlack)">
      <Button
        variant="ghost"
        class="px-4 py-2  {$catalogue.layout === "grid" ? layoutBtnClasses.gridBtn : layoutBtnClasses.gridBtnInactive}"
        onclick={() => setLayout("grid")}
        aria-label="Grid view"
      >
        <WaveIcon active={$catalogue.layout === "grid"}>
          <LayoutPanelLeft />        
        </WaveIcon>
      </Button>

      <Button
        variant="ghost"
        class="px-4 py-2 {$catalogue.layout === "list" ? layoutBtnClasses.listBtn : layoutBtnClasses.listBtnInactive}"
        onclick={() => setLayout("list") }
        aria-label="List view"
      >
        <WaveIcon active={$catalogue.layout === "list"}>
          <List />        
        </WaveIcon>
      </Button>

      <!-- <Button onclick={debugg}> -->
      <!--   Debugg -->
      <!-- </Button> -->
    </div>
  </div>

  <div class="max-w-5xl my-4 p-4 min-h-fit mx-auto bg-(--darkGray) border-2 rounded-md border-zinc-600">
    <section class="grid gap-6 sm:gap-10 {$catalogue.layout === "grid" ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1"} grid-rows-4 ">
      {#each Array(BOX_COUNT) as _, i}
        {@const boxKey = `box${i + 1}`}

        <Drawer.Root bind:open={drawerOpen[i]}> 
          <div class="relative {i === 0 ? 'row-start-1 row-end-5' : ''}">

            <Drawer.Trigger
              class="catalogue-box cursor-pointer w-full h-full overflow-hidden"
            > 
              {#if $catalogue.previews[i]}
                <img
                  src={$catalogue.previews[i]}
                  alt="Catalogue box {i + 1}"
                  class="w-full h-full object-cover"
                />
              {:else}
                Catalogue box #{i + 1}
              {/if}
            </Drawer.Trigger>

            {#if $catalogue.previews[i]}
              <Button
                variant="destructive"
                size="icon"
                class="absolute top-2 right-2 z-10 opacity-80 hover:opacity-100"
                onclick={(e) => handleDelete(i, e)}
                aria-label="Remove image from box {i + 1}"
              >
                <Trash2 class="size-4" />
              </Button>
            {/if}
          </div>

          <Drawer.Content class="max-h-[50vh] my-2">
            <div class="mx-auto w-full max-w-sm">
              <Drawer.Header>
                <Drawer.Title class="text-2xl mb-4 font-semibold">
                  {$catalogue.previews[i] ? "Replace image" : "Submit file"}
                </Drawer.Title>
                <div class="flex items-center justify-between gap-2">

                  <Drawer.Description>
                    {$catalogue.previews[i]
                      ? `Replace the image for box #${i + 1}`
                      : `Submit file to box #${i + 1}`}
                  </Drawer.Description>

                  {#if $catalogue.previews[i]}
                    <Button
                      variant="destructive"
                      size="sm"
                      class="shrink-0 gap-1"
                      onclick={() => handleDelete(i)}
                    >
                      <Trash2 class="size-4" />
                      Remove
                    </Button>
                  {/if}
                </div>

                <div class="p-4 pb-0 space-y-2">
                  <Label
                    class="text-muted-foreground"
                    for={boxKey}
                  >
                    Picture
                  </Label>
                  <Input
                    id={boxKey}
                    type="file"
                    accept="image/*"
                    onchange={(e) => handleFile(i, e)}
                  />
                </div>
              </Drawer.Header>
            </div>
          </Drawer.Content>
        </Drawer.Root>
      {/each}
    </section>
  </div> 
</main>


