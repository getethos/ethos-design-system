import React from 'react'
import PropTypes from 'prop-types'

export function Layout({ children }) {
  return <div className="Layout">{children}</div>
}

Layout.CenterHorizontally = CenterHorizontally

Layout.Container = Container

Layout.propTypes = {
  children: PropTypes.node,
}

function Container({ children }) {
  return <div className="Container">{children}</div>
}

Container.propTypes = {
  children: PropTypes.node,
}

function CenterHorizontally({ children }) {
  return <div className="CenterHorizontally">{children}</div>
}

CenterHorizontally.propTypes = {
  children: PropTypes.node,
}
