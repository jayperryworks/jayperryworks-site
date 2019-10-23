<script context="module">
  export async function preload() {
    const response = await this.fetch('about.json')
    const content = await response.json()

    if (response.status !== 200) {
      this.error(response.status, content.message)
      return
    }

    return { content }
  }
</script>

<script>
  import { currentPageTitle } from '../stores/navigation'
  import Passage from '../components/Passage.svelte'
  import Figure from '../components/Figure.svelte'
  import Gallery from '../components/Gallery.svelte'

  export let content

  currentPageTitle.set('Profile')
</script>

<article>
  <header>
    <h1>{content.title}</h1>
    {#if content.cover}
      <img src="{content.cover.sources[0].path}" alt="{content.cover.alt}">
    {/if}
  </header>

  {#each content.body as section}
    {#if section.type == 'passage'}
      <Passage {...section} />
    {/if}

    {#if section.type == 'figure'}
      <Figure {...section} />
    {/if}

    {#if section.type == 'gallery'}
      <Gallery {...section} />
    {/if}
  {/each}
</article>
