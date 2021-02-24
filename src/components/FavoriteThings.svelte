<script>
	import { onDestroy } from 'svelte'
	import { fly } from 'svelte/transition'

	export let list = []
	export let speed = 1000

	let currentList = 0

	function updateFavoriteThings() {
		return currentList !== list.length - 1
		? currentList++
		: currentList = 0
	}

	const cycleFavorites = setInterval(updateFavoriteThings, speed)
	onDestroy(() => clearInterval(cycleFavorites))
</script>

<dl class="margin-top-xnarrow | list-undecorated">
	<dt class="t-font-accent t-heading t-scale-gamma c-fg-tertiary">
		I like
	</dt>
	{#each list[currentList] as word, index}
		<dd 
			class="t-font-accent t-heading t-scale-gamma c-fg-tertiary"
			in:fly={{ y: 30, duration: 250, delay: (100 * index)}}
			out:fly={{ y: -30, duration: 250, delay: (100 * index)}}
		>
			{word}
		</dd>
	{/each}
</dl>

<style>
	dl {
		font-size: 0;
		position: relative;
	}

	dt,
	dd {
		margin-left: 0;
		display: inline-block;
		position: relative;
	}

	dt + dd,
	dd + dd {
		margin-left: 0.2em;
	}

	dd::after {
		content: ', ';
	}

	dd:last-child::after {
		content: '.';
	}

	dd:last-child::before {
		content: ' and ';
	}
</style>