import PropTypes from 'prop-types'
import React from 'react'
import styles from './Header.module.scss'

/**
 * @private
 *
 * @param {string} props.title - Title to display
 */
const Title = ({ title }) => {
  return <div className={styles.Title}>{title}</div>
}

Title.propTypes = {
  title: PropTypes.string,
}

Title.defaultProps = {
  title: undefined,
}

// TODO -- Profile should take a props.children argument instead of hard-coding
const Profile = () => {
  return <div className={styles.Profile}>Profile</div>
}

/**
 * Base `Header` component that provides fixed positioning and a left-hand
 * `title` and a right-hand `profile`. For ease of extension, `Header` is
 * intentionally much simpler then the UniversalNavbar component.
 * @see See [UniversalNavbar](https://github.com/getethos/ethos-design-system/blob/master/src/components/UniversalNavbar/UniversalNavbar.js)
 *
 * @public
 *
 * @param {object} props - Component Props
 * @prop {string} props.name - Unique name of header.
 * @prop {string} props.title - Title for the header. Shown on left.
 *
 * @return {JSX.Element}
 */
const Header = ({ name, title }) => {
  return (
    <header name={name} className={styles.Header}>
      <Title title={title} />
      <Profile />
    </header>
  )
}

Header.propTypes = {
  /** a required unique name for the header */
  name: PropTypes.string.isRequired,
  /** an optional title for the header—shown on the left */
  title: PropTypes.string,
}

Header.defaultProps = {
  title: undefined,
}

export default Header
