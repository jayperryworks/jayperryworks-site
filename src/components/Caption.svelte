<script lang="ts">
export let html: string;
export let attribution: string;

let className = '';
export { className as class };
</script>

<!-- svelte-ignore a11y-structure -->
<!-- Ignore this because this component is always used inside a figure parent -->
<figcaption class="type-scale-zeta type-font-accent type-weight-light color-fg-secondary type-align-left padding-y-flow-xnarrow {className}">
  <slot>{@html html}</slot>

	{#if attribution}
		<cite class="type-scale-zeta">{attribution}</cite>
  {/if}
</figcaption>

<style>
	figcaption :global(p) {
		max-width: none;
    font-style: normal;
	}
</style>
