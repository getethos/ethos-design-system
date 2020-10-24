import * as React from 'react'
import MediaQuery from 'react-responsive'
import { BREAKPOINTS, QUERIES } from './constants'

export const PhoneOnly: React.FC<{}> = ({ children }) => {
  return <MediaQuery query={QUERIES.PHONE_ONLY}>{children}</MediaQuery>
}

export const PhoneAndTablet: React.FC<{}> = ({ children }) => {
  return <MediaQuery query={QUERIES.PHONE_AND_TABLET}>{children}</MediaQuery>
}

export const TabletOnly: React.FC<{}> = ({ children }) => {
  return <MediaQuery query={QUERIES.TABLET_ONLY}>{children}</MediaQuery>
}

export const TabletAndLaptop: React.FC<{}> = ({ children }) => {
  return <MediaQuery query={QUERIES.TABLET_AND_LAPTOP}>{children}</MediaQuery>
}

export const TabletAndUp: React.FC<{}> = ({ children }) => {
  return <MediaQuery query={QUERIES.TABLET_AND_UP}>{children}</MediaQuery>
}

export const LaptopAndUp: React.FC<{}> = ({ children }) => {
  return <MediaQuery query={QUERIES.LAPTOP_AND_UP}>{children}</MediaQuery>
}

export const LaptopOnly: React.FC<{}> = ({ children }) => {
  return <MediaQuery query={QUERIES.LAPTOP_ONLY}>{children}</MediaQuery>
}

export const DesktopOnly: React.FC<{}> = ({ children }) => {
  return <MediaQuery query={QUERIES.DESKTOP_ONLY}>{children}</MediaQuery>
}

export const Media = {
  PhoneOnly,
  PhoneAndTablet,
  TabletOnly,
  TabletAndLaptop,
  TabletAndUp,
  LaptopOnly,
  LaptopAndUp,
  DesktopOnly,
  BREAKPOINTS,
  QUERIES,
}
