<script context="module">
  export async function preload({ params, query }) {
    const response = await this.fetch('pictures.json')
    const data = await response.json()

    if (response.status !== 200) {
      this.error(response.status, data.message)
      return
    }

    return {
      content: data.content,
      pictures: data.pictures
    }
  }
</script>

<script>
  import { format } from 'date-fns'
  import arrow from 'icons/arrow-right.svg'
  import Button from '@/components/Button.svelte'
  import Gallery from '@/components/Gallery.svelte'
  import MainNav from '@/components/MainNav.svelte'
  import OutdentedBlurb from '@/components/OutdentedBlurb.svelte'
  import PageTitle from '@/components/PageTitle.svelte'
  import ResponsivePicture from '@/components/ResponsivePicture.svelte'
  import Wrapper from '@/components/Wrapper.svelte'

  export let content, pictures

  function getProp(picture, prop) {
    return picture.thumbnail.map((item) => {
      return item[prop]
    })
  }
</script>

<style>
  h1 {
    margin-top: -0.38em;
  }
</style>

<PageTitle title="Pictures" />

<MainNav segment="pictures" />
<main>
  <OutdentedBlurb
    class="padding-x-outside padding-y-xwide"
    blurbWidth="narrow"
    bodyWidth="wide"
  >
    <div slot="blurb" class="padding-bottom-wide">
      <h1 class="padding-bottom-narrow">{content.title}</h1>
      {#if content.intro}
      <Wrapper
        centered={false}
        class="margin-right"
      >
        <div class="t-content padding-bottom">
          {@html content.intro}
        </div>
      </Wrapper>
      {/if}
      <Button
        href={content.shop}
        target="_blank"
        iconRight={arrow}
      >
        Find more prints at <strong>Etsy</strong>
      </Button>
    </div>

    <div slot="body" class="overflow-hidden">
      <Gallery>
        {#each pictures as picture}
          <li>
            <a
              class="t-link-undecorated"
              rel="prefetch"
              href="{picture.path}"
            >
              <ResponsivePicture
                sources={picture.thumbnail.versions}
                alt={picture.title}
                border
              />
            </a>
          </li>
        {/each}
      </Gallery>
    </div>
  </OutdentedBlurb>
</main>
