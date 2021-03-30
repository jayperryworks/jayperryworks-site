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
  class="button type-font-accent {role} {size} {classes}"
  class:has-icon-left={iconLeft}
  class:has-icon-right={iconRight}
  class:type-scale-zeta={size !== 'large'}
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
    --padding-x: 1.2em;
    --padding-y: 0.5em;
    --icon-offset: 0.3em;
    --color: var(--color-primary);

    border: 1px solid currentColor;
    border: 1px solid var(--color);
    color: currentColor;
    color: var(--color);
    transition: all 0.25s ease;
    background-color: transparent;
    border-radius: 0.2em;
    display: inline-block;
    padding: var(--padding-x) var(--padding-y);
    position: relative;
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
    @include type.font-accent('bold');
  }

  /* --- sizes --- */
  .xsmall {
    --icon-offset: 0;
    --padding-x: 0.6em;
    --padding-y: 0.2em;
  }

  .small {
    --icon-offset: 0.13em;
    --padding-x: 0.8em;
    --padding-y: 0.3em;
  }

  .large {
    --padding-x: 1.4em;
    --padding-y: 0.6em;
  }

  /* --- icons --- */
  .button.has-icon-left {
    padding-left: calc(var(--padding-x) + 1em);
  }

  .button.has-icon-right {
    padding-right: calc(var(--padding-y) + 1em);
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
