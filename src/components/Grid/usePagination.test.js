import { act } from 'react-test-renderer'
import { usePagination } from './usePagination.js'
import testHook from '../../hooks/testHook.js'

const responseStub = {
  page: 1,
  itemCount: 2,
  total: 6,
  pageCount: 3,
  data: [{ id: 1 }, { id: 2 }],
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
        const { fetchPage, pagingState, getPaginationNumbers } = usePagination({
          fetchPage: fetchFn,
        })
        expect(fetchPage).toBeDefined()
        expect(pagingState).toBeDefined()
        expect(getPaginationNumbers).toBeDefined()
      })
    })
  })
})
