// base scale
const scale = 1.2

// helper to tweak props of a palette color
function modifyColor(color, {
  s = 0,
  l = 0,
  a = 1
} = {}) {
  return { h: color.h, s, l, a }
}

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
    secondary: modifyColor(palette.gray, { l: 40 }),
    tertiary: modifyColor(palette.black, { l: 50 }),
    highlight: palette.lavendar,
    bg: palette.black,
    island: modifyColor(palette.black, { l: 35 }),
    well: modifyColor(palette.black, { l: 17 }),
    border: modifyColor(palette.black, { l: 20}),
    shadow: modifyColor(palette.black, {l: 0, a: 0.4 })
  },
  default: {
    primary: palette.black,
    secondary: modifyColor(palette.black, { l: 40 }),
    tertiary: palette.gray,
    highlight: palette.lavendar,
    bg: palette.white,
    island: palette.white,
    well: modifyColor(palette.gray, { l: 90 }),
    border: modifyColor(palette.gray, { l: 85 }),
    shadow: modifyColor(palette.gray, { a: 0.2 })
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
    alpha: { base: 4, fluid: 5, max: 8 },
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
    xnarrow: -4,
    narrow: -2,
    medium: 1,
    wide: 3,
    xwide: 6
  },
  outside: {
    default: 'narrow',
    small: 'medium',
    medium: 'wide'
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
  breakpoints
}