// base scale
const scale = 1.2


// base color palette
const palette = {
  black: { h: 0, s: 0, l: 27 },
  gray: { h: 223, s: 7, l: 78 },
  green: { h: 148, s: 43, l: 66 },
  lavendar: { h: 223, s: 75, l: 70 },
  orange: { h: 38, s: 86, l: 64 },
  red: { h: 345, s: 74, l: 58 },
  white: { h: 0, s: 0, l: 100  }
}

const themes = {
  dark: {
    primary: palette.white,
    secondary: {...palette.gray, l: 40 },
    highlight: palette.lavendar,
    bg: palette.black,
    island: { ...palette.black, l: 35 },
    well: { ...palette.black, l: 17 },
    border: { ...palette.black, l: 20 },
    shadow: { ...palette.black, l: 0, a: 0.4 }
  },
  default: {
    primary: palette.black,
    secondary: { ...palette.gray, l: 65 },
    highlight: palette.lavendar,
    bg: palette.white,
    island: palette.white,
    well: { ...palette.gray, l: 90 },
    border: palette.gray,
    shadow: { ...palette.gray, a: 0.2 }
  }
}

const type = {
  fonts: [
    {
      name: 'Publico Headline',
      stack: "'Publico', 'Georgia', 'Times', 'Times New Roman', serif",
      role: 'display',
      file: '/fonts/PublicoHeadline-Roman-Web',
      formats: ['woff', 'ttf'],
      variants: [{ weight: 'normal' }]
    },
    {
      name: 'Publico Text',
      stack: "'Publico', 'Georgia', 'Times', 'Times New Roman', serif",
      role: 'body',
      file: '/fonts/PublicoText-Roman-Web',
      formats: ['woff', 'ttf'],
      variants: [
        { weight: 'normal' },
        {
          weight: 'normal',
          style: 'italic'
        }
      ]
    },
    {
      name: 'Guardian Sans',
      stack: "'Trebuchet', 'Lucida Grande', 'Verdana', sans-serif",
      role: 'accent',
      file: '/fonts/GuardianSans-Light-Web',
      formats: ['woff', 'ttf'],
      variants: [
        { weight: 'light' }, 
        { weight: 'normal' },
        { weight: 'bold' }
      ]
    }
  ],
  scale: {
    alpha: { base: 4, fluid: 5, max: 7 },
    beta: { base: 3, fluid: 3, max: 6 },
    gamma: { base: 2, fluid: 2, max: 4 },
    delta: { base: 1, fluid: 1, max: 2 },
    epsilon: { base: 0 },
    zeta: { base: -1 },
  },
  leading: {
    tight: 1.2,
    default: 1.7
  },
  // width of a line of body text, in characters (ch units)
  lineMeasure: 60
}

const spacing = {
  scale: {
    xxxnarrow: -12,
    xxnarrow: -8,
    xnarrow: -2,
    narrow: 0,
    medium: 3,
    wide: 6,
    xwide: 8
  },
  outside: {
    default: 'narrow',
    small: 'medium',
    medium: 'wide'
  }
}

const borders = {
  seam: {
    marker: {
      h: 5,
      w: 10
    },
    image: '/images/seam.svg'
  },
  widths: {
    default: 1,
    thick: 4
  },
  radius: {
    size: 0.2,
    unit: 'em'
  }
}

const breakpoints = {
  sizes: {
    xsmall: 30,
    small: 42,
    medium: 62,
    large: 75,
    xlarge: 100
  },
  unit: 'em'
}

module.exports = {
  color: {
    palette,
    themes
  },
  scale,
  type,
  spacing,
  borders,
  breakpoints
}