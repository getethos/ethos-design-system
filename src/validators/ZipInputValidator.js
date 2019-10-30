// Currently, we only support USA. When we start to support
// other locales, refer to http://html5pattern.com/Postal_Codes.
const validZipRegex = /^(\d{5})$/

const ZIP_CODE_INVALID_ERROR_MESSAGE = 'Please enter a valid Zip Code.'

const ZipInputValidator = (postal) => {
  return validZipRegex.test(postal) ? '' : ZIP_CODE_INVALID_ERROR_MESSAGE
}

export default ZipInputValidator
