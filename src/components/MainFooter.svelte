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
      <a class="color-fg-secondary | type-font-display type-weight-normal" href="${channel.url}">${channel.name}</a>
      `.trim()
  }).join(', ')
</script>

<footer class="border-seam-top padding-x-outside">
  <div class="hide-overflow">
    <div class="border-bottom padding-y">
      <p class="color-fg-secondary | type-font-display type-scale-gamma">
        Keep in touch. You can also find me on {@html socialChannelList}.
      </p>
    </div>
    <div class="padding-y">
      <div class="gutter-wrapper xnarrow">
        <Bookend align="top">
          <div slot="left">
            <a
              class="logo | gutter | type-link-undecorated"
              href="/"
            >
              <LogoJPW />
            </a>
            <small class="copyright | gutter | type-font-accent | color-fg-secondary">
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

<style>
  footer {
    flex-shrink: 0;
  }

  .logo,
  .copyright {
    display: inline-block;
    vertical-align: top;
  }

  .logo {
    height: 2.25rem;
    width: 11rem;
  }
</style>