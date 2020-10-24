import * as React from 'react'
import styles from './Header.module.scss'

const Left: React.SFC<{}> = ({ children }) => {
  return <div className={styles.Left}>{children}</div>
}
Left.defaultProps = {
  children: undefined,
}

const Right: React.SFC<{}> = ({ children }) => {
  return <div className={styles.Right}>{children}</div>
}
Right.defaultProps = {
  children: undefined,
}

const Navbar: React.SFC<{}> = ({ children }) => {
  return <nav className={styles.Navbar}>{children}</nav>
}
Navbar.defaultProps = {
  children: undefined,
}

type HeaderProps = {
  name: string
  leftChildren?: React.ReactNode
  rightChildren?: React.ReactNode
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
export const Header: React.SFC<HeaderProps> = ({
  leftChildren,
  rightChildren,
}) => {
  return (
    <header className={styles.Header}>
      <Navbar>
        <Left>{leftChildren}</Left>
        <Right>{rightChildren}</Right>
      </Navbar>
    </header>
  )
}
Header.defaultProps = {
  leftChildren: undefined,
  rightChildren: undefined,
}
