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
			name: "Instagram",
			url: "https://www.instagram.com/jayperryworks/"
		},
    {
      name: "Github",
      url: "https://github.com/jayperryworks"
    },
  ]

  $: socialChannelList = socialChannels.map((channel, index) => {
    return `
      ${index == socialChannels.length - 1 ? 'and' : ''}
      <a class="color-fg-primary | type-font-display type-weight-normal" href="${channel.url}" target="_blank">${channel.name}</a>
    `.trim()
  }).join(', ')
</script>

<footer class="border-seam-top padding-x-outside">
  <p class="social-callout border-bottom | padding-y-wide | color-fg-secondary | type-font-display type-scale-gamma type-leading-tight">
    Keep in touch. You can also find me on {@html socialChannelList}.
  </p>
  <div class="padding-y hide-overflow">
    <div class="gutter-wrapper narrow">
      <Bookend align="top">
        <div slot="left">
          <a
            class="logo | gutter | type-link-undecorated"
            href="/"
          >
            <LogoJPW />
          </a>
          <small class="copyright | gutter | type-font-accent type-weight-xlight type-leading-tight type-scale-zeta | color-fg-secondary">
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
    width: 12rem;
  }
</style>
