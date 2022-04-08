<script>
  import { titleize } from '@/utils/stringHelpers.js';
  import arrow from 'icons/arrow-right.svg';
  import AspectRatio from '@/components/AspectRatio.svelte';
  import Button from '@/components/Button.svelte';
  import Card from '@/components/Card.svelte';
  import Metadata from '@/components/Metadata.svelte';
  import ResponsiveImage from '@/components/ResponsiveImage.svelte';

  export let edition;

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
  ];
</script>

<Card>

  <!-- edition photo -->
  <div slot="figure">
    <AspectRatio>
      <ResponsiveImage
        sources="{edition.photo}"
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
      <Metadata
        data="{stats}"
        gutter="xxnarrow"
        size="{6}"
      />
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
</style>
