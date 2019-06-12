// The colors and vars in Colors.scss are baked, but this JS interface is not.
// This map is for high-level colors names (conflating e.g. opaque/transparent).
// It's also possible we'll need to make this isomorphic with the Sass file.
module.exports.COLORS = {
  BRAND_BLUE: 'BrandBlue',
  BRAND_YELLOW: 'BrandYellow',

  BLACK: 'Black',
  GRAY_DARKEST: 'GrayDarkest',
  GRAY_DARK: 'GrayDark',
  GRAY_LIGHT: 'GrayLight',
  GRAY_LIGHTEST: 'GrayLightest',
  WHITE: 'White',

  SKY: 'Sky',
}
