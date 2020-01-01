<script>
  export let caption, credit, spacing = 'xnarrow'

  let classes = ''
  export { classes as class }
</script>

<!-- svelte-ignore a11y-structure -->
<!-- Ignore this because this component is always used inside a figure parent -->
<figcaption class="
  t-caption
  t-align-left
  padding-top-{spacing}
  padding-y-between-xxnarrow
  {classes}
">
  {#if caption}{@html caption}{/if}

  {#if credit}
    <cite class="t-case-upper">{credit}</cite>
  {/if}
</figcaption>
