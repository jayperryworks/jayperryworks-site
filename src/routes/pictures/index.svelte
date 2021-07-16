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
  import { titleize } from '@/utils/stringHelpers.js'
  import arrow from 'icons/arrow-right.svg'
  import AspectRatio from '@/components/AspectRatio.svelte'
  import Button from '@/components/Button.svelte'
  import Gallery from '@/components/Gallery.svelte'
  import MainNav from '@/components/MainNav.svelte'
  import PageTitle from '@/components/PageTitle.svelte'
  import ResponsivePicture from '@/components/ResponsivePicture.svelte'
  import Wrapper from '@/components/Wrapper.svelte'

  export let content, pictures

  // get unique series values from pictures array
  // and remove empty/undefined values
  // -> https://stackoverflow.com/questions/1960473/get-all-unique-values-in-a-javascript-array-remove-duplicates#14438954
  $: picturesBySeries = [
  	...content.series.map((name) => {
  		return {
  			name: name,
  			pictures: pictures.filter(picture => picture.series === name)
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
      <h1 class="padding-bottom">{content.title}</h1>
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
    </header>

    <div class="margin-y-flow-wide padding-y-flow-wide overflow-hidden">
    	{#each picturesBySeries as series, index}
    		<section>
    			{#if series.name}
		    		<h2 class="type-scale-gamma type-font-accent color-fg-secondary padding-bottom type-weight-xlight">
              <strong class="type-weight-xlight color-fg-primary">{titleize(series.name)}</strong> series
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
                  <AspectRatio class="border solid">
  		              <ResponsivePicture
  		                sources={picture.thumbnail.versions}
  		                alt={picture.title}
                      cover
                      fill
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
