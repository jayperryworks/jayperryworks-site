<script>
  import menu from 'icons/menu.svg'
  import Icon from './Icon.svelte'

  import Bookend from './Bookend.svelte'
  import Dropdown from './Dropdown.svelte'
  import LogoJP from './logos/LogoJP.svelte'

	export let segment,
    overlay = false

  let navOpen = false

  function handleButtonClick (event) {
    navOpen = !navOpen
  }

  let items = [
    {
      label: 'Prints &amp; paintings',
      url: 'pictures',
      priority: 1,
      prefetch: true
    },
    {
      label: 'Blog',
      url: 'blog',
      priority: 2,
      prefetch: true
    },
    {
      label: 'About',
      url: 'about',
      priority: 2,
      prefetch: true
    }
  ]

  function priorityClass (item) {
    return item.priority == 1 ? 'hide-above@xsmall' : ''
  }
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
        on:click="{e => navOpen = true}"
        class="nav-open type-scale-epsilon type-font-accent"
      >
        Menu
        <Icon svg="{menu}" margin="left" />
      </button>
      <div class="nav" hidden="{!navOpen}">
        <button 
          on:click="{e => navOpen = false}"
          class="nav-close type-scale-epsilon type-font-accent"
        >
          Close
        </button>
        <ul class="nav-list">
          {#each items as item}
            <li>
              <a
                class="type-font-accent type-link-undecorated"
                class:current={segment === item.url}
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
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    background-color: transparent;
    z-index: 4;
  }

  .logo {
    display: block;
    border: none;
  }

  button {
    background-color: transparent;
    border: 0;
    box-shadow: none;
    display: inline-block;
    outline: none;
    padding: 0;
  }

  .nav {
    display: block;
    z-index: 4;
  }

  .nav[hidden] {
    display: none;
  }

  .nav-list {
    display: inline-block;
    list-style: none;
  }

  .nav-list > li {
    margin-top: 0;
    display: block;
  }

  @media screen and (min-width: 42em) {
    .nav[hidden] {
      display:  inline-block;
    }

    .nav-open {
      display: none;
    }

    .nav-list > li {
      display: inline-block;
    }
  }
</style>