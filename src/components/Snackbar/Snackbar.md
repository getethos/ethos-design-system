Snackbar a11y / UX—some things to try:

- Press `<Tab>` key and note it puts focus on the close button within the Snackbar
- Press `<Enter>` or `<Space>` key and note it closes the Snackbar
- Use the "Open Programmatically" button
- Press `<Escape>` key and note it closes the Snackbar

```jsx
import React, { useState } from 'react'
import { Icon } from '../../nora/components/Icon/Icon.js'
import { Button } from '../index'
/**
 * All of this is custom code for example's sake (the styles,
 * and JSX children used within the <Snackbar> element)
 */
import styles from './Snackbar.module.scss'

const [isOpen, setIsOpen] = useState(true)
const SNACKBAR_LBL_ID = 'a11y-snackbar-id'
const SNACKBAR_DESC_ID = 'a11y-described-by'

const SnackbarExample = () => {
  const klasses = `${styles.SnackbarContainer} ${styles.SnackbarSkin} ${
    styles.Bottom
  } ${styles.Left} ${isOpen ? styles.Open : ''}`
  return (
    <>
      <Button.Medium.Black onClick={() => setIsOpen(true)}>
        Open Programmatically
      </Button.Medium.Black>{' '}
      <Snackbar
        id="le-snackbar"
        isOpen={isOpen}
        onDismiss={setIsOpen}
        ariaLabelledBy={SNACKBAR_LBL_ID}
        ariaDescribedBy={SNACKBAR_DESC_ID}
      >
        <div className={klasses}>
          <p>😞 Something bad happened</p>
          <button
            tabIndex="0"
            className={styles.CustomButton}
            onClick={() => setIsOpen(false)}
          >
            <Icon iconName="window-close" iconPrefix="fal" />
          </button>
        </div>
      </Snackbar>
    </>
  )
}
;<SnackbarExample />
```
