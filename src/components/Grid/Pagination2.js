import PropTypes from 'prop-types'
import React, { memo } from 'react'
import styles from './Pagination.module.scss'

import { usePagination } from './usePagination2'

export const Pagination2 = memo(
  ({ currentPage, pageCount, fetchPageCallback }) => {
    if (
      typeof currentPage !== 'number' ||
      typeof pageCount !== 'number' ||
      !fetchPageCallback
    ) {
      throw Error(
        'Pagination requires currentPage, pageCount, and fetchPageCallback parameters'
      )
    }
    const {
      getPaginationNumbers,
      conditionallyRenderPagingButtons,
    } = usePagination({
      fetchPageCallback,
    })

    return conditionallyRenderPagingButtons(pageCount, currentPage)
  }
)

Pagination2.propTypes = {
  fetchPageCallback: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
  pageCount: PropTypes.number.isRequired,
}
Pagination2.displayName = 'Pagination2'
