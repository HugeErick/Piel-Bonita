<script lang="ts">
  // WorkingOnGUI.svelte component
  // a to-do GUI for final user to see
  import { TrafficCone } from "@lucide/svelte";

  export let feature: string;
</script>


<div class="w-full h-full flex flex-col items-center justify-center align-middle gap-4">
  <TrafficCone class="sm:size-22 size-10 opacity-90 text-zinc-500" />
  <span class="text-2xl font-semibold text-center">
    Working on the following feature:
  </span>
  <span class="text-lg bg-(--customGold)/50 p-1 rounded-md">
    {feature}
  </span>
</div>

