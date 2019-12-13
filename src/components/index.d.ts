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
// export { Spacer } from './Spacer'
// export { ValueProps } from './ValueProps'
// export { RadioButtonGroup } from './RadioButtons'
// export { TextInput } from './TextInput'
// export { PasswordInput } from './PasswordInput'
// export { TextAreaInput } from './TextAreaInput'
// export { EmailInput } from './EmailInput'
// export { TextMaskedInput } from './TextMaskedInput'
// export { InfoMessage } from './InfoMessage'
// export { ZipInput } from './ZipInput'
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
// export { ButtonSelectGroup } from './ButtonSelectGroup/ButtonSelectGroup'
// export { NumberInput } from './NumberInput/NumberInput'
// export { OPTION_BUTTON_STYLES } from './ButtonSelectGroup/OptionButton'

// export {
//   Body,
//   Caption,
//   Footnote,
//   TitleSmall,
//   TitleMedium,
//   TitleLarge,
//   TitleXLarge,
//   TitleXXLarge,
//   Link,
// } from './Type'
