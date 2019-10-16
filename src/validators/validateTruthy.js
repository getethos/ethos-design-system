// DEPRECATED: Please use validateExists instead
export default function validateTruthy(x) {
  return !!x ? '' : 'Please provide a value'
}
