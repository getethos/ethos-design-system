import validateMinMaxFactory from '../../validators/validateMinMax'
import validateTruthy from '../../validators/validateTruthy'

export default function GenerateValidator(validatorName, args) {
  switch (validatorName) {
    case 'truthy':
      return validateTruthy
    case 'minMax':
      return validateMinMaxFactory.apply(null, args)
    case 'exampleEvenNumber':
      return (x) =>
        x.length % 2 ? 'Text does not have an even number of characters' : ''
    default:
      throw new Error('bad validator name')
  }
}
