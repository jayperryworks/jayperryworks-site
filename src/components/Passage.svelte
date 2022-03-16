<script>
	import { onMount } from 'svelte';

  export let html,
		typeSize = 'epsilon';

  let classes = '';
  export { classes as class };
</script>

<div class="content type-scale-{typeSize} {classes}">
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
</style>
