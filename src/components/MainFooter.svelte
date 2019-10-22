<script>
  import { format } from 'date-fns'
  import LogoJPW from './LogoJPW.svelte'

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
      url: "https://getpocket.com/@j%40jayperryworks.com"
    }
  ]

  $: socialChannelList = socialChannels.map((channel, index) => {
    return `
      ${index == socialChannels.length - 1 ? 'and' : ''}
      <strong class="c-fg-secondary t-display"><a href="${channel.url}">${channel.name}</a></strong>
      `.trim()
  }).join(', ')
</script>

<style lang="scss">
  footer {
    flex-shrink: 0;
  }
</style>

<footer>
  <div class="border-bottom padding-bottom margin-bottom">
    <p class="t-scale-gamma t-display c-fg-tertiary">
      Keep in touch. You can also find me on {@html socialChannelList}.
    </p>
  </div>
  <div data-ui-bookend="horizontal@small align-top" class="gutter-wrapper gutter-xnarrow">
    <div data-ui-bookend-item="left">
      <a
        class="display-inline-block no-border"
        style="height: 2.25rem; width: 10.9375rem;"
        href="/"
      >
        <LogoJPW />
      </a>
      <small class="gutter display-inline-block vertical-align-top t-accent">&copy; Copyright {format(new Date(), 'yyyy')} Jay Perry Works, all rights reserved.</small>
    </div>
    <!-- <div data-ui-bookend-item="right">
      <a href="#" class="gutter display-inline-block vertical-align-top t-accent-bold t-scale-zeta t-url-undecorated t-caps c-fg-tertiary">Colophon</a>
    </div> -->
  </div>
</footer>
