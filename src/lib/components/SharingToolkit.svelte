<script lang="ts">
  // SharingToolkit
  import { Mail } from "@lucide/svelte";
  import { Button } from "$lib/components/ui/button/index.js";
	import { goto } from "$app/navigation";
</script>

<div class="w-full h-full flex justify-center align-middle ">
  <!-- append templatical func here -->
  <Button
    variant="ghost"
    class="bg-(--glacierBlue)"
    onclick={() => goto("/email-builder")}
  >
    <Mail class="size-6" />
  </Button>
</div>
