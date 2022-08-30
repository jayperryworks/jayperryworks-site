import {
	RichTextField,
	TitleField,
} from '@prismicio/types';

// color
export type ColorRoles = 'primary' | 'secondary' | 'highlight' | 'bg' | 'island' | 'well' | 'border' | 'shadow';

export type CSSVariable = `var(--${string})`;
export type CSSHue = `${number | string}deg` | CSSVariable;
export type CSSPercentage = `${number | string}%` | CSSVariable;

export type HexColor = `#${number}`;
export type HSLColor = `hsl(${CSSHue} ${CSSPercentage} ${CSSPercentage})`
	| `hsl(${CSSHue} ${CSSPercentage} ${CSSPercentage} / ${number | string})`;
// an object with HSL color data, used for generating theme values
export type HSLObject = {
	h: number,
	s: number,
	l: number,
	a?: number,
};

export interface Theme {
	bg?: HexColor | HSLColor | CSSVariable;
	border?: HexColor | HSLColor | CSSVariable;
	highlight?: HexColor | HSLColor | CSSVariable;
	island?: HexColor | HSLColor | CSSVariable;
	primary?: HexColor | HSLColor | CSSVariable;
	secondary?: HexColor | HSLColor | CSSVariable;
	shadow?: HexColor | HSLColor | CSSVariable;
	well?: HexColor | HSLColor | CSSVariable;
}

export interface ThemeData {
	bg?: HSLObject;
	border?: HSLObject;
	highlight?: HSLObject;
	island?: HSLObject;
	primary?: HSLObject;
	secondary?: HSLObject;
	shadow?: HSLObject;
	well?: HSLObject;
}

// layout and UI
export type Align = 'start' | 'center' | 'end';
export type SpaceScale = 'xxnarrow' | 'xnarrow' | 'narrow' | 'medium' | 'wide' | 'xwide';
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

// type
export type TypeScale = 'alpha' | 'beta' | 'gamma' | 'delta' | 'epsilon' | 'zeta';

export interface FormattedText {
	prismicText?: RichTextField;
	markdown?: string;
}
