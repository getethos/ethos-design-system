**NOTE: using a button is not advised and just being used here for demo purposes—the reason is, useOutsideClick hook is intended to close the snackbar if you click on ANYTHING outside of the snackbar!**

Snackbar a11y / UX—some things to try:

- Press `<Tab>` key and note it puts focus on the close button within the Snackbar
- Press `<Enter>` or `<Space>` key and note it closes the Snackbar
- Use the "Open Programmatically" button
- Press `<Escape>` key and note it closes the Snackbar
- Also note, `useOutsideClick` closes the Snackbar if you click anywhere outside of the snackbar itself

```jsx
import React, { useState } from 'react'
import { Icon } from '../../nora/components/Icon/Icon.js'
import { Snack } from './Snack.js'
import { Button } from '../index'
/**
 * All of this is custom code for example's sake (the styles,
 * and JSX children used within the <Snackbar> element)
 */
import styles from './Snackbar.module.scss'

const issues = [
  {
    id: 0,
    message: '😞 Something bad happened',
  },
  {
    id: 1,
    message: '😞 More sadness',
  },
  {
    id: 2,
    message: '😞 Woe Woe Woe',
  },
]

const SNACKBAR_LBL_ID = 'a11y-snackbar-id'
const SNACKBAR_DESC_ID = 'a11y-described-by'

const SnackbarExample = ({ snacks }) => {
  const [openSnacks, setOpenSnacks] = useState(snacks)

  const renderCloseButton = (snackId) => {
    console.log('close button snackId: ', snackId)
    return (
      <button
        tabIndex="0"
        className={styles.CustomButton}
        onClick={() => {
          const updatedSnacks = openSnacks.filter((card) => card.id !== snackId)
          setOpenSnacks(updatedSnacks)
        }}
      >
        <Icon iconName="window-close" iconPrefix="fal" />
      </button>
    )
  }
  // Try switching styles.Left with styles.Right
  return (
    <>
      <Button.Medium.Black onClick={() => setOpenSnacks([])}>
        Open Programmatically (TODO)
      </Button.Medium.Black>{' '}
      <Snackbar
        id="le-snackbar"
        isOpen={openSnacks.length > 0}
        onDismiss={() => {
          console.log('TODO -- implement snackbar onDismiss')
        }}
        ariaLabelledBy={SNACKBAR_LBL_ID}
        ariaDescribedBy={SNACKBAR_DESC_ID}
        className={`${styles.SnackbarContainer} ${styles.Bottom} ${
          styles.Left
        } ${openSnacks.length ? styles.Open : ''}`}
      >
        {openSnacks &&
          openSnacks.map((snack) => (
            <Snack key={snack.id} classNameSkin={styles.SnackbarSkin}>
              <p>{snack.message}</p>
              {renderCloseButton(snack.id)}
            </Snack>
          ))}
      </Snackbar>
    </>
  )
}

;<SnackbarExample snacks={issues} />
```
