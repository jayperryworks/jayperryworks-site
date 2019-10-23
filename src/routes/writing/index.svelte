<script context="module">
  export function preload({ params, query }) {
    return this
      .fetch(`writing.json`)
      .then(r => r.json())
      .then(posts => {
        return { posts }
      })
  }
</script>

<script>
  import { format } from 'date-fns'
  import PageTitle from '../../components/PageTitle.svelte'

  export let posts
</script>

<style>
  ul {
    margin: 0 0 1em 0;
    line-height: 1.5;
  }
</style>

<PageTitle title="Writing" />

<h1>Recent posts</h1>

<ul>
  {#each posts as post}
    <li>
      <a
        rel='prefetch'
        href='{`writing/${post.date.year}/${post.date.month}/${post.date.day}/${post.slug}`}'
      >
        <h2>{post.title}</h2>
        {#if post.subtitle}
          <p>{post.subtitle}</p>
        {/if}
        <time datetime='{format(new Date(post.date.year, post.date.month, post.date.day), 'yyyy-M-dd')}'>
          {format(new Date(post.date.year, post.date.month, post.date.day), 'MMMM d, yyyy')}
        </time>
        <div>
          {#each post.excerpt as section}
            {#if section.type == 'passage'}
              {@html section.html}
            {/if}
          {/each}
        </div>
      </a>
    </li>
  {/each}
</ul>
