<script context="module">
  export async function preload({ params, query }) {
    // get the post for this page using the date and slug params
    const { year, slug } = params
    const response = await this.fetch(`pictures/${year}/${slug}.json`)
    const data = await response.json()

    if (response.status !== 200) {
      this.error(response.status, data.message)
      return
    }

    // grab the list of posts for the next/prev nav
    const list = await this.fetch('pictures.json')
    const listData = await list.json()
    const currentPost = listData.indexOf(
      listData.find(item => item.slug == slug)
    )

    return {
      post: data,
      date: { year },
      nav: {
        previous: listData[currentPost] || false,
        next: listData[currentPost] || false
      }
    }
  }
</script>

<script>
  import { format } from 'date-fns'
  import { titleize } from '@/utils/stringHelpers.js'
  import Bookend from '@/components/Bookend.svelte'
  import Cover from '@/components/Cover.svelte'
  import Gallery from '@/components/Gallery.svelte'
  import MainNav from '@/components/MainNav.svelte'
  import NextPrevThumbNav from '@/components/NextPrevThumbNav.svelte'
  import Note from '@/components/Note.svelte'
  import OutdentedBlurb from '@/components/OutdentedBlurb.svelte'
  import PageTitle from '@/components/PageTitle.svelte'
  import Passage from '@/components/Passage.svelte'
  import PrintEdition from '@/components/PrintEdition.svelte'
  import ResponsiveImage from '@/components/ResponsiveImage.svelte'
  import Wrapper from '@/components/Wrapper.svelte'

  export let post, date, nav

  let metadataBreakpoint = 'xsmall'
</script>

<style>
  .outdent-heading {
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
          class="outdent-heading padding-bottom-narrow"
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

    <!-- About the edition note -->
    {#each post.printDescriptions as note}
      <aside class="padding-x-outside padding-y-xwide border-seam-top" id="about-{note.type}">
        <OutdentedBlurb blurbWidth={20}>
          <h2
            slot="blurb"
            class="outdent-heading padding-bottom-narrow"
          >About {titleize(note.type)} prints</h2>
          <div slot="body">
            <Note html={note.description} />
          </div>
        </OutdentedBlurb>
      </aside>
    {/each}
  </article>
  {#if nav.previous || nav.next}
    <NextPrevThumbNav {nav} heading="More prints &amp; paintings" />
  {/if}
</main>
