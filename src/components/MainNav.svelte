<script>
  import arrow from 'icons/arrow-down.svg'
  import menu from 'icons/menu.svg'
  import Icon from './Icon.svelte'

  import Bookend from './Bookend.svelte'
  import Dropdown from './Dropdown.svelte'
  import LogoJP from './logos/LogoJP.svelte'

	export let segment,
    theme = false,
    overlay = false,
    hideMenu = false

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
  data-theme={theme || ''}
>
  <div class="bookend">
    <a
      class="logo"
      href="/"
    >
      <LogoJP />
    </a>

    <!-- large screen menu -->
  	<div class="type-align-right">
      {#if !hideMenu}
        <ul class="nav horizontal xsmall:show margin-x-flow">
          {#each items as item}
            <li class="
              {item.priority > 1 ? 'hide-visually small:show-visually' : ''}
            ">
              <a
                class="display-block padding-top-narrow type-font-accent type-link-undecorated"
                class:type-highlight-top={segment === item.url}
                rel={item.prefetch ? 'prefetch' : ''}
                href={item.url}
              >
                {@html item.label}
              </a>
            </li>
          {/each}
        </ul>

        <!-- small-screen menu -->
        <Dropdown
          label="Menu"
          class="small:hide padding-top-narrow margin-left"
        >
          <span
            slot="label"
            class="display-block type-scale-zeta"
          >
            <Icon svg={menu} margin="right" />
            <span class="type-font-accent">
              Menu
            </span>
            <Icon svg={arrow} margin="left" size="small" />
          </span>
          <ul slot="dropdown" class="nav vertical">
            {#each items as item, index}
              <li
                class="{priorityClass(item)}"
                class:padding-bottom={index != items.length - 1}
              >
                <a
                  class="display-block padding-x type-font-accent type-leading-tight type-link-undecorated type-scale-zeta"
                  class:type-highlight-left={segment === item.url}
                  href={item.url}
                >
                  {@html item.label}
                </a>
              </li>
            {/each}
          </ul>
        </Dropdown>
      {/if}
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

  .logo {
    display: block;
    border: none;
  }

  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    background-color: transparent;
  }

  .nav {
    display: inline-block;
    list-style: none;
  }

  .nav > li {
    margin-top: 0;
  }

  .nav.horizontal > li {
    display: inline-block;
  }

  .nav.vertical > li {
    display:  block;
  }
</style>