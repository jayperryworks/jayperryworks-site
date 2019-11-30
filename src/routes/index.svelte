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
  import ResponsiveImage from '@/components/ResponsiveImage.svelte'
  import Wrapper from '@/components/Wrapper.svelte'

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

    > :global(img) {
      width: 100%;
      height: 70vh;
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

<MainNav overlay />

<div class="home">
  <section class="top-section border-bottom border-solid">
    <ResponsiveImage
      sources={content.cover.sources}
      alt={content.cover.alt}
      cover
    />
    <div class="padding-x-outside padding-y-xwide border-seam-top">
      <Wrapper width="xwide">
        <Wrapper centered={false}>
          <h1 class="t-scale-beta">{content.intro}</h1>
          {#if favoriteThings.length > 0}
            <p class="
              c-fg-tertiary
              margin-top-xnarrow
              t-font-accent
              t-heading
              t-scale-gamma
            ">{subhead}</p>
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

  <nav class="padding-x-outside padding-y-wide c-bg-well border-seam-top-offset">
    <Wrapper width="xwide">
      <Gallery gutter="medium" flex>
        {#each content.tableOfContents as item}
          <li>
            <Card link={item.link} class="padding-y">
              <div slot="content">
                <h2 class="
                  t-highlight-left
                  padding-x
                  t-scale-gamma
                ">{item.heading}</h2>
                <div class="
                  padding-x
                  padding-top-xnarrow
                  t-font-accent
                  t-scale-zeta
                ">{@html item.description}</div>
              </div>
              <div slot="footer" class="padding-top-narrow margin-x position-relative">
                <span class="
                  display-inline-block
                  t-scale-eta
                  t-font-accent
                  t-weight-bold
                  c-fg-tertiary
                  t-case-upper
                ">Read more</span>
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
