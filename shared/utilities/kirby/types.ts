type ImageSize = 'small' | 'medium' | 'large' | 'xlarge';
type ImageFormat = 'avif' | 'webp' | 'jpg' | 'png' | 'svg';

interface ImageVersion {
  formats: Partial<Record<ImageFormat, string>>;
  width: number;
  height: number;
}

export interface ImageSource {
	alt: string;
	id: string; // unique ID for the image
	permalink: string;
  versions: Partial<Record<ImageSize, ImageVersion>>; // pregenerated image versions
	url: string;
}

export interface Footnote {
	id: string | number;
	text: string; // markdown with HTML entities/punctuation
}
