Icon links are used in Nora on the left and right side navigation. Some do not change and
are always gray (e.g. Decisions, Overview, and Notes). Other icons can represent dynmamic
states such as:

- Completed
- Error
- Waived
- Review
- Required
- Ordered

_In these cases, the icons reflect that state the task, decision, etc., is currently in._

As such, you can declaratively utilize the CSS Modules available in: `IconLink.module.scss`
to reflect the current state, by passing in props from your parent component as that's where
you're state will of coure live.

---

Decision

```jsx
// These styles are fairly generic to the icon list
import styles from './IconLink.module.scss'

// These styles are specific to the Nora application
// e.g. Labs icon is --NoraOrange-400
import noraStyles from './NoraIconLink.module.scss'

const iconContainerClasses = `${noraStyles.LeftNavIconLinkContainer} ${styles.IconLinkContainer}`

;<IconLink
  iconPrefix="far"
  iconName="exchange"
  iconClassName={`${styles.Icon}`}
  iconContainerClassName={iconContainerClasses}
  linkClassName={styles.LinkRight}
  linkPosition="right"
  copy="Decision"
  onClick={(ev) => {
    console.log('Decision onclick called...')
  }}
/>
```

Overview

```jsx
// These styles are fairly generic to the icon list
import styles from './IconLink.module.scss'

// These styles are specific to the Nora application
// e.g. Labs icon is --NoraOrange-400
import noraStyles from './NoraIconLink.module.scss'

const iconContainerClasses = `${noraStyles.LeftNavIconLinkContainer} ${styles.IconLinkContainer}`

;<IconLink
  iconPrefix="fal"
  iconName="user-check"
  iconClassName={`${styles.Icon}`}
  iconContainerClassName={iconContainerClasses}
  linkClassName={styles.LinkRight}
  linkPosition="right"
  copy="Overview"
  onClick={(ev) => {
    console.log('Overview onclick called...')
  }}
/>
```

Notes

```jsx
import styles from './IconLink.module.scss'
import noraStyles from './NoraIconLink.module.scss'
const iconContainerClasses = `${noraStyles.LeftNavIconLinkContainer} ${styles.IconLinkContainer}`

;<IconLink
  iconPrefix="fas"
  iconName="align-left"
  iconClassName={`${styles.Icon}`}
  iconContainerClassName={iconContainerClasses}
  linkClassName={styles.LinkRight}
  linkPosition="right"
  copy="Notes"
  onClick={(ev) => {
    console.log('Notes onclick called...')
  }}
/>
```

For Review

```jsx
import styles from './IconLink.module.scss'
import noraStyles from './NoraIconLink.module.scss'
const iconContainerClasses = `${noraStyles.LeftNavIconLinkContainer} ${styles.IconLinkContainer}`

;<IconLink
  iconPrefix="far"
  iconName="check-square"
  iconClassName={`${styles.Icon}`}
  iconContainerClassName={iconContainerClasses}
  linkClassName={styles.LinkRight}
  linkPosition="right"
  copy="For Review"
  onClick={(ev) => {
    console.log('For Review onclick called...')
  }}
/>
```

Completed

```jsx
import styles from './IconLink.module.scss'
import noraStyles from './NoraIconLink.module.scss'

// Completed state
const iconContainerClasses = `${noraStyles.LeftNavIconLinkContainer} ${styles.IconLinkContainer} ${styles.Completed}`

;<IconLink
  iconPrefix="fas"
  iconName="check-square"
  // Completed
  iconClassName={`${styles.Icon} ${styles.Completed}`}
  iconContainerClassName={iconContainerClasses}
  linkClassName={styles.LinkRight}
  linkPosition="right"
  copy="Completed"
  onClick={(ev) => {
    console.log('(Completed) onclick called...')
  }}
/>
```

Required

```jsx
import styles from './IconLink.module.scss'
import noraStyles from './NoraIconLink.module.scss'

// Required state
const iconContainerClasses = `${noraStyles.LeftNavIconLinkContainer} ${styles.IconLinkContainer}`

;<IconLink
  iconPrefix="fal"
  iconName="asterisk"
  iconClassName={`${styles.Icon}`}
  iconContainerClassName={iconContainerClasses}
  linkClassName={styles.LinkRight}
  linkPosition="right"
  copy="Required"
  onClick={(ev) => {
    console.log('(Required) onclick called...')
  }}
/>
```

Active—The text is black and bolded, and the icon continues to represent whatever state we're in.
_So, in the following example, the MVR section is active and it is currently in Required state._

```jsx
import styles from './IconLink.module.scss'
import noraStyles from './NoraIconLink.module.scss'

// Active state
const iconContainerClasses = `${noraStyles.LeftNavIconLinkContainer} ${styles.IconLinkContainer} ${styles.Active}`

;<IconLink
  iconPrefix="fal"
  iconName="asterisk"
  // Active
  iconClassName={`${styles.Icon} ${styles.Active}`}
  iconContainerClassName={iconContainerClasses}
  linkClassName={styles.LinkRight}
  linkPosition="right"
  copy="MVR"
  onClick={(ev) => {
    console.log('mvr (Active) onclick called...')
  }}
/>
```

Ordered

```jsx
import styles from './IconLink.module.scss'
import noraStyles from './NoraIconLink.module.scss'

const iconContainerClasses = `${noraStyles.LeftNavIconLinkContainer} ${styles.IconLinkContainer}`

;<IconLink
  iconPrefix="fal"
  iconName="clock"
  iconClassName={`${styles.Icon}`}
  iconContainerClassName={iconContainerClasses}
  linkClassName={styles.LinkRight}
  linkPosition="right"
  copy="MVR"
  onClick={(ev) => {
    console.log('mvr (Ordered) onclick called...')
  }}
/>
```

Error

```jsx
import styles from './IconLink.module.scss'
import noraStyles from './NoraIconLink.module.scss'

// Error state
const iconContainerClasses = `${noraStyles.LeftNavIconLinkContainer} ${styles.IconLinkContainer} ${styles.Error}`

;<IconLink
  iconPrefix="fal"
  iconName="exclamation-triangle"
  // Error
  iconClassName={`${styles.Icon} ${styles.Error}`}
  iconContainerClassName={iconContainerClasses}
  linkClassName={styles.LinkRight}
  linkPosition="right"
  copy="MVR"
  onClick={(ev) => {
    console.log('mvr (Error) onclick called...')
  }}
/>
```

Waived

```jsx
import styles from './IconLink.module.scss'
import noraStyles from './NoraIconLink.module.scss'

// Waived state
const iconContainerClasses = `${noraStyles.LeftNavIconLinkContainer} ${styles.IconLinkContainer} ${styles.Waived}`

;<IconLink
  iconPrefix="fal"
  iconName="window-close"
  iconClassName={`${styles.Icon} ${styles.Waived}`}
  iconContainerClassName={iconContainerClasses}
  linkClassName={styles.LinkRight}
  linkPosition="right"
  copy="MVR"
  onClick={(ev) => {
    console.log('mvr (Waived) onclick called...')
  }}
/>
```

## Right Aligned

Additionally, you can position the icon to the right and have the icon link
flex-end aligned by declaratively using different CSS Module classes:

```jsx
import styles from './IconLink.module.scss'
;<IconLink
  iconPrefix="far"
  iconName="search"
  iconClassName={`${styles.Icon}`}
  iconContainerClassName={styles.IconLinkContainerRight}
  linkClassName={styles.LinkLeft}
  linkPosition="left"
  copy="Find it…"
  onClick={(ev) => {
    console.log('mvr (Waived) onclick called...')
  }}
/>
```
