<script context="module">
  export async function preload({ params, query }) {
    const { year, month, day, slug } = params
    // the `slug` parameter is available because
    // this file is called [slug].svelte
    const response = await this.fetch(`pictures/${year}/${slug}.json`)
    const data = await response.json()

    if (response.status !== 200) {
      this.error(response.status, data.message)
      return
    }

    return {
      post: data,
      date: {
        year,
        month,
        day
      }
    }
  }
</script>

<script>
  import { format } from 'date-fns'
  import Cover from '@/components/Cover.svelte'
  import Gallery from '@/components/Gallery.svelte'
  import MainNav from '@/components/MainNav.svelte'
  import OutdentedBlurb from '@/components/OutdentedBlurb.svelte'
  import PageTitle from '@/components/PageTitle.svelte'
  import Passage from '@/components/Passage.svelte'
  import PrintEdition from '@/components/PrintEdition.svelte'
  import Wrapper from '@/components/Wrapper.svelte'

  export let post, date

  let metadataBreakpoint = 'xsmall'
</script>

<style>
  .intro-heading {
    margin-top: -0.1em;
  }
</style>

<PageTitle title="{post.title}" />

<MainNav segment="pictures" theme="reverse" />
<main>
  <article>

    <!-- Cover image -->
    <header
      class="padding-x-outside padding-y-xwide"
      data-theme="reverse"
    >
      <Cover
        sources={post.cover}
        alt={post.title}
      />

      <!-- Title, media, size info -->
      <Wrapper
        width="narrow"
        class="t-align-center padding-top"
      >
        <h1 class="
          t-font-accent
          t-weight-bold
          t-scale-epsilon
          display-inline-block@{metadataBreakpoint}
          padding-bottom-xnarrow
          no-padding-bottom@{metadataBreakpoint}
        ">{post.title}</h1>
        <time
          class="
            t-font-accent
            t-scale-epsilon
            c-fg-tertiary
            display-inline-block
            padding-left-narrow
            margin-left-narrow
            border-left@{metadataBreakpoint}
          "
          datetime="{format(new Date(date.year), 'yyyy')}"
        >
          {format(new Date(date.year), 'yyyy')}
        </time>
        <p class="
            t-font-accent
            t-scale-epsilon
            c-fg-tertiary
            display-inline-block
            padding-left-narrow
            margin-left-narrow
            border-left
          ">
            {post.format}{#if post.width && post.height}&nbsp;&bull; {post.width}" x {post.height}"{/if}
          </p>
      </Wrapper>
    </header>

    {#if post.intro}
      <!-- Intro -->
      <OutdentedBlurb
        blurbWidth={12}
        class="padding-x-outside padding-y-xwide"
      >
        <h2
          slot="blurb"
          class="intro-heading"
        >
          Backstory
        </h2>
        <div slot="body">
          <Passage html={post.intro} />
        </div>
      </OutdentedBlurb>
    {/if}

    {#if post.editions}
      <!-- Editions -->
      <section class="
        padding-x-outside
        padding-y-xwide
        border-seam-top
      ">
        <h2 class="t-align-center@small padding-bottom-wide">Available editions</h2>
          <Gallery size="large" gutter="wide">
          {#each post.editions as edition}
            <li>
              <PrintEdition {edition} />
            </li>
          {/each}
        </Gallery>
      </section>
    {/if}
  </article>
</main>
