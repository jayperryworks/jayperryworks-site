<script>
  import { titleize } from '@/utils/stringHelpers.js'
  import arrowLeft from 'icons/arrow-left.svg'
  import arrowRight from 'icons/arrow-right.svg'
  import index from 'icons/index.svg'
  import AspectRatio from '@/components/AspectRatio.svelte'
  import Icon from '@/components/Icon.svelte'
  import ResponsivePicture from '@/components/ResponsivePicture.svelte'

  export let heading, nav
</script>

<nav class="border-seam-top border-solid border-top padding-x-outside padding-y-xwide">
  <!-- heading and index link -->
  <header class="padding-bottom-wide hide-overflow">
    <div class="header-wrapper gutter-wrapper">
      <h2 class="gutter">{heading}</h2>
      <a
        href="pictures"
        class="gutter | type-font-accent type-link-undecorated type-weight-light | color-fg-secondary"
      >
        See all
        <Icon
          margin="left"
          size="large"
          svg={index}
        />
      </a>
    </div>
  </header>

  <!-- prev/next cards -->
  <div class="cards gutter-wrapper hide-overflow">
    {#each Object.keys(nav) as link}
      <a
        class="card gutter narrow type-link-undecorated"
        rel="prefetch"
        href="{nav[link].path}"
      >
        <div class="card-figure">
          <AspectRatio class="border solid">
            <ResponsivePicture
              sources="{nav[link].thumbnail.versions}"
              alt="{nav[link].title}"
              cover
            />
          </AspectRatio>
        </div>
        <h3 class="padding-top">
          {#if link === 'previous'}
            <Icon
              svg="{arrowLeft}"
              margin="right"
              size="small"
            />
          {/if}
          {titleize(link)}
          {#if link === 'next'}
            <Icon
              svg="{arrowRight}"
              margin="left"
              size="small"
            />
          {/if}
        </h3>
      </a>
    {/each}
  </div>
</nav>

<style>
  .card-figure {
    max-width: 18rem;
  }

  @supports (display: flex) {
    .header-wrapper {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      align-items: center;
    }

    .cards {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
    }

    .card {
      flex: 0 1 18rem;
      display: flex;
      flex-wrap: wrap;
    }

    .card:last-child {
      justify-content: flex-end;
    }

    .card-figure {
      max-width: 100%;
      width: 100%;
    }
  }
</style>