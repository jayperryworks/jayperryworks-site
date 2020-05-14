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
  import arrow from 'icons/arrow-right.svg'
  import arrowDotted from 'icons/arrow-dotted-right.svg'
  import Button from '@/components/Button.svelte'
  import Card from '@/components/HomeTOCCard.svelte'
  import Gallery from '@/components/Gallery.svelte'
  import Icon from '@/components/Icon.svelte'
  import MainNav from '@/components/MainNav.svelte'
  import PageTitle from '@/components/PageTitle.svelte'
  import ResponsivePicture from '@/components/ResponsivePicture.svelte'
  import Wrapper from '@/components/Wrapper.svelte'

  export let content

  // --- "Favorite things" (I like ... ) rotating subheading ---
  let favoriteThings = []

  function randomFavorites () {
    favoriteThings = Object.keys(content.favoriteThings).map((type) => {
      const list = content.favoriteThings[type]
      return list[Math.floor(Math.random() * list.length)]
    })
  }

  $: favoriteThingsSubhead = `I like ${
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

<style type="text/scss">
  .home {
    display: block;

    @supports (display: flex) {
      display: flex;
      flex-direction: column;
      flex: 1;
    }
  }

  .top-section {
    @supports (flex: 1) {
      flex: 1;
    }
  }

  .cover-image {
    margin: 0;
    width: 100%;
    text-align: center;

    > :global(img) {
      width: 100%;
    }

    @supports (object-fit: cover) {
      > :global(img) {
        height: 70vh;
      }
    }
  }

  .card-icon {
    display: inline-block;
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-20%);
    vertical-align: middle;
  }
</style>

<PageTitle />

<MainNav overlay hideMenu />

<div class="home">
  <section class="
    border-bottom
    border-solid
    top-section
  ">

    <!-- cover image -->
    <figure class="cover-image">
      <ResponsivePicture
        sources={content.cover.versions}
        alt={content.cover.alt}
        cover
      />
    </figure>

    <!-- intro -->
    <div class="border-seam-top padding-bottom-xwide padding-top-narrow padding-x-outside">
      <aside class="display-block padding-bottom-wide position-relative t-align-right">
        <small class="t-case-upper t-font-accent t-scale-eta">
          Edition <strong>3.1.0</strong>
        </small>
      </aside>
      <Wrapper width="xwide">
        <Wrapper centered={false}>
          <h1 class="t-scale-beta">{content.intro}</h1>
          {#if favoriteThings.length > 0}
            <p class="c-fg-tertiary margin-top-xnarrow t-font-accent t-heading t-scale-gamma">
              {favoriteThingsSubhead}
            </p>
          {/if}
          <Button
            prefetch={true}
            href="about"
            iconRight={arrow}
            class="margin-top"
          >
            A bit more about me
          </Button>
        </Wrapper>
      </Wrapper>
    </div>
  </section>

  <!-- TOC -->
  <nav class="border-seam-top-offset c-bg-well padding-bottom-xwide padding-x-outside">
    <Wrapper width="xwide">
      <h2 class="padding-y-wide t-case-upper t-font-accent t-scale-eta t-weight-bold">
        Table of contents
      </h2>
      <Gallery gutter="medium" flex>
        {#each content.tableOfContents as item}
          <li>
            <Card link={item.link} class="padding-y">
              <div slot="content">
                <h2 class="padding-x t-highlight-left t-scale-gamma">
                  {item.heading}
                </h2>
                <div class="padding-top-xnarrow padding-x t-font-accent t-scale-zeta">
                  {@html item.description}
                </div>
              </div>
              <div slot="footer" class="margin-x padding-top-narrow position-relative">
                <span class="c-fg-tertiary display-inline-block t-case-upper t-font-accent t-scale-eta t-weight-bold">
                  Read more
                </span>
                <span class="card-icon">
                  <Icon
                    svg={arrowDotted}
                    size="xlarge"
                    class="no-margin-top"
                  />
                </span>
              </div>
            </Card>
          </li>
        {/each}
      </Gallery>
    </Wrapper>
  </nav>
</div>
