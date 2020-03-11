**NOTE: using a button is not advised and just being used here for demo purposes—the reason is, useOutsideClick hook is intended to close the snackbar if you click on ANYTHING outside of the snackbar!**

Snackbar a11y / UX—some things to try:

- Press `<Tab>` key and note it puts focus on the close button within the Snackbar
- Press `<Enter>` or `<Space>` key and note it closes the Snackbar
- Use the "Open Programmatically" button
- Press `<Escape>` key and note it closes the Snackbar
- Also note, `useOutsideClick` closes the Snackbar if you click anywhere outside of the snackbar itself

Alert level:

```jsx
import React, { useState } from 'react'
import { Icon } from '../Icon/Icon.js'
import { Button, Snack } from '../../../components/index'
import styles from './NoraSnackbar.module.scss'
const [isOpen, setIsOpen] = useState(true)
const SNACKBAR_LBL_ID = 'a11y-norasnackbar-id'
const SNACKBAR_DESC_ID = 'a11y-noradescribed-by'

const CloseButton = () => {
  return (
    <button
      tabIndex="0"
      className={styles.CustomButton}
      onClick={() => setIsOpen(false)}
    >
      <Icon iconPrefix="fal" iconName="times" />
    </button>
  )
}

const NoraSnackbarExample = () => {
  // Try switching styles.Left with styles.Right
  const klasses = `${styles.SnackbarContainer} ${styles.Bottom} ${
    styles.Left
  } ${isOpen ? styles.Open : ''}`
  return (
    <>
      <Button.Medium.Black onClick={() => setIsOpen(true)}>
        Open Programmatically
      </Button.Medium.Black>{' '}
      <NoraSnackbar
        id="nora-snackbar"
        isOpen={isOpen}
        onDismiss={setIsOpen}
        ariaLabelledBy={SNACKBAR_LBL_ID}
        ariaDescribedBy={SNACKBAR_DESC_ID}
        className={klasses}
      >
        <div className={klasses}>
          <Snack classNameSkin={styles.SnackbarSkin}>
            <div className={styles.IconContainer}>
              <Icon iconPrefix="fal" iconName="exclamation-triangle" />
            </div>
            <p className={styles.CenteredGrow}>Woe is me &#9785;</p>
            <CloseButton />
          </Snack>
          <Snack classNameSkin={styles.SnackbarSkin}>
            <div className={styles.IconContainer}>
              <Icon iconPrefix="fal" iconName="info-circle" />
            </div>
            <p className={styles.CenteredGrow}>More sadness &#9785;</p>
            <CloseButton />
          </Snack>
        </div>
      </NoraSnackbar>
    </>
  )
}
;<NoraSnackbarExample />
```
