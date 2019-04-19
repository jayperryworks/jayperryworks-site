/*
  Gallery component
  -> Arrange a list of elements in equal rows and columns using CSS Grid
  -> Has a calc()-based fallback

  Props:
  gutter (string): amount of space in rem units between items.
  size (string): width of the items. Use "small" or "large", defaults to medium.
*/

const template = document.createElement('template')

template.innerHTML = `
  <style>
    :host {
      display: block;
      contain: content;
    }

    * {
      box-sizing: border-box;
    }

    .gallery {
      --gutter: var(--space-xnarrow, 0.25rem);
      --min-width: 240px;
      --breakpoint: 600px;
      --min-percentage: 33.3333%;
      --max-percentage: 100%;

      display: block;
      font-size: 0;
      list-style: none;
      margin: calc((var(--gutter) / 2) * -1);
      padding-left: 0;
      position: relative;
      text-align: left;
    }

    .small {
      --min-width: 180px;
      --breakpoint: 480px;
      --min-percentage: 25%;
    }

    .large {
      --min-width: 400px;
      --breakpoint: 1000px;
      --min-percentage: 25%;
    }

    ::slotted(li) {
      display: inline-block;
      font-size: 1rem;
      margin: 0 !important; /* overrule default li spacing */
      padding: var(--gutter);
      position: relative;
      vertical-align: top;

      /*
        fallback fluid sizing method using a calc() hack
        -> allows grid to be somewhat responsive without media queries
        -> mainly for IE and old browsers
        -> https://www.sitepoint.com/responsive-css-patterns-without-media-queries/
      */
      max-width: var(--max-percentage);
      min-width: var(--min-percentage);
      width: calc((var(--breakpoint) - 100%) * 1000);
    }

    @supports (display: grid) and (display: flex) {
      .gallery {
        display: grid;
        grid-column-gap: var(--gutter);
        grid-row-gap: var(--gutter);
        grid-template-columns: repeat(auto-fit, minmax(var(--min-width), 1fr));
        margin: 0;
      }

      ::slotted(li) {
        align-items: flex-start;
        display: flex;
        max-width: none;
        min-width: auto;
        padding: 0;
        width: auto;
      }
    }
  </style>

  <ul class="gallery">
    <slot>
      <li>Add some li elements</li>
    </slot>
  </ul>
`

export default class Gallery extends HTMLElement {
  constructor() {
    super()

    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template.content.cloneNode(true))

    this._gallery = this.shadowRoot.querySelector('.gallery')
  }

  static get observedAttributes() {
    return ['gutter', 'size'];
  }

  attributeChangedCallback(attrName, oldValue, newValue) {
    if (oldValue !== newValue) {
      this[attrName] = this.getAttribute(attrName);
    }
  }

  get gutter() {
    return this.getAttribute('gutter')
  }

  set gutter(width) {
    if (!width) {
      this.removeAttribute('gutter')
      return
    }

    this.setAttribute('gutter', width)
    this._gallery.style.setProperty('--gutter', `var(--space-${width})`);
  }

  get size() {
    return this.getAttribute('size')
  }

  set size(value) {
    if (!value) {
      this.removeAttribute('size')
      return
    }
    this.setAttribute('size', value)

    const sizes = ['small', 'large']

    // add a modifier class to match the size attribute
    if (sizes.indexOf(value) !== -1) {
      this._gallery.classList.remove(sizes)
      this._gallery.classList.add(value)
      return
    }
    // Put a warning in the console if the size class isn't available
    console.log(`The size '${value}' is not available in the jpw-gallery component.`)
  }
}

customElements.define('jpw-gallery', Gallery)
