<script context="module">
  export async function preload() {
    const response = await this.fetch('index.json')
    const data = await response.json()

    if (response.status !== 200) {
      this.error(response.status, data.message)
      return
    }

    return { content: data }
  }
</script>

<script>
  import { onDestroy } from 'svelte'
  import PageTitle from '@/components/PageTitle.svelte'
  import Icon from '@/components/Icon.svelte'

  export let content
  let favoriteThings = []

  function randomFavorites () {
    favoriteThings = Object.keys(content.favoriteThings).map((type) => {
      const list = content.favoriteThings[type]
      return list[Math.floor(Math.random() * list.length)]
    })
  }

  $: subhead = `I like ${
    favoriteThings.map((thing, index) => {
      if (index == (favoriteThings.length - 1)) {
        return `and ${thing}`
      }
      return thing
    }).join(', ')
  }.`

  randomFavorites()
  const cycleFavorites = setInterval(randomFavorites, 5000)

  onDestroy(() => clearInterval(cycleFavorites))
</script>

<PageTitle />

<header>
  <h1>{content.intro}</h1>
  <Icon id="menu" />
  {#if favoriteThings.length > 0}
    <p>{subhead}</p>
  {/if}
  <a rel=prefetch href="about">A bit more about me</a>
</header>

<nav>
  <ul>
    {#each content.tableOfContents as item}
    <li>
      <a href="{item.link}">
        <h2>{item.heading}</h2>
        <div>{@html item.description}</div>
      </a>
    </li>
    {/each}
  </ul>
</nav>
