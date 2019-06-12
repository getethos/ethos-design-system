import React from 'react'
import PropTypes from 'prop-types'
import MediaQuery from 'react-responsive'

export const Media = {
  PhoneOnly,
  TabletAndUp,
  TabletOnly,
  LaptopAndUp,
  LaptopOnly,
  DesktopOnly,
  BREAKPOINTS: {
    TABLET_RANGE_START: 600, // TODO: DRY with Sass
    LAPTOP_RANGE_START: 900,
    DESKTOP_RANGE_START: 1200,
  },
}

Media.QUERIES = {
  PHONE_ONLY: `(max-width: ${Media.BREAKPOINTS.TABLET_RANGE_START - 1}px)`,
  TABLET_AND_UP: `(min-width: ${Media.BREAKPOINTS.TABLET_RANGE_START}px)`,
  TABLET_ONLY: [
    `(min-width: ${Media.BREAKPOINTS.TABLET_RANGE_START}px)`,
    `(max-width: ${Media.BREAKPOINTS.LAPTOP_RANGE_START - 1}px)`,
  ].join(' and '),
  LAPTOP_AND_UP: `(min-width: ${Media.BREAKPOINTS.LAPTOP_RANGE_START}px)`,
  LAPTOP_ONLY: [
    `(min-width: ${Media.BREAKPOINTS.LAPTOP_RANGE_START}px)`,
    `(max-width: ${Media.BREAKPOINTS.DESKTOP_RANGE_START - 1}px)`,
  ].join(' and '),
  DESKTOP_ONLY: `(min-width: ${Media.BREAKPOINTS.DESKTOP_RANGE_START}px)`,
}

function PhoneOnly({ children }) {
  return <MediaQuery query={Media.QUERIES.PHONE_ONLY}>{children}</MediaQuery>
}

function TabletAndUp({ children }) {
  return <MediaQuery query={Media.QUERIES.TABLET_AND_UP}>{children}</MediaQuery>
}

function TabletOnly({ children }) {
  return <MediaQuery query={Media.QUERIES.TABLET_ONLY}>{children}</MediaQuery>
}

function LaptopAndUp({ children }) {
  return <MediaQuery query={Media.QUERIES.LAPTOP_AND_UP}>{children}</MediaQuery>
}

function LaptopOnly({ children }) {
  return <MediaQuery query={Media.QUERIES.LAPTOP_ONLY}>{children}</MediaQuery>
}

function DesktopOnly({ children }) {
  return <MediaQuery query={Media.QUERIES.DESKTOP_ONLY}>{children}</MediaQuery>
}

PhoneOnly.propTypes = { children: PropTypes.node.isRequired }
TabletAndUp.propTypes = { children: PropTypes.node.isRequired }
TabletOnly.propTypes = { children: PropTypes.node.isRequired }
LaptopAndUp.propTypes = { children: PropTypes.node.isRequired }
LaptopOnly.propTypes = { children: PropTypes.node.isRequired }
DesktopOnly.propTypes = { children: PropTypes.node.isRequired }
