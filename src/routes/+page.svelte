<script lang="ts">
  // +page.svelte (Homepage)
	import ClientView from "./ClientView.svelte";

  let { data } = $props();

</script>

<ClientView {data} />

