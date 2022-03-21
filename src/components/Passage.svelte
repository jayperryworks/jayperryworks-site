<script>
	import { onDestroy, onMount } from 'svelte';

  export let html,
		typeSize = 'epsilon';

  let classes = '';
  export { classes as class };

	let contentElement, browserWidth;

	// add click events to the tooltips the old fashioned way
	// -> because the Svelte runtime can't handle injected strings
	onMount(() => {
		// https://usefulangle.com/post/190/javascript-window-width-height
		const notes = contentElement.querySelectorAll('.note');
		notes.forEach((note) => {
			note.addEventListener('click', (event) => {
				const noteEl = event.target;
				const noteRect = noteEl.getBoundingClientRect();
				const margin = 150;

				noteEl.classList.toggle('show');

				// console.log(noteRect.left, browserWidth - noteRect.right, margin);
				if (noteRect.left < margin) {
					noteEl.classList.remove('align-center');
					noteEl.classList.add('align-start');
				}

				if ((browserWidth - noteRect.right) < margin) {
					noteEl.classList.remove('align-center');
					noteEl.classList.add('align-end');
				}
			});
		});
	});
</script>

<svelte:window bind:innerWidth="{browserWidth}" />
<div
	bind:this="{contentElement}"
	class="content type-scale-{typeSize} {classes}"
>
  {@html html}
</div>

<style>
  .content :global(* + *) {
    margin-top: 1em;
  }

  /* --- headings --- */
  .content :global(* + :is(h1, h2, h3, h4, h5, h6)) {
    margin-top: 1.5em;
  }

  /* horizontal rules
    -> created for footnotes
  */
  .content > :global(hr) {
    border: 0;
    border-top: 1px solid var(--color-border);
    height: 0;
    margin: 1.2em 0;
  }

	.content > :global(blockquote) {
		padding-left: 1.44em;
		font-size: 0.8em;
		font-size: var(--type-scale-zeta);
		font-style: italic;
	}

  /* footnotes */
  :global(.footnotes) {
    color: var(--color-secondary);
    font-size: var(--type-scale-zeta);
  }

  :global(.footnotes-list) {
    padding-left: 1.2em;
  }

  :global(.footnotes li),
  :global(.footnotes p) {
    padding-left: 0;
    color: var(--color-secondary);
    font-family: var(--type-font-accent);
    font-weight: 300;
    font-size: var(--type-scale-zeta);
    letter-spacing: 0.02em;
  }

  :global(.footnote) {
    background-color: transparent;
    border-color: inherit;
    border-radius: var(--border-radius);
    border: 1px solid var(--color-secondary);
    color: inherit;
    display: inline-block;
    font-family: var(--type-font-accent);
    line-height: 1;
    margin-left: 0.25em;
    padding: 0.25em 1em;
  }

	/* footnote popovers */
	:global(.note) {
		--size: 0.7em;
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
		display: inline-block;
		padding: 0.25em;
		position: relative;
		transition: background-color 0.25s ease;
		vertical-align: baseline;
		will-change: color;
	}

	:global(.note):hover,
	:global(.note.show) {
		background-color: var(--color-highlight);
	}

	:global(.note-icon) {
		display: block;
		height: var(--size);
		line-height: var(--size);
		max-height: 100%;
		max-width: 100%;
		pointer-events: none;
		width: var(--size);
	}

	:global(.note-flyout) {
		background-color: var(--bg);
		border-radius: 0.25em;
		border: 1px solid var(--border);
		bottom: calc(var(--size) + var(--pointer-size) + 1em);
		box-shadow: 0 0.05rem 0.5rem var(--color-shadow);
		color: var(--color-primary);
		content: attr(title);
		display: block;
		font-family: var(--type-font-accent);
		font-size: var(--type-scale-zeta);
		line-height: var(--type-leading-tight);
		max-width: 18rem;
		min-width: 12rem;
		opacity: var(--show);
		padding: var(--space-xnarrow) var(--pointer-margin);
		position: absolute;
		transition: var(--transition-duration) opacity ease-in-out;
		will-change: opacity;
		z-index: 4;
	}

	:global(.note-flyout)::before,
	:global(.note-flyout)::after {
		border-left: var(--pointer-size) solid transparent;
		border-right: var(--pointer-size) solid transparent;
		content: '';
		display: inline-block;
		height: 0;
		position: absolute;
		width: 0;
	}

	:global(.note-flyout)::before {
		border-top: var(--pointer-size) solid var(--border);
		bottom: calc(var(--pointer-size) * -1);
	}

	:global(.note-flyout)::after {
		border-top: var(--pointer-size) solid var(--bg);
		bottom: calc((var(--pointer-size) - 0.1em) * -1);
	}

	/* flyout alignment modifiers */
	/* center */
	:global(.note.align-center .note-flyout) {
		left: 50%;
		text-align: center;
		transform: translateX(-50%);
	}

	:global(.note.align-center .note-flyout)::before,
	:global(.note.align-center .note-flyout)::after {
		left: 50%;
		transform: translateX(-50%);
	}

	/* start */
	:global(.note.align-start .note-flyout) {
		left: calc(var(--pointer-margin) * -1);
		text-align: left;
	}

	:global(.note.align-start .note-flyout)::before,
	:global(.note.align-start .note-flyout)::after {
		left: var(--pointer-margin);
	}

	/* end */
	:global(.note.align-end .note-flyout) {
		right: calc(var(--pointer-margin) * -1);
		text-align: right;
	}

	:global(.note.align-end .note-flyout)::before,
	:global(.note.align-end .note-flyout)::after {
		right: var(--pointer-margin);
	}

	:global(.note.show .note-flyout) {
		--show: 1;
	}
</style>
