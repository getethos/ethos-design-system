import React from 'react'
import styles from './Pagination.module.scss'

/**
 * usePagination hook for getting paging number buttons
 *
 * @public (or @private?)
 *
 * @param {function} props - fetch page callback
 *
 * @return {function} - conditionallyRenderPagingButtons for conditionally rendering paging buttons as needed
 */
export const usePagination = ({ fetchPageCallback = null }) => {
  if (!fetchPageCallback) {
    throw Error('usePagination requires fetchPageCallback')
  }

  /**
   * @private
   *
   * @param {number} pageCount the number of pages
   * @param {number}} currentPage the current page
   *
   * @returns JSX.Element
   */
  const getPaginationNumbers = (pageCount, currentPage) => {
    const pageNumbers = []
    const totalPages = pageCount
    let paginationNumbers

    if (totalPages) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i)
      }
      paginationNumbers = pageNumbers.map((number) => {
        const isCurrentPage = currentPage === number
        const klasses = isCurrentPage
          ? `${styles.paginationButtons} ${styles.active}`
          : styles.paginationButtons

        return (
          <button
            key={number}
            // eslint-disable-next-line
            {...(isCurrentPage && { 'aria-current': 'page' })}
            className={klasses}
            onClick={() => fetchPageCallback(number)}
            aria-label={`Goto Page ${number}`}
          >
            {number}
          </button>
        )
      })
    }
    return paginationNumbers
  }

  /**
   * @public
   *
   * @param {number} pageCount the number of pages
   * @param {number}} currentPage the current page
   * @returns JSX.Element | null
   */
  const conditionallyRenderPagingButtons = (pageCount, currentPage) => {
    const previousExists = currentPage > 1
    const nextExists = currentPage < pageCount

    if (pageCount > 1) {
      return (
        <nav aria-label="pagination" className={styles.pagination}>
          {previousExists && (
            <button
              className={[
                styles.paginationButtons,
                styles.paginationButtonsLeft,
              ].join(' ')}
              onClick={() => fetchPageCallback(currentPage - 1)}
              aria-label={`Goto Page ${currentPage - 1}`}
            >
              &laquo;
            </button>
          )}
          {getPaginationNumbers(pageCount, currentPage)}
          {nextExists && (
            <button
              className={[
                styles.paginationButtons,
                styles.paginationButtonsRight,
              ].join(' ')}
              onClick={() => fetchPageCallback(currentPage + 1)}
              aria-label={`Goto Page ${currentPage + 1}`}
            >
              &raquo;
            </button>
          )}
        </nav>
      )
    } else {
      return null
    }
  }

  return {
    conditionallyRenderPagingButtons,
  }
}
