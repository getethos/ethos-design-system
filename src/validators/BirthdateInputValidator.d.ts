export declare const DATE_FORMATS: string[]
export declare const dateMaskByFormat: {
  'mm/dd/yyyy': (string | RegExp)[]
  'mm/yyyy': (string | RegExp)[]
  'mm/yy': (string | RegExp)[]
}
export declare const dateRegexByFormat: {
  'mm/dd/yyyy': RegExp
  'mm/yyyy': RegExp
  'mm/yy': RegExp
}
export declare const dateStringMatchesFormat: (
  cleansedDateString: string,
  dateFormat: string
) => '' | 'Please enter a valid date.'
export declare const getMaxDateValidator: (
  props: any
) => (value: string | null | undefined) => string
export declare const getMinDateValidator: (
  props: any
) => (value: string | null | undefined) => string
export declare const validateMinMaxDateFactory: (
  props: any
) => (value: any) => any
