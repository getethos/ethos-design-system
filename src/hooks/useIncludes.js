import React from 'react'

const useIncludes = (list) => {
  const includesValueOrThrow = (item) => {
    const isValid = Object.values(list).includes(item)
    const type = Object.keys({ item })[0]

    if (!isValid) {
      throw new TypeError(`Invalid ${type} '${item}'.`)
    }
  }

  const includesKeysOrThrow = (rest) => {
    const unexpectedPropKeys = Object.keys(rest).filter(
      (prop) => !list.includes(prop)
    )
    if (unexpectedPropKeys.length > 0) {
      throw new TypeError(
        `Unexpected props: '${unexpectedPropKeys.join(', ')}'`
      )
    }
  }

  return [includesValueOrThrow, includesKeysOrThrow]
}

export default useIncludes
