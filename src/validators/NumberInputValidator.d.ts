declare const validateNumberRange: (
    min?: number,
    max?: number,
    message?: string
  ) => (value: any) => string | undefined
export default validateNumberRange