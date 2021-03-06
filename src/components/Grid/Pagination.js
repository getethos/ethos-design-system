import PropTypes from 'prop-types'
import { memo } from 'react'

import { usePagination } from './usePagination'

const DEFAULT_DISPLAY_PAGES_COUNT = 6

/**
 * Pagination component for use with the data grid
 *
 * @public
 *
 * @param {object} props - Component Props
 * @prop {number} [props.currentPage] - The current page
 * @prop {number} [props.pageCount] - The total number of pages available for the collection of things
 * @prop {number} [props.displayedPagesCount] - Number of pages displayed at a time
 * @prop {function} [props.fetchPageCallback] - Callback that fires when the next page should be fetched
 *
 * @return {JSX.Element}
 */
export const Pagination = memo(
  ({ currentPage, pageCount, displayedPagesCount, fetchPageCallback }) => {
    if (
      typeof currentPage !== 'number' ||
      typeof pageCount !== 'number' ||
      !fetchPageCallback
    ) {
      throw Error(
        'Pagination requires currentPage, pageCount, and fetchPageCallback parameters'
      )
    }
    const { conditionallyRenderPagingButtons } = usePagination({
      fetchPageCallback,
    })

    return conditionallyRenderPagingButtons(
      pageCount,
      currentPage,
      displayedPagesCount
    )
  }
)

Pagination.propTypes = {
  fetchPageCallback: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
  pageCount: PropTypes.number.isRequired,
  displayedPagesCount: PropTypes.number,
}

Pagination.defaultProps = {
  displayedPagesCount: DEFAULT_DISPLAY_PAGES_COUNT,
}

Pagination.displayName = 'Pagination'
