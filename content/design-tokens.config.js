const modularscale = require('modularscale-js')

// base scale
// -> config object for modularscale library
const scale: {
  config: {
    base: [1],
    ratio: 1.2
  },
  get: (value) => modularscale.get(value, scale.config)
};

// helper to tweak props of a palette color
function modifyColor(color, {
  s = 0,
  l = 0,
  a = 0
} = {}) {
  // saturation
  color.s += s
  color.s < 0 && color.s = 0
  color.s > 100 && color.s = 100
  
  // luminosity
  color.l += l
  color.l < 0 && color.l = 0
  color.l > 100 && color.l = 100
  
  // alpha
  color.a = a

  return color
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
    secondary: modifyColor(palette.gray, { l: 20 }),
    tertiary: modifyColor(palette.black, { l: 35 }),
    bg: palette.black,
    island: modifyColor(palette.black, { l: 8 }),
    well: modifyColor(palette.black, { l: -20 }),
    border: modifyColor(palette.black, { l: 20}),
    shadow: modifyColor(palette.black, {l: -60, a: 0.4 })
  },
  light: {
    primary: palette.black,
    secondary: modifyColor(palette.black, { l: 20 }),
    tertiary: palette.gray,
    bg: palette.white,
    island: palette.white
    well: modifyColor(palette.gray, { l: 85 }),
    border: modifyColor(palette.gray, { l: 20 }),
    shadow: modifyColor(palette.gray, { a: 0.2 })
  }
}

const type = {
  fonts: {
    display: {
      weights: {
        normal: 'Publico Headline'
      },
      stack: 'Publico, Georgia, Times, Times New Roman, serif'
    },
    body: {
      weights: {
        normal: 'Publico Text',
        italic: 'Publico Text Italic'
      },
      stack: 'Publico, Georgia, Times, Times New Roman, serif'
    },
    accent: {
      weights: {
        light: 'Guardian Sans Light',
        normal: 'Guardian Sans',
        bold: 'Guardian Sans Bold'
      },
      stack: 'Trebuchet, Lucida Grande, Verdana, sans-serif'
    },
  },
  scale: {
    alpha: scale.get(6),
    beta: scale.get(4),
    gamma: scale.get(3),
    delta: scale.get(1),
    epsilon: scale.get(0),
    zeta: scale.get(-1),
  },
  leading: {
    tight: 1.2,
    default: 1.7
  }
}

const spacing = {
  xxxnarrow: scale.get(-12),
  xxnarrow: scale.get(-8),
  xnarrow: scale.get(-4),
  narrow: scale.get(-2),
  medium: scale.get(1),
  wide: scale.get(3),
  xwide: scale.get(6)
}

const layoutWidths = {
  narrow: '30rem',
  default: '40rem',
  wide: '64rem',
  xwide: '75rem',
  xxwide: '112rem'
}

const breakpoints = {
  xsmall: '30em',
  small: '42em',
  medium: '62em',
  large: '75em',
  xlarge: '100em'
}

module.exports = {
  color: {
    palette,
    themes,
    highlight: palette.lavendar
  },
  type,
  spacing,
  breakpoints
}