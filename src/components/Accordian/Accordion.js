import React, { useRef, useState, useMemo } from 'react'
import PropTypes from 'prop-types'
import { AccordionContext } from './useAccordionContext'
import { codes } from '../../helpers/constants.js'

/**
 * Accessible accordian primitive informed by WAI Practices:
 * https://www.w3.org/TR/wai-aria-practices/examples/accordion/accordion.html
 */
export const Accordion = ({ children, expanded, onToggle, id, ...rest }) => {
  const focusRef = useRef(null)
  const [selected, setSelected] = useState([null])

  const context = useMemo(
    () => ({
      focusRef,
      selected,
      expandedAll: expanded,
      onToggle,
      id: id,

      /**
       * Keyboard navigation
       */
      onNavigation: (keyCode) => {
        const lastIndex = React.Children.count(children) - 1
        const current = focusRef.current
        switch (keyCode) {
          case codes.DOWN:
            if (current >= lastIndex) {
              setSelected([0])
            } else {
              setSelected([current + 1])
            }
            break
          case codes.UP:
            if (current <= 0) {
              setSelected([lastIndex])
            } else {
              setSelected([current - 1])
            }
            break
          case codes.HOME:
            setSelected([0])
            break
          case codes.END:
            setSelected([lastIndex])
            break
          default:
        }
      },
    }),
    [selected, setSelected, focusRef, children]
  )

  const renderSections = (sections) => {
    {
      return React.Children.map(sections, (section, index) => {
        return React.cloneElement(section, {
          ...section.props,
          index,
        })
      })
    }
  }
  return (
    <div id={id} {...rest}>
      <AccordionContext.Provider value={context}>
        {renderSections(children)}
      </AccordionContext.Provider>
    </div>
  )
}

Accordion.propTypes = {
  /** `expanded` - object where each key is a section index and the values is a booleans
   * reflecting whether said section should be open or not */
  expanded: PropTypes.object.isRequired,
  /** `onToggle` - a callback when toggle buttons are clicked that updates the `expanded` state */
  onToggle: PropTypes.func.isRequired,
}

Accordion.defaultProps = {
  expanded: null,
}
