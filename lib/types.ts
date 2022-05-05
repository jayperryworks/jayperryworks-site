export type TypeScale = 'alpha' | 'beta' | 'gamma' | 'delta' | 'epsilon' | 'zeta';
export type Prominence = 'Small' | 'Medium' | 'Large';

export interface Block {
	type: string,
	includeInExcerpt?: boolean,
	prominence?: Prominence,
	// the arbitrary props for any given Block component
	// e.g. a Passage with a prismicText prop, defined on the component
	[key: string]: unknown,
}
