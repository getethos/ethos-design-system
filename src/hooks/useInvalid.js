const useInvalid = (validProps) => {
  const includesInvalid = (actualProps) => {
    const presentButInvalidProps = []
    const keys = Object.keys(actualProps)

    // prop's missing, or, it's there and its value is truthy
    keys.forEach((key) => {
      if (!validProps.includes(key) && !!actualProps[key]) {
        presentButInvalidProps.push(key)
      }
    })
    if (presentButInvalidProps.length) {
      throw new TypeError(
        `Using invalid prop(s): '${presentButInvalidProps.join(', ')}'`
      )
    }
  }
  return [includesInvalid]
}

export default useInvalid
