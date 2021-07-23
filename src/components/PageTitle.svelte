<script>
  export let title = 'Home'
  export let highlightColor = { h: 250, s: 60, l: 60 }

  const siteName = 'Jay Perry'

  $: style = `
    <style>
      :root {
        --color-highlight-h: ${highlightColor.h};
        --color-highlight-s: ${highlightColor.s}%;
        --color-highlight-l: ${highlightColor.l}%;
      }
    </style>
  `
</script>

<svelte:head>
  {#if title != 'Home'}
    <title>{siteName} | {title}</title>
  {:else}
    <title>{siteName}</title>
  {/if}

  {@html style}
</svelte:head>
