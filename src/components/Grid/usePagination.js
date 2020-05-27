import React from 'react'
import styles from './Pagination.module.scss'
import { v4 as uuidv4 } from 'uuid'
import { generatePagination, ELLIPSIS } from './PaginationHelper'

/**
 * usePagination hook for getting paging number buttons
 *
 * @public
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
   * @param {number} currentPage the current page
   * @param {number} displayedPagesCount number of pages to be displayed
   *
   * @returns JSX.Element
   */
  const getPaginationNumbers = (
    pageCount,
    currentPage,
    displayedPagesCount
  ) => {
    const pageNumbers = []
    const totalPages = pageCount
    let paginationNumbers

    if (totalPages) {
      pageNumbers.push(
        ...generatePagination({ currentPage, pageCount, displayedPagesCount })
      )
      paginationNumbers = pageNumbers.map((number) => {
        const isCurrentPage = currentPage === number
        const klasses = isCurrentPage
          ? `${styles.paginationButtons} ${styles.active}`
          : styles.paginationButtons
        const isEllipsis = number === ELLIPSIS

        return isEllipsis ? (
          <button
            key={uuidv4()}
            className={klasses}
            onClick={() => {}}
            aria-label={'More Pages'}
            aria-disabled={true}
          >
            {number}
          </button>
        ) : (
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
   * @param {number} currentPage the current page
   * @param {number} displayedPagesCount number of pages to be displayed
   * @returns JSX.Element | null
   */
  const conditionallyRenderPagingButtons = (
    pageCount,
    currentPage,
    displayedPagesCount
  ) => {
    const previousDisabled = currentPage === 1
    const nextDisabled = currentPage === pageCount

    if (pageCount > 1) {
      return (
        <nav aria-label="pagination" className={styles.pagination}>
          <button
            className={styles.paginationButtons}
            onClick={() => fetchPageCallback(currentPage - 1)}
            aria-label={`Goto Page ${currentPage - 1}`}
            disabled={previousDisabled}
          >
            &laquo;
          </button>
          {getPaginationNumbers(pageCount, currentPage, displayedPagesCount)}
          <button
            className={styles.paginationButtons}
            onClick={() => fetchPageCallback(currentPage + 1)}
            aria-label={`Goto Page ${currentPage + 1}`}
            disabled={nextDisabled}
          >
            &raquo;
          </button>
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
