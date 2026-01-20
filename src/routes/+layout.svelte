<script lang="ts">
	import '../app.css';
	import { ModeWatcher } from 'mode-watcher';

	let { children } = $props();
</script>

<svelte:head>
	<!-- <link rel="icon" href={favicon} /> -->
</svelte:head>

<ModeWatcher />

<div
	class="
	bg-(--customWhite) dark:bg-(--darkGray) rubikal
	flex flex-col items-center justify-center antialiased
	"
>
	{@render children?.()}
</div>

