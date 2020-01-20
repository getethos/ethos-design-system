import React from 'react'
import PropTypes from 'prop-types'
import styles from './Header.module.scss'

/**
 * @private
 *
 * @param {JSX.Element} props.children - left children
 */
const Left = ({ children }) => {
  return <div className={styles.Left}>{children}</div>
}

Left.propTypes = {
  children: PropTypes.node,
}
Left.defaultProps = {
  children: undefined,
}

/**
 * @private
 *
 * @param {JSX.Element} props.children - left children
 */
const Right = ({ children }) => {
  return <div className={styles.Right}>{children}</div>
}
Right.propTypes = {
  children: PropTypes.node,
}
Right.defaultProps = {
  children: undefined,
}

const Navbar = ({ children }) => {
  return <nav className={styles.Navbar}>{children}</nav>
}
Navbar.propTypes = {
  children: PropTypes.node,
}
Navbar.defaultProps = {
  children: undefined,
}

/**
 * Base `Header` component that provides fixed positioning and renders
 * left and right side children. For ease of extension, `Header` is
 * intentionally much simpler then the UniversalNavbar component.
 * @see See [UniversalNavbar](https://github.com/getethos/ethos-design-system/blob/master/src/components/UniversalNavbar/UniversalNavbar.js)
 *
 * @public
 *
 * @param {object} props - Component Props
 * @prop {string} props.name - Unique name of header.
 * @prop {React.ReactNode} props.leftChildren - children to be rendered on left side of header
 * @prop {React.ReactNode} props.rightChildren - children to be rendered on right side of header
 *
 * @return {JSX.Element}
 */
export const Header = ({ name, leftChildren, rightChildren }) => {
  return (
    <header name={name} className={styles.Header}>
      <Navbar>
        <Left>{leftChildren}</Left>
        <Right>{rightChildren}</Right>
      </Navbar>
    </header>
  )
}

Header.propTypes = {
  /** a required unique name for the header */
  name: PropTypes.string.isRequired,
  /** Optional children to render on left side of header */
  leftChildren: PropTypes.node,
  /** Optional children to render on right side of header */
  rightChildren: PropTypes.node,
}

Header.defaultProps = {
  leftChildren: undefined,
  rightChildren: undefined,
}
