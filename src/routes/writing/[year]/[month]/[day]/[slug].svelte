<script context="module">
  export async function preload({ params, query }) {
    const { year, month, day, slug } = params
    // the `slug` parameter is available because
    // this file is called [slug].svelte
    const response = await this.fetch(`writing/${year}/${month}/${day}/${slug}.json`);
    const data = await response.json();

    if (response.status !== 200) {
      this.error(response.status, data.message)
      return
    }

    return {
      post: data,
      date: {
        year,
        month,
        day
      }
    }
  }
</script>

<script>
  import { format } from 'date-fns'
  import PageTitle from '../../../../../components/PageTitle.svelte'

  export let post;
  export let date;
</script>

<style>
  /*
    By default, CSS is locally scoped to the component,
    and any unused styles are dead-code-eliminated.
    In this page, Svelte can't know which elements are
    going to appear inside the {{{post.html}}} block,
    so we have to use the :global(...) modifier to target
    all elements inside .content
  */
  .content :global(h2) {
    font-size: 1.4em;
    font-weight: 500;
  }

  .content :global(pre) {
    background-color: #f9f9f9;
    box-shadow: inset 1px 1px 5px rgba(0,0,0,0.05);
    padding: 0.5em;
    border-radius: 2px;
    overflow-x: auto;
  }

  .content :global(pre) :global(code) {
    background-color: transparent;
    padding: 0;
  }

  .content :global(ul) {
    line-height: 1.5;
  }

  .content :global(li) {
    margin: 0 0 0.5em 0;
  }
</style>

<PageTitle title="{post.title}" />

<article>
  <header>
    <h1>{post.title}</h1>
    {#if post.subtitle}
      <p>{post.subtitle}</p>
    {/if}
    <time datetime='{format(new Date(date.year, date.month, date.day), 'yyyy-M-dd')}'>
      {format(new Date(date.year, date.month, date.day), 'MMMM d, yyyy')}
    </time>
  </header>

  <div class='content'>
    {#each post.body as section}
      <section>
        {#if section.html}
          {@html section.html}
        {/if}
      </section>
    {/each}
  </div>
</article>
