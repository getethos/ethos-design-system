import React, { useEffect, useState } from 'react'
import styles from './Pagination.module.scss'

export const usePagination = ({
  data = null,
  total = null,

  // pageCount:

  itemCount = null,
  pageCount = null,
  page = 1,
  fetchPage = null,
  startPageNumber = 1,
}) => {
  if (!fetchPage) {
    throw Error('usePagination requires a fetchPage callback')
  }

  const [pagingState, setPagingState] = useState({
    data,
    total,
    itemCount,
    pageCount,
    page,
    fetchPage,
  })

  const fetchPageDelegate = async (pageNumber) => {
    const data = await fetchPage(pageNumber)
    setPagingState({
      data: data.data,
      total: data.total,
      itemCount: data.itemCount,
      page: data.page,
      pageCount: data.pageCount,
    })
  }

  const getPaginationNumbers = () => {
    const pageNumbers = []
    const totalPages = pagingState.pageCount
    let paginationNumbers

    if (pagingState.total && totalPages) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i)
      }
      paginationNumbers = pageNumbers.map((number) => {
        const isCurrentPage = pagingState.page === number
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
