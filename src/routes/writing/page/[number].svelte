<script context="module">
  export async function preload({ params, query }) {
    const { number } = params
    const response = await this.fetch(`writing/page/${number}.json`)
    const data = await response.json()

    return {
      number,
      total: data.totalPages,
      posts: data.posts
    }
  }
</script>

<script>
  import { format } from 'date-fns'
  import arrow from 'icons/arrow-right.svg'
  import Icon from '@/components/Icon.svelte'
  import OutdentedBlurb from '@/components/OutdentedBlurb.svelte'
  import PageTitle from '@/components/PageTitle.svelte'
  import PostBody from '@/components/PostBody.svelte'
  import Figure from '@/components/Figure.svelte'
  import Wrapper from '@/components/Wrapper.svelte'
  import Bookend from '@/components/Bookend.svelte'

  export let posts, number, total

  $: currentPage = parseInt(number)

  function date(date, template = 'MMMM d, yyyy') {
    return format(new Date(date.year, date.month, date.day), template)
  }
</script>

<style type="text/scss">
  @use 'config/border';
  @use 'config/type';

  ul {
    margin: 0 0 1em 0;
    line-height: type.leading();
  }

  li + li {
    @include border.add(top);
  }

  h1 {
    margin-top: -0.3em;
  }
</style>

<OutdentedBlurb class="padding-x-outside padding-y-xwide">
  <h1
    slot="blurb"
    class="padding-bottom-wide"
  >Recent posts</h1>

  <div slot="body">
    <Wrapper centered={false}>
      <ul class="list-undecorated margin-y-between-wide padding-y-between-wide">
        {#each posts as post}
          <li>
            <a
              rel="prefetch"
              href={post.path}
              class="t-link-undecorated"
            >
              {#if post.cover}
                <div class="padding-bottom">
                  <Figure
                    sources={post.cover.sources}
                    alt={post.cover.alt}
                    caption={post.cover.caption}
                    credit={post.cover.credit}
                    border={post.cover.border}
                  />
                </div>
              {/if}
              <h2>{post.title}</h2>
              {#if post.subtitle}
                <p class="c-fg-tertiary t-font-accent t-scale-gamma">
                  {post.subtitle}
                </p>
              {/if}
              <time
                class="c-fg-tertiary display-block padding-top-xxnarrow padding-bottom t-font-accent t-scale-zeta t-weight-bold"
                datetime={date(post.date, 'yyyy-M-dd')}
              >
                {date(post.date)}
              </time>
              <PostBody sections={post.excerpt} dropCap={false} />
              {#if post.readMore}
                <span class="display-inline-block padding-top t-case-upper t-font-accent t-scale-zeta t-weight-bold">
                  Read more
                  <Icon
                    svg={arrow}
                    margin="left"
                    size="small"
                  />
                </span>
              {/if}
            </a>
          </li>
        {/each}
      </ul>
    </Wrapper>
  </div>
</OutdentedBlurb>
<footer class="border-seam-top-offset padding-x-outside padding-y-wide">
  <Bookend>
    <div slot="left">
      {#if currentPage > 1}
        <a href={`writing/page/${currentPage - 1}`}>Newer posts</a>
      {/if}
    </div>
    <div slot="right">
      {#if currentPage < total}
        <a href={`writing/page/${currentPage + 1}`}>Older posts</a>
      {/if}
    </div>
  </Bookend>
</footer>
