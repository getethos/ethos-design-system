```jsx
import { Icon } from '../../nora/components/Icon/Icon.js'

/**
 * All of this is custom code for example's sake (the styles,
 * and JSX children used within the <Snackbar> element)
 */
import styles from './Snackbar.module.scss'
const [isOpen, setIsOpen] = React.useState(true)

const klasses = `${styles.SnackbarContainer} ${styles.SnackbarSkin} ${
  styles.Bottom
} ${styles.Left} ${isOpen ? styles.Open : ''}`

;<Snackbar id="foo">
  <div className={klasses}>
    <p>😞 Something bad happened</p>
    <button className={styles.CustomButton} onClick={() => setIsOpen(false)}>
      <Icon iconName="window-close" iconPrefix="fal" />
    </button>
  </div>
</Snackbar>
```
