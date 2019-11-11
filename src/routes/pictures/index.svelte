<script context="module">
  export function preload({ params, query }) {
    return this
      .fetch(`pictures.json`)
      .then(r => r.json())
      .then(pictures => {
        return { pictures }
      })
  }
</script>

<script>
  import { format } from 'date-fns'
  import arrow from 'icons/arrow-right.svg'
  import PageTitle from '@/components/PageTitle.svelte'
  import OutdentedBlurb from '@/components/OutdentedBlurb.svelte'
  import Gallery from '@/components/Gallery.svelte'
  import ResponsiveImage from '@/components/ResponsiveImage.svelte'
  import Button from '@/components/Button.svelte'

  export let pictures

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

<OutdentedBlurb
  class="padding-x-outside padding-y-xwide"
  blurbWidth="narrow"
  bodyWidth="wide"
>
  <div slot="blurb" class="padding-bottom-wide">
    <h1 class="padding-bottom-narrow">Recent work</h1>
    <Button
      url="https://jayperry.etsy.com"
      iconRight={arrow}
    >
      More prints avaialble at <strong>Etsy</strong>
    </Button>
  </div>

  <div slot="body" class="overflow-hidden">
    <Gallery>
      {#each pictures as picture}
        <li>
          <a
            class="t-link-undecorated"
            rel='prefetch'
            href='{`pictures/${picture.date.year}/${picture.slug}`}'
          >
            <ResponsiveImage
              sources={picture.thumbnail}
              alt={picture.title}
            />
          </a>
        </li>
      {/each}
    </Gallery>
  </div>
</OutdentedBlurb>
