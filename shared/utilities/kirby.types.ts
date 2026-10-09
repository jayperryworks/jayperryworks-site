export interface ImageSource {
	alt: string;
	id: string; // unique ID for the image
	permalink: string;
	url: string;
}

export interface Footnote {
	id: string | number;
	text: string; // markdown with HTML entities/punctuation
}
