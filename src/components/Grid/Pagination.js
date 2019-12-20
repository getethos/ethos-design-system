import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import styles from './Pagination.module.css'

const usePagination = ({
  data = null,
  total = null,
  per_page = null,
  total_pages = null,
  current_page = 1,
  fetchPage = null,
  startPageNumber = 1,
}) => {
  if (!fetchPage) {
    throw Error('usePagination requires a fetchPage callback')
  }

  const [pagingState, setPagingState] = useState({
    data,
    total,
    per_page,
    total_pages,
    current_page,
    fetchPage,
  })

  const fetchPageDelegate = async (pageNumber) => {
    const data = await fetchPage(pageNumber)
    setPagingState({
      data: data.data,
      total: data.total,
      per_page: data.per_page,
      current_page: data.page,
      total_pages: data.total_pages,
    })
  }

  const getPaginationNumbers = () => {
    const pageNumbers = []
    let paginationNumbers
    if (pagingState.total !== null) {
      for (
        let i = 1;
        i <= Math.ceil(pagingState.total / pagingState.per_page);
        i++
      ) {
        pageNumbers.push(i)
      }
      paginationNumbers = pageNumbers.map((number) => {
        const isCurrentPage = pagingState.current_page === number
        const klasses = isCurrentPage
          ? `${styles.paginationButtons} ${styles.active}`
          : styles.paginationButtons

        return (
          <button
            key={number}
            // eslint-disable-next-line
            {...isCurrentPage && { 'aria-current': 'page' }}
            className={klasses}
            onClick={() => fetchPageDelegate(number)}
            aria-label={`Goto Page ${number}`}
          >
            {number}
          </button>
        )
      })
    }
    return paginationNumbers
  }

  useEffect(() => {
    fetchPageDelegate(startPageNumber)
  }, [])

  return {
    pagingState,
    getPaginationNumbers,
    fetchPage: fetchPageDelegate,
  }
}

const Pagination = ({ fetchPageCallback, renderCallback }) => {
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
      {renderCallback(pagingState.data)}
      <nav aria-label="pagination" className={styles.pagination}>
        <button
          className={styles.paginationButtons}
          onClick={() => fetchPage(1)}
          aria-label="Goto Page 1"
        >
          &laquo;
        </button>
        {getPaginationNumbers()}
        <button
          className={styles.paginationButtons}
          onClick={() => fetchPage(pagingState.total_pages)}
          aria-label={`Goto Page ${pagingState.total_pages}`}
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

export default Pagination
