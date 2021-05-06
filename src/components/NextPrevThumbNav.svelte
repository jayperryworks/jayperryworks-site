<script>
  import arrowLeft from 'icons/arrow-dotted-left.svg'
  import arrowRight from 'icons/arrow-dotted-right.svg'
  import index from 'icons/index.svg'
  import Bookend from '@/components/Bookend.svelte'
  import Icon from '@/components/Icon.svelte'
  import ResponsivePicture from '@/components/ResponsivePicture.svelte'

  export let heading, nav, breakpoint = 'small'
</script>

<nav class="c-bg-well border-seam-top-offset border-solid border-top padding-x-outside padding-y-xwide">
  <!-- heading and index link -->
  <div class="margin-bottom position-relative">
    <h2 class="t-align-center@small">
      {heading}
    </h2>
    <a
      href="pictures"
      class="index-button t-case-upper t-font-accent t-link-undecorated t-scale-zeta t-weight-bold c-fg-tertiary"
    >
      <Icon
        svg={index}
        margin="right"
        size="xlarge"
        class="no-margin-top hide-above@xsmall"
      />
      See all
      <Icon
        svg={index}
        margin="left"
        size="xlarge"
        class="no-margin-top hide-below@xsmall"
      />
    </a>
  </div>

  <!-- prev/next cards -->
  <div class="overflow-hidden">
    <Bookend
      breakpoint={breakpoint}
      align="stretch"
      class="gutter-wrapper"
      fillSide="both"
      itemWidth="27rem"
    >
      <div
        slot="left"
        class="gutter display-flex display-flex-column display-flex-fill"
      >
        {#if nav.previous}
          <a
            class="card left border padding-narrow"
            rel="prefetch"
            href={nav.previous.path}
          >
            <figure class="card-wrapper gutter-wrapper gutter-narrow">
              <div class="card-figure gutter">
                <ResponsivePicture
                  sources={nav.previous.thumbnail.versions}
                  alt={nav.previous.title}
                  border
                />
              </div>
              <figcaption class="card-content gutter">
                <h3 class="c-fg-tertiary t-font-accent t-weight-bold t-scale-zeta t-case-upper">
                  <Icon
                    svg={arrowLeft}
                    margin="right"
                    class="no-margin-top hide-small-icon"
                  />
                  Previous
                </h3>
                <p class="padding-bottom-narrow padding-top-xxnarrow t-heading t-scale-gamma">
                  {nav.previous.title}
                </p>
                <Icon
                  svg={arrowLeft}
                  size="xlarge"
                  class="no-margin show-large-icon"
                />
              </figcaption>
            </figure>
          </a>
        {/if}
      </div>
      <div
        slot="right"
        class="gutter display-flex display-flex-column display-flex-fill"
      >
        {#if nav.next}
          <a
            class="card right padding-narrow"
            rel="prefetch"
            href={nav.next.path}
          >
            <figure class="card-wrapper figure-right gutter-wrapper gutter-narrow">
              <div class="card-figure gutter">
                <ResponsivePicture
                  sources={nav.next.thumbnail.versions}
                  alt={nav.next.title}
                  border
                />
              </div>
              <figcaption class="card-content gutter">
                <h3 class="c-fg-tertiary t-font-accent t-weight-bold t-scale-zeta t-case-upper">
                  Next
                  <Icon
                    svg={arrowRight}
                    margin="left"
                    class="no-margin-top hide-small-icon"
                  />
                </h3>
                <p class="padding-bottom-narrow padding-top-xxnarrow t-heading t-scale-gamma">{nav.next.title}</p>
                <Icon
                  svg={arrowRight}
                  size="xlarge"
                  class="no-margin show-large-icon"
                />
              </figcaption>
            </figure>
          </a>
        {/if}
      </div>
    </Bookend>
  </div>
</nav>

<style>
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

  @media screen and (min-width: 42em) {
    .card.left {
      border-bottom-right-radius: 0.2em;
    }

    .card.right {
      border-bottom-left-radius: 0.2em;
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

  @media screen and (max-width: 49.99em) {
    :global(.show-large-icon) {
      display: none;
    }
  }

  @media screen and (min-width: 50em) {
    :global(.hide-small-icon) {
      display: none;
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
</style>