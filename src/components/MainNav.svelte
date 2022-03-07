<script>
  import menu from 'icons/menu.svg';
  import close from 'icons/close.svg';
  import Icon from './Icon.svelte';
;
  import Bookend from './Bookend.svelte';
  import LogoJP from './logos/LogoJP.svelte';

	export let segment,
    overlay = false;

  let navOpen = false;
  let navTransitioned = true;

  function handleButtonClick () {
    navOpen = !navOpen;
    navTransitioned = false;
  }

  let items = [
    {
      label: 'Home',
      url: '/',
      show: 'small'
    },
    {
      label: 'Patapsco essay',
      url: 'longform/2022/patapsco/1',
			slug: 'patapsco'
    },
    {
      label: 'Prints &amp; paintings',
      url: 'pictures'
    },
    {
      label: 'Design',
      url: 'design'
    },
    {
      label: 'Blog',
      url: 'blog'
    },
    {
      label: 'About',
      url: 'about'
    }
  ];
</script>

<nav
  class="padding-x-outside"
  class:overlay
>
  <div class="bookend">
    <a
      class="logo"
      href="/"
    >
      <LogoJP />
    </a>

    <!-- nav -->
  	<div class="type-align-right">
      <button
        on:click="{handleButtonClick}"
        class:hide="{navOpen === true}"
        class="nav-button | type-scale-epsilon type-font-accent type-weight-xlight"
      >
        Menu
        <Icon svg="{menu}" margin="left" class="color-fg-primary" />
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
        <ul class="nav-list">
          {#each items as item}
						{@debug segment}
						{@debug item}
            <li>
              <a
                class="nav-item type-font-accent type-link-undecorated type-weight-light"
                class:current={segment === item.url || segment === item.slug}
                class:small-only="{item.show === 'small'}"
                rel={item.prefetch ? 'prefetch' : ''}
                href={item.url}
              >
                {@html item.label}
              </a>
            </li>
          {/each}
        </ul>
      </div>
    </div>
  </div>
</nav>

<style>
  /* --- layout --- */
  @supports (display:  flex) {
    .bookend {
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
  .logo {
    border: none;
    display: block;
    max-width: 2.5rem;
  }

  .nav-button {
    background-color: transparent;
    border: 0;
    box-shadow: none;
    cursor: pointer;
    display: inline-block;
    margin-top: 1em;
    margin-top: var(--space-narrow);
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
    padding-top: var(--space-narrow);
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

  /* --- large-screen nav --- */
  @media screen and (min-width: 36em) {
    .nav-button {
      display: none;
    }

    .nav,
    :global(.js) .nav {
      background-color: transparent;
      display: inline-block;
      opacity: 1;
      position: relative;
    }

    :global(.js) .nav.closed {
      clip-path: none;
      clip: auto;
      height: auto;
      overflow: visible;
      position: static;
      width: auto;
    }

    .nav-item {
      font-size: var(--type-scale-zeta);
      padding-top: 0.8em;
      padding-top: var(--space-xnarrow);
    }

    .nav-item:hover,
    .nav-item:active {
      color: var(--color-highlight);
    }

    .nav-item.current::before {
      background-color: var(--color-highlight);
      height: 0.125em;
      left: 0;
      position: absolute;
      right: 0;
      top: 0;
      transform: none;
      width: auto;
    }

    .nav-item.small-only {
      display: none;
    }

    .nav-list > li {
      display: inline-block;
    }

    .nav-list > li + li {
      margin-left: 1em;
      margin-left: var(--space-narrow);
      margin-top:  0;
      padding-top: 0;
    }
  }
</style>
