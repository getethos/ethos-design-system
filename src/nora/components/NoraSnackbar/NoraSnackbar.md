**NOTE: using a button is not advised and just being used here for demo purposes—the reason is, useOutsideClick hook is intended to close the snackbar if you click on ANYTHING outside of the snackbar!**

Snackbar a11y / UX—some things to try:

- Press `<Tab>` key and note it puts focus on the close button within the Snackbar
- Press `<Enter>` or `<Space>` key and note it closes the Snackbar
- Use the "Open Programmatically" button
- Press `<Escape>` key and note it closes the Snackbar
- Also note, `useOutsideClick` closes the Snackbar if you click anywhere outside of the snackbar itself

```jsx
import React, { useState, useEffect } from 'react'
import { Icon } from '../Icon/Icon'
import { Button, Snack } from '../index'
import styles from './NoraSnackbar.module.scss'

let count = 0
const issues = [
  {
    id: count,
    type: 'info',
    message: 'Informational message...',
  },
  {
    id: ++count,
    type: 'alert',
    message: 'Something alert worthy',
  },
  {
    id: ++count,
    type: 'alert',
    message: 'Another alert message',
  },
]

const SNACKBAR_LBL_ID = 'a11y-norasnackbar-id'
const SNACKBAR_DESC_ID = 'a11y-noradescribed-by'
const SNACKBAR_DURATION = 10000

const NoraSnackbarExample = ({ snacks }) => {
  const [openSnacks, setOpenSnacks] = useState(snacks)

  // Automatically closes the snackbar by removing all snacks
  useEffect(() => {
    /* Contrived test of randomly adding snacks
    const leInterval = setInterval(() => {
      const number = Math.floor(Math.random() * 100 + 1)
      if (number % 2 == 0 && openSnacks.length < 5) {
        setOpenSnacks([
          ...openSnacks,
          {
            id: ++count,
            type: 'alert',
            message: `Alert message ${number}`,
          },
        ])
      }
    }, 10000)
    */

    const leTimeout = setTimeout(() => setOpenSnacks([]), SNACKBAR_DURATION)
    return () => {
      clearTimeout(leTimeout)
    }
  }, [openSnacks, setOpenSnacks, issues, count])

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
