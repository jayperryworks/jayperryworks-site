import { breakpoints } from '../design-tokens.js';
import { helpers } from './breakpoints.js';

const hideVisually = `
	border: 0;
  clip: rect(1px, 1px, 1px, 1px);
  clip-path: inset(100%);
  height: 1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  width: 1px;
`

const unHideVisually = `
	clip: auto;
  clip-path: none;
  height: auto;
  overflow: visible;
  position: static;
  width: auto;
`

const hide = 'display: none !important;'
const show = 'display: unset !important;'

export default {
	name: 'Visibility',
	utilities: `
		/* hide and show visually */
		.hide-visually {
			${hideVisually}
		}

		.show-visually {
			${unHideVisually}
		}

		${helpers.responsiveClasses('hide-visually', hideVisually)}
		${helpers.responsiveClasses('show-visually', unHideVisually)}

		/* hide and show */

		.hide {
			${hide}
		}

		.show {
			${show}
		}

		${helpers.responsiveClasses('hide', hide)}
		${helpers.responsiveClasses('show', hide, '<')}

		/* hide and show if JS is supported */
		.js .js\\:hide {
			${hide}
		}

		.no-js .js\\:show {
			${hide}
		}

		/* hide and show if touch is supported */
		.touch .touch\\:hide {
			${hide}
		}

		.no-touch .touch\\:show {
			${hide}
		}

		/* hide overflow */
		.hide-overflow {
			overflow: hidden;
		}

		/* hide and show for print */
		.print\\:show {
			${hide}
		}

		@media print {
			.print\\:hide {
				${hide}
			}

			.print\\:show {
				display: unset;
			}
		}
	`
}
