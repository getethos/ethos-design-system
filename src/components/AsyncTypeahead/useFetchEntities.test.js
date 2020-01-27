import { act } from 'react-test-renderer'
import { useFetchEntities } from './useFetchEntities.js'
import testHook from '../../hooks/testHook.js'

describe('useFetchEntities', () => {
  it('defaults', async () => {
    await act(async () => {
      testHook(() => {
        const fetchCallback = jest.fn()
        const { entities, loading } = useFetchEntities({
          searchString: 'abc',
          fetchEntities: fetchCallback,
          delay: 300,
        })
        expect(entities).toBeDefined()
        expect(loading).toBeDefined()
      })
    })
  })
})
