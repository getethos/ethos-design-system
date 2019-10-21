HelpTip

Above

```jsx
import styles from './example.module.scss'
;<div className={styles.example}>
  <HelpTip
    labelCopy="Aria label"
    helpCopy="Including skin cancer (including basal cell and squamous cell), melanoma, lymphoma, leukemia, tumor, polyp, any other abnormal growth, any other type of cancer"
    data-tid="the-help-tip"
    position="above"
  />
</div>
```

Below—`min-width` defaults to 500, but you can override that.

```jsx
import styles from './example.module.scss'
;<div className={styles.example}>
  <HelpTip
    min-width={800}
    className="parent"
    labelCopy="aria label"
    helpCopy="Including skin cancer (including basal cell and squamous cell), melanoma, lymphoma, leukemia, tumor, polyp, any other abnormal growth, any other type of cancer"
    data-tid="the-help-tip"
    position="below"
  />
</div>
```

Left

```jsx
import styles from './example.module.scss'
;<div className={styles.example}>
  <HelpTip
    labelCopy="aria label"
    helpCopy="Including skin cancer (including basal cell and squamous cell), melanoma, lymphoma, leukemia, tumor, polyp, any other abnormal growth, any other type of cancer"
    data-tid="the-help-tip"
    position="left"
  />
</div>
```

alignLeftTo—in this example we've aligned to `body` so look at the __top left of viewport__

```jsx
import styles from './example.module.scss'

;<div className={styles.example}>
  <HelpTip
    labelCopy="aria label"
    helpCopy="Including skin cancer (including basal cell and squamous cell), melanoma, lymphoma, leukemia, tumor, polyp, any other abnormal growth, any other type of cancer"
    data-tid="the-help-tip"
    position="left"
    alignLeftTo="body"
  />
</div>
```

Right

```jsx
import styles from './example.module.scss'
;<div className={styles.example}>
  <HelpTip
    labelCopy="aria label"
    helpCopy="Including skin cancer (including basal cell and squamous cell), melanoma, lymphoma, leukemia, tumor, polyp, any other abnormal growth, any other type of cancer"
    data-tid="the-help-tip"
    position="right"
  />
</div>
```
