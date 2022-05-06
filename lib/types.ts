import { RichTextField } from '@prismicio/types';

export type TypeScale = 'alpha' | 'beta' | 'gamma' | 'delta' | 'epsilon' | 'zeta';
export type Prominence = 'Small' | 'Medium' | 'Large';

export interface Block {
	type: string,
	includeInExcerpt?: boolean,
	prominence?: Prominence,
	// the arbitrary props for any given Block component, defined on each component
	// e.g. a Passage with a prismicText prop
	[key: string]: unknown,
}

export interface FormattedText {
	prismicText?: RichTextField,
	markdown?: string,
}
