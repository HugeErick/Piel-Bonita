<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import { goto } from "$app/navigation";
  import { catalogue } from "$lib/stores/catalogue";
  import { Button } from "$lib/components/ui/button/index.js";
  import { ArrowLeft, Send } from "@lucide/svelte";
  import type { TemplaticalEditor } from "@templatical/editor";

  let containerEl: HTMLElement;
  let editor: TemplaticalEditor | null = null;
  let sending = $state(false);
  let recipientEmail = $state("");
  let sendResult = $state<"idle" | "success" | "error">("idle");

  onMount(async () => {
    const [{ init }, { createDefaultTemplateContent, createTitleBlock, createImageBlock, createDividerBlock }] =
      await Promise.all([
        import("@templatical/editor"),
        import("@templatical/types"),
      ]);
    await import("@templatical/editor/style.css");

    // Seed the template with whatever's currently filled in the widget.
    const filled = $catalogue.previews
      .map((url, i) => ({ url, i }))
      .filter((b): b is { url: string; i: number } => b.url !== null);

    const content = createDefaultTemplateContent();
    content.settings.width = 600;
    content.settings.preheaderText = "Piel Bonita — new arrivals";

    content.blocks = [
      createTitleBlock({
        content: '<h1 style="text-align:center;">Piel Bonita</h1>',
        level: 1,
      }),
      createDividerBlock(),
      ...filled.map(({ url, i }) =>
        createImageBlock({
          src: url,
          alt: `Catalogue box ${i + 1}`,
          width: "full",
        })
      ),
    ];

    editor = await init({
      container: containerEl,
      content,
      branding: false,
    });
  });

  onDestroy(() => editor?.unmount());

  async function handleSend() {
    if (!editor || !recipientEmail) return;
    sending = true;
    sendResult = "idle";
    try {
      const mjml = await editor.toMjml();
      const res = await fetch("?/send", {
        method: "POST",
        body: (() => {
          const fd = new FormData();
          fd.set("mjml", mjml);
          fd.set("to", recipientEmail);
          return fd;
        })(),
      });
      sendResult = res.ok ? "success" : "error";
    } catch {
      sendResult = "error";
    } finally {
      sending = false;
    }
  }
</script>

<div id="email-builder-wrapper" class="flex h-screen w-screen flex-col">
  <div class="flex items-center gap-3 border-b border-inc-700 p-3">
    <Button variant="ghost" size="icon" onclick={() => goto("/")}>
      <ArrowLeft class="size-5" />
    </Button>
    <span class="font-semibold">Email builder</span>

    <div class="ml-auto flex items-center gap-2">
      <input
        type="email"
        placeholder="send to..."
        bind:value={recipientEmail}
        class="rounded-md border border-zinc-600 bg-transparent px-3 py-1.5 text-sm"
      />
      <Button onclick={handleSend} disabled={!recipientEmail || sending}>
        <Send class="mr-2 size-4" />
        {sending ? "Sending…" : "Send"}
      </Button>
    </div>
  </div>

  {#if sendResult === "success"}
    <p class="bg-green-900/40 px-3 py-1 text-sm text-green-300">Email sent.</p>
  {:else if sendResult === "error"}
    <p class="bg-red-900/40 px-3 py-1 text-sm text-red-300">Failed to send — check the server logs.</p>
  {/if}

  <!-- No transform/filter/opacity/z-index on this element or any ancestor above it -->
  <div bind:this={containerEl} class="min-h-0 flex-1"></div>
</div>
