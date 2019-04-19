const template = document.createElement('template')

template.innerHTML = `
  <style>
    :host {
      display: block;
      color: white;
      background-color: red;
    }
  </style>
  <div class="overflow-hidden">
    <figure class="gutter-wrapper gutter-wide">
      <div class="gutter">
        <slot name="image">Add an image</slot>
      </div>
      <figcaption class="gutter">
        <div class="padding-bottom-narrow">
          <slot name="title">Add a title</slot>
        </div>
        <dl class="stats">
          <div class="stats-group">
            <dt class="stats-title">
              <slot name="stat-label">Add a stat label here</slot>
            </dt>
            <dd class="stat">
              <slot name="stat">Add a stat here</slot>
            </dd>
          </div>
        </dl>
      </figcaption>
    </figure>
  </div>
`

class PrintEdition extends HTMLElement {
  constructor() {
    super()

    this.attachShadow({mode: 'open'})
    this.shadowRoot.appendChild(template.content.cloneNode(true))
  }
}

customElements.define('print-edition', PrintEdition)
