import {
	ImageField,
	LinkField,
	RichTextField,
	TitleField,
} from '@prismicio/types';

// --- color ---
export type ColorRoles = 'primary' | 'secondary' | 'highlight' | 'surface' | 'island' | 'well' | 'border' | 'shadow';

// names of the default color themes
export type ThemeNames = 'cherry'| 'mustard'| 'mint'| 'lavendar'| 'anemone';

export type CSSVariable = `var(--${string})`;
export type CSSHue = `${number | string}deg` | CSSVariable;
export type CSSPercentage = `${number | string}%` | CSSVariable;
export type CSSAlpha = `/ ${number | string}`;

export type HexColor = `#${number}`;
export type HSLColor = `hsl(${CSSHue} ${CSSPercentage} ${CSSPercentage})`;
export type HSLAColor = `hsl(${CSSHue} ${CSSPercentage} ${CSSPercentage} ${CSSAlpha})`;

type HSLChannel = 'h' | 's' | 'l' | 'a';

// an object with HSL color data, used for generating theme values
export type HSLObject = Record<HSLChannel, number>;

// a page theme with literal CSS values
export type Theme = Record<ColorRoles, HexColor | HSLColor | CSSVariable>;

// a page theme with HSLObject data
export type ThemeData = Record<ColorRoles, HSLObject>;

// --- layout and UI ---
export type Align = 'start' | 'center' | 'end';
export type SpaceScale = 'xxnarrow' | 'xnarrow' | 'narrow' | 'medium' | 'wide' | 'xwide';
export type Prominence = 'Small' | 'Medium' | 'Large';
export type GallerySize = 'small' | 'medium' | 'large';
export type ImageFit = 'default' | 'contain' | 'cover';
export type Frame = 'None' | 'Matte' | 'Frame & matte' | 'Panel' | 'Phone' | 'Tablet (horizontal)' | 'Tablet (vertical)';

// --- type ---
export type TypeScale = 'alpha' | 'beta' | 'gamma' | 'delta' | 'epsilon' | 'zeta';

export interface FormattedText {
	prismicText?: RichTextField;
	markdown?: string;
}

// --- metadata ---
export interface SEOContent {
	description?: string;
	image?: string;
	imageAlt?: string;
	title?: string;
}

// Strings that represent the stages of development of a piece of writing
export type DevelopmentStageName = 'Note' | 'Sketch' | 'Revised' | 'Polished';
export type DevelopmentStageUID = 'note' | 'sketch' | 'revised' | 'polished';

export type DevelopmentStage = {
	name: DevelopmentStageName;
	uid: DevelopmentStageUID;
	description?: RichTextField;
};

export interface PublicationDates {
	publication: Date;
	posted?: Date;
	updated?: Date;
}

// --- components ---
export type mainNavLink = {
	label: string,
	link: string,
};

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

export interface PrintType {
	name: string;
	description: FormattedText;
}

export type EditionInfo = {
	label: string,
	value: string,
};

export type Edition = {
	etsyLink: LinkField,
	image: ImageField,
	info: EditionInfo[],
	name: string,
	limit?: number,
	type?: PrintType,
};

export type StickyNote = {
	shortStatement: string,
	extendedStatement: string,
}
