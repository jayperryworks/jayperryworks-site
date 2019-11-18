<script>
  import { titleize } from '@/utils/stringHelpers.js'
  import arrow from 'icons/arrow-right.svg'
  import Button from '@/components/Button.svelte'
  import Card from '@/components/Card.svelte'
  import ResponsiveImage from '@/components/ResponsiveImage.svelte'

  export let edition
</script>

<style type="text/scss">
  @use 'config/breakpoints';
  @use 'config/color';
  @use 'config/type';

  $breakpoint: 20rem;
  $stats-min-width: 6rem;

  .info-wrapper {
    --breakpoint: #{$breakpoint};

    @supports (display: flex) {
      @include breakpoints.query('>xsmall') {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
      }
    }
  }

  .info {
    @supports (flex: 1 0 #{$breakpoint}) {
      @include breakpoints.query('>xsmall') {
        flex: 1 0 $breakpoint;
        flex: 1 0 var(--breakpoint);
      }
    }
  }

  .stats {
    --min-width: #{$stats-min-width};
    list-style: none;
  }

  .stats-group {
    display: inline-block;
    margin: 0;
    width: $stats-min-width;
    width: var(--min-width);

    @include breakpoints.query('>xsmall') {
      max-width: 100%;
      min-width: $stats-min-width;
      min-width: var(--min-width);
      width: calc((var(--breakpoint) - 100%) * 1000);
    }
  }

  .stats-item {
    @include color.add-fg('secondary');
    @include type.font-accent;
    display: block;
    font-size: type.scale('zeta');
    margin-left: 0; // reset dt/dd default indent
    vertical-align: baseline;
  }

  .stats-label {
    @include color.add-fg('tertiary');

    &::after {
      content: ':';
    }
  }
</style>

<Card>
  <div slot="figure">
    <ResponsiveImage
      sources={edition.photo}
      alt={titleize(edition.name)}
    />
  </div>
  <div
    slot="content"
    class="
      info-wrapper
      gutter-wrapper
    "
  >
    <div class="info gutter">
      <h3 class="
        padding-bottom-xnarrow
        c-fg-tertiary
      ">
        <strong class="
          t-font-display
          c-fg-primary
        ">{titleize(edition.name)}</strong> {titleize(edition.type)} Print
      </h3>
      <dl class="stats">
        <div class="stats-group">
          <dt class="
            stats-item
            stats-label
          ">Type</dt>
          <dd class="stats-item">{titleize(edition.type)}</dd>
        </div>
        <div class="stats-group">
          <dt class="
            stats-item
            stats-label
          ">Size</dt>
          <dd class="stats-item">{edition.width}" x {edition.height}"</dd>
        </div>
        <div class="stats-group">
          <dt class="
            stats-item
            stats-label
          ">Paper size</dt>
          <dd class="stats-item">{edition.width + edition.border}" x {edition.height + edition.border}"</dd>
        </div>
      </dl>
    </div>
    <div class="gutter">
      <Button
        href={edition.url}
        target="_blank"
        size="small"
        iconRight={arrow}
      >
        Buy on <strong>Etsy</strong>
      </Button>
    </div>
  </div>
</Card>
