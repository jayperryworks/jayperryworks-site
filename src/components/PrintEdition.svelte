<script>
  import { titleize } from '@/utils/stringHelpers.js'
  import arrow from 'icons/arrow-right.svg'
  import Button from '@/components/Button.svelte'
  import Card from '@/components/Card.svelte'
  import FluidAspectImage from '@/components/FluidAspectImage.svelte'

  export let edition
</script>

<Card>

  <!-- edition photo -->
  <div slot="figure">
    <FluidAspectImage
      sources={edition.photo}
      alt={titleize(edition.name)}
      cover
    />
  </div>

  <!-- edition info -->
  <div
    slot="content"
    class="info-wrapper gutter-wrapper"
  >
    <div class="info gutter">

      <!-- name -->
      <h3 class="c-fg-tertiary padding-bottom-xnarrow">
        <strong class="
          c-fg-primary
          t-font-display
        ">{titleize(edition.name)}</strong> {titleize(edition.type)}&nbsp;Print
      </h3>

      <!-- metadata -->
      <dl class="stats">
        <div class="stats-group">
          <dt class="stats-item stats-label">Type</dt>
          <dd class="stats-item">{titleize(edition.type)}</dd>
        </div>
        <div class="stats-group">
          <dt class="stats-item stats-label">Size</dt>
          <dd class="stats-item">{edition.width}" x {edition.height}"</dd>
        </div>
        <div class="stats-group">
          <dt class="stats-item stats-label">Paper size</dt>
          <dd class="stats-item">{edition.width + (edition.border * 2)}" x {edition.height + (edition.border * 2)}"</dd>
        </div>
      </dl>
    </div>

    <!-- purchase button -->
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

<style>
  .info-wrapper {
    --breakpoint: 10rem;

  }
  
  @supports (display: flex) {
    @media screen and (min-width: 30em) {
      .info-wrapper {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
      }
      
      .info {
        flex: 1 0 var(--breakpoint);
      }
    }
  }

  .stats {
    --min-width: 6rem;
    list-style: none;
  }

  .stats-group {
    display: inline-block;
    margin: 0;
    width: var(--min-width);
  }
  
  @media screen and (min-width: 30em) {
    .stats-group {
      max-width: 100%;
      min-width: var(--min-width);
      width: calc((var(--breakpoint) - 100%) * 1000);
    }
  }

  .stats-item {
    color: var(--color-secondary);
    display: block;
    font-family: var(--type-font-accent);
    font-size: var(--type-scale-zeta);
    margin-left: 0; /* reset dt/dd default indent */
    vertical-align: baseline;
  }

  .stats-label {
    color: var(--color-tertiary);
  }
  
  .stats-label::after {
    content: ':';
  }
</style>