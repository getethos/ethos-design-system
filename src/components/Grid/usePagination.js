import React, { useEffect, useState } from 'react'
import styles from './Pagination.module.scss'

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
    const totalPages = pagingState.total_pages
    let paginationNumbers

    if (pagingState.total && totalPages) {
      for (let i = 1; i <= totalPages; i++) {
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

export default usePagination
