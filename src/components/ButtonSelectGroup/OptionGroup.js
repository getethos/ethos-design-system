import React from 'react'
import PropTypes from 'prop-types'

function onClickHandler(value, onSelectHandler, clickHandler) {
    return (evt) => {
      onSelectHandler(value);
      return clickHandler && clickHandler(evt);
    }
}

  // function setChecked(checked, value) {
  //     // if (checked) {
  //     //     onSelectHandler(value);
  //     // } 

  //     return value === selectedValue;
  // }

/**
 *
 * @private
 *  
 * @param {React.Child[]} param.children
 * @param {string} param.selectedValue
 * @param {function} param.onSelectHandler
 *
 * @return {JSX.Element}
 */
export const OptionGroup = ({ children, selectedValue, onSelectHandler }) => {
  const options = React.Children.map(children, (child) => {
    const { checked, value, onClick } = child.props

    // const isSelected = setChecked(checked, value)
    const isSelected = value === selectedValue;

    const props = Object.assign({}, child.props, {
      isSelected,
      onSelectHandler,
      onClick: onClickHandler(value, onSelectHandler, onClick)
    })
    return React.cloneElement(child, props)
  })

  return <div className="button-group">{options}</div>
}

OptionGroup.propTypes = {
  selectedValue: PropTypes.string,
  onSelectHandler: PropTypes.func
}
