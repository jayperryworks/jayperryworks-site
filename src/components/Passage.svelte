<script>
  export let html,
    lead = false

  let classes = ''
  export { classes as class }
</script>

<div class="content {classes}" class:lead>
  {@html html}
</div>

<style>
  /* Lead paragraph with drop cap */
  @supports (initial-letter: 2) {
    .lead > :global(p:first-of-type::first-letter) {
      font-family: var(--type-font-accent);
      font-size: 3.5rem;
      font-weight: bold;
      initial-letter: 2;
      margin-right: 0.1em;
    }
  }

  .content > :global(* + *) {
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

  /* footnotes */
  :global(.footnotes) {
    color: var(--color-tertiary);
    font-size: var(--type-scale-zeta);
    margin-bottom: var(--space-medium, 1em);
    margin-top: var(--space-medium, 1em);
    padding-top: var(--space-medium, 1em);

  }
  
  :global(.footnotes li),
  :global(.footnotes p) {
    color: var(--color-tertiary);
    font-family: var(--type-font-accent);
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
