## Examples

### Basic Usage

To use a placeholder in its most basic form and with all defaults: provide two properties to the component, `label` and `details`

```jsx
import React, { useRef, useState, useEffect } from 'react'
import styles from './TooltipExamples.module.scss'
;<>
  <div className={styles.basicExample}>
    Basic Tootlip <Tooltip label="Flip" details="Hi!" />
  </div>
</>
```

### `placement`

Customize the **Starting** position of a Tooltip

```jsx
import React, { useRef, useState, useEffect } from 'react'
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
import React, { useRef, useState, useEffect } from 'react'
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
import React, { useRef, useState, useEffect } from 'react'
import styles from './TooltipExamples.module.scss'
;<>
  <div className={styles.basicExample}>
    Hey there this <Tooltip label="Inline" details="Hi again" inline /> is an
    inline tooltip
  </div>
</>
```
