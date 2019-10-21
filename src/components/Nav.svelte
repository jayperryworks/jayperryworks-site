<script>
	export let segment;
  export let items = [
      {
        label: 'Prints &amp; paintings',
        url: 'pictures',
        priority: 1,
        prefetch: true
      },
      {
        label: 'Writing',
        url: 'writing',
        priority: 2,
        prefetch: true
      },
      {
        label: 'Bookshelf',
        url: 'reading',
        priority: 2,
        prefetch: true
      },
      {
        label: 'About',
        url: 'about',
        priority: 2
      }
  ]
</script>

<style lang="scss">
  .wrapper {
    display: flex;
    justify-content: space-between;
  }

  .nav {
    display: inline-block;
    list-style: none;
    padding-left: 0;
  }

  .nav-item {
    display: inline-block;

    & + & {
      margin-left: 1em;
    }
  }

  .nav-link {
    &.active {
      color: red;
    }
  }
</style>

<nav class="wrapper">
  <a class='logo' href='.'>JP</a>
	<ul class="nav">
    {#each items as item}
  		<li class="nav-item">
        <a
          rel={item.prefetch ? 'prefetch' : ''}
          class='nav-link{segment === item.url ? " active" : ""}'
          href='{item.url}'
        >
          {@html item.label}
        </a>
      </li>
    {/each}
	</ul>
</nav>
