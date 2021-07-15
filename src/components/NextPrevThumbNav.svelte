<script>
  import { titleize } from '@/utils/stringHelpers.js'
  import arrowLeft from 'icons/arrow-left.svg'
  import arrowRight from 'icons/arrow-right.svg'
  import index from 'icons/index.svg'
  import AspectRatio from '@/components/AspectRatio.svelte'
  import Icon from '@/components/Icon.svelte'
  import ResponsivePicture from '@/components/ResponsivePicture.svelte'

  export let heading, nav, breakpoint = 'small'
</script>

<nav class="border-seam-top border-solid border-top padding-x-outside padding-y-xwide">
  <!-- heading and index link -->
  <header class="margin-bottom">
    <h2>
      {heading}
    </h2>
    <a
      href="pictures"
      class="index-button type-font-accent type-link-undecorated type-weight-light color-fg-secondary"
    >
      See all
      <Icon
        margin="left"
        size="large"
        svg={index}
      />
    </a>
  </header>

  <!-- prev/next cards -->
  <div class="hide-overflow">
    <div class="gutter-wrapper wide">
      {#each Object.keys(nav) as link}
        <div class="gutter">
          <a
            class="card type-link-undecorated"
            rel="prefetch"
            href="{nav[link].path}"
          >
            <figure class="card-wrapper gutter-wrapper gutter-narrow">
              <div class="card-figure gutter">
                <AspectRatio class="border">
                  <ResponsivePicture
                    sources="{nav[link].thumbnail.versions}"
                    alt="{nav[link].title}"
                    cover
                  />
                </AspectRatio>
              </div>
              <figcaption class="card-content gutter">
                <h3 class="c-fg-tertiary t-font-accent t-weight-bold t-scale-zeta t-case-upper">
                  {#if link === 'previous'}
                    <Icon
                      svg="{arrowLeft}"
                      margin="right"
                    />
                  {/if}
                  {titleize(link)}
                  {#if link === 'next'}
                    <Icon
                      svg="{arrowRight}"
                      margin="left"
                    />
                  {/if}
                </h3>
              </figcaption>
            </figure>
          </a>
        </div>
      {/each}
    </div>
  </div>
</nav>

<style>
  header {
    position: relative;
  }

  .index-button {
    display: inline-block;
    padding-top: var(--space-narrow);
  }
  
  @media screen and (min-width: 30em) {
    .index-button {
      line-height: 1;
      padding-top: 0;
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
    }
  }

  .card {
    display: block;
  }
  
  @supports (display: flex) {
    .card {
      flex: 1;
      display: flex;
      flex-direction: column;
    }
  }

  .card-wrapper {
    display: block;
  }
  
  @supports (display: flex) {
    .card-wrapper {
      display: flex;
    }
  }

  .card-figure {
    display: block;
    max-width: 6.19rem;
  }
  
  @media screen and (min-width: 42em) {
    .figure-right .card-figure {
      order: 2;
    }
  }

  @media screen and (min-width: 50em) {
    .card-figure {
      max-width: 7.43rem;
    }
  }

  @media screen and (min-width: 62em) {
    .card-figure {
      max-width: 8.92rem;
    }
  }

  .card-content {
    font-size: 1rem;
    display: block;
  }
  
  @supports (flex: 1) {
    @media screen and (min-width: 30em) {
      .card-content {
        flex: 1;
      }
    }

    @media screen and (min-width: 42em) {
      .figure-right .card-content {
        order: 1;
      }
    }
  }
</style>