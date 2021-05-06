<script>
  import { titleize } from '@/utils/stringHelpers.js'
  import BlockList from './BlockList.svelte'

  export let blocks, dropCap = true

  // create a list of sections from the yml blocks in each page
  let sections = blocks.reduce((result, block) => {

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

  // add dropCap flag to first passage
  if (dropCap) {
    sections[0].blocks.find((block) => block.type === 'passage').dropCap = true
  }
</script>

<div class="body">
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

<style type="text/scss">
  @use "config/spacing";
  @use "config/border";
  @use "config/layout_width";

  .body {
    > section:not(:first-child) {
      padding-top: spacing.get('xwide');
      position: relative;
    }

    > section:not(:first-child)::before {
      @include border.add('top');
      content: '';
      display: block;
      height: 0;
      left: 50%;
      position: absolute;
      top: 0;
      transform: translateX(-50%);
      width: layout_width.get('default');
    }

    > :global(* + section) {
      margin-top: spacing.get('xwide');
    }
  }
</style>