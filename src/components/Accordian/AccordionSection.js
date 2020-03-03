import React, { useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import styles from './AccordionSection.module.css'
import { useAccordionContext } from './useAccordionContext.js'
import { codes } from '../../helpers/constants.js'

export const AccordionSection = ({ children, title, renderToggle, index }) => {
  const {
    focusRef,
    selected,
    expandedAll,
    onToggle,
    onNavigation,
    id,
  } = useAccordionContext()
  const sectionId = `${id}-${index}-section`
  const labelId = `${id}-${index}-label`
  const expanded = expandedAll[index]
  const labelRef = useRef()

  useEffect(() => {
    if (index === selected[0] && labelRef.current) {
      labelRef.current.focus()
    }
  }, [index, selected])

  const onKeyDown = (e) => {
    switch (e.keyCode) {
      case codes.SPACE:
      case codes.RETURN:
        e.preventDefault()
        onToggle && onToggle(index)
        break
      case codes.DOWN:
        e.preventDefault()
        onNavigation(codes.DOWN)
        break
      case codes.UP:
        e.preventDefault()
        onNavigation(codes.UP)
        break
      case codes.HOME:
        e.preventDefault()
        onNavigation(codes.HOME)
        break
      case codes.END:
        e.preventDefault()
        onNavigation(codes.END)
        break
      default:
    }
  }

  const onFocus = () => {
    focusRef.current = index
  }

  const onBlur = () => {
    focusRef.current = null
  }

  const onClick = () => {
    onToggle && onToggle(index)
  }

  return (
    <>
      <div
        role="button"
        aria-expanded={expanded}
        aria-controls={sectionId}
        id={labelId}
        tabIndex={0}
        className={styles.Label}
        onClick={onClick}
        onKeyDown={onKeyDown}
        onFocus={onFocus}
        onBlur={onBlur}
        ref={labelRef}
      >
        {title}
        {renderToggle(expanded)}
      </div>
      <div
        role="region"
        aria-labelledby={labelId}
        id={sectionId}
        hidden={!expanded}
        className={styles.Panel}
      >
        {children}
      </div>
    </>
  )
}

AccordionSection.propTypes = {
  index: PropTypes.number,
  title: PropTypes.string.isRequired,
  renderToggle: PropTypes.func,
  children: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
}
