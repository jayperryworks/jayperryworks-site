// if children are in view
// fade in each one in succession
// https://metonym.github.io/svelte-intersection-observer/?ref=madewithsvelte.com

// steps
// 1. make a list of children
// 2. for each:
// 	a. check if it's in view
// 	b. check if the previous element has finished animating
// 	c. run the animation
// 	d. mark it as done

// props
// - select: class name, default to immediate children
// - animate: opacity or color or whatever

const IOTemplate = document.createElement('template');
IOTemplate.innerHTML = `
	<style>
		::slotted(*) {
			opacity: 0;
			transition: opacity 5s ease-out;
		}

		::slotted(.revealed) {
			opacity: 1;
		}
	</style>
	
	<div>
		<slot>Add some content to animate</slot>
	</div>
`;

class IntersectionObserver extends HTMLElement {

	static get observedAttributes() {
		return ['select'];
	}

	constructor() {
		super();
		this._shadowRoot = this.attachShadow({ mode: 'open' });
		this._shadowRoot.appendChild(IOTemplate.content.cloneNode(true));
	}

	connectedCallback() {
		const children = document.querySelectorAll(::slotted(*));
		console.log(children);
	}

}

export default customElements.define('intersection-observer', IntersectionObserver);
