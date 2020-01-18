import PropTypes from 'prop-types'
import React from 'react'
import styles from './Header.module.scss'

const Header = () => {
  return <h1 className={styles.Header}>Nora</h1>
}

Header.propTypes = {
  name: PropTypes.string.isRequired,
  title: PropTypes.string,
}

Header.defaultProps = {
  title: undefined,
}

export default Header
