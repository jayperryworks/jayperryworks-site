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
  import PageTitle from '@/components/PageTitle.svelte'
  import OutdentedBlurb from '@/components/OutdentedBlurb.svelte'
  import Gallery from '@/components/Gallery.svelte'

  export let pictures
</script>

<style>
  h1 {
    margin-top: -0.38em;
  }

  ul {
    margin: 0 0 1em 0;
    line-height: 1.5;
  }
</style>

<PageTitle title="Pictures" />

<OutdentedBlurb class="padding-x-outside padding-y-xwide">
  <div slot="blurb" class="padding-bottom-wide">
    <h1 class="padding-bottom-narrow">Recent work</h1>
    <a href="https://jayperry.etsy.com">More prints avaialble at <strong>Etsy</strong> &rsaquo;</a>
  </div>

  <div slot="body" class="overflow-hidden">
    <Gallery>
      {#each pictures as picture}
        <li>
          <a
            rel='prefetch'
            href='{`pictures/${picture.date.year}/${picture.slug}`}'
          >
            <img src="{picture.thumbnail[0].path}" alt="{picture.thumbnail[0].alt}">
            <h2>{picture.title}</h2>
          </a>
        </li>
        <li>
          <a
            rel='prefetch'
            href='{`pictures/${picture.date.year}/${picture.slug}`}'
          >
            <img src="{picture.thumbnail[0].path}" alt="{picture.thumbnail[0].alt}">
            <h2>{picture.title}</h2>
          </a>
        </li>
        <li>
          <a
            rel='prefetch'
            href='{`pictures/${picture.date.year}/${picture.slug}`}'
          >
            <img src="{picture.thumbnail[0].path}" alt="{picture.thumbnail[0].alt}">
            <h2>{picture.title}</h2>
          </a>
        </li>
      {/each}
    </Gallery>
  </div>
</OutdentedBlurb>
