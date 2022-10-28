// --- sidenotes
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
