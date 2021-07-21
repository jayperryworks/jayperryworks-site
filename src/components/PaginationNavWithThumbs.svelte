<script>
  import { titleize } from '@/utils/stringHelpers.js'
  import arrowLeft from 'icons/arrow-left.svg'
  import arrowRight from 'icons/arrow-right.svg'
  import index from 'icons/index.svg'
  import AspectRatio from '@/components/AspectRatio.svelte'
  import Icon from '@/components/Icon.svelte'
  import PaginationNav from '@/components/PaginationNav.svelte'
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
  <PaginationNav>
    {#each Object.keys(nav) as link}
      <li class="card {link} gutter">
        <a
          class="card-figure type-link-undecorated"
          href="{nav[link].path}"
        >
          <AspectRatio class="border solid">
            <ResponsivePicture
              sources="{nav[link].thumbnail.versions}"
              alt="{nav[link].title}"
              cover
            />
          </AspectRatio>
        </a>
        <h3 class="padding-top">
          {#if link === 'previous'}
            <Icon
              svg="{arrowLeft}"
              margin="right"
              size="small"
            />
          {/if}
          <a
            class="card-link"
            href="{nav[link].path}"
          >
            {titleize(link)}
          </a>
          {#if link === 'next'}
            <Icon
              svg="{arrowRight}"
              margin="left"
              size="small"
            />
          {/if}
        </h3>
      </li>
    {/each}
  </PaginationNav>
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

    .card-figure {
      width: 100%;
    }

    .card-link {
      display: inline-block;
    }
  }
</style>