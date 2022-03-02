<script>
	import menu from 'icons/menu.svg';
  import close from 'icons/close.svg';
  import Icon from './Icon.svelte';

  import Bookend from './Bookend.svelte';
	import LogoJP from './logos/LogoJP.svelte';

	export let projectTitle,
		currentPath,
		projectPath,
		overlay = false,
		showProjectTitle = true,
		tableOfContents;

	let navOpen = false
  let navTransitioned = true

  function handleButtonClick () {
    navOpen = !navOpen
    navTransitioned = false
  }
</script>

<nav
	class="padding-x-outside"
	class:overlay
>
	<div class="bookend">
		<div class="nav-title">
			<a href="/" class="logo">
				<LogoJP />
			</a>
			{#if projectTitle && showProjectTitle}
				<a
					class="title | type-font-accent type-weight-light type-scale-zeta type-leading-xtight | margin-left"
					href="{projectPath}"
				>
					{projectTitle}
				</a>
			{/if}
		</div>

		<!-- nav -->
  	<div class="type-align-right">
      <button
        on:click="{handleButtonClick}"
        class:hide="{navOpen === true}"
        class="nav-button | type-font-accent type-weight-light type-leading-xtight"
      >
        Table of contents
        <Icon svg="{menu}" class="color-fg-primary | margin-left-xnarrow" />
      </button>
      <div
        class="nav"
        class:open="{navOpen}"
        class:closed="{navTransitioned && !navOpen}"
        on:transitionend="{e => { navTransitioned = true }}"
      >
        <button
          on:click="{handleButtonClick}"
          class="nav-button close type-scale-epsilon type-font-accent"
        >
          <Icon svg="{close}" margin="right" />
          <span class="hide-visually">Close</span>
        </button>
				<div class="type-align-left">
					<h2 class="type-scale-alpha padding-bottom">
						<a href="{projectPath}">{projectTitle}</a>
					</h2>
						<ul class="nav-list">
							{#each tableOfContents as item}
								<li>
									<a
						on:click="{handleButtonClick}"
										class="nav-item type-font-accent type-link-undecorated type-weight-light"
										class:current="{currentPath === item.path}"
										href="{item.path}"
									>
										{@html item.title}
									</a>
								</li>
							{/each}
						</ul>
				</div>
      </div>
    </div>
  </div>
</nav>

<style>
  /* --- layout --- */
  @supports (display:  flex) {
    .bookend {
			--nav-top-margin: var(--space-narrow);
      align-items: flex-start;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }
  }

  .overlay {
    background-color: transparent;
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
    z-index: 4;
  }

  /* --- nav elements --- */
	@supports (display: flex) {
		.nav-title {
			display: flex;
			align-items: flex-start;
			flex-direction: row;
			justify-content: flex-start;
		}
	}

  .logo {
    border: none;
    display: inline-block;
    max-width: 2.5rem;
		font-size: 0;
  }

	.title {
		border: 0;
		display: none;
		padding-top: 1em;
		padding-top: var(--nav-top-margin);
		vertical-align: top;
	}

  .nav-button {
		background-color: transparent;
    border: 0;
    box-shadow: none;
		color: var(--color-primary);
    cursor: pointer;
    display: inline-block;
		font-size: var(--type-scale-epsilon);
    margin-top: 1em;
    margin-top: var(--nav-top-margin);
    outline: none;
    padding: 0;
    transition: color 0.25s ease-in-out;
    will-change: color;
  }

  .nav-button:hover,
  .nav-button:active {
		color: var(--color-highlight);
  }

  .nav-button.close {
		margin-right: 1.5em;
    margin-right: var(--space-medium);
    position: absolute;
    right: 0;
    top: 0;
  }

	@media screen and (min-width: 25em) {
		.title {
			display: inline-block;
		}

		.nav-button {
			font-size: var(--type-scale-zeta);
		}
	}

  /* --- small-screen nav --- */
  :global(.js) .nav {
    background-color: hsl(var(--color-bg-h), var(--color-bg-s), var(--color-bg-l), 0.95);
    bottom: 0;
    display: block;
    left: 0;
    opacity: 0;
    position: fixed;
    right: 0;
    top: 0;
    transition: opacity 0.25s ease;
    will-change: opacity;
    z-index: 4;
  }

  @supports (display: flex) {
    :global(.js) .nav {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
  }

  /* closed (visually hidden) state */
  :global(.js) .nav.closed {
    border: 0;
    clip-path: inset(100%);
    clip: rect(1px, 1px, 1px, 1px);
    height: 1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 1px;
  }

  /* open (transitioned) state */
  :global(.js) .nav.open {
    opacity: 1;
  }

  .nav-list {
    display: inline-block;
    list-style: none;
    margin: 0;
  }

  :global(.js) .nav-list {
    display: block;
  }

  .nav-list > li {
    display: block;
    margin-top: 0;
  }

  .nav-list > li + li {
    padding-top: var(--nav-top-margin);
  }

  .nav-item {
    display: inline-block;
    font-size: var(--type-scale-delta);
    position: relative;
    transition: color 0.25s ease-in-out;
    will-change: color, font-size;
  }

  .nav-item.current::before {
    --size: 0.5em;
    background-color: var(--color-highlight);
    border-radius: 1000px;
    content: '';
    display: block;
    height: var(--size);
    left: calc(var(--space-medium) * -1);
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: var(--size);
  }
</style>
