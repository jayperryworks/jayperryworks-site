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
  import OutdentedBlurb from '@/components/OutdentedBlurb.svelte'
  import PageTitle from '@/components/PageTitle.svelte'
  import PostBody from '@/components/PostBody.svelte'
  import ResponsiveImage from '@/components/ResponsiveImage.svelte'
  import Wrapper from '@/components/Wrapper.svelte'

  export let posts
</script>

<style type="text/scss">
  @use 'config/border';

  ul {
    margin: 0 0 1em 0;
    line-height: 1.5;
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
      <ul class="
        list-undecorated
        padding-y-between-wide
        margin-y-between-wide
      ">
        {#each posts as post}
          <li>
            <a
              rel="prefetch"
              href={post.path}
            >
              {#if post.cover}
                <div class="padding-bottom">
                  <ResponsiveImage
                    sources={post.cover.sources}
                    alt={post.cover.alt}
                  />
                </div>
              {/if}
              <h2>{post.title}</h2>
              {#if post.subtitle}
                <p class="
                  t-font-accent
                  t-scale-gamma
                  c-fg-tertiary
                ">{post.subtitle}</p>
              {/if}
              <time
                class="
                  display-block
                  padding-y-xnarrow
                  t-font-accent
                  t-weight-bold
                  t-scale-zeta
                  c-fg-tertiary
                "
                datetime={format(new Date(post.date.year, post.date.month, post.date.day), 'yyyy-M-dd')}
              >
                {format(new Date(post.date.year, post.date.month, post.date.day), 'MMMM d, yyyy')}
              </time>
              <PostBody sections={post.excerpt} dropCap={false} />
            </a>
          </li>
        {/each}
      </ul>
    </Wrapper>
  </div>
</OutdentedBlurb>
