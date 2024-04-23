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
			vertical-align: top;
			height: 1rem;
		}

		.content {
			clear: both;
			float: left;
			font-size: 1rem;
			min-width: 100%;
			overflow: hidden;
			padding-block: var(--space-narrow);
		}

		.content::after {
			clear: both;
			content: '';
			display: block;
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

		/*
		 * Needed to repeat this global base type CSS because shadow DOM doesn't inherit.
		 * - Really don't like this but no other obvious solution presents itself for now
		 * - Maybe see if I can rework this without using shadow DOM?
		 * - But then how/where should I handle the wrapper styles below?
		 */
		a {
			--underline-w: 0.125em;

			color: inherit;
			cursor: pointer;
			text-decoration-color: var(--color-highlight);
			text-decoration-style: solid;
			text-decoration-thickness: var(--underline-w);
			text-underline-position: under;
			transition: color 0.25s ease;
		}

		a:hover,
		a:active {
			color: var(--color-highlight);
		}

		code {
			background-color: var(--color-island);
			border-radius: 0.2em;
			display: inline-block;
			font-family: "Menlo", "Monaco", "Consolas", "Lucida Console", monospace;
			font-size: 0.8em;
			padding: 0 0.25em;
			color: var(--color-secondary);
		}


		a code {
			background-color: transparent;
			border-radius: 0;
			display: inline;
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

class SideNoteMarkdown extends HTMLElement {
	#footnote;
	#shadowRoot;

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
		const button = this.querySelector('a[data-footnote-ref]');
		this.#footnote = document.querySelector(`${button.getAttribute('href')} p`);
		this.#footnote.querySelector('[data-footnote-backref]').remove();

		this.render();

		const content = this.#shadowRoot.querySelector('.content');
		content.querySelector('.text').innerHTML = this.#footnote.innerHTML;

		button.addEventListener('click', (event) => {
			event.preventDefault();
			button.classList.toggle('is-active');
			content.classList.toggle('is-hidden');
		});
	}

	render() {
		this.#shadowRoot.innerHTML = `
			${style}

			<slot></slot>

			<small
				class="content is-hidden"
				role="note"
			>
				<span
					class="wrapper"
					data-count="${this.number}"
				>
					<span class="text"></span>
				</span>
			</small>
		`;
	}
}

export default customElements.define('jp-sidenote-markdown', SideNoteMarkdown);
