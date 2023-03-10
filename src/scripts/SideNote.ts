/* sidenote component

	- Based on Koos Looijesteijn's excellent 'Semantic sidenotes'
	- https://www.kooslooijesteijn.net/blog/sidenotes-without-js
	- https://github.com/kslstn/sidenotes/blob/main/style.css
	- I've opted to keep notes as pop-outs at all screen sizes, rather than move to the side.
			This is because my layout width varies with page blocks (text, images, pullquotes, etc.) and sidenotes may collide with other blocks.

	props
	- number: the note count, defaults to 1
*/

class SideNote extends HTMLElement {
	#shadowRoot: ShadowRoot;
	#template: HTMLTemplateElement;

	static get observedAttributes() {
		return ['number'];
	}

	constructor() {
		super();

		this.#template = document.createElement('template');
		this.#template.innerHTML = `
			<style>
				.sidenote {
					--label-color: var(--color-primary);
					display: inline;
				}

				.label {
					background-color: transparent;
					border-radius: 1000px;
					border: 2px solid var(--label-color);
					color: var(--label-color);
					cursor: pointer;
					display: inline-block;
					font-family: var(--type-font-accent);
					font-size: 0.6em;
					line-height: inherit;
					margin-inline: 0.25em;
					min-height: 2em;
					min-width: 2em;
					padding-block: 0;
					padding-inline: 0.5rem;
					position: relative;
					text-align: center;
					transition: color 0.25s ease, border-color 0.25s ease;
					vertical-align: top;
				}

				.label:hover,
				.is-open .label {
					--label-color: var(--color-highlight);
				}

				.content,
				.parenthesis {
					position: absolute;
					left: -999999px;
					top: auto;
				}

				.content {
					align-items: flex-start;
					border-radius: 0.2em;
					display: flex;
					font-family: var(--type-font-accent);
					gap: var(--space-xnarrow);
					font-size: var(--type-scale-zeta);
				}

				.content::before {
					color: var(--color-highlight);
					content: attr(id) ".";
				}

				.is-open .content {
					background-color: var(--color-well);
					float: left;
					left: auto;
					margin-block: var(--space-narrow);
					min-width: 100%;
					overflow: hidden;
					padding: var(--space-narrow);
					position: relative;
					z-index: 4;
				}

				::slotted(*) {
					flex: 1;
				}
			</style>

			<span class="sidenote">
				<button class="label">1</button>
				<small class="content" id="1">
					<span class="parenthesis">(Note: </span>
					<slot></slot>
					<span class="parenthesis">)</span>
				</small>
			</span>
		`;

		this.#shadowRoot = this.attachShadow({ mode: 'open' });
		this.#shadowRoot.appendChild(this.#template.content.cloneNode(true));
	}

	connectedCallback() {
		const label = this.#shadowRoot.querySelector('.label');
		const wrapper = this.#shadowRoot.querySelector('.sidenote');

		label.addEventListener('click', () => {
			wrapper.classList.toggle('is-open');
		});
	}
}

export default customElements.define('side-note', SideNote);
