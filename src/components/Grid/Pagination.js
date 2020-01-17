import PropTypes from 'prop-types'
import React, { memo } from 'react'
import styles from './Pagination.module.scss'
import { usePagination } from './usePagination'

export const Pagination = memo(({ fetchPageCallback, renderCallback }) => {
  if (!fetchPageCallback || !renderCallback) {
    throw Error(
      'Pagination requires a fetchPageCallback and renderCallback parameters'
    )
  }

  const { fetchPage, pagingState, getPaginationNumbers } = usePagination({
    fetchPage: fetchPageCallback,
  })

  const conditionallyRenderPagingButtons = () => {
    if (pagingState.pageCount > 1) {
      return (
        <nav aria-label="pagination" className={styles.pagination}>
          <button
            className={[
              styles.paginationButtons,
              styles.paginationButtonsLeft,
            ].join(' ')}
            onClick={() => fetchPage(1)}
            aria-label="Goto Page 1"
          >
            &laquo;
          </button>
          {getPaginationNumbers()}
          <button
            className={[
              styles.paginationButtons,
              styles.paginationButtonsRight,
            ].join(' ')}
            onClick={() => fetchPage(pagingState.pageCount)}
            aria-label={`Goto Page ${pagingState.pageCount}`}
          >
            &raquo;
          </button>
        </nav>
      )
    } else {
      return null
    }
  }

  return (
    <>
      {renderCallback(pagingState.items)}
      {conditionallyRenderPagingButtons()}
    </>
  )
})

Pagination.propTypes = {
  fetchPageCallback: PropTypes.func.isRequired,
  renderCallback: PropTypes.func.isRequired,
}
Pagination.displayName = 'Pagination'
