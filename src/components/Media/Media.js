export const Media = {
  BREAKPOINTS: {
    PHONE_RANGE_END: 599,
    TABLET_RANGE_START: 600,
    TABLET_RANGE_END: 899,
    LAPTOP_RANGE_START: 900,
    LAPTOP_RANGE_END: 1199,
    DESKTOP_RANGE_START: 1200,
  },
}

Media.QUERIES = {
  PHONE_ONLY: `(max-width: ${Media.BREAKPOINTS.PHONE_RANGE_END}px)`,
  PHONE_AND_TABLET: `(max-width: ${Media.BREAKPOINTS.TABLET_RANGE_END}px)`,
  TABLET_ONLY: [
    `(min-width: ${Media.BREAKPOINTS.TABLET_RANGE_START}px)`,
    `(max-width: ${Media.BREAKPOINTS.TABLET_RANGE_END}px)`,
  ].join(' and '),
  TABLET_AND_LAPTOP: [
    `(min-width: ${Media.BREAKPOINTS.TABLET_RANGE_START}px)`,
    `(max-width: ${Media.BREAKPOINTS.LAPTOP_RANGE_END}px)`,
  ].join(' and '),
  TABLET_AND_UP: `(min-width: ${Media.BREAKPOINTS.TABLET_RANGE_START}px)`,
  LAPTOP_ONLY: [
    `(min-width: ${Media.BREAKPOINTS.LAPTOP_RANGE_START}px)`,
    `(max-width: ${Media.BREAKPOINTS.LAPTOP_RANGE_END}px)`,
  ].join(' and '),
  LAPTOP_AND_UP: `(min-width: ${Media.BREAKPOINTS.LAPTOP_RANGE_START}px)`,
  DESKTOP_ONLY: `(min-width: ${Media.BREAKPOINTS.DESKTOP_RANGE_START}px)`,
}
