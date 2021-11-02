<script>
  import Icon from './Icon.svelte'

  export let href,
    target = '',
    size = '',
    iconLeft = '',
    iconRight = '',
    prefetch = false,
		role = 'link'

  let classes = ''
  export { classes as class }

  $: rel = prefetch ? 'prefetch' : ''
</script>

{#if role === 'link'}
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
				size="{size === 'small' ? '' : 'small'}"
				class="icon left"
			/>
		{/if}

		<slot></slot>

		{#if iconRight}
			<Icon
				svg={iconRight}
				size="{size === 'small' ? '' : 'small'}"
				class="icon right"
			/>
		{/if}
	</a>
{/if}

{#if role === 'button'}
	<button
		on:click|preventDefault
		class="button {role} {size} {classes}"
		class:has-icon="{iconLeft || iconRight}"
		class:left="{iconLeft}"
		class:right="{iconRight}"
	>
		{#if iconLeft}
			<Icon
				svg={iconLeft}
				size="{size === 'small' ? '' : 'small'}"
				class="icon left"
			/>
		{/if}

		<slot></slot>

		{#if iconRight}
			<Icon
				svg={iconRight}
				size="{size === 'small' ? '' : 'small'}"
				class="icon right"
			/>
		{/if}
</button>
{/if}

<style>
  .button {
    --color: var(--color-primary);
    --font-size: var(--type-scale-epsilon);
    --icon-padding: 1em;
    --icon-offset: 0.3em;
    --padding-x: 1.2em;
    --padding-y: 0.57em;
    --shadow-spread: 5px;
    --baseline-compensation: 0.05em;

    background-color: transparent;
    border-radius: 0.2em;
    border: 1px solid currentColor;
    border: 1px solid var(--color);
    color: currentColor;
    color: var(--color);
    cursor: pointer;
    display: inline-block;
    font-family: var(--type-font-accent);
    font-size: 1rem; /* fallback reset */
    font-size: var(--font-size);
    font-weight: 300;
    margin-bottom: var(--shadow-spread);
    padding: var(--padding-y) var(--padding-x) calc(var(--padding-y) - var(--baseline-compensation));
    position: relative;
    transition: all 0.25s ease;
  }

  /* pre-render a box shadow on a pseudo element, but hide it */
  .button::after {
    border-radius: 0.2em;
    bottom: 0;
    box-shadow: 0 2px var(--shadow-spread) var(--color-shadow);
    content: '';
    display: block;
    left: 0;
    opacity: 0;
    position: absolute;
    right: 0;
    top: 0;
    transition: opacity 0.25s ease-in-out;
    will-change: opacity;
    z-index: -1;
  }

  .button:hover,
  .button:active {
    --color: var(--color-highlight);
    background-color: var(--color-island);
  }

  /* show the pseudo element to smoothly animate the shadow */
  .button:hover::after {
    opacity: 1;
  }

  .button :global(sup) {
    font-size: 0.6em;
  }

  .button :global(strong) {
    font-weight: bold;
  }

  /* --- sizes --- */
  .small {
    --font-size: var(--type-scale-zeta);
    --icon-padding: 1.4em;
  }

  /* --- icons --- */
  .button.has-icon.left {
    padding-left: calc(var(--padding-x) + var(--icon-padding));
  }

  .button.has-icon.right {
    padding-right: calc(var(--padding-x) + var(--icon-padding));
  }

  .button :global(.icon) {
    position: absolute;
    top: 50%;
    transform: translateY(-30%);
  }

  .button.small :global(.icon) {
    transform: translateY(-40%);
  }

  .button :global(.icon.left) {
    left: calc(var(--padding-x) - var(--icon-offset));
  }

  .button :global(.icon.right) {
    right: calc(var(--padding-x) - var(--icon-offset));
  }
</style>
