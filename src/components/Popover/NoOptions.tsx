import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as React from 'react'
import optionStyles from './Option.module.scss'
import styles from './Options.module.scss'
type NoOptionsProps = {
  loadingText: string
}
/**
 * Used to display the popover drodown loading indication when still loading data.
 * @param {string} loadingText - text to display as we're loading
 */
export const NoOptions: React.FC<NoOptionsProps> = ({ loadingText }) => {
  return (
    <>
      <FontAwesomeIcon className={styles.Spin} icon={['far', 'circle-notch']} />
      <ul
        data-testid="typeahead-no-options-container"
        className={styles.Options}
      >
        <li className={optionStyles.Option}>{loadingText}</li>
      </ul>
    </>
  )
}
