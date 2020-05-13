import { generatePagination, ELLIPSIS } from './PaginationHelper'

describe('generatePagination', function() {
  it(`Page number is less than the number of pages displayed, 
  display all page numbers`, () => {
    let pagination = generatePagination({
      currentPage: 5,
      pageCount: 9,
      displayedPagesCount: 10,
    })
    expect(pagination).toStrictEqual([1, 2, 3, 4, 5, 6, 7, 8, 9])
  })

  it(`Page number equals the number of pages displayed, 
  display all page numbers`, () => {
    let pagination = generatePagination({
      currentPage: 9,
      pageCount: 10,
      displayedPagesCount: 10,
    })
    expect(pagination).toStrictEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
  })

  it(`Total pages are greater than the number of pages displayed, 
  the current page <= number of pages/2, 
  display only the end ellipsis`, function() {
    let pagination = generatePagination({
      currentPage: 5,
      pageCount: 20,
      displayedPagesCount: 10,
    })
    expect(pagination[pagination.length - 2]).toStrictEqual(ELLIPSIS)
    expect(pagination[1]).not.toStrictEqual(ELLIPSIS)
  })

  it(`Total pages are greater than the number of pages displayed, 
  the current page >= the number of pages - the number of pages is displayed/2, 
  display only the start ellipsis`, function() {
    let pagination = generatePagination({
      currentPage: 15,
      pageCount: 20,
      displayedPagesCount: 10,
    })
    expect(pagination[1]).toStrictEqual(ELLIPSIS)
    expect(pagination[pagination.length - 2]).not.toStrictEqual(ELLIPSIS)
  })

  it(`Total pages are greater than the number of displaypages, 
  the current page > the number of pages displayed/2, 
  current page < the total number of pages - the number of pages displayed/2, 
  display start and end the ellipsis`, function() {
    let pagination = generatePagination({
      currentPage: 6,
      pageCount: 20,
      displayedPagesCount: 10,
    })
    expect(pagination[1]).toStrictEqual(ELLIPSIS)
    expect(pagination[pagination.length - 2]).toStrictEqual(ELLIPSIS)
  })
})
