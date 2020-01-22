import React from 'react'
import PropTypes from 'prop-types'
import { TextInput } from '../TextInput'
import styles from './SearchInput.module.scss'
import textInputStyles from '../TextInput/TextInput.module.scss'

export const SearchInput = (props) => {
  const onKeyDown = (ev) => {
    props.onEnter()
  }

  return (
    <div onKeyDown={onKeyDown} className={styles.SearchIconContainer}>
      <input
        type="text"
        className={textInputStyles.TextInput}
        placeholder="Search"
        name="search-input"
        restrictIllegal={false}
      />
      <svg className={styles.SearchIcon} focusable="false" viewBox="0 0 32 32">
        <path d="M29.707,28.293l-8.256-8.256C23.042,18.13,24,15.677,24,13c0-6.075-4.925-11-11-11S2,6.925,2,13s4.925,11,11,11c2.677,0,5.13-0.958,7.037-2.549l8.256,8.256L29.707,28.293z M4,13c0-4.963,4.037-9,9-9c4.963,0,9,4.037,9,9s-4.037,9-9,9C8.037,22,4,17.963,4,13z" />
      </svg>
    </div>
  )
}
