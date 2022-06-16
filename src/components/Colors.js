// The colors and vars in Colors.scss are baked, but this JS interface is not.
// This map is for high-level colors names (conflating e.g. opaque/transparent).
// It's also possible we'll need to make this isomorphic with the Sass file.
export const COLORS = {
  // Brand
  BRAND_BUTTERCUP: 'BrandButtercup',
  BRAND_DUCKEGG: 'BrandDuckegg',
  BRAND_FOREST: 'BrandForest',
  BRAND_MOSS: 'BrandMoss',
  BRAND_MOSS_TRANSLUSCENT: 'BrandMossTranslucent',
  BRAND_SALAMANDER: 'BrandSalamander',
  BRAND_SAND: 'BrandSand',

  // Grayscales
  GRAY_DARK_HOVER: 'GrayDarkHover',
  GRAY_DARK_HOVER_TRANS: 'GrayDarkHoverTrans',
  GRAY_LIGHT_HOVER: 'GrayLightHover',
  GRAY_LIGHT_HOVER_TRANS: 'GrayLightHoverTrans',
  GRAY_PRIMARY: 'GrayPrimary',
  GRAY_PRIMARY_TRANS: 'GrayPrimaryTrans',
  GRAY_SECONDARY: 'GraySecondary',
  GRAY_SECONDARY_TRANS: 'GraySecondaryTrans',
  GRAY_STROKE_AND_DISABLED: 'GrayStrokeAndDisabled',
  GRAY_STROKE_AND_DISABLED_TRANS: 'GrayStrokeAndDisabled',
  WHITE: 'White',

  // Miscellany
}
