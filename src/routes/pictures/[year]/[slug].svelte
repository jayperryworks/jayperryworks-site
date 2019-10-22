<script context="module">
  export async function preload({ params, query }) {
    const { year, month, day, slug } = params
    // the `slug` parameter is available because
    // this file is called [slug].svelte
    const response = await this.fetch(`pictures/${year}/${slug}.json`)
    const data = await response.json()

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

<svelte:head>
  <title>Jay Perry | {post.title}</title>
</svelte:head>

<article>
  <header>
    <img src="{post.cover[0].path}" alt="{post.title}">
    <h1>{post.title}</h1>
    <time datetime='{format(new Date(date.year), 'yyyy')}'>
      {format(new Date(date.year), 'yyyy')}
    </time>
    <p>{post.format}{#if post.width && post.height}&nbsp;&bull; {post.width}" x {post.height}"{/if}</p>
  </header>

  {#if post.intro}
    <div class='content'>
      {@html post.intro}
    </div>
  {/if}

  {#if post.editions}
    <section>
      <h2>Available editions</h2>
      {#each post.editions as edition}
        <ul>
          <li>
            <img src="{edition.photo[0].path}" alt="{edition.name}">
            <aside>
              <h3>{edition.name}</h3>
              <dl>
                <dt>Type</dt>
                <dd>{edition.type}</dd>
                <dt>Size</dt>
                <dd>{edition.width}" x {edition.height}"</dd>
                <dt>Paper size</dt>
                <dd>{edition.width + edition.border}" x {edition.height + edition.border}"</dd>
              </dl>
            </aside>
          </li>
        </ul>
      {/each}
    </section>
  {/if}
</article>
