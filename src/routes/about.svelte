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
  import ResponsiveImage from '../components/ResponsiveImage.svelte'
  import PostBody from '../components/PostBody.svelte'

  export let content
</script>

<article>
  <header>
    <h1>{content.title}</h1>
    {#if content.cover}
      <ResponsiveImage sources="{content.cover.sources}" alt="content.cover.alt" />
    {/if}
  </header>

  <PostBody sections={content.body} />
</article>
