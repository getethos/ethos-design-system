## Examples

### Basic Usage

To use a placeholder in its most basic form and with all defaults: provide two properties to the component, `label` and `details`

```jsx
import styles from './TooltipExamples.module.scss'
;<>
  <div className={styles.basicExample}>
    Basic Tooltip <Tooltip label="Flip" details="Hi!" />
  </div>
</>
```

### Children

If you don't want to use the default information 'i' SVG icon, you can suppy your own
custom children and wrap those within the tooltip. You can even steal the tooltip's own
CSS Module styles (see `tipStyles` below for example).

```jsx
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './TooltipExamples.module.scss'
import tipStyles from './Tooltip.module.scss'
;<>
  <div className={styles.basicExample}>
    <Tooltip
      popperBoxStyles={styles.CustomTipExample}
      label="burger icon"
      details="Burgers are so tasty!"
      placement={'right'}
    >
      <FontAwesomeIcon icon={['far', 'hamburger']} className={tipStyles.icon} />
    </Tooltip>
  </div>
</>
```

### `placement`

Customize the **Starting** position of a Tooltip

```jsx
import styles from './TooltipExamples.module.scss'
;<>
  <div className={styles.centeredExample}>
    <div className={styles.basicExample}>
      Top <Tooltip label="Flip" details="Hi!" placement={'top'} />
      Right <Tooltip label="Flip" details="Hi!" placement={'right'} />
      Bottom <Tooltip label="Flip" details="Hi!" placement={'bottom'} />
      Left <Tooltip label="Flip" details="Hi!" placement={'left'} />
    </div>
  </div>
</>
```

### `boundariesElement`

This property will allow you to set what element the Tooltips event should activate on. Ex: Repositioning from scroll, flipping because of boundaries

Setting the `boundariesElement` to `'scrollParent'` will make the tooltip flip against the first scrollable parent element. To always flip Tooltips against the outermost scroll use `viewport` or `window`.

```jsx
import styles from './TooltipExamples.module.scss'
;<>
  <div className={styles.staticOuterDiv}>
    <div className={styles.basicExample}>
      My next scrollable element is the viewport{' '}
      <Tooltip label="Flip" details="Hi!" />
    </div>
    <div className={styles.overflowHidden}>
      <div className={[styles.basicExample, styles.flipExample].join(' ')}>
        My next scrollable element is a div with overflow hidden{' '}
        <Tooltip label="Flip" details="Hi!" />
      </div>
    </div>
  </div>
</>
```

### `inline`

```jsx
import styles from './TooltipExamples.module.scss'
;<>
  <div className={styles.basicExample}>
    Hey there this <Tooltip label="Inline" details="Hi again" inline /> is an
    inline tooltip
  </div>
</>
```

### `softCorners`

Customize the corner of tooltip. Setting 'softCorners' properties as trye will display rounded corners

```jsx
import styles from './TooltipExamples.module.scss'
;<>
  <div className={styles.softCornerExampleLayout}>
    <div className={styles.basicExample}>
      Soft corners tooltip example
      <Tooltip
        popperBoxStyles={styles.softCornerExample}
        label="Soft Corners"
        details="Soft Corners"
        placement={'top'}
        softCorners
      />
    </div>
    <div className={styles.basicExample}>
      Default corners tooltip example
      <Tooltip
        popperBoxStyles={styles.softCornerExample}
        label="Default Corners"
        details="Default Corners"
        placement={'top'}
        softCorners={false}
      />
    </div>
  </div>
</>
```
