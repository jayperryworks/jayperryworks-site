<script>
	import { onDestroy } from 'svelte'

	export let list = []
	export let speed = 2000

	let currentListIndex = 0
	$ : previousListIndex = currentListIndex > 0 
		? currentListIndex - 1 
		: list.length - 1

	function updateFavoriteThings() {
		if (currentListIndex === list.length - 1) {
			currentListIndex = 0
			return
		}
		currentListIndex++
	}

	const cycleFavorites = setInterval(updateFavoriteThings, speed)
	onDestroy(() => clearInterval(cycleFavorites))
</script>

<style>
	dl {
		font-size: 0;
	}

	dt,
	dd {
		margin-left: 0;
		display: inline-block;
	}

	dt + dd,
	dd + dd {
		margin-left: 0.2em;
	}

	dd {
		position: relative;
		opacity: 0;
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

	.set {
		--delay: 0.25s;
		--duration: 0.25s;
		transition: visibility 0 ease-in-out 2s;
		position: relative;
		overflow: hidden;
		visibility: hidden;
	}

	.set > dd {
		transition: 
			opacity var(--duration) ease-in-out var(--delay, 0), 
			top var(--duration) ease-in-out var(--delay, 0);
		top: 2em;
		opacity: 0;
	}

	.current {
		visibility: visible;
	}

	.current > dd {
		top: 0;
		opacity: 1;
	}

	.previous > dd {
		top: -2em;
	}
</style>

<dl class="margin-top-xnarrow | list-undecorated">
	{#each list as set, index}
		<div 
			class="set" 
			class:current={index === currentListIndex}
			class:previous={index === previousListIndex}
		>
			<dt class="t-font-accent t-heading t-scale-gamma c-fg-tertiary">
				I like
			</dt>
			{#each set as word, index}
				<dd 
					class="t-font-accent t-heading t-scale-gamma c-fg-tertiary"
					style="--delay: {index * 0.1}s;"
				>
					{word}
				</dd>
			{/each}
		</div>
	{/each}
</dl>
