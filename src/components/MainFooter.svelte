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
      <strong class="
        c-fg-secondary
        t-font-display
      "><a href="${channel.url}">${channel.name}</a></strong>
      `.trim()
  }).join(', ')
</script>

<style lang="scss">
  footer {
    flex-shrink: 0;
    overflow: hidden;
  }
</style>

<footer class="
  c-bg-well
  border-seam-top
">
  <div class="
    border-bottom
    padding-x-outside
    padding-y
  ">
    <p class="
      t-scale-gamma
      t-font-display
      c-fg-tertiary
    ">
      Keep in touch. You can also find me on {@html socialChannelList}.
    </p>
  </div>
  <div class="
    padding-x-outside
    padding-y
  ">
    <div data-ui-bookend="horizontal@small align-top" class="gutter-wrapper gutter-xnarrow">
      <div data-ui-bookend-item="left">
        <a
          class="
            display-inline-block
            no-border
            gutter
          "
          style="height: 2.25rem; width: 10.9375rem;"
          href="/"
        >
          <LogoJPW />
        </a>
        <small class="
          gutter
          display-inline-block
          vertical-align-top
          t-font-accent
        ">
          &copy; Copyright {format(new Date(), 'yyyy')} Jay Perry Works, all rights reserved.
        </small>
      </div>
      <!-- <div data-ui-bookend-item="right">
        <a href="#" class="gutter display-inline-block vertical-align-top t-font-accent t-weight-bold t-scale-zeta t-url-undecorated t-case-upper c-fg-tertiary">Colophon</a>
      </div> -->
    </div>
  </div>
</footer>
