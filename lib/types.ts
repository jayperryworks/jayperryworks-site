import {
	RichTextField,
	TitleField,
} from '@prismicio/types';

export type TypeScale = 'alpha' | 'beta' | 'gamma' | 'delta' | 'epsilon' | 'zeta';
export type SpaceScale = 'xxnarrow' | 'xnarrow' | 'narrow' | 'medium' | 'wide' | 'xwide';
export type ColorRoles = 'primary' | 'secondary' | 'highlight' | 'bg' | 'island' | 'well' | 'border' | 'shadow';
export type Prominence = 'Small' | 'Medium' | 'Large';
export type GallerySize = 'small' | 'medium' | 'large';
export type ImageFit = 'default' | 'contain' | 'cover';
export type Device = 'None' | 'Phone' | 'Tablet (horizontal)' | 'Tablet (vertical)';

export type PaginationLink = {
	path: string,
	title: TitleField,
	subtitle?: TitleField,
};

export interface Block {
	type: string;
	includeInExcerpt?: boolean;
	prominence?: Prominence;
	// the arbitrary props for any given Block component, defined on each component
	// e.g. a Passage with a prismicText prop
	[key: string]: unknown;
}

export interface FormattedText {
	prismicText?: RichTextField;
	markdown?: string;
}
