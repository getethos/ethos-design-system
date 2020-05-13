export const ELLIPSIS = '...'

export const generatePagination = ({
  currentPage,
  pageCount,
  displayedPagesCount,
}) => {
  let pages = [],
    omit = pageCount - displayedPagesCount,
    omitLeft,
    omitRight
  let showPageMedian = Math.floor(displayedPagesCount / 2)

  if (pageCount > displayedPagesCount) {
    if (currentPage > showPageMedian) {
      omitLeft = Math.min(currentPage - showPageMedian, omit)
      omitRight = omit - omitLeft
    } else {
      omitLeft = 0
      omitRight = omit
    }
    for (let i = 1; i <= pageCount; i++) {
      if (omitLeft > 0) {
        if (i > 1 && i < omitLeft + 3) {
          continue
        }
      }
      if (omitRight > 0) {
        if (i < pageCount && i > pageCount - omitRight - 2) {
          continue
        }
      }
      pages.push(i)
    }
    if (omitLeft > 0) {
      pages.splice(1, 0, ELLIPSIS)
    }
    if (omitRight > 0) {
      pages.splice(pages.length - 1, 0, ELLIPSIS)
    }
    return pages
  } else {
    for (let i = 1; i <= pageCount; i++) {
      pages.push(i)
    }
  }
  return pages
}
