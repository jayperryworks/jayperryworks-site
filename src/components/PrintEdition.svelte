<script>
  import { titleize } from '@/utils/stringHelpers.js'
  import arrow from 'icons/arrow-right.svg'
  import AspectRatio from '@/components/AspectRatio.svelte'
  import Button from '@/components/Button.svelte'
  import Card from '@/components/Card.svelte'
  import ResponsivePicture from '@/components/ResponsivePicture.svelte'

  export let edition

  $: stats = [
    {
      label: 'Type',
      value: titleize(edition.type)
    },
    {
      label: 'Size',
      value: `${edition.width}" x ${edition.height}"`
    },
    {
      label: 'Paper size',
      value: `${edition.width + (edition.border * 2)}" x ${edition.height + (edition.border * 2)}"`
    }
  ]
</script>

<Card>

  <!-- edition photo -->
  <div slot="figure">
    <AspectRatio>
      <ResponsivePicture
        sources="{edition.photo.versions}"
        alt="{titleize(edition.name)}"
        cover
      />
    </AspectRatio>
  </div>

<!-- edition info -->
  <div
    slot="content"
    class="info-wrapper gutter-wrapper"
  >
    <div class="info gutter">

      <!-- name -->
      <h3 class="padding-bottom-xnarrow color-fg-secondary">
        <strong class="color-fg-primary type-font-display">
          {titleize(edition.name)}
        </strong> 
        {titleize(edition.type)}&nbsp;Print
      </h3>

      <!-- metadata -->
      <dl class="stats">
        {#each stats as stat}
        <div class="stats-group type-scale-zeta">
          <dt class="stats-item stats-label | type-font-accent type-weight-light | color-fg-secondary">
            {stat.label}
          </dt>
          <dd class="stats-item type-font-accent type-weight-light">
            {stat.value}
          </dd>
        </div>
        {/each}
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
    display: block;
    margin-left: 0; /* reset dt/dd default indent */
    vertical-align: baseline;
  }
  
  .stats-label::after {
    content: ':';
  }
</style>