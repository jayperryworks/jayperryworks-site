<script>
  import menu from 'icons/menu.svg'
  import Icon from './Icon.svelte'

  import Bookend from './Bookend.svelte'
  import Dropdown from './Dropdown.svelte'
  import LogoJP from './logos/LogoJP.svelte'

	export let segment,
    overlay = false

  let navOpen = false
  let navTransitioned = true

  function handleButtonClick () {
    navOpen = !navOpen
    navTransitioned = false
  }

  let items = [
    {
      label: 'Home',
      url: '/',
      show: 'small'
    },
    {
      label: 'Prints &amp; paintings',
      url: 'pictures'
    },
    {
      label: 'Blog',
      url: 'blog'
    },
    {
      label: 'About',
      url: 'about'
    }
  ]
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
        class="nav-button type-scale-epsilon type-font-accent"
      >
        Menu
        <Icon svg="{menu}" margin="left" />
      </button>
      <div 
        class="nav"
        class:hide-visually="{navTransitioned && !navOpen}"
        class:open="{navOpen}"
        on:transitionend="{e => { navTransitioned = true }}"
      >
        <button 
          on:click="{handleButtonClick}"
          class="nav-button close type-scale-epsilon type-font-accent"
        >
          X
          <span class="hide-visually">Close</span>
        </button>
        <ul class="nav-list">
          {#each items as item}
            <li>
              <a
                class="nav-item type-font-accent type-link-undecorated"
                class:current={segment === item.url}
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

  .logo {
    display: block;
    border: none;
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
    position: absolute;
    top: 0;
    right: 0;
    margin-right: 1.5em;
    margin-right: var(--space-medium);
  }

  /* todo: add keyframe animation to handle hidden attr transition */
  /* .visuallyHidden > (base state - hidden) > .open */
  :global(.js) .nav {
    opacity: 0;
    display: block;
    z-index: 4;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: hsl(var(--color-bg-h), var(--color-bg-s), var(--color-bg-l), 0.9);
    transition: opacity 0.25s ease;
    will-change: opacity;
  }

  :global(.js) .nav.open {
    opacity: 1;
  }

  @supports (display: flex) {
    :global(.js) .nav.open {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
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
    font-size: var(--type-scale-delta);
    display: inline-block;
    position: relative;
    transition: color 0.25s ease-in-out;
    will-change: color, font-size;
  }

  .nav-item.current::before {
    --size: 0.5em;
    content: '';
    display: block;
    position: absolute;
    left: calc(var(--space-medium) * -1);
    top: 50%;
    transform: translateY(-50%);
    width: var(--size);
    height: var(--size);
    border-radius: 1000px;
    background-color: var(--color-highlight);
  }

  /* --- large-screen nav --- */
  @media screen and (min-width: 30em) {
    .nav-button {
      display: none;
    }

    .nav,
    :global(.js) .nav {
      display: inline-block;
      position: relative;
      background-color: transparent;
    }

    .nav-item {
      font-size: var(--type-scale-epsilon);
      padding-top: 1em;
      padding-top: var(--space-narrow);
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