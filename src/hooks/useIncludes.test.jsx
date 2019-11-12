import useIncludes from './useIncludes'

describe('useIncludes hook', () => {
  test('valid values do not throw', () => {
    const whitelist = { small: 'small-val', medium: 'medium-val' }
    const [isLegalSizeValue, ,] = useIncludes(whitelist)
    expect(isLegalSizeValue('small-val')).toBeUndefined()
    expect(isLegalSizeValue('medium-val')).toBeUndefined()
  })

  test('invalid values throw', () => {
    const whitelist = { small: 'small-val', medium: 'medium-val' }
    const [isLegalSizeValue, ,] = useIncludes(whitelist)
    expect(() => {
      isLegalSizeValue('l')
    }).toThrow(TypeError)

    expect(() => {
      isLegalSizeValue('nope')
    }).toThrow(/Invalid item 'nope'/)
  })

  test('valid single keys do not throw', () => {
    const whitelist = ['yogabba']
    const [, includesKeysOrThrow] = useIncludes(whitelist)
    expect(includesKeysOrThrow({ yogabba: 'y' })).toBeUndefined()
  })

  test('invalid single key throws', () => {
    const whitelist = ['yogabba']
    const [, includesKeysOrThrow] = useIncludes(whitelist)
    expect(() => {
      includesKeysOrThrow({ nope: 'n' })
    }).toThrow(/Unexpected props: 'nope'/)
  })

  test('validates multiple keys', () => {
    const whitelist = ['a', 'b', 'c']
    const [, includesKeysOrThrow] = useIncludes(whitelist)
    expect(includesKeysOrThrow({ a: 'valid' })).toBeUndefined()
    expect(includesKeysOrThrow({ b: 'valid' })).toBeUndefined()
    expect(includesKeysOrThrow({ c: 'valid' })).toBeUndefined()
  })

  test('validates multiple keys and throws if invalid', () => {
    const whitelist = ['a', 'b', 'c']
    const [, includesKeysOrThrow] = useIncludes(whitelist)
    expect(() => {
      includesKeysOrThrow({ Z: 'invalid' })
    }).toThrow(/Unexpected props: 'Z'/)
  })
})
