<script>
  import { format } from 'date-fns'
  import LogoJPW from './logos/LogoJPW.svelte'
  import Bookend from './Bookend.svelte'

  let socialChannels = [
    {
      name: "Etsy",
      url: "https://jayperry.etsy.com/"
    },
    {
      name: "Twitter",
      url: "https://twitter.com/inkpixelswords"
    },
    {
      name: "Pinterest",
      url: "https://www.pinterest.com/jayperryworks/"
    },
    {
      name: "Github",
      url: "https://github.com/jayperryworks"
    },
    {
      name: "Pocket",
      url: "https://getpocket.com/%40j%40jayperryworks.com"
    }
  ]

  $: socialChannelList = socialChannels.map((channel, index) => {
    return `
      ${index == socialChannels.length - 1 ? 'and' : ''}
      <strong class="c-fg-secondary t-font-display"><a href="${channel.url}">${channel.name}</a></strong>
      `.trim()
  }).join(', ')
</script>

<style>
  footer {
    flex-shrink: 0;
  }
</style>

<footer class="border-seam-top-offset c-bg-well padding-x-outside">
  <div class="overflow-hidden">
    <div class="border-bottom padding-y">
      <p class="c-fg-tertiary t-font-display t-scale-gamma">
        Keep in touch. You can also find me on {@html socialChannelList}.
      </p>
    </div>
    <div class="padding-y">
      <div class="gutter-wrapper gutter-xnarrow">
        <Bookend align="top">
          <div slot="left">
            <a
              class="display-inline-block gutter t-link-undecorated"
              style="height: 2.25rem; width: 10.9375rem;"
              href="/"
            >
              <LogoJPW />
            </a>
            <small class="display-inline-block gutter t-font-accent vertical-align-top">
              &copy; Copyright {format(new Date(), 'yyyy')} Jay Perry Works, all rights reserved.
            </small>
          </div>

          <!-- <div slot="right">
            <a
              href="/colophon"
              class="c-fg-tertiary display-inline-block gutter t-case-upper t-font-accent t-link-undecorated t-scale-eta t-weight-bold vertical-align-top"
            >
              Colophon
            </a>
          </div> -->
        </Bookend>
      </div>
    </div>
  </div>
</footer>
