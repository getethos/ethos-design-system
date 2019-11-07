import React from 'react'
import PropTypes from 'prop-types'
import MediaQuery from 'react-responsive'
import styles from './Media.module.scss'

const MEDIA_RANGES = [
  'PhoneOnly',
  'PhoneAndTablet',
  'TabletOnly',
  'TabletAndLaptop',
  'TabletAndUp',
  'LaptopAndUp',
  'LaptopOnly',
  'DesktopOnly',
]

export function MediaElement({ children, Element = 'div', ...rest }) {
  const rangeMap = MEDIA_RANGES.reduce(
    (rangeMap, currentRange) => ({
      ...map,
      [currentRange]: (
        <Element
          {...rest}
          className={[className, styles[currentRange]].join(' ')}
        >
          {children}
        </Element>
      ),
    }),
    {}
  )
  return rangeMap
}

export function MediaDiv(props) {
  return <MediaElement {...props} Element="div" />
}

export function MediaSpan(props) {
  return <MediaElement {...props} Element="span" />
}

// Deprecated

export const Media = {
  PhoneOnly,
  PhoneAndTablet,
  TabletOnly,
  TabletAndLaptop,
  TabletAndUp,
  LaptopOnly,
  LaptopAndUp,
  DesktopOnly,
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

function PhoneOnly({ children }) {
  return <MediaQuery query={Media.QUERIES.PHONE_ONLY}>{children}</MediaQuery>
}

function PhoneAndTablet({ children }) {
  return (
    <MediaQuery query={Media.QUERIES.PHONE_AND_TABLET}>{children}</MediaQuery>
  )
}

function TabletOnly({ children }) {
  return <MediaQuery query={Media.QUERIES.TABLET_ONLY}>{children}</MediaQuery>
}

function TabletAndLaptop({ children }) {
  return (
    <MediaQuery query={Media.QUERIES.TABLET_AND_LAPTOP}>{children}</MediaQuery>
  )
}

function TabletAndUp({ children }) {
  return <MediaQuery query={Media.QUERIES.TABLET_AND_UP}>{children}</MediaQuery>
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

PhoneAndTablet.propTypes = { children: PropTypes.node.isRequired }
PhoneOnly.propTypes = { children: PropTypes.node.isRequired }
TabletAndLaptop.propTypes = { children: PropTypes.node.isRequired }
TabletAndUp.propTypes = { children: PropTypes.node.isRequired }
TabletOnly.propTypes = { children: PropTypes.node.isRequired }
LaptopAndUp.propTypes = { children: PropTypes.node.isRequired }
LaptopOnly.propTypes = { children: PropTypes.node.isRequired }
DesktopOnly.propTypes = { children: PropTypes.node.isRequired }
