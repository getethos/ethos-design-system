**NOTE: using a button is not advised and just being used here for demo purposes—the reason is, useOutsideClick hook is intended to close the snackbar if you click on ANYTHING outside of the snackbar!**

Snackbar a11y / UX—some things to try:

- Press `<Tab>` key and note it puts focus on the close button within the Snackbar
- Press `<Enter>` or `<Space>` key and note it closes the Snackbar
- Use the "Open Programmatically" button
- Press `<Escape>` key and note it closes the Snackbar
- Also note, `useOutsideClick` closes the Snackbar if you click anywhere outside of the snackbar itself

```jsx
import React, { useState } from 'react'
import { Icon } from '../Icon/Icon.js'
import { Button, Snack } from '../../../components/index'
import styles from './NoraSnackbar.module.scss'

const issues = [
  {
    id: 0,
    type: 'info',
    message: 'Informational message...',
  },
  {
    id: 1,
    type: 'alert',
    message: 'Something alert worthy',
  },
  {
    id: 2,
    type: 'alert',
    message: 'Another alert message',
  },
]

const SNACKBAR_LBL_ID = 'a11y-norasnackbar-id'
const SNACKBAR_DESC_ID = 'a11y-noradescribed-by'

const NoraSnackbarExample = ({ snacks }) => {
  const [openSnacks, setOpenSnacks] = useState(snacks)

  const renderCloseButton = (snackId) => {
    return (
      <button
        tabIndex="0"
        className={styles.CustomButton}
        onClick={() => {
          const updatedSnacks = openSnacks.filter((card) => card.id !== snackId)
          setOpenSnacks(updatedSnacks)
        }}
      >
        <Icon iconName="times" iconPrefix="fal" />
      </button>
    )
  }
  // Try switching styles.Left with styles.Right
  return (
    <>
      <Button.Medium.Black onClick={() => setOpenSnacks(snacks)}>
        Open Programmatically
      </Button.Medium.Black>{' '}
      <NoraSnackbar
        id="nora-snackbar"
        isOpen={openSnacks.length > 0}
        ariaLabelledBy={SNACKBAR_LBL_ID}
        ariaDescribedBy={SNACKBAR_DESC_ID}
        className={`${styles.SnackbarContainer} ${styles.Bottom} ${styles.Left}`}
      >
        {openSnacks &&
          openSnacks.map((snack) => (
            <Snack
              key={snack.id}
              classNameSkin={`${styles.SnackbarSkin} ${
                openSnacks.length ? styles.Open : ''
              }`}
            >
              <div className={styles.IconContainer}>
                <Icon
                  iconPrefix="fal"
                  iconName={
                    snack.type === 'alert'
                      ? 'exclamation-triangle'
                      : 'info-circle'
                  }
                />
              </div>
              <p className={styles.CenteredGrow}>{snack.message}</p>
              {renderCloseButton(snack.id)}
            </Snack>
          ))}
      </NoraSnackbar>
    </>
  )
}
;<NoraSnackbarExample snacks={issues} />
```
