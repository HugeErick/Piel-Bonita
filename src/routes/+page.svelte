<script lang="ts">
  // +page.svelte (Homepage)
  import { onMount } from "svelte";
  import { enhance } from "$app/forms";
  import { catalogue, initCatalogue } from "$lib/stores/catalogue";
  import { Button, buttonVariants } from "$lib/components/ui/button/index.js";
  import * as Dialog from "$lib/components/ui/dialog/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
  import { Label } from "$lib/components/ui/label/index.js";
	import PielBonitaTitle from "$lib/components/PielBonitaTitle.svelte";
	import WorkingOnGUI from "$lib/components/WorkingOnGUI.svelte";
  import GeneratedWidget from "$lib/components/GeneratedWidget.svelte";

  let { data } = $props();
  const BOX_COUNT = 5;
  let dialogOpen = $state(false);
  let showWidget = $state(false);

  onMount(() => {
    initCatalogue();
  });
</script>

<main class="w-full mt-12">
  <div class="flex items-stretch align-middle justify-end">
    {#if data.user}
      <div class="flex justify-center">
        <Button variant="secondary" onclick={() => (showWidget = !showWidget)}>
          {showWidget ? "Hide Widget" : "Generate Widget"}
        </Button>
      </div>
      <form method="POST" action="?/logout" use:enhance>
        <Button variant="secondary" type="submit" class="p-4 mx-6">
          Log out ({data.user.email})
        </Button>
      </form>
    {:else}
      <div class="flex justify-center">
        <Button variant="secondary" onclick={() => (showWidget = !showWidget)}>
          {showWidget ? "Hide Widget" : "Generate Widget"}
        </Button>
      </div>
      <Dialog.Root bind:open={dialogOpen}>
        <Dialog.Trigger class={buttonVariants({ variant: "secondary" }) + " p-4 mx-6"}>
          Log in
        </Dialog.Trigger>
        <Dialog.Content class="sm:max-w-120 p-4">
          <form
            method="POST"
            action="?/login"
            use:enhance={() => {
              return async ({ result, update }) => {
                await update();
                if (result.type === "success") dialogOpen = false;
              };
            }}
          >
            <Dialog.Header class="m-1">
              <Dialog.Title class="text-lg font-semibold">Log in</Dialog.Title>
              <Dialog.Description>
                Enter your email to continue.
              </Dialog.Description>
            </Dialog.Header>
            <div class="grid gap-4 py-4 mb-1">
              <div class="grid gap-3 m-1">
                <Label for="email-1" class="tex-lg font-semibold">Email</Label>
                <Input id="email-1" name="email" type="email" required placeholder="you@example.com" />
              </div>
            </div>
            <Dialog.Footer>
              <Dialog.Close type="button" class={buttonVariants({ variant: "outline" })}>
                Cancel
              </Dialog.Close>
              <Button type="submit">Continue</Button>
            </Dialog.Footer>
          </form>
        </Dialog.Content>
      </Dialog.Root>
    {/if}
  </div>
  <div class="mb-4 mx-auto flex flex-col gap-4 items-center justify-center px-4">
    <PielBonitaTitle />
  </div>

  <div class="max-w-5xl my-4 p-4 min-h-fit mx-auto bg-(--darkGray) border-2 rounded-md border-zinc-600">
    <section
      class="grid gap-6 sm:gap-10 grid-rows-4
      {$catalogue.layout === 'grid'
        ? 'grid-cols-1 sm:grid-cols-2'
        : 'grid-cols-1'}"
    >
      {#each Array(BOX_COUNT) as _, i}
        {#if $catalogue.previews[i]}
          <div class="relative catalogue-box overflow-hidden border-0 sm:border-r-4 border-r-2 border-r-(--customGold) {i === 0 ? 'row-start-1 row-end-5' : ''}">
            <img
              src={$catalogue.previews[i]}
              alt="Catalogue box {i + 1}"
              class="w-full h-full object-contain"
            />
          </div>
        {:else}
          <div class="relative catalogue-box overflow-hidden {i === 0 ? 'row-start-1 row-end-5' : ''}">
            <div class="w-full h-full flex items-center justify-center text-muted-foreground text-sm select-none">
              Catalogue box #{i + 1}
            </div>
          </div>
        {/if}
      {/each}
    </section>
  </div>
  {#if showWidget}
    <GeneratedWidget />
  {/if}
  <div class="m-4">
    <WorkingOnGUI feature="Social icons to send widget" />
  </div>
</main>


