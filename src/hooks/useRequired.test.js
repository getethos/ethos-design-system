import useRequired from './useRequired.js'

describe('useRequired hook', () => {
  test('does not throw if all required', () => {
    const listOfRequiredFields = ['data-tid', 'name', 'labelCopy']
    const [includesRequired] = useRequired(listOfRequiredFields)
    expect(
      includesRequired({ 'data-tid': 'val', name: 'val', labelCopy: 'val' })
    ).toBeUndefined()
  })

  test('throws if missing required', () => {
    const listOfRequiredFields = ['data-tid', 'name', 'labelCopy']
    const [includesRequired] = useRequired(listOfRequiredFields)
    expect(() => {
      includesRequired({ labelCopy: 'val' })
    }).toThrow("Missing required prop(s): 'data-tid, name'")
  })

  test('throws if a required fields is null or undefined', () => {
    const listOfRequiredFields = ['data-tid', 'name', 'labelCopy']
    const [includesRequired] = useRequired(listOfRequiredFields)
    expect(() => {
      includesRequired({ 'data-tid': undefined, name: 'val', labelCopy: 'val' })
    }).toThrow("Missing required prop(s): 'data-tid'")

    expect(() => {
      includesRequired({ 'data-tid': null, name: 'val', labelCopy: 'val' })
    }).toThrow("Missing required prop(s): 'data-tid'")
  })

  test('does not throw if a required field has false value', () => {
    const listOfRequiredFields = ['data-tid', 'name', 'labelCopy']
    const [includesRequired] = useRequired(listOfRequiredFields)
    expect(
      includesRequired({ 'data-tid': false, name: true, labelCopy: false })
    ).toBeUndefined()
  })
})
