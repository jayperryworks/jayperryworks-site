<script>
  import Bookend from '@/components/Bookend.svelte'
  import ResponsiveImage from '@/components/ResponsiveImage.svelte'

  export let heading, nav, breakpoint = 'small'
</script>

<style type="text/scss">
  @use 'config/border';
  @use 'config/breakpoints' as bp;
  @use 'config/scale';
  @use 'config/spacing';

  $bp-layout: 'small';
  $bp-card: 'xsmall';

  .wrapper {
    $radius: scale.get(2);

    @include border.add();
    display: block;


    @include bp.query('>#{$bp-layout}') {
      margin: 0;
      max-width: scale.get(18);

      &.left {
        border-bottom-right-radius: $radius;
      }

      &.right {
        border-bottom-left-radius: $radius;
        margin: 0 0 0 auto;
      }
    }
  }

  .card {
    display: block;

    @supports (display: flex) {
      display: flex;
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
      transform: translateY(-60%);
    }
  }
</style>

<nav class="c-bg-well
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
      See all
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
                <h3>Previous</h3>
                <p class="
                  t-style-italic
                  t-leading-tight
                  padding-top-xnarrow
                  c-fg-tertiary
                  t-scale-epsilon
                ">{nav.previous.title}</p>
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
                <h3>Next</h3>
                <p class="
                  t-style-italic
                  t-leading-tight
                  padding-top-xnarrow
                  c-fg-tertiary
                  t-scale-epsilon
                ">{nav.next.title}</p>
              </figcaption>
            </figure>
          </a>
        {/if}
      </div>
    </Bookend>
  </div>
</nav>
