<script lang="ts">
	import '../app.css';
	import { ModeWatcher, toggleMode } from 'mode-watcher';
  import favicon from "$lib/assets/unwantedfavicon.svg";

	let { children } = $props();
</script>

<svelte:head>
  <title>Piel Bonita</title>
	<link rel="icon" href={favicon} />
</svelte:head>

<ModeWatcher defaultMode={"dark"} />

<div
	class="
	bg-(--customWhite) dark:bg-(--darkGray) rubikal
	flex flex-col items-center justify-center antialiased
	"
>
	{@render children?.()}
</div>

