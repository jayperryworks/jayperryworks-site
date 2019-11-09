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
  import PageTitle from '@/components/PageTitle.svelte'
  import OutdentedBlurb from '@/components/OutdentedBlurb.svelte'
  import Wrapper from '@/components/Wrapper.svelte'

  export let posts
</script>

<style lang="scss">
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
              rel='prefetch'
              href='{`writing/${post.date.year}/${post.date.month}/${post.date.day}/${post.slug}`}'
            >
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
    </Wrapper>
  </div>
</OutdentedBlurb>
