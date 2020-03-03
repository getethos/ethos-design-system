Icon is a wrapper around the FontAwesomeIcon component.
If you would like to add an icon that does not currently exist, please update fa.js.

---

Default Icon component

```jsx
<Icon iconPrefix="fal" iconName="file-medical-alt" />
```

Icon component with custom styling

```jsx
import styles from './IconExample.module.scss';
<Icon
  iconPrefix="fal"
  iconName="file-medical-alt"
  className={styles.IconClassName}
/>
```
