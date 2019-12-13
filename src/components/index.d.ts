/// <reference types="react" />
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

// export { CloudinaryImage, CLOUDINARY_CLOUD_NAME } from './Images'
// export { COLORS } from './Colors'
// export { Layout } from './Layout'
// export { Media } from './Media'
// export { Select } from './Select'

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

// export { ValueProps } from './ValueProps'
// export { RadioButtonGroup } from './RadioButtons'
// export { TextInput } from './TextInput'
export declare const TextInput: (downstreamProps: any) => JSX.Element

// export { PasswordInput } from './PasswordInput'
// export { TextAreaInput } from './TextAreaInput'
// export { EmailInput } from './EmailInput'
// export { TextMaskedInput } from './TextMaskedInput'
// export { InfoMessage } from './InfoMessage'

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

// export { CheckboxInput } from './CheckboxInput'

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

// export { UniversalNavbar } from './UniversalNavbar/UniversalNavbar'

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

// export { NumberInput } from './NumberInput/NumberInput'
// export { OPTION_BUTTON_STYLES } from './ButtonSelectGroup/OptionButton'

export { Caption } from './Type/Caption.js'
export { Footnote } from './Type/Footnote.js'
export { Body } from './Body.js'
export { Link } from './Link.js'
export { TitleSmall } from './Types/TitleSmall.js'
export { TitleMedium } from './Type/TitleMedium.js'
export { TitleLarge } from './Type/TitleLarge.js'
export { TitleXLarge } from './Type/TitleXLarge.js'
export { TitleXXLarge } from './Type/TitleXXLarge.js'
