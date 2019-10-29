// Assumes json has been parsed into a JavaScript object literal
const mapJsonToFields = (json, componentsLookup, validatorsLookup) => {
  const fields = {}
  Object.keys(json).forEach((fieldKey) => {
    fields[fieldKey] = {}
    const field = json[fieldKey]
    fields[fieldKey] = field
    const validators = field.validators.map(
      (validator) => validatorsLookup[validator]
    )
    fields[fieldKey].validators = validators
    fields[fieldKey].component = componentsLookup[fieldKey]
  })
  return fields
}

export default mapJsonToFields
