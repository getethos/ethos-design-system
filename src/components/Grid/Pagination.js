import React from 'react'
import { usePagination } from './usePagination'
import PropTypes from 'prop-types'
import styles from './Pagination.module.scss'

export const Pagination = ({ fetchPageCallback, renderCallback }) => {
  if (!fetchPageCallback || !renderCallback) {
    throw Error(
      'Pagination requires a fetchPageCallback and renderCallback parameters'
    )
  }

  const { fetchPage, pagingState, getPaginationNumbers } = usePagination({
    fetchPage: fetchPageCallback,
  })

  return (
    <>
      {renderCallback(pagingState.items)}
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
    </>
  )
}

Pagination.propTypes = {
  fetchPageCallback: PropTypes.func.isRequired,
  renderCallback: PropTypes.func.isRequired,
}
Pagination.displayName = 'Pagination'
