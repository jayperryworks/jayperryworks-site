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
  import PageTitle from '@/components/PageTitle.svelte'
  import PostBody from '@/components/PostBody.svelte'
  import Figure from '@/components/Figure.svelte'
  import Wrapper from '@/components/Wrapper.svelte'
  import Cover from '@/components/Cover.svelte'

  export let post;
  export let date;

  function formatDate(formatString) {
    return format(new Date(date.year, date.month, date.day), formatString)
  }
</script>

<PageTitle title="{post.title}" />

<article class="
  padding-x-outside
  padding-y-xwide
">
  <header>
    <Wrapper
      width="wide"
      class="t-align-center@small"
    >
      <h1>{post.title}</h1>
      {#if post.subtitle}
        <p class="
          t-heading
          t-font-accent
          t-scale-beta
          c-fg-tertiary
          padding-top-xxnarrow
        ">{post.subtitle}</p>
      {/if}

      {#if post.cover}
        <Cover
          class="padding-top-wide"
          sources={post.cover.sources}
          alt={post.cover.alt}
          caption={post.cover.caption}
        />
      {/if}
    </Wrapper>
    <Wrapper class="
      padding-top-xwide
      padding-bottom-xnarrow
      margin-bottom
      border-bottom
    ">
      <time
        class="
          t-font-accent
          t-weight-bold
          t-scale-zeta
          c-fg-tertiary
        "
        datetime={formatDate('yyyy-M-dd')}
      >
        {formatDate('MMMM d, yyyy')}
      </time>
    </Wrapper>
  </header>

  <PostBody sections={post.body} />
</article>
