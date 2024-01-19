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
			--label-color: var(--color-secondary);
			--label-bg: var(--color-bg);

			display: inline;
			font-size: 0; /* eliminate whitespace rendering */
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
			font-size: var(--type-scale-eta);
			line-height: var(--size);
			transform: translateY(10%); /* scoot down a little */
			margin-inline: 0.35rem;
			min-height: var(--size);
			min-width: var(--size);
			padding-block: 0;
			padding-inline: 0.45rem;
			position: relative;
			text-align: center;
			transition: color 0.25s ease, border-color 0.25s ease;
			vertical-align: top;
		}

		.label:hover,
		.label.is-open {
			--label-color: var(--color-highlight);
		}

		.content {
			clear: both;
			float: left;
			font-size: 1rem;
			min-width: 100%;
			overflow: hidden;
			padding-block: var(--space-narrow);
		}

		.content.is-hidden,
		::slotted(.fallback) {
			clip-path: inset(50%);
			clip: rect(0 0 0 0);
			display: inline-block;
			height: 0;
			overflow: hidden;
			position: relative;
			white-space: nowrap;
			width: 0;
			padding: 0;
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
			content.classList.toggle('is-hidden');
		});
	}

	render() {
		this.#shadowRoot.innerHTML = `
			${style}

			<button
				class="label"
				aria-label="Toggle the note"
			>
				${this.number}
			</button>

			<small
				class="content is-hidden"
				role="note"
			>
				<span
					class="wrapper"
					data-count="${this.number}"
				>
					<span class="text"><slot></slot></span>
				</span>
			</small>
		`;
	}
}

export default customElements.define('jp-sidenote', SideNote);
