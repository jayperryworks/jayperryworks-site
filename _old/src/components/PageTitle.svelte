<script>
  export let title = 'Home'
  const siteName = 'Jay Perry'
</script>

<svelte:head>
  {#if title != 'Home'}
    <title>{siteName} | {title}</title>
  {:else}
    <title>{siteName}</title>
  {/if}
</svelte:head>
