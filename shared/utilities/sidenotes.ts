// --- sidenotes utilities ---
// -> keep a global count of sidenotes
// 		so numbering does not repeat with each new Passage instance
let count = 0;

export function getCount(): number {
	return count;
}

export function increment(): void {
	count += 1;
}

export function reset(): void {
	count = 0;
}

/**
 * Get the ID attribute for a footnote
 *
 * @export
 * @function
 * @param {string} id
 * @returns {string}
 */
export function getNoteIDAttr(id: string): string {
	return `note-${id}`;
}

/**
 * Get the ID attribute for a footnote reference (inline button)
 *
 * @export
 * @function
 * @param {string} id
 * @returns {string}
 */
export function getReferenceIDAttr(id: string): string {
	return `reference-${id}`;
}

/**
 * Get the CSS anchor name for a note popover
 *
 * @export
 * @function
 * @param {string} id
 * @returns {string}
 */
export function getAnchorName(id: string): string {
	return `--reference-${id}`;
}

/**
 * Render the raw HTML for a footnote reference with the ID and index
 * - meant to pass to a 'raw' node in Sattieri markdown engine
 * - whitespace is deleted because this renders inline and will look wonky
 *
 * @function
 * @param {string | number} id
 * @returns {string}
 */

// <button class="fn-btn" popovertarget="note-1" id="fn-1" aria-describedby="note-1">1</button>
export function referenceTemplate(id: string): string {
	return `&nbsp;<button
		aria-describedby="${getNoteIDAttr(id)}"
		class="footnote-reference"
		id="${getReferenceIDAttr(id)}"
		popovertarget="${getNoteIDAttr(id)}"
		style="
			anchor-name: ${getAnchorName(id)};
			position-anchor: ${getAnchorName(id)}
		"
	><span class="hide-visually">Note <em>${getCount()}</em></span></button>`;
}
