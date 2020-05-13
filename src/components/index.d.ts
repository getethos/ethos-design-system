/// <reference types="react" />

import React, { Component, HTMLAttributes } from 'react'

export { UniversalNavbar } from './UniversalNavbar/UniversalNavbar'
export { UniversalNavbarExpanded } from './UniversalNavbarExpanded/UniversalNavbarExpanded'

export { Layout } from './Layout/index.js'

// TODO -- DELETE THIS -- NOT GOING TO EXPORT DEPRECATED MEDIA
// export { Media } from './Media'

/**
 * AsyncTypeahead is a component that allows you to make asynchronous API
 * fetches, and then use the results (entities) to show suggested results
 * as dropdown options. It debounces the captured input via the
 * `useFetchEntities` hook which takes in your dependency injected `fetchCallback`
 * allowing you to fetch for any arbitrary entity (be it Posts, Users, or whatever).
 * In order to be flexible in this way, it also takes in the `dataKey` to parse the
 * API data with e.g. if you a list of items and .name has the token you wish
 * to display in the dropdown results, you'd pass in `dataKey="name"`.
 *
 * @public
 *
 * @return {JSX.Element}
 */
export declare const AsyncTypeahead: {
  ({
    renderInput,
    lastSelectedValue,
    dataKey,
    entitiesKey,
    onChange,
    fetchCallback,
    minChars,
    placeholder,
  }: {
    renderInput: any
    lastSelectedValue: object
    dataKey: string
    entitiesKey: string
    fetchCallback: any
    onChange?: any
    minChars?: number
    placeholder?: string
  }): JSX.Element
  propTypes: {
    /** `renderInput` - The input component to use (likely `SearchInput`) */
    renderInput: any
    /** `fetchCallback` - required callback for fetching the entities */
    fetchCallback: any
    /** `lastSelectedValue` - required object representing your last state */
    lastSelectedValue: object
    /** `onChange` - callback for change events */
    onChange: any
    /** `dataKey` - key to indice each item in the fetched data by key */
    dataKey: string
    /** `entitiesKey` - key to indice the fetched data entities by key. Although optional, note that if you don't pass this in, we will assume the JSON is structured with entities at the top level. */
    entitiesKey?: string
    /** `minChars` - minimum number of characters required to before we'll show the dropdown option results */
    minChars?: number
    /** `placeholder` - placeholder text */
    placeholder?: string
  }
}

type ViewportSizeType = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
type ColumnSizeType = number | boolean

export interface GridProps extends HTMLAttributes<HTMLDivElement> {
  readonly className?: string
  readonly tagName?: string
}

export interface RowProps extends HTMLAttributes<HTMLDivElement> {
  readonly reverse?: boolean
  readonly start?: ViewportSizeType
  readonly center?: ViewportSizeType
  readonly end?: ViewportSizeType
  readonly top?: ViewportSizeType
  readonly middle?: ViewportSizeType
  readonly bottom?: ViewportSizeType
  readonly around?: ViewportSizeType
  readonly between?: ViewportSizeType
  readonly className?: string
  readonly tagName?: string
}

export interface ColProps extends HTMLAttributes<HTMLDivElement> {
  readonly xs?: ColumnSizeType
  readonly sm?: ColumnSizeType
  readonly md?: ColumnSizeType
  readonly lg?: ColumnSizeType
  readonly xl?: ColumnSizeType
  readonly xsOffset?: number
  readonly smOffset?: number
  readonly mdOffset?: number
  readonly lgOffset?: number
  readonly xlOffset?: number
  readonly first?: ViewportSizeType
  readonly last?: ViewportSizeType
  readonly className?: string
  readonly tagName?: string
}

export class FlexGrid extends Component<GridProps, {}> {}

export class FlexRow extends Component<RowProps, {}> {}

export class FlexCol extends Component<ColProps, {}> {}

export declare const CheckboxInput: {
  ({
    formChangeHandler,
    validator,
    children,
    disabled,
    name,
    initialValue,
    checked,
    currentValue,
    currentError,
    setFieldTouched,
    formTouched,
    ...rest
  }: {
    [x: string]: any
    formChangeHandler?: (value: string, errorValue: string) => void
    validator?: (value: string) => string
    children: React.ReactNode
    disabled?: boolean
    name: string
    'data-tid': string
    initialValue?: string | boolean
    checked?: boolean
    currentValue?: string | boolean
    currentError?: string
    setFieldTouched?: (touched: boolean) => void
    formTouched?: boolean
  }): JSX.Element
  propTypes: {
    formTouched?: boolean
    name: string
    'data-tid': string
    initialValue?: string | boolean
    currentValue?: string | boolean
    currentError?: string
    setFieldTouched?: (touched: boolean) => void
    children: React.ReactNode
    disabled?: boolean
    allCaps?: boolean
    validator?: (value: string) => string
    formChangeHandler?: (value: string, errorValue: string) => void
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

interface downstreamButtonProps {
  backArrowIcon?: boolean
  arrowIcon?: boolean
  type?: string
  isSelected?: boolean
  fullWidth?: boolean
  disabled?: boolean
  name?: string
  onClick?: any
  'data-tid'?: string
  children: React.ReactNode
  role?: string
  ariaLabelId?: string
}

export declare const Modal: {
  ({
    ariaLabelledBy,
    ariaDescribedBy,
    children,
    isOpen,
    onDismiss,
  }: {
    /** Id of an element that labels the modal */
    ariaLabelledBy?: string
    /** Id of an element that describes the modal */
    ariaDescribedBy?: string
    /** The Modal's children */
    children: React.ReactNode
    /** Boolean that sets the state of the modal */
    isOpen?: boolean
    /** handler that onDismisss the state of the modal */
    onDismiss: any
  }): JSX.Element
  propTypes: {
    ariaLabelledBy?: string
    ariaDescribedBy?: string
    children: React.ReactNode
    isOpen?: boolean
    onDismiss: any
  }
}

export declare const Button: {
  Medium: {
    Black: (downstreamProps: downstreamButtonProps) => any
    BlackOutline: (downstreamProps: downstreamButtonProps) => any
    WhiteOutline: (downstreamProps: downstreamButtonProps) => any
    Stateful: {
      Default: (downstreamProps: downstreamButtonProps) => any
      White: (downstreamProps: downstreamButtonProps) => any
    }
  }
  Small: {
    BlackOutline: (downstreamProps: downstreamButtonProps) => any
  }
  Unstyled: (downstreamProps: downstreamButtonProps) => any
  WhiteCTA: (downstreamProps: downstreamButtonProps) => any
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

export declare const SearchInput: {
  ({
    disabled,
    compact,
    name,
    onChange,
    onFocus,
    onClick,
    onBlur,
    onKeyDown,
    placeholder,
    value,
    ...rest
  }: {
    [x: string]: any
    disabled?: boolean
    compact?: boolean
    name: string
    onChange?: any
    onFocus: any
    onClick: any
    onBlur: any
    onKeyDown: any
    placeholder?: string
    value?: string
  }): JSX.Element
  propTypes: {
    'data-tid': any
    disabled?: boolean
    compact?: boolean
    name: string
    onChange?: any
    onFocus: any
    onClick: any
    onBlur: any
    onKeyDown: any
    placeholder?: string
    value?: string
  }
}

export declare const Select: {
  ({
    classNamePrefix,
    className,
    title,
    isAsync,
    isCompact,
    isCreatable,
    validator,
    onChange,
    formChangeHandler,
    currentError,
    formTouched,
    labelCopy,
    name,
    ...rest
  }: {
    [x: string]: any
    classNamePrefix?: string
    className?: string
    title?: string
    isAsync?: boolean
    isCreatable?: boolean
    isCompact?: boolean
    validator?: (selectStringOrArrayOfSelections: any) => string
    loadOptions?: (selectStringOrArrayOfSelections: any) => any
    onChange?: (selectStringOrArrayOfSelections: any) => any
    formChangeHandler?: (
      selectStringOrArrayOfSelections: any,
      errorValue: string
    ) => void
    currentError?: string
    formTouched?: boolean
    labelCopy?: string
    name?: string
  }): JSX.Element
  propTypes: {
    classNamePrefix?: string
    loadOptions?: any
    onChange?: any
    isAsync?: boolean
    isCompact?: boolean
    title?: string
    className?: string
    isCreatable?: boolean
    'data-tid'?: string
  }
  defaultProps: {
    classNamePrefix?: string
    className?: string
    placeholder?: string
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

export declare function ValueProps({
  sections,
}: {
  sections: {
    iconUrl: string
    header: string
    subHeader: string
    alt?: string | undefined
  }[]
}): JSX.Element
export declare namespace ValueProps {
  var propTypes: {
    sections: {
      iconUrl: string
      header: string
      subHeader: string
      alt?: string | undefined
    }[]
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
        }
    )[]
  }
}

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
  onChange?: any
  formChangeHandler?: (value: string, errorValue: string) => void
  allCaps?: boolean
  name?: string
  initialValue?: string[] | boolean[]
  currentValue?: string
  currentError?: string
  formTouched?: boolean
  validator?: (value: string) => string
  disabled?: boolean
  required?: boolean
  labelCopy: string
}): JSX.Element
export declare namespace RadioButtonGroup {
  var PUBLIC_PROPS: {
    name?: string
    labelCopy: string
    allCaps?: boolean
    options: any
    initialValue?: string[] | boolean[]
    formTouched?: boolean
    currentValue?: string
    currentError?: string
    formChangeHandler?: (value: string, errorValue: string) => void
    onChange?: { value: string; isAnswered: boolean }
    'data-tid'?: string
    validator?: (value: string) => string
    disabled?: boolean
    required?: boolean
  }
  var propTypes: {
    name?: string
    labelCopy: string
    allCaps?: boolean
    options: any
    initialValue?: string[] | boolean[]
    formTouched?: boolean
    currentValue?: string
    currentError?: string
    formChangeHandler?: (value: string, errorValue: string) => void
    onChange?: { value: string; isAnswered: boolean }
    'data-tid'?: string
    validator?: (value: string) => string
    disabled?: boolean
    required?: boolean
  }
}
export declare const Grid: {
  (props: any): JSX.Element
  propTypes: {
    children: React.ReactNode
    className?: string
    rowRefs: any
    columnRefs: any
  }
  defaultProps: {
    className: string
  }
  displayName: string
}

export declare const Pagination: {
  ({
    currentPage,
    pageCount,
    displayedPagesCount,
    fetchPageCallback,
  }: {
    currentPage: any
    pageCount: any
    displayedPagesCount?: any
    /**
     * Ultimately, this returns the JSON.parse'd data
     */
    fetchPageCallback: (pageNumber: number | string) => object
  }): JSX.Element
  propTypes: {
    currentPage: any
    pageCount: any
    displayedPagesCount?: any
    /**
     * Ultimately, this returns the JSON.parse'd data
     */
    fetchPageCallback: (pageNumber: number | string) => object
  }
  displayName: string
}

// TODO -- figure out how to do better with Column and Row
export declare const Column: any
export declare const Row: any

export declare const useGridSorting: (
  rows: any,
  columns: any
) => {
  rowsRefs: any
  columnRefs: any[]
  sortedRows: any
  compareBy: (
    key: string | number,
    sortMethod?: (a: any, b: any) => 1 | 0 | -1
  ) => (a: any, b: any) => 1 | 0 | -1
  setSortState: (key: string | number) => void
  updateRowsRefs: (sortedRowsCopy: any) => void
  getSortIcon: (key: string | number) => JSX.Element
}

export declare const TextInput: (downstreamProps: any) => JSX.Element
export declare const PasswordInput: (props: any) => JSX.Element
export declare const NoraPasswordInput: (props: any) => JSX.Element

export declare const TextAreaInput: (downstreamProps: any) => JSX.Element

export declare const EmailInput: {
  (props: any): JSX.Element
  propTypes: {
    optional?: boolean
    'data-tid': string
    placeholder?: string
    disabled?: boolean
    allCaps?: boolean
    name: string
    labelCopy?: string
    validator?: (value: string) => string
    initialValue?: string
  }
  defaultProps: {
    labelCopy: string
    placeholder: string
  }
}

export declare const Stepper: {
  (props: any): JSX.Element
  propTypes: {
    steps: {
      title: string
      status: 'complete' | 'active' | 'incomplete'
    }[]
  }
}

export declare const Tooltip: {
  ({
    placement,
    label,
    inline,
    popperBoxStyles,
    details,
    boundariesElement,
    children,
  }: {
    placement?: 'top' | 'right' | 'left' | 'bottom' | 'auto'
    label: string
    inline?: boolean
    details: string
    popperBoxStyles?: string
    boundariesElement?: 'viewport' | 'scrollParent' | 'window'
    children?: React.ReactNode
  }): JSX.Element
  propTypes: {
    placement?: 'top' | 'right' | 'left' | 'bottom' | 'auto'
    label: string
    inline?: boolean
    details: string
    popperBoxStyles?: string
    boundariesElement?: 'viewport' | 'scrollParent' | 'window'
    children?: React.ReactNode
  }
}

export declare const TextMaskedInput: {
  (props: any): JSX.Element
  PUBLIC_PROPS: {
    mask: (mask: (string | RegExp)[]) => any
    type: string
    'data-tid': string
    name: string
    labelCopy: string
    doValidation?: (str: string, touched: boolean) => void
    placeholder?: string
    guide?: boolean
    initialValue?: string
    keepCharPositions?: boolean
    // See text-mask-addons/dist/createAutoCorrectedDatePipe
    pipe?: (p: any) => any
    disabled?: boolean
    allCaps?: boolean
    validator?: (value: string) => string
    setTouched?: (wasTouched: boolean) => void
    getTouched?: boolean
  }
  propTypes: {
    mask: (mask: (string | RegExp)[]) => any
    type: string
    'data-tid': string
    name: string
    labelCopy: string
    doValidation?: (str: string, touched: boolean) => void
    placeholder?: string
    guide?: boolean
    initialValue?: string
    keepCharPositions?: boolean
    // See text-mask-addons/dist/createAutoCorrectedDatePipe
    pipe?: (p: any) => any
    disabled?: boolean
    allCaps?: boolean
    validator?: (value: string) => string
    setTouched?: (wasTouched: boolean) => void
    getTouched?: boolean
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
      ({ children }: { children: React.ReactNode }): JSX.Element
      propTypes: {
        children: any
      }
    }
    Warning: {
      ({ children }: { children: React.ReactNode }): JSX.Element
      propTypes: {
        children: React.ReactNode
      }
    }
    Info: {
      ({ children }: { children: React.ReactNode }): JSX.Element
      propTypes: {
        children: React.ReactNode
      }
    }
    Success: {
      ({ children }: { children: React.ReactNode }): JSX.Element
      propTypes: {
        children: React.ReactNode
      }
    }
  }
  Alert: {
    Error: {
      ({ children }: { children: React.ReactNode }): JSX.Element
      propTypes: {
        children: React.ReactNode
      }
    }
    Warning: {
      ({ children }: { children: React.ReactNode }): JSX.Element
      propTypes: {
        children: React.ReactNode
      }
    }
    Info: {
      ({ children }: { children: React.ReactNode }): JSX.Element
      propTypes: {
        children: React.ReactNode
      }
    }
    Success: {
      ({ children }: { children: React.ReactNode }): JSX.Element
      propTypes: {
        children: React.ReactNode
      }
    }
  }
}

export declare const ZipInput: {
  (props: any): JSX.Element
  PUBLIC_PROPS: {
    'data-tid': string
    labelCopy: string
    name: string
    disabled?: boolean
    allCaps?: boolean
    validator?: (value: string) => string
    initialValue?: string
  }
  propTypes: {
    'data-tid': string
    labelCopy: string
    name: string
    disabled?: boolean
    allCaps?: boolean
    validator?: (value: string) => string
    initialValue?: string
  }
}

export declare function Form({
  children,
  config,
}: {
  children: React.ReactNode
  config: any
}): JSX.Element
export declare namespace Form {
  var propTypes: {
    children: React.ReactNode
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
    labelCopy: string
    children: React.ReactNode
    initialValue?: string | boolean
    currentValue?: string | boolean
    currentError?: string
    formTouched?: boolean
    onSelect?: any
    column?: boolean
    formChangeHandler?: (value: string, errorValue: string) => void
    name?: string
    allCaps?: boolean
    buttonStyle?: string
    validator?: (value: string) => string
    fullWidth?: boolean
  }): JSX.Element
  propTypes: {
    formTouched?: boolean
    currentValue?: string | boolean
    currentError?: string
    children: React.ReactNode
    /** Set's the caption of the group's label */
    labelCopy: string
    /** Name of the field, provided a uuid if not supplied. */
    name?: string
    /** When set to `true`, the group's label will be displayed uppercase */
    allCaps?: boolean
    /** Optionally sets a default value for the group. If set, the matching option will be set as `isSelected` */
    initialValue?: string | boolean
    /** Optional value that sets the background color of all the buttons in the group (unselected state) */
    buttonStyle?: string
    /** Optional callback thats fires when an option is selected. returns an object containing the selected `value` and a boolean value `isAnswered` */
    formChangeHandler?: (value: string, errorValue: string) => void
    /** Optional callback thats fires when an option is selected. Works similarly to onSelect, but used in `<Form>`. */
    onSelect?: any
    /** When set to `true`, the group will display as flex column */
    column?: boolean
    /** Optional data-tid used as a unique id for targeting test selectors */
    'data-tid'?: string
    validator?: (value: string) => string
    /** Optional, makes the group width 100%. Defaults to true */
    fullWidth?: boolean
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
    children: React.ReactNode
    isSelected?: boolean
    onClick?: any
    buttonStyle?: string
  }): JSX.Element
  propTypes: {
    children: React.ReactNode
    buttonStyle?: string
    /** Set's the caption of the button's label */
    label?: string
    /** When set to `true`, the button will display as `selected` */
    isSelected?: boolean
    /** An optional onClick handler that fires **after** an option has been selected */
    onClick?: any
  }
}

export declare const NoOptions: {
  ({ loadingText }: { loadingText: string }): JSX.Element
}

export declare const Option: {
  ({
    currentActive,
    itemIndex,
    item,
    dataKey,
    selectedOption,
    setSelectedAndActiveOptions,
    onChange,
  }: {
    currentActive: number
    itemIndex: number
    item: object
    dataKey: string
    selectedOption: number
    setSelectedAndActiveOptions: (index: number) => void
    onChange: any
  }): JSX.Element
}

export declare const Options: {
  ({
    activeOption,
    dataKey,
    entities,
    onChange,
    optionsRefs,
    selectedOption,
    setSelectedAndActiveOptions,
  }: {
    activeOption: number
    dataKey: string
    entities: any[]
    onChange: any
    optionsRefs: any[]
    selectedOption: number
    setSelectedAndActiveOptions: (index: number) => void
  }): JSX.Element
}

export declare const integerMask: any
export declare const NumberInput: {
  (props: any): JSX.Element
  propTypes: {
    'data-tid': string
    name: string
    labelCopy: string
    disabled?: boolean
    allCaps?: boolean
    currentValue?: string
    currentError?: string
    placeholder?: string
    formChangeHandler?: (value: string, errorValue: string) => void
    setFieldTouched?: (touched: boolean) => void
    validator?: (value: string) => string
    initialValue?: string
    type?: string
    mask?: (mask: (string | RegExp)[]) => any
  }
  defaultProps: {
    type: string
    mask: (mask: (string | RegExp)[]) => any
  }
}

export declare const Faq: {
  ({ questions, open }: { questions: any; open: any }): JSX.Element
  defaultProps: {
    questions: any[]
    open: boolean
  }
  propTypes: {
    questions: any
    /** Set to false for all questions to start collapsed. */
    open: any
  }
}

// Type
export { Caption } from './Caption.js'
export { Footnote } from './Footnote.js'
export { Body } from './Body.js'
export { Link } from './Link.js'
export { TitleSmall } from './Type/TitleSmall.js'
export { TitleMedium } from './Type/TitleMedium.js'
export { TitleLarge } from './Type/TitleLarge.js'
export { TitleXLarge } from './Type/TitleXLarge.js'
export { TitleXXLarge } from './Type/TitleXXLarge.js'

// Type2
export { Caption2 } from './Caption2.js'
export { Body2 } from './Body2.js'
export { TitleSmall2 } from './Type2/TitleSmall2.js'
export { TitleMedium2 } from './Type2/TitleMedium2.js'
export { TitleLarge2 } from './Type2/TitleLarge2.js'
export { TitleXLarge2 } from './Type2/TitleXLarge2.js'

////////////////////////////
// ---- NORA EXPORTS ---- //
////////////////////////////

declare module 'react' {
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    name?: string
  }
}

export declare const KabobMenuContainer: {
  ({
    focusRef,
    tabIndex,
    setIsOpen,
    isOpen,
    items,
    dataKey,
    setLastSelected,
    popoverContainerClasses,
  }: {
    focusRef?: any
    tabIndex?: number
    setIsOpen: (b: boolean) => void
    isOpen: boolean
    items: any[]
    dataKey: string
    setLastSelected: (ls: string) => void
    popoverContainerClasses: string
  }): JSX.Element
}

interface HeaderProps {
  name: string
  leftChildren: React.ReactNode
  rightChildren: React.ReactNode
}

/**
 * Base `Header` component that provides fixed positioning and renders
 * left and right side children. For ease of extension, `Header` is
 * intentionally much simpler then the UniversalNavbar component.
 * @see See [UniversalNavbar](https://github.com/getethos/ethos-design-system/blob/master/src/components/UniversalNavbar/UniversalNavbar.js)
 *
 * @public
 *
 * @param {object} props - Component Props
 * @prop {string} props.name - Unique name of header.
 * @prop {React.ReactNode} props.leftChildren - children to be rendered on left side of header
 * @prop {React.ReactNode} props.rightChildren - children to be rendered on right side of header
 *
 * @return {JSX.Element}
 */
export declare const Header: {
  ({ name, leftChildren, rightChildren }: HeaderProps): JSX.Element
  propTypes: {
    /** a required unique name for the header */
    name: string
    /** Optional children to render on left side of header */
    leftChildren: React.ReactNode
    /** Optional children to render on right side of header */
    rightChildren: React.ReactNode
  }
  defaultProps: {
    leftChildren: any
    rightChildren: any
  }
}

type ButtonType = 'button' | 'submit'

interface NoraButtonProps {
  children?: string
  'data-tid'?: string
  disabled?: boolean
  type?: ButtonType
  name?: string
  onClick?: any
  role?: string
  className?: string
}

export declare const NoraButton: {
  ({
    children,
    disabled,
    type,
    name,
    onClick,
    role,
    className,
    ...rest
  }: NoraButtonProps): JSX.Element
  propTypes: {
    children: React.ReactNode
    'data-tid': string
    disabled: boolean
    type: ButtonType
    name: string
    onClick: any
    role: string
    className: string
  }
}

interface TagProps {
  type: string
  children: React.ReactNode
}
export declare const Tag: {
  ({ type, children }: TagProps): JSX.Element
  propTypes: {
    type: string
    children: React.ReactNode
  }
  defaultProps: {
    type: any
  }
}

type LinkPositionType = 'left' | 'right'

export declare const IconLink: {
  ({
    iconPrefix,
    iconName,
    iconClassName,
    iconContainerClassName,
    textClassName,
    textPosition,
    copy,
    onClick,
    ...rest
  }: {
    iconPrefix: string
    iconName: string
    iconClassName: string
    iconContainerClassName: string
    textClassName: string
    textPosition: LinkPositionType
    copy: string
    onClick?: any
    'data-link-id'?: string
  }): any
  propTypes: {
    props: any
  }
}

export declare const Icon: {
  ({
    iconPrefix,
    iconName,
    className,
  }: {
    iconPrefix: string
    iconName: string
    className?: string
  }): JSX.Element
  propTypes: {
    props: any
  }
}

export declare const Drawer: {
  ({
    children,
    onDismiss,
    isOpen,
    lock,
    position,
    className,
    ignoredSelectors,
    floatingDrawerContentRenderer,
    ...rest
  }: {
    children: React.ReactNode
    onDismiss: any
    isOpen: boolean
    lock?: boolean
    position?: string
    className?: string
    ignoredSelectors?: string[]
    floatingDrawerContentRenderer?: any
    'data-tid'?: string
  }): JSX.Element
  propTypes: {
    props: any
  }
}

export declare const NoraDrawer: {
  ({
    children,
    onDismiss,
    isOpen,
    lock,
    position,
    labelCopy,
    closeCopy,
    floatingDrawerContentRenderer,
    ignoredSelectors,
    drawerClasses,
  }: {
    children: React.ReactNode
    onDismiss: any
    isOpen: boolean
    lock?: boolean
    labelCopy: string
    closeCopy: string
    position?: string
    drawerClasses?: string
    floatingDrawerContentRenderer?: any
    ignoredSelectors?: string[]
  }): JSX.Element
  propTypes: {
    props: any
  }
}

export declare const Accordion: {
  ({
    id,
    expanded,
    onToggle,
    children,
    toggleChildIsTarget,
  }: {
    id?: string
    expanded: object
    onToggle: any
    children: React.ReactNode
    toggleChildIsTarget?: boolean
  }): JSX.Element
  propTypes: {
    props: any
  }
}
export declare const AccordionSection: {
  ({
    index,
    title,
    renderToggle,
    children,
    labelClassName,
    panelClassName,
    toggleClassName,
  }: {
    index?: number
    title: string
    renderToggle?: any
    children: React.ReactNode
    labelClassName?: string
    panelClassName?: string
    toggleClassName?: string
  }): JSX.Element
  propTypes: {
    props: any
  }
}

export declare const NoraTextAreaInput: {
  ({
    disabled,
    name,
    value,
    labelCopy,
    labelClassName,
    textClassName,
    placeholder,
    onBlur,
    onFocus,
    onChange,
    ...rest
  }: {
    disabled?: boolean
    name: string
    value?: string
    labelCopy?: string
    labelClassName?: string
    textClassName?: string
    placeholder?: string
    onBlur?: any
    onFocus?: any
    onChange?: any
  }): JSX.Element
  propTypes: {
    props: any
  }
}

export declare const NoraRadioButtonGroup: {
  ({
    name,
    options,
    initialValue,
    formTouched,
    currentValue,
    currentError,
    formChangeHandler,
    onChange,
    validator,
    disabled,
    required,
  }: {
    name: string
    options: any
    initialValue?: string[] | boolean[]
    formTouched?: boolean
    currentValue?: string
    currentError?: string
    formChangeHandler?: (value: string, errorValue: string) => void
    onChange?: any
    validator?: (value: string) => string
    disabled?: boolean
    required?: boolean
  }): JSX.Element
}

export declare const NoraCheckboxInput: {
  ({
    name,
    initialValue,
    checked,
    children,
    validator,
    disabled,
    ...rest
  }: {
    name: string
    initialValue?: string | boolean
    checked?: boolean
    'data-tid': string
    children: React.ReactNode
    disabled?: boolean
    validator?: (value: string | boolean) => string
  }): JSX.Element
  propTypes: {
    props: any
  }
}
export declare const NoraButtonInput: {
  ({
    className,
    iconPrefix,
    iconName,
    side,
    buttonDisabled,
    onClick,
    // NoraTextInput props are passed through
    type,
    name,
    disabled,
    allCaps,
    initialValue,
    formChangeHandler,
    labelCopy,
    validator,
    placeholder,
    onBlur,
    onFocus,
    restrictIllegal,
  }: {
    className?: string
    iconPrefix: string
    iconName: string
    side: string
    buttonDisabled?: boolean
    onClick?: (ev: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
    // NoraTextInput props are passed through
    type?: string
    'data-tid': string
    name: string
    disabled?: boolean
    allCaps?: boolean
    initialValue?: string
    formChangeHandler?: (value: string, errorValue: string) => void
    labelCopy?: string
    validator?: (value: string) => string
    placeholder?: string
    onBlur?: any
    onFocus?: any
    restrictIllegal?: boolean
  }): JSX.Element
}

export declare const NoraTextInput: {
  ({
    type,
    name,
    disabled,
    allCaps,
    initialValue,
    formChangeHandler,
    labelCopy,
    validator,
    placeholder,
    onBlur,
    onFocus,
    restrictIllegal,
  }: {
    type?: string
    'data-tid': string
    name: string
    disabled?: boolean
    allCaps?: boolean
    initialValue?: string
    formChangeHandler?: (value: string, errorValue: string) => void
    labelCopy?: string
    validator?: (value: string) => string
    placeholder?: string
    onBlur?: any
    onFocus?: any
    restrictIllegal?: boolean
  }): JSX.Element
}

export declare const Snack: {
  ({
    children,
    classNameSkin,
  }: {
    children: React.ReactNode
    classNameSkin: string
  }): JSX.Element
  propTypes: {
    props: any
  }
}
export declare const Snackbar: {
  ({
    id,
    ariaLabelledBy,
    ariaDescribedBy,
    children,
    isOpen,
    className,
  }: {
    id: string
    children: React.ReactNode
    className: string
    ariaLabelledBy?: string
    ariaDescribedBy?: string
    isOpen?: boolean
  }): JSX.Element
  propTypes: {
    props: any
  }
}

export declare const NoraSnackbar: {
  ({
    id,
    ariaLabelledBy,
    ariaDescribedBy,
    children,
    isOpen,
    className,
  }: {
    id: string
    children: React.ReactNode
    className: string
    ariaLabelledBy?: string
    ariaDescribedBy?: string
    isOpen?: boolean
  }): JSX.Element
  propTypes: {
    props: any
  }
}
