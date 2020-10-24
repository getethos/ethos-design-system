import { act } from 'react-test-renderer'
import { usePagination } from './usePagination'
import testHook from '../../hooks/testHook.js'

const responseStub = {
  page: 1,
  itemCount: 2,
  total: 6,
  pageCount: 3,
  items: [{ id: 1 }, { id: 2 }],
}

describe('usePagination', () => {
  let fetchFn

  beforeEach(() => {
    fetchFn = jest.fn()
    fetchFn.mockReturnValue(responseStub)
  })

  afterEach(() => {
    fetchFn = null
  })

  it('defines methods', async () => {
    await act(async () => {
      testHook(() => {
        const { conditionallyRenderPagingButtons } = usePagination({
          fetchPageCallback: fetchFn,
        })
        expect(conditionallyRenderPagingButtons).toBeDefined()
      })
    })
  })
})
