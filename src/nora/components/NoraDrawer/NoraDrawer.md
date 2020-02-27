```jsx
import { Button } from '../../../components/index'
import { codes } from '../../../helpers/constants.js'
import styles from './NoraDrawerExample.module.scss'

const MyApp = () => {
  const [isOpen, setIsOpen] = React.useState(false)
  const toggleDrawer = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      <NoraDrawer
        isOpen={isOpen}
        position="right" // Try changing this to "left"
        labelCopy="Order Evidences"
        closeCopy="Cancel"
        onDismiss={setIsOpen}
      >
        <section className={styles.section}>
          <h1>Keyboard Navigation</h1>
          <span>
            Links may need <pre>tabindex="0"</pre> applied to gain focusability.
          </span>
          <p>
            Tab around in here! Here's is a link to{' '}
            <a tabindex="0" href="https://www.mozilla.org">
              Mozilla
            </a>
            .
          </p>
          <p>
            Here is another link, to the{' '}
            <a tabindex="0" href="https://developer.mozilla.org">
              Mozilla Developer Network
            </a>
            .
          </p>
          <h2>Buttons</h2>
          <p>Buttons are inherently focusable:</p>
          <p>
            <button data-message="This is from the first button">
              Click me!
            </button>
            <button data-message="This is from the second button">
              Click me too!
            </button>
            <button data-message="This is from the third button">
              And me!
            </button>
          </p>
        </section>
      </NoraDrawer>
      <Button.Medium.Black onClick={toggleDrawer}>
        Toggle Drawer
      </Button.Medium.Black>
    </>
  )
}
;<MyApp />
```
