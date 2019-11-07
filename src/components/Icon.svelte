<script>
  import ArrowDown from './icons/ArrowDown.svelte'
  import ArrowUp from './icons/ArrowUp.svelte'
  import ArrowLeft from './icons/ArrowLeft.svelte'
  import ArrowRight from './icons/ArrowRight.svelte'
  import Menu from './icons/Menu.svelte'

  export let id, size, margin, title,
    role = 'presentation'

  let classes = ''
  export { classes as class }
</script>

<style lang="scss">
  .icon {
    $size: 1em;
    --icon-size: #{$size};

    color: inherit;
    display: inline-block;
    fill: currentColor !important;
    height: $size;
    height: var(--icon-size);
    margin: -0.15em 0 0 0; /* scooch up a little on the baseline */
    max-height: 100%;
    max-width: 100%;
    pointer-events: none;
    vertical-align: middle;
    width: $size;
    width: var(--icon-size);
  }

  .small {
    --icon-size: 0.83em;
  }

  .large {
    --icon-size: 1.2em;
  }

  .margin-right {
    margin-right: 0.25em;
  }

  .margin-left {
    margin-left: 0.25em;
  }
</style>

<svg
  class="icon {classes} {size} {margin ? `margin-${margin}` : ''}"
  viewbox="0 0 16 16"
  xmlns="http://www.w3.org/2000/svg"
>
  {#if role !== 'presentation' && title}
    <desc>{title}</desc>
  {/if}
  <svelte:component this={id} />
</svg>
