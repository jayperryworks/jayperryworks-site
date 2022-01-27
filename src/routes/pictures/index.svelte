<script context="module">
  export async function preload() {
    const picturesResponse = await this.fetch('pictures.json');
    const pictures = await picturesResponse.json();

    const seriesResponse = await this.fetch('pictures/series.json');
    const series = await seriesResponse.json();

    if (picturesResponse.status !== 200 || seriesResponse.status !== 200) {
      this.error(picturesResponse.status, pictures.message);
      this.error(seriesResponse.status, series.message);
      return;
    }

		// group the pictures data by series in one big array
		let picturesBySeries = series.map((group) => {
			const seriesPictures = pictures.filter(picture => picture.series === group.uid);

			return {
				...group,
				ratio: seriesPictures?.[0]?.ratio,
				pictures: seriesPictures
			}
		});

		// add pictures to the array that aren't part of a series
		picturesBySeries.push({
			pictures: pictures.filter(picture => !picture.series)
		});

    return { picturesBySeries };
  }
</script>

<script>
  import { format } from 'date-fns';
  import { titleize } from '@/utils/stringHelpers.js';
  import arrow from 'icons/arrow-right.svg';
  import AspectRatio from '@/components/AspectRatio.svelte';
  import Button from '@/components/Button.svelte';
  import Gallery from '@/components/Gallery.svelte';
  import MainNav from '@/components/MainNav.svelte';
  import PageTitle from '@/components/PageTitle.svelte';
  import ResponsiveImage from '@/components/ResponsiveImage.svelte';
  import Wrapper from '@/components/Wrapper.svelte';

  export let picturesBySeries;
</script>

<PageTitle title="Pictures" />

<MainNav segment="pictures" />

<main class="padding-x-outside padding-y-xwide">
  <Wrapper width="xxwide">
    <header class="padding-bottom-wide">
      <h1>Recent work</h1>
    </header>

    <div class="padding-y-flow-xwide overflow-hidden">
    	{#each picturesBySeries as series}
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
