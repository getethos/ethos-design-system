import { PrivateButton } from './PrivateButton'
import { ButtonFactory } from './ButtonFactory'

// TODO: We need to figure out a better way to compose these button styles
export const Button = {
  Medium: {
    Black: ButtonFactory({
      size: PrivateButton.SIZES.MEDIUM,
      style: PrivateButton.STYLES.BLACK,
    }),
    BlackOutline: ButtonFactory({
      size: PrivateButton.SIZES.MEDIUM,
      style: PrivateButton.STYLES.BLACK_OUTLINE,
    }),
    WhiteOutline: ButtonFactory({
      size: PrivateButton.SIZES.MEDIUM,
      style: PrivateButton.STYLES.WHITE_OUTLINE,
    }),
    Stateful: {
      Default: ButtonFactory({
        size: PrivateButton.SIZES.MEDIUM,
        style: PrivateButton.STYLES.STATEFUL,
      }),
      White: ButtonFactory({
        size: PrivateButton.SIZES.MEDIUM,
        style: PrivateButton.STYLES.STATEFUL_WHITE,
      }),
    },
  },
  // ***** ONLY USE SMALL IN UniversalNavbar! ***** //
  Small: {
    BlackOutline: ButtonFactory({
      size: PrivateButton.SIZES.SMALL,
      style: PrivateButton.STYLES.BLACK_OUTLINE,
    }),
    Black: ButtonFactory({
      size: PrivateButton.SIZES.SMALL,
      style: PrivateButton.STYLES.BLACK,
    }),
  },
  Unstyled: ButtonFactory({
    size: PrivateButton.SIZES.UNSIZED,
    style: PrivateButton.STYLES.UNSTYLED,
  }),
  WhiteCTA: ButtonFactory({
    size: PrivateButton.SIZES.UNSIZED,
    style: PrivateButton.STYLES.WHITE_CTA,
  }),
}
