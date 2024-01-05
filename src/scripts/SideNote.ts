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

		:host {
			--label-color: var(--color-primary);
			--label-bg: var(--color-bg);

			display: inline;
		}

		.label {
			--size: 1.6em;

			background-color: transparent;
			border-radius: 1000px;
			border: 2px solid var(--label-color);
			color: var(--label-color);
			cursor: pointer;
			display: inline-block;
			font-family: var(--type-font-accent);
			font-size: 0.6em;
			line-height: var(--size);
			margin-inline: 0.15em;
			min-height: var(--size);
			min-width: var(--size);
			padding-block: 0;
			padding-inline: 0.6rem;
			position: relative;
			text-align: center;
			transition: color 0.25s ease, border-color 0.25s ease;
			vertical-align: top;
		}

		.label:hover,
		.label.is-open {
			--label-color: var(--color-highlight);
		}

		.content,
		::slotted(.fallback) {
			left: -999999px;
			position: absolute;
			top: auto;
		}

		.content.is-open {
			clear: right;
			display: block;
			float: left;
			left: auto;
			min-width: 100%;
			overflow: hidden;
			padding-block: var(--space-narrow);
			position: relative;
			top: unset;
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
	}

	attributeChangedCallback() {
		this.render();
	}

	connectedCallback() {
		this.render();

		const label = this.#shadowRoot.querySelector('.label');
		const content = this.#shadowRoot.querySelector('.content');

		label.addEventListener('click', () => {
			label.classList.toggle('is-open');
			content.classList.toggle('is-open');
		});
	}

	render() {
		this.#shadowRoot.innerHTML = `
			${style}

			<button class="label" aria-label="Toggle the note">${this.number}</button>
			<small
				class="content"
				role="note"
			>
				<span class="wrapper" data-count="${this.number}">
					<span class="text"><slot></slot></span>
				</span>
			</small>
		`;
	}
}

export default customElements.define('jp-sidenote', SideNote);
