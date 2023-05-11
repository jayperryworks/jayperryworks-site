/* sidenote component

	- Based on Koos Looijesteijn's excellent 'Semantic sidenotes'
	- https://www.kooslooijesteijn.net/blog/sidenotes-without-js
	- https://github.com/kslstn/sidenotes/blob/main/style.css
	- I've opted to keep notes as pop-outs at all screen sizes, rather than move to the side.
			This is because my layout width varies with page blocks (text, images, pullquotes, etc.) and sidenotes may collide with other blocks.

	props
	- number: the note count, defaults to 1
*/

const style = `
	<style>
		*,
		*::before {
			box-sizing: border-box;
		}

		.sidenote {
			--label-color: var(--color-bg);
			--label-bg: var(--color-primary);
			display: inline;
		}

		.label {
			background-color: var(--label-bg);
			border: 0;
			border-radius: 1000px;
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
			transition: background-color 0.25s ease;
			vertical-align: top;
		}

		.label:hover,
		.is-open .label {
			--label-bg: var(--color-highlight);
		}

		.content,
		::slotted(.fallback) {
			left: -999999px;
			position: absolute;
			top: auto;
		}

		.is-open .content {
			display: block;
			float: left;
			left: auto;
			min-width: 100%;
			overflow: hidden;
			padding-block: var(--space-narrow);
			position: relative;
			z-index: 4;
		}

		/* use an additional wrapper element inside .content so Safari doesn't mess up spacing - it collapses margins if we apply these styles to .content */
		.wrapper {
			align-items: flex-start;
			display: flex;
			font-family: var(--type-font-accent);
			font-size: var(--type-scale-zeta);
			gap: var(--space-xnarrow);
			background-color: var(--color-well);
			border-radius: 0.2em;
			padding: var(--space-narrow);
		}

		.wrapper::before {
			color: var(--color-highlight);
			content: attr(data-count) ".";
		}

		.text {
			flex: 1;
		}
	</style>
`;

class SideNote extends HTMLElement {
	#shadowRoot: ShadowRoot;

	static get observedAttributes() {
		return ['number'];
	}

	get number() {
		return this.getAttribute('number');
	}

	constructor() {
		super();
		this.#shadowRoot = this.attachShadow({ mode: 'open' });
		this.render();
	}

	attributeChangedCallback() {
		this.render();
	}

	connectedCallback() {
		const label = this.#shadowRoot.querySelector('.label');
		const wrapper = this.#shadowRoot.querySelector('.sidenote');

		label.addEventListener('click', () => {
			wrapper.classList.toggle('is-open');
		});
	}

	render() {
		this.#shadowRoot.innerHTML = `
			${style}

			<span class="sidenote is-open" id="sidenote-${this.number}">
				<button class="label" aria-label="Toggle the note">${this.number}</button>
				<small
					class="content"
					aria-role="note"
				>
					<span class="wrapper" data-count="${this.number}">
						<span class="text"><slot></slot></span>
					</span>
				</small>
			</span>
		`;
	}
}

export default customElements.define('side-note', SideNote);
