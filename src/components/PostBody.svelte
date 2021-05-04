<script>
  import { titleize } from '@/utils/stringHelpers.js'
  import Caption from './Caption.svelte'
  import Figure from './Figure.svelte'
  import Gallery from './Gallery.svelte'
  import Note from './Note.svelte'
  import Passage from './Passage.svelte'
  import ResponsiveImage from './ResponsiveImage.svelte'
  import ResponsivePicture from './ResponsivePicture.svelte'
  import Table from './Table.svelte'
  import Wrapper from './Wrapper.svelte'

  export let blocks, dropCap = true

  // create a list of sections from the yml blocks in each page
  $: sections = blocks.reduce((result, block) => {

    // if the block is a section, then add a new section to the array
    if (block.type === 'sectionStart') {
      result.push({
        uid: block.uid,
        label: block.label || titleize(block.uid),
        blocks: []
      })
      return result
    }

    // if the first blocks are outside a section, then make a generic div
    if (result.length === 0 && block.type !== 'sectionStart') {
      result.push({
        blocks: []
      })
    }

    // add the block object to the last 'section' array item
    result[result.length - 1].blocks.push(block)
    return result
  }, [])

  $: firstPassage = sections[0].blocks.find((block) => block.type === 'passage')

  function getWidth(prominence) {
    const widths = {
      small: 'narrow',
      medium: 'default',
      large: 'wide'
    }
    return widths[Object.keys(widths).find((item) => item == prominence)] || 'default'
  }
</script>

<div class="body">
  {#each sections as section}
    {#if section.uid}
      <section>
        {#each section.blocks as block}
          <Wrapper width={getWidth(section.prominence)} class="block-text">
            {block.type}
          </Wrapper>
        {/each}
      </section>
    {/if}

    {#each section.blocks as block}
      {#if block.type == 'note'}
        <Wrapper class="block-text">
          <Note html={block.html} />
        </Wrapper>
      {/if}

      {#if block.type == 'heading'}
        <Wrapper class="block-heading">
          <h2>{@html block.html}</h2>
        </Wrapper>
      {/if}

      {#if block.type == 'passage'}
        <Wrapper class="block-text">
          <Passage
            html={block.html}
            lead={dropCap && block == firstPassage}
          />
        </Wrapper>
      {/if}

      {#if block.type == 'figure'}
        <Wrapper width={getWidth(block.prominence)} class="t-align-center">
          <Figure
            sources={block.image}
            alt={block.alt}
            caption={block.caption}
            credit={block.credit}
            border={block.border}
          />
        </Wrapper>
      {/if}

      {#if block.type == 'gallery'}
        <Wrapper width={getWidth(block.prominence)}>
          <Figure
            caption={block.caption}
            credit={block.credit}
          >
            <Gallery size={block.size}>
              {#each block.images as item}
                <li class="t-align-center">
                  {#if item.image.versions && item.image.versions.length > 1}
                    <ResponsivePicture
                      sources={item.image.versions}
                      alt={item.alt}
                      border={item.border}
                    />
                  {:else}
                    <ResponsiveImage
                      sources={item.image.versions && item.image.versions[0].sizes || item.image}
                      alt={item.alt}
                      border={item.border}
                    />
                  {/if}
                </li>
              {/each}
            </Gallery>
          </Figure>
        </Wrapper>
      {/if}

      {#if block.type == 'table'}
        <Wrapper width={getWidth(block.prominence)}>
          <Table
            headingColumns={block.keyColumns}
            header={block.header}
            body={block.body}
            footer={block.footer}
          />
        </Wrapper>
      {/if}

      {#if block.type == 'update'}
        <Wrapper class="block-text">
          <h3 class="border-top padding-bottom-narrow padding-top t-case-upper t-font-accent t-scale-zeta t-weight-bold">Update</h3>
          <Passage html={block.html} />
        </Wrapper>
      {/if}
    {/each}

  {/each}
</div>

<style type="text/scss">
  @use "config/spacing";

  .body {
    > :global(* + *) {
      padding-top: spacing.get('wide');
    }

    :global(.block-heading + .block-text) {
      padding-top: spacing.get('narrow');
    }

    // when two sections of type follow one another, add "invisible" spacing between so they feel like one continuous flow of text
    :global(.block-text + .block-text) {
      padding-top: spacing.get();
    }
  }
</style>