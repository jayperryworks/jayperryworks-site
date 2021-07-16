<script>
  export let caption, credit, spacing = 'xnarrow'

  let classes = ''
  export { classes as class }
</script>

<!-- svelte-ignore a11y-structure -->
<!-- Ignore this because this component is always used inside a figure parent -->
<figcaption class="type-scale-zeta type-font-accent type-weight-light color-fg-secondary type-align-left padding-top-{spacing} padding-y-flow-xnarrow {classes}">
  {#if caption}{@html caption}{/if}

  {#if credit}
    <cite class="type-scale-zeta">{@html credit}</cite>
  {/if}
</figcaption>

<style>
	figcaption :global(p) {
		max-width: none;
    font-style: normal;
	}

  cite {
    /*font-style: normal;*/
  }
</style>
