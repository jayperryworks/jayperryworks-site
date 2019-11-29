<script>
  import Bookend from '@/components/Bookend.svelte'
  import ResponsiveImage from '@/components/ResponsiveImage.svelte'
  import Icon from '@/components/Icon.svelte'
  import arrowLeft from 'icons/arrow-dotted-left.svg'
  import arrowRight from 'icons/arrow-dotted-right.svg'
  import index from 'icons/index.svg'

  export let heading, nav, breakpoint = 'small'
</script>

<style type="text/scss">
  @use 'config/border';
  @use 'config/breakpoints' as bp;
  @use 'config/scale';
  @use 'config/spacing';
  @use 'config/type';

  $bp-layout: 'small';
  $bp-card: 'xsmall';

  .wrapper {
    @include border.add();
    display: block;


    @include bp.query('>#{$bp-layout}') {
      margin: 0;
      max-width: scale.get(18);

      &.left {
        border-bottom-right-radius: border.$corner-radius;
      }

      &.right {
        border-bottom-left-radius: border.$corner-radius;
        margin: 0 0 0 auto;
      }
    }
  }

  .card {
    display: block;

    @supports (display: flex) {
      display: flex;
    }

    :global(.show-large-icon) {
      @include bp.query('<50em') {
        display: none;
      }
    }

    :global(.hide-small-icon) {
      @include bp.query('>50em') {
        display: none;
      }
    }
  }

  .figure {
    display: block;
    max-width: scale.get(10);

    @include bp.query('>#{$bp-layout}') {
      .figure-right & {
        order: 2;
      }
    }

    @include bp.query('>50em') {
      max-width: scale.get(11);
    }

    @include bp.query('>medium') {
      max-width: scale.get(12);
    }
  }

  .content {
    @include type.size-default;
    display: block;

    @supports (flex: 1) {
      @include bp.query('>#{$bp-card}') {
        flex: 1;
      }

      @include bp.query('>#{$bp-layout}') {
        .figure-right & {
          order: 1;
        }
      }
    }
  }

  .index-button {
    display: inline-block;
    padding-top: spacing.get('narrow');

    @include bp.query('>xsmall') {
      line-height: 1;
      padding-top: 0;
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
    }
  }
</style>

<nav class="
  c-bg-well
  border-seam-top-offset
  border-solid
  border-top
  padding-x-outside
  padding-y-xwide
">
  <!-- heading and index link -->
  <div class="margin-bottom position-relative">
    <h2 class="t-align-center@small">
      {heading}
    </h2>
    <a
      href="pictures"
      class="
        index-button
        t-case-upper
        t-font-accent
        t-link-undecorated
        t-scale-zeta
        t-weight-bold
        c-fg-tertiary
      "
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
      align="top"
      breakpoint="small"
      class="gutter-wrapper"
      fillSide="both"
    >
      <div slot="left" class="gutter">
        {#if nav.previous}
          <a
            class="
              display-block
              padding-narrow
              wrapper left
            "
            rel="prefetch"
            href={nav.previous.path}
          >
            <figure class="
              card
              gutter-wrapper
              gutter-narrow
            ">
              <div class="figure gutter">
                <ResponsiveImage
                  sources={nav.previous.thumbnail}
                  alt={nav.previous.title}
                />
              </div>
              <figcaption class="content gutter">
                <h3 class="
                  c-fg-tertiary
                  t-font-accent
                  t-weight-bold
                  t-scale-zeta
                  t-case-upper
                ">
                  <Icon
                    svg={arrowLeft}
                    margin="right"
                    class="no-margin-top hide-small-icon"
                  />
                  Previous
                </h3>
                <p class="
                  padding-bottom-narrow
                  padding-top-xxnarrow
                  t-heading
                  t-scale-gamma
                ">{nav.previous.title}</p>
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
      <div slot="right" class="gutter">
        {#if nav.next}
          <a
            class="
              display-block
              padding-narrow
              wrapper right
            "
            rel="prefetch"
            href={nav.next.path}
          >
            <figure class="
              card
              figure-right
              gutter-wrapper
              gutter-narrow
            ">
              <div class="figure gutter">
                <ResponsiveImage
                  sources={nav.next.thumbnail}
                  alt={nav.next.title}
                />
              </div>
              <figcaption class="content gutter">
                <h3 class="
                  c-fg-tertiary
                  t-font-accent
                  t-weight-bold
                  t-scale-zeta
                  t-case-upper
                ">
                  Next
                  <Icon
                    svg={arrowRight}
                    margin="left"
                    class="no-margin-top hide-small-icon"
                  />
                </h3>
                <p class="
                  padding-bottom-narrow
                  padding-top-xxnarrow
                  t-heading
                  t-scale-gamma
                ">{nav.previous.title}</p>
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
