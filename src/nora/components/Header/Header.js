import PropTypes from 'prop-types'
import React from 'react'
import styles from './Header.module.scss'

const Title = ({ title }) => {
  return <div className={styles.Title}>{title}</div>
}

Title.propTypes = {
  title: PropTypes.string,
}

Title.defaultProps = {
  title: undefined,
}

const Profile = () => {
  return <div className={styles.Profile}>Profile</div>
}

const Header = ({ name, title }) => {
  return (
    <header name={name} className={styles.Header}>
      <Title title={title} />
      <Profile />
    </header>
  )
}

Header.propTypes = {
  name: PropTypes.string.isRequired,
  title: PropTypes.string,
}

Header.defaultProps = {
  title: undefined,
}

export default Header
