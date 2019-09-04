import React from 'react'

const useRequired = (requiredProps) => {
  const includesRequired = (actualProps) => {
    const missingProps = []
    const keys = Object.keys(actualProps)
    const vals = Object.values(actualProps)

    // prop's missing, or, it's there but its value undefined or null
    requiredProps.forEach((prop) => {
      const val = actualProps[prop];
      if (!keys.includes(prop) || val === null || val === undefined) {
        missingProps.push(prop)
      }
    })
    if (missingProps.length) {
      throw new TypeError(
        `Missing required prop(s): '${missingProps.join(', ')}'`
      )
    }
  }
  return [includesRequired]
}

export default useRequired
