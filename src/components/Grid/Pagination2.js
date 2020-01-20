import React from 'react'
import styles from './Pagination.module.scss'

console.log('Pagination2 loading...')
export const Pagination2 = ({ currentPage, pageCount, onClickCallback }) => {
  // Function to help calculate the pagination numbers we should display
  const getPaginationNumbers = () => {
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
            {...isCurrentPage && { 'aria-current': 'page' }}
            className={klasses}
            onClick={() => onClickCallback(number)}
            aria-label={`Goto Page ${number}`}
          >
            {number}
          </button>
        )
      })
    }
    return paginationNumbers
  }

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
            onClick={() => onClickCallback(currentPage - 1)}
            aria-label={`Goto Page ${currentPage - 1}`}
          >
            &laquo;
          </button>
        )}
        {getPaginationNumbers()}
        {nextExists && (
          <button
            className={[
              styles.paginationButtons,
              styles.paginationButtonsRight,
            ].join(' ')}
            onClick={() => onClickCallback(currentPage + 1)}
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
