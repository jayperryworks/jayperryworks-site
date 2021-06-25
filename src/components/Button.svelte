<script>
  import Icon from './Icon.svelte'

  export let href,
    target = '',
    role = '',
    size = '',
    iconLeft = '',
    iconRight = '',
    prefetch = false

  let classes = ''
  export { classes as class }

  $: rel = prefetch ? 'prefetch' : ''
</script>

<a
  {href}
  {rel}
  {target}
  class="button {role} {size} {classes}"
  class:has-icon="{iconLeft || iconRight}"
  class:left="{iconLeft}"
  class:right="{iconRight}"
>
  {#if iconLeft}
    <Icon
      svg={iconLeft}
      size="small"
      class="icon left"
    />
  {/if}

  <slot></slot>

  {#if iconRight}
    <Icon
      svg={iconRight}
      size="small"
      class="icon right"
    />
  {/if}
</a>

<style>
  .button {
    --color: var(--color-primary);
    --font-size: var(--type-scale-epsilon);
    --icon-offset: 0.3em;
    --padding-x: 1.2em;
    --padding-y: 0.57em;

    background-color: transparent;
    border-radius: 0.2em;
    border: 1px solid currentColor;
    border: 1px solid var(--color);
    color: currentColor;
    color: var(--color);
    display: inline-block;
    font-family: var(--type-font-accent);
    font-size: 1rem; /* fallback reset */
    font-size: var(--font-size);
    padding: var(--padding-y) var(--padding-x);
    position: relative;
    transition: all 0.25s ease;
  }

  .button:hover,
  .button:active {
    background-color: var(--color-island);
    filter: brightness(1.2);
  }

  .button :global(sup) {
    font-size: 0.6em;
  }

  .button :global(strong) {
    font-weight: bold;
  }

  /* --- sizes --- */
  .xsmall {
    --font-size: var(--type-scale-zeta);
    --icon-offset: 0;
    --padding-x: 0.6em;
    --padding-y: 0.2em;
  }

  .small {
    --font-size: var(--type-scale-zeta);
    --icon-offset: 0.13em;
    --padding-x: 0.8em;
    --padding-y: 0.3em;
  }

  /* --- icons --- */
  .button.has-icon {
    --icon-padding: 1.6em;
  }
  
  .button.has-icon.left {
    padding-left: calc(var(--padding-x) + var(--icon-padding));
  }

  .button.has-icon.right {
    padding-right: calc(var(--padding-y) + var(--icon-padding));
  }

  .button :global(.icon) {
    position: absolute;
    top: 50%;
    transform: translateY(-30%);
  }

  .button :global(.icon.left) {
    left: calc(var(--padding-x) - var(--icon-offset));
  }

  .button :global(.icon.right) {
    right: calc(var(--padding-x) - var(--icon-offset));
  }
</style>
