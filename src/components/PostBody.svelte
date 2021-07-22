<script>
  import { titleize } from '@/utils/stringHelpers.js'
  import BlockList from './BlockList.svelte'

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
</script>

<div class="body padding-y-flow-xwide margin-y-flow-xwide">
  {#each sections as section}
    {#if section.uid}
      <section id={section.uid}>
        <BlockList blocks={section.blocks} />
      </section>
    {:else}
      <BlockList blocks={section.blocks} />
    {/if}
  {/each}
</div>

<style>
  section:not(:first-child)::before {
    border-top: 1px dashed var(--color-border);
    content: '';
    display: block;
    height: 0;
    left: 50%;
    position: absolute;
    top: 0;
    transform: translateX(-50%);
    width: var(--content-width-default);
  }
</style>
