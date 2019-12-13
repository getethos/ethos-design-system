/// <reference types="react" />

import React from 'react'
declare class UniversalNavbar extends React.Component {
  private props
  state: {
    showMobileMenu: boolean
  }
  toggleHamburger: () => void
  render(): JSX.Element
}
export { UniversalNavbar }

export { Layout } from './Layout/index.js'

// TODO -- DELETE THIS -- NOT GOING TO EXPORT DEPRECATED MEDIA
// export { Media } from './Media'

export declare const CheckboxInput: {
  ({
    formChangeHandler,
    validator,
    children,
    disabled,
    name,
    initialValue,
    currentValue,
    currentError,
    setFieldTouched,
    formTouched,
    ...rest
  }: {
    [x: string]: any
    formChangeHandler: any
    validator: any
    children: any
    disabled: any
    name: any
    initialValue: any
    currentValue: any
    currentError: any
    setFieldTouched: any
    formTouched: any
  }): JSX.Element
  propTypes: {
    formTouched: any
    name: any
    'data-tid': any
    initialValue: any
    currentValue: any
    setFieldTouched: any
    currentError: any
    children: any
    disabled: any
    allCaps: any
    validator: any
    formChangeHandler: any
  }
}

declare function LogoInline(props: any): JSX.Element
declare namespace LogoInline {
  var propTypes: {
    style: any
  }
  var defaultProps: {
    style: {
      display: string
      height: number
    }
  }
}
export declare const Logo: {
  Inline: typeof LogoInline
}

import { Button } from './Button'

export declare const Button: {
  Medium: {
    Black: (downstreamProps: any) => any
    BlackOutline: (downstreamProps: any) => any
    WhiteOutline: (downstreamProps: any) => any
    Stateful: {
      Default: (downstreamProps: any) => any
      White: (downstreamProps: any) => any
    }
  }
  Small: {
    BlackOutline: (downstreamProps: any) => any
  }
  Unstyled: (downstreamProps: any) => any
  WhiteCTA: (downstreamProps: any) => any
}

export declare const CLOUDINARY_CLOUD_NAME = 'getethos'
export declare const CloudinaryImage: {
  ({
    publicId,
    className,
    alt,
    width,
    height,
    crop,
    ...rest
  }: {
    [x: string]: any
    publicId: any
    className: any
    alt: any
    width: any
    height: any
    crop: any
  }): JSX.Element
  CROP_METHODS: {
    FILL: string
    FIT: string
    CROP: string
  }
  PUBLIC_PROPS: {
    height: any
    width: any
    className: any
    alt: any
    publicId: any
    crop: any
  }
  defaultProps: {
    crop: string
    alt: string
  }
  propTypes: {
    height: any
    width: any
    className: any
    alt: any
    publicId: any
    crop: any
  }
}
export declare const filePath: (publicId: any) => any

export { COLORS } from './Colors'

export declare const Select: {
  ({
    className,
    title,
    isAsync,
    isCreatable,
    ...rest
  }: {
    [x: string]: any
    className: any
    title: any
    isAsync: any
    isCreatable: any
  }): JSX.Element
  propTypes: {
    classNamePrefix: any
    loadOptions: any
    onChange: any
    isAsync: any
    title: any
    className: any
    isCreatable: any
  }
  defaultProps: {
    classNamePrefix: string
    className: any
    placeholder: string
  }
}

export declare const Spacer: {
  H80: (downstreamProps: any) => JSX.Element
  H72: (downstreamProps: any) => JSX.Element
  H64: (downstreamProps: any) => JSX.Element
  H56: (downstreamProps: any) => JSX.Element
  H48: (downstreamProps: any) => JSX.Element
  H40: (downstreamProps: any) => JSX.Element
  H32: (downstreamProps: any) => JSX.Element
  H24: (downstreamProps: any) => JSX.Element
  H16: (downstreamProps: any) => JSX.Element
  H8: (downstreamProps: any) => JSX.Element
  H4: (downstreamProps: any) => JSX.Element
  W80: (downstreamProps: any) => JSX.Element
  W72: (downstreamProps: any) => JSX.Element
  W64: (downstreamProps: any) => JSX.Element
  W56: (downstreamProps: any) => JSX.Element
  W48: (downstreamProps: any) => JSX.Element
  W40: (downstreamProps: any) => JSX.Element
  W32: (downstreamProps: any) => JSX.Element
  W24: (downstreamProps: any) => JSX.Element
  W16: (downstreamProps: any) => JSX.Element
  W8: (downstreamProps: any) => JSX.Element
  W4: (downstreamProps: any) => JSX.Element
}

export declare function ValueProps({ sections }: { sections: any }): JSX.Element
export declare namespace ValueProps {
  var propTypes: {
    sections: any
  }
  var defaultProps: {
    sections: (
      | {
          iconUrl: string
          header: string
          subHeader: string
          alt: string
        }
      | {
          iconUrl: string
          header: string
          subHeader: string
          alt?: undefined
        })[]
  }
}
export default ValueProps

export declare const focusHelper: {
  focus: (elementRef: any) => void
}
export declare function RadioButtonGroup({
  options,
  onChange,
  formChangeHandler,
  allCaps,
  name,
  initialValue,
  currentValue,
  currentError,
  formTouched,
  disabled,
  validator,
  required,
  labelCopy,
  ...rest
}: {
  [x: string]: any
  options: any
  onChange: any
  formChangeHandler: any
  allCaps?: boolean
  name?: string
  initialValue?: any
  currentValue: any
  currentError: any
  formTouched: any
  disabled: any
  validator: any
  required: any
  labelCopy: any
}): JSX.Element
export declare namespace RadioButtonGroup {
  var PUBLIC_PROPS: {
    name: any
    labelCopy: any
    allCaps: any
    options: any
    initialValue: any
    formTouched: any
    currentValue: any
    currentError: any
    formChangeHandler: any
    onChange: any
    'data-tid': any
    validator: any
    disabled: any
    required: any
  }
  var propTypes: {
    name: any
    labelCopy: any
    allCaps: any
    options: any
    initialValue: any
    formTouched: any
    currentValue: any
    currentError: any
    formChangeHandler: any
    onChange: any
    'data-tid': any
    validator: any
    disabled: any
    required: any
  }
}

export declare const TextInput: (downstreamProps: any) => JSX.Element

export declare const PasswordInput: (props: any) => JSX.Element

export declare const TextAreaInput: (downstreamProps: any) => JSX.Element

export declare const EmailInput: {
  (props: any): JSX.Element
  propTypes: {
    optional: any
    'data-tid': any
    placeholder: any
    disabled: any
    allCaps: any
    name: any
    labelCopy: any
    validator: any
    initialValue: any
  }
  defaultProps: {
    labelCopy: string
    placeholder: string
  }
}

export declare const TextMaskedInput: {
  (props: any): JSX.Element
  PUBLIC_PROPS: {
    doValidation: any
    placeholder: any
    mask: any
    guide: any
    initialValue: any
    keepCharPositions: any
    pipe: any
    type: any
    'data-tid': any
    disabled: any
    allCaps: any
    name: any
    labelCopy: any
    validator: any
    setTouched: any
    getTouched: any
  }
  propTypes: {
    doValidation: any
    placeholder: any
    mask: any
    guide: any
    initialValue: any
    keepCharPositions: any
    pipe: any
    type: any
    'data-tid': any
    disabled: any
    allCaps: any
    name: any
    labelCopy: any
    validator: any
    setTouched: any
    getTouched: any
  }
  defaultProps: {
    placeholder: string
    guide: boolean
    keepCharPositions: boolean
    disabled: boolean
    allCaps: boolean
  }
}

export declare const InfoMessage: {
  Text: {
    Error: {
      ({ children }: { children: any }): JSX.Element
      propTypes: {
        children: any
      }
    }
    Warning: {
      ({ children }: { children: any }): JSX.Element
      propTypes: {
        children: any
      }
    }
    Info: {
      ({ children }: { children: any }): JSX.Element
      propTypes: {
        children: any
      }
    }
    Success: {
      ({ children }: { children: any }): JSX.Element
      propTypes: {
        children: any
      }
    }
  }
  Alert: {
    Error: {
      ({ children }: { children: any }): JSX.Element
      propTypes: {
        children: any
      }
    }
    Warning: {
      ({ children }: { children: any }): JSX.Element
      propTypes: {
        children: any
      }
    }
    Info: {
      ({ children }: { children: any }): JSX.Element
      propTypes: {
        children: any
      }
    }
    Success: {
      ({ children }: { children: any }): JSX.Element
      propTypes: {
        children: any
      }
    }
  }
}

export declare const ZipInput: {
  (props: any): JSX.Element
  PUBLIC_PROPS: {
    'data-tid': any
    disabled: any
    allCaps: any
    name: any
    labelCopy: any
    validator: any
    initialValue: any
  }
  propTypes: {
    'data-tid': any
    disabled: any
    allCaps: any
    name: any
    labelCopy: any
    validator: any
    initialValue: any
  }
}

export declare function Form({
  children,
  config,
}: {
  children: any
  config: any
}): JSX.Element
export declare namespace Form {
  var propTypes: {
    children: any
    config: any
  }
}

import * as Validators from '../validators/BirthdateInputValidator'
export declare const BirthdateInput: (downstreamProps: any) => JSX.Element
export declare const BirthdateInputValidators: typeof Validators

/**
 * Component renders a group of button that behaves similarly to a radio group
 *
 * @public
 *
 * @param {object} props - Component Props
 * @prop {string} props.name - Name of field. default value is a uuid
 * @prop {string} props.labelCopy - Set's the caption of the group's label
 * @prop {string} [props.initialValue] - Optionally sets a default value for the group. If set, the matching option will be set as `isSelected`
 * @prop {string} [props.buttonStyle] - Optional value that sets the background color of all the buttons in the group (unselected state)
 * @prop {function} [props.onSelect] - Optional callback thats fires when an option is selected. returns an object containing the selected `value` and a boolean value `isAnswered`
 * @prop {function} [props.formChangeHandler] - Optional callback thats fires when an option is selected. Works similarly to onSelect, but used in `<Form>`.
 *
 * @example ```
 * <ButtonSelectGroup
 *  initialValue="excellent"
 *  labelCopy="Health"
 *  onSelect={({ value }) => console.log(value)}
 * >
 *   <ButtonSelectGroup.Option value="average">Average</ButtonSelectGroup.Option>
 *   <ButtonSelectGroup.Option value="great">Greate</ButtonSelectGroup.Option>
 * </ButtonSelectGroup>
 * ```
 *
 * @return {JSX.Element}
 */
export declare const ButtonSelectGroup: {
  ({
    labelCopy,
    children,
    initialValue,
    currentValue,
    currentError,
    formTouched,
    onSelect,
    column,
    formChangeHandler,
    name,
    allCaps,
    buttonStyle,
    validator,
    fullWidth,
    ...rest
  }: {
    [x: string]: any
    labelCopy: any
    children: any
    initialValue?: any
    currentValue: any
    currentError: any
    formTouched: any
    onSelect: any
    column: any
    formChangeHandler: any
    name?: string
    allCaps?: boolean
    buttonStyle?: string
    validator: any
    fullWidth?: boolean
  }): JSX.Element
  propTypes: {
    formTouched: any
    currentValue: any
    currentError: any
    children: any
    /** Set's the caption of the group's label */
    labelCopy: any
    /** Name of the field, provided a uuid if not supplied. */
    name: any
    /** When set to `true`, the group's label will be displayed uppercase */
    allCaps: any
    /** Optionally sets a default value for the group. If set, the matching option will be set as `isSelected` */
    initialValue: any
    /** Optional value that sets the background color of all the buttons in the group (unselected state) */
    buttonStyle: any
    /** Optional callback thats fires when an option is selected. returns an object containing the selected `value` and a boolean value `isAnswered` */
    formChangeHandler: any
    /** Optional callback thats fires when an option is selected. Works similarly to onSelect, but used in `<Form>`. */
    onSelect: any
    /** When set to `true`, the group will display as flex column */
    column: any
    /** Optional data-tid used as a unique id for targeting test selectors */
    'data-tid': any
    validator: any
    /** Optional, makes the group width 100%. Defaults to true */
    fullWidth: any
  }
  Option: any
}

export declare const OPTION_BUTTON_STYLES: {
  DEFAULT: string
  WHITE: string
}
/**
 * Component renders an option button within a `<ButtonSelectGroup />`
 *
 * @private
 *
 * @param {object} props - Component Props
 * @param {string} props.label - the option's label
 * @param {boolean} props.isSelected - determines if the option is currently selected
 * @param {function} [props.onClick] - The value of the option
 *
 * @return {JSX.Element}
 */
export declare const OptionButton: {
  ({
    children: label,
    isSelected,
    onClick,
    buttonStyle,
  }: {
    children: any
    isSelected: any
    onClick: any
    buttonStyle: any
  }): JSX.Element
  propTypes: {
    children: any
    buttonStyle: any
    /** Set's the caption of the button's label */
    label: any
    /** When set to `true`, the button will display as `selected` */
    isSelected: any
    /** An optional onClick handler that fires **after** an option has been selected */
    onClick: any
  }
}

export declare const integerMask: any
export declare const NumberInput: {
  (props: any): JSX.Element
  propTypes: {
    'data-tid': any
    disabled: any
    allCaps: any
    currentValue: any
    currentError: any
    placeholder: any
    formChangeHandler: any
    setFieldTouched: any
    name: any
    labelCopy: any
    validator: any
    initialValue: any
    type: any
    mask: any
  }
  defaultProps: {
    type: string
    mask: any
  }
}

export { Caption } from './Caption.js'
export { Footnote } from './Footnote.js'
export { Body } from './Body.js'
export { Link } from './Link.js'
export { TitleSmall } from './Type/TitleSmall.js'
export { TitleMedium } from './Type/TitleMedium.js'
export { TitleLarge } from './Type/TitleLarge.js'
export { TitleXLarge } from './Type/TitleXLarge.js'
export { TitleXXLarge } from './Type/TitleXXLarge.js'