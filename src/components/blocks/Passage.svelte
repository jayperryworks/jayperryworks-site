<script lang="ts">
import '../../styles/components/tooltip.css';

import { onDestroy, onMount } from 'svelte';

export let html: string;
export let typeSize = 'epsilon';

let className = '';
export { className as class };

let contentElement, browserWidth;

let notes;

function alignNotes () {
	if (notes) {
		notes.forEach((note) => {
			const MARGIN = 100;
			const noteRect = note.getBoundingClientRect();

			// change the note's alignment
			// based on its proximity to the edge of the browser window
			if (noteRect.left < MARGIN) {
				note.classList.remove('align-center', 'align-start', 'align-end');
				note.classList.add('align-start');
			}

			if ((browserWidth - noteRect.right) < MARGIN) {
				note.classList.remove('align-center', 'align-start', 'align-end');
				note.classList.add('align-end');
			}
		});
	}
}

// add click events to the tooltips the old fashioned way
// -> because the Svelte runtime can't handle injected strings
// https://usefulangle.com/post/190/javascript-window-width-height
onMount(() => {
	console.log('hello');
	notes = contentElement.querySelectorAll('.note');
	alignNotes();

	notes.forEach((note) => {
		note.addEventListener('click', (event) => {
			event.target.classList.toggle('show');
		});
	});
});

onDestroy(() => {
	if (notes) {
		notes.forEach((note) => {
			note.removeEventListener('click');
		});

		notes = null;
	}
});
</script>

<svelte:window
	bind:innerWidth="{browserWidth}"
	on:resize="{alignNotes}"
/>
<div
	bind:this="{contentElement}"
	class="prose type-scale-{typeSize} {className}"
>
	{@html html}
</div>

<style>
  .prose :global(* + *) {
    margin-top: 1em;
  }

  /* --- headings --- */
  .prose :global(* + :is(h1, h2, h3, h4, h5, h6)) {
    margin-top: 1.5em;
  }


	/* add an icon after external links */
	@supports (mask: url('/icons/external-link.svg') no-repeat 50% 50%) {
		.prose :global(a[href^='http']::after) {
			--size: 0.7em;

			background-color: currentColor;
			content: '';
			display: inline-block;
			height: var(--size);
			margin: 0 0.1em 0 0.25em;
			mask: url('/icons/external-link.svg') no-repeat 50% 50%;
			position: relative;
			vertical-align: baseline;
			width: var(--size);
		}
	}

	/* footnote popovers */
	.prose :global(.note) {
		--size: 0.8em;
		--bg: hsl(var(--color-bg-h), var(--color-bg-s), calc(var(--color-bg-l) + 15%));
		--border: var(--color-border);
		--pointer-margin: var(--space-xnarrow);
		--pointer-size: 0.6em;
		--show: 0;
		--transition-duration: 0.25s;

		background-color: var(--color-secondary);
		border-radius: 1000px;
		border: 0;
		color: var(--color-bg);
		cursor: pointer;
		padding: 0.25em;
		position: relative;
		transition: background-color 0.25s ease;
		will-change: color;
	}

	.prose :global(.note):hover,
	.prose :global(.note.show) {
		background-color: var(--color-highlight);
	}

	.prose :global(.note-icon) {
		display: block;
		height: var(--size);
		line-height: var(--size);
		margin-left: 0.25em;
		margin: 0;
		max-height: 100%;
		max-width: 100%;
		pointer-events: none;
		position: relative;
		width: var(--size);
	}

	.prose :global(.note.show .tooltip) {
		--show: 1;
	}
</style>
