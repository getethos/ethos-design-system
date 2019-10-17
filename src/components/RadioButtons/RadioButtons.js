import React from 'react'
import PropTypes from 'prop-types'
import useIncludes from '../../hooks/useIncludes.js'
import useInvalid from '../../hooks/useInvalid.js'

import { Body } from '../Type/Body.js'

/* @getethos/design-system/RadioButtons.js

   Legend:

   - `RadioButton` is an HTML radio button with a styled façade and label.
   - `RadioButtonGroup` is a stack of the above, mostly agnostic of any library.
   - `RadioButtons.scss` (not imported here) styles these components.
   ========================================================================== */

/**
 * `RadioButton` returns a styled HTML radio button with a clickable text label.
 *
 * Native HTML inputs aren't easy to style, so the <input> is hidden, and the
 * visible "radio button" is a façade (the <aside>) with `pointer-events: none`.
 *
 * Generally everything here is meant to have few surprises – it's just HTML.
 * That said, wiring this up to a form library may result in additional props
 * (e.g. event handlers) reaching this component.
 *
 * As of mid 2019, this means this component will see redux-form `...input`
 * props, i.e. onChange, onBlur. These are listed below for explicitness. If
 * we switch form approaches, we can probably just remove/edit those props.
 *
 * The "checked" prop is controlled by the parent RadioButtonGroup component.
 *
 * Docs: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/radio
 *
 * @param {String}    name      The name of the field, e.g. 'faveColor'
 * @param {String}    value     The value of this option, e.g. 'blue'
 * @param {Boolean}   checked   Whether this option is currently selected
 * @param {Boolean}   required  Whether this radio group is required
 * @param {Boolean}   disabled  Whether this option is disabled
 * @param {String}    label     The text label to show on the right
 * @param {...Object} rest      Mostly redux-form Field input/meta props
 */
function RadioButton({
  name,
  value,
  optional,
  checked,
  required,
  disabled,
  label,
  ...rest
}) {
  // Verify that required props were supplied
  const [, includesKeysOrThrow] = useIncludes(['name', 'value', 'label'])
  includesKeysOrThrow({ name, value, label })

  // Verify that no invalid props were supplied
  const [includesInvalid] = useInvalid(Object.keys(RadioButton.propTypes))
  includesInvalid(rest)

  return (
    <label className={RadioButton.CLASS_NAME}>
      <span>
        <input
          type="radio"
          name={name}
          value={value}
          checked={checked}
          required={required}
          disabled={disabled}
          data-tid={rest['data-tid']}
          {...rest} // for redux-form input.onChange, etc.
        />
        <aside />
      </span>
      <Body.Regular400>{label}</Body.Regular400>
    </label>
  )
}

RadioButton.CLASS_NAME = 'RadioButton'

RadioButton.propTypes = {
  name: PropTypes.string.isRequired,
  optional: PropTypes.bool,
  value: PropTypes.string.isRequired,
  checked: PropTypes.bool,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  label: PropTypes.node.isRequired, // user-facing text label
  'data-tid': PropTypes.string,

  // These will appear if RadioButtonGroup is used with redux-form:
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onDragStart: PropTypes.func,
  onDrop: PropTypes.func,
  onFocus: PropTypes.func,
}

/**
 * RadioButtonGroup returns a stack of the above `<RadioButton>`'s.
 *
 * It is mostly form-library-agnostic, to lessen our dependency on redux-form,
 * but there are a few aspects worth mentioning.
 *
 * If this is used as the component for a Field in the shared/fields folder,
 * (it will), it can expect to receive a `value` prop (via redux-form). We can
 * then use this value to determine which radio button should receive the
 * `checked` prop. (See similar ideas on redux-form #124: https://git.io/fj9Tb)
 *
 * If we change form libraries/approaches, this component might need tweaks.
 *
 * @param {String}     name      The name of the field, e.g. 'faveColor'
 * @param {Array}      options   Props passed to the individual radios
 * @param {String}     value     The currently selected option.value
 * @param {Boolean     disabled  Whether this radio group is disabled
 * @param {Boolean}    required  Whether this radio group is required
 * @param {...Object}  rest      Mostly redux-form Field input/meta props
 */
export function RadioButtonGroup({
  name,
  options,
  value,
  disabled,
  required,
  ...rest // includes redux-form props, e.g. input.onChange
}) {
  // Passing `disabled` at the group/field level disables all options. You can
  // also disable an individual option/radio button via `option.disabled`.
  // Not supported yet: autoComplete, tabIndex (not obviously necessary)

  // Which option is selected? Add the `checked` attribute to that one.
  // We must also add the `name` to each option.
  const finalOptions = options.map((o) => {
    const checked = o.value === value
    return { ...o, name, checked }
  })

  return (
    <fieldset className={RadioButtonGroup.CLASS_NAME}>
      {finalOptions.map((option) => (
        <RadioButton
          {...option}
          disabled={disabled || option.disabled}
          required={required}
          key={`${option.label}-${option.value.toLowerCase()}`}
          {...rest}
        />
      ))}
    </fieldset>
  )
}

RadioButtonGroup.CLASS_NAME = 'RadioButtonGroup'

RadioButtonGroup.PUBLIC_PROPS = {
  name: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.shape(RadioButton.propTypes)).isRequired,
  value: PropTypes.string,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
}

RadioButtonGroup.propTypes = {
  ...RadioButtonGroup.PUBLIC_PROPS,
}
