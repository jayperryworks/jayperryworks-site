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
  import PageTitle from '@/components/PageTitle.svelte'
  import MainNav from '@/components/MainNav.svelte'

  export let post;
  export let date;
</script>

<style>
</style>

<PageTitle title="{post.title}" />

<MainNav segment="pictures" theme="reverse" />
<main>
  <article>
    <header
      class="padding-x-outside padding-y-xwide"
      data-theme="reverse"
    >
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
</main>
