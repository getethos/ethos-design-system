declare const validateMinMaxFactory: (
  min?: number,
  max?: number,
  message?: string
) => (value: any) => string
export default validateMinMaxFactory
