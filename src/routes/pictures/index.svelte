<script context="module">
  export function preload({ params, query }) {
    return this
      .fetch(`pictures.json`)
      .then(r => r.json())
      .then(pictures => {
        return { pictures };
      });
  }
</script>

<script>
  import { format } from 'date-fns'

  export let pictures;
</script>

<style>
  ul {
    margin: 0 0 1em 0;
    line-height: 1.5;
  }
</style>

<svelte:head>
  <title>Writing</title>
</svelte:head>

<h1>Recent work</h1>

<ul>
  {#each pictures as picture}
    <li>
      <a
        rel='prefetch'
        href='{`pictures/${picture.date.year}/${picture.slug}`}'
      >
        <img src="{picture.thumbnail[0].path}" alt="{picture.thumbnail[0].alt}">
        <h2>{picture.title}</h2>
      </a>
    </li>
  {/each}
</ul>
