import React, { useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useAccordionContext } from './useAccordionContext.js'
import { codes } from '../../helpers/constants.js'

/**
 * HeaderBar will place all the event handlers on the header itself,
 * if `toggleChildIsTarget` is false. If `toggleChildIsTarget` is true,
 * we put those handlers ont the <Toggler /> itself.
 */
const HeaderBar = ({
  renderToggle,
  focusRef,
  onToggle,
  toggleChildIsTarget,
  onNavigation,
  expanded,
  sectionId,
  labelId,
  labelRef,
  index,
  title,
  labelClassName,
  toggleClassName,
}) => {
  const onKeyDown = (e) => {
    switch (e.keyCode) {
      case codes.SPACE:
      case codes.RETURN:
        e.preventDefault()
        onToggle && onToggle(index, title, expanded)
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
    onToggle && onToggle(index, title, expanded)
  }

  /**
   * It's important here that we've done the following:
   * 1. Have HeaderBar outside of AccordionSection
   * 2. Not have multiple return statements which trigger rerenders
   * https://medium.com/@cowi4030/optimizing-conditional-rendering-in-react-3fee6b197a20
   * All of these allow focus to be preserved as we toggle the AccordionSection
   * since we aren't triggering needless rerenders.
   */
  return (
    <>
      {toggleChildIsTarget && (
        <div className={labelClassName}>
          {title}
          <span
            role="button"
            aria-expanded={expanded}
            aria-controls={sectionId}
            id={labelId}
            tabIndex={0}
            className={toggleClassName}
            onClick={onClick}
            onKeyDown={onKeyDown}
            onFocus={onFocus}
            onBlur={onBlur}
            ref={labelRef}
          >
            {renderToggle(expanded)}
          </span>
        </div>
      )}
      {!toggleChildIsTarget && (
        <div
          role="button"
          aria-expanded={expanded}
          aria-controls={sectionId}
          id={labelId}
          tabIndex={0}
          className={labelClassName}
          onClick={onClick}
          onKeyDown={onKeyDown}
          onFocus={onFocus}
          onBlur={onBlur}
          ref={labelRef}
        >
          {title}
          {renderToggle(expanded)}
        </div>
      )}
    </>
  )
}

HeaderBar.propTypes = {
  index: PropTypes.number,
  title: PropTypes.string.isRequired,
  renderToggle: PropTypes.func,
  focusRef: PropTypes.object,
  onToggle: PropTypes.func,
  toggleChildIsTarget: PropTypes.bool,
  onNavigation: PropTypes.func,
  expanded: PropTypes.bool,
  sectionId: PropTypes.string,
  labelId: PropTypes.string,
  labelRef: PropTypes.object,
  labelClassName: PropTypes.string,
  toggleClassName: PropTypes.string,
}

export const AccordionSection = ({
  children,
  title,
  renderToggle,
  index,
  labelClassName = '',
  panelClassName = '',
  toggleClassName = '',
}) => {
  const {
    focusRef,
    selected,
    expandedAll,
    onToggle,
    toggleChildIsTarget,
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

  return (
    <>
      <HeaderBar
        renderToggle={renderToggle}
        focusRef={focusRef}
        onToggle={onToggle}
        toggleChildIsTarget={toggleChildIsTarget}
        onNavigation={onNavigation}
        expanded={expanded}
        sectionId={sectionId}
        labelId={labelId}
        labelRef={labelRef}
        index={index}
        title={title}
        labelClassName={labelClassName}
        toggleClassName={toggleClassName}
      />
      <div
        role="region"
        aria-labelledby={labelId}
        id={sectionId}
        hidden={!expanded}
        className={panelClassName}
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
  children: PropTypes.node.isRequired,
  labelClassName: PropTypes.string,
  panelClassName: PropTypes.string,
  toggleClassName: PropTypes.string,
}
