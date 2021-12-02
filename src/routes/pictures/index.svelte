<script context="module">
  export async function preload({ params, query }) {
    const response = await this.fetch('pictures.json')
    const data = await response.json()

    if (response.status !== 200) {
      this.error(response.status, data.message)
      return
    }

    return {
      series: data.series,
      pictures: data.pictures
    }
  }
</script>

<script>
  import { format } from 'date-fns'
  import { titleize } from '@/utils/stringHelpers.js'
  import arrow from 'icons/arrow-right.svg'
  import AspectRatio from '@/components/AspectRatio.svelte'
  import Button from '@/components/Button.svelte'
  import Gallery from '@/components/Gallery.svelte'
  import MainNav from '@/components/MainNav.svelte'
  import PageTitle from '@/components/PageTitle.svelte'
  import ResponsiveImage from '@/components/ResponsiveImage.svelte'
  import Wrapper from '@/components/Wrapper.svelte'

  export let series, pictures

  // sort the pictures list by series
  $: picturesBySeries = [
  	...series.map(({ title, uid }) => {
			const seriesPictures = pictures.filter(picture => picture.series === uid);

  		return {
  			title,
  			pictures: seriesPictures,
				ratio: seriesPictures[0].ratio
  		}
  	}),
  	// unsorted pictures (no series)
  	{
  		name: false,
  		pictures: pictures.filter(picture => !picture.series)
  	}
  ]
</script>

<PageTitle title="Pictures" />

<MainNav segment="pictures" />

<main class="padding-x-outside padding-y-xwide">
  <Wrapper width="xxwide">
    <header class="padding-bottom-wide">
      <h1>Recent work</h1>
    </header>

    <div class="padding-y-flow-xwide overflow-hidden">
    	{#each picturesBySeries as series, index}
    		<section>
    			{#if series.title}
		    		<h2 class="type-scale-gamma type-font-accent color-fg-secondary padding-bottom type-weight-xlight">
              <strong class="type-weight-xlight color-fg-primary">{titleize(series.title)}</strong> series
            </h2>
    			{/if}
		      <Gallery>
		        {#each series.pictures as picture}
		          <li>
		            <a
		              class="type-link-undecorated"
		              rel="prefetch"
		              href="{picture.path}"
		            >
                  <AspectRatio
										class="border solid"
										ratio="{series.ratio}"
										useScale="{series.ratio ? false : true}"
									>
  		              <ResponsiveImage
  		                sources={picture.cover.image}
  		                alt={picture.cover.alt}
                      cover
  		              />
                  </AspectRatio>
		            </a>
		          </li>
		        {/each}
		        {#if series.pictures.length < 4}
		          <li><!-- filler item for scaling --></li>
		          <li><!-- filler item for scaling --></li>
	          {/if}
		      </Gallery>
    		</section>
    	{/each}
    </div>
  </Wrapper>
</main>
