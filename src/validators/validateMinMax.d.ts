declare const validateMinMaxFactory: (
  min?: number,
  max?: number,
  message?: string
) => (value: any) => string | undefined
export default validateMinMaxFactory
