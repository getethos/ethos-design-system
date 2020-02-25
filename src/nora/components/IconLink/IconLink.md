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
  textClassName={styles.LinkRight}
  textPosition="right"
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
  textClassName={styles.LinkRight}
  textPosition="right"
  copy="Overview"
  onClick={(ev) => {
    console.log('Overview onclick called...')
  }}
/>
```

Overview/Active

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
  iconClassName={`${styles.Icon} ${styles.Active}`}
  iconContainerClassName={iconContainerClasses}
  textClassName={`${styles.LinkRight} ${styles.Active}`}
  textPosition="right"
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
  textClassName={styles.LinkRight}
  textPosition="right"
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
  textClassName={styles.LinkRight}
  textPosition="right"
  copy="For Review"
  onClick={(ev) => {
    console.log('For Review onclick called...')
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
  textClassName={styles.LinkRight}
  textPosition="right"
  copy="MVR"
  onClick={(ev) => {
    console.log('mvr (Active) onclick called...')
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
  textClassName={styles.LinkRight}
  textPosition="right"
  copy="Required"
  onClick={(ev) => {
    console.log('(Required) onclick called...')
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
  textClassName={styles.LinkRight}
  textPosition="right"
  copy="MVR"
  onClick={(ev) => {
    console.log('mvr (Ordered) onclick called...')
  }}
/>
```

Completed—click to toggle between active and normal

```jsx
import styles from './IconLink.module.scss'
/**
 * You can simulate this by importing these convenience sass classes
 * and setting the `styles.Active`
 * @import '~ethos-design-system/src/nora/components/IconLink/IconLink.module.scss';
 * */
import noraStyles from './NoraIconLink.module.scss'

const YourComponent = () => {
  const [isActive, setIsActive] = React.useState(false)
  const sillyToggle = (ev) => {
    setIsActive(!isActive)
  }

  const iconContainerClasses = `${noraStyles.LeftNavIconLinkContainer} ${styles.IconLinkContainer}`

  const linkClass = `${styles.LinkRight} ${isActive ? styles.Active : ''}`

  const completedIconClass = `${styles.Icon} ${styles.Completed} ${
    isActive ? styles.Active : ''
  }`

  return (
    <IconLink
      iconPrefix="fas"
      iconName="check-square"
      iconClassName={completedIconClass}
      iconContainerClassName={iconContainerClasses}
      textClassName={linkClass}
      textPosition="right"
      copy="Completed"
      onClick={sillyToggle}
    />
  )
}
;<YourComponent />
```

Error—click to toggle between active and normal

```jsx
import styles from './IconLink.module.scss'
/**
 * You can simulate this by importing these convenience sass classes
 * and setting the `styles.Active`
 * @import '~ethos-design-system/src/nora/components/IconLink/IconLink.module.scss';
 * */
import noraStyles from './NoraIconLink.module.scss'

const YourComponent = () => {
  const [isActive, setIsActive] = React.useState(false)
  const sillyToggle = (ev) => {
    setIsActive(!isActive)
  }

  const iconContainerClasses = `${noraStyles.LeftNavIconLinkContainer} ${styles.IconLinkContainer}`

  const linkClass = `${styles.LinkRight} ${isActive ? styles.Active : ''}`

  const errorIconClass = `${styles.Icon} ${styles.Error} ${
    isActive ? styles.Active : ''
  }`

  return (
    <IconLink
      iconPrefix="fal"
      iconName="exclamation-triangle"
      // Error
      iconClassName={errorIconClass}
      iconContainerClassName={iconContainerClasses}
      textClassName={linkClass}
      textPosition="right"
      copy="MVR"
      onClick={sillyToggle}
    />
  )
}
;<YourComponent />
```

Waived—click to toggle between active and normal

```jsx
import styles from './IconLink.module.scss'
/**
 * You can simulate this by importing these convenience sass classes
 * and setting the `styles.Active`
 * @import '~ethos-design-system/src/nora/components/IconLink/IconLink.module.scss';
 * */
import noraStyles from './NoraIconLink.module.scss'

const YourComponent = () => {
  const [isActive, setIsActive] = React.useState(false)
  const sillyToggle = (ev) => {
    setIsActive(!isActive)
  }

  const iconContainerClasses = `${noraStyles.LeftNavIconLinkContainer} ${styles.IconLinkContainer}`

  const linkClass = `${styles.LinkRight} ${isActive ? styles.Active : ''}`

  const waivedIconClass = `${styles.Icon} ${styles.Waived} ${
    isActive ? styles.Active : ''
  }`

  return (
    <IconLink
      iconPrefix="fal"
      iconName="window-close"
      iconClassName={waivedIconClass}
      iconContainerClassName={iconContainerClasses}
      textClassName={linkClass}
      textPosition="right"
      copy="MVR"
      onClick={sillyToggle}
    />
  )
}
;<YourComponent />
```

## Nora—Right Sidebar

Order more evidences

```jsx
import styles from './IconLink.module.scss'
import noraStyles from './NoraIconLink.module.scss'
const iconContainerClasses = `${styles.IconLinkContainer} ${noraStyles.RightNavIconLinkContainer}`

;<IconLink
  iconPrefix="fal"
  iconName="layer-plus"
  iconClassName={`${styles.Icon}`}
  iconContainerClassName={iconContainerClasses}
  textClassName={styles.LinkRight}
  textPosition="right"
  copy="Order more evidences"
  onClick={(ev) => {
    console.log('Order more evidences onclick called...')
  }}
/>
```

Open original PDFs

```jsx
import styles from './IconLink.module.scss'
import noraStyles from './NoraIconLink.module.scss'
const iconContainerClasses = `${styles.IconLinkContainer} ${noraStyles.RightNavIconLinkContainer}`

;<IconLink
  iconPrefix="far"
  iconName="external-link"
  iconClassName={`${styles.Icon}`}
  iconContainerClassName={iconContainerClasses}
  textClassName={styles.LinkRight}
  textPosition="right"
  copy="Open original PDFs"
  onClick={(ev) => {
    console.log('Open original PDFs onclick called...')
  }}
/>
```

Approve application

```jsx
import styles from './IconLink.module.scss'
import noraStyles from './NoraIconLink.module.scss'
const iconContainerClasses = `${styles.IconLinkContainer} ${noraStyles.RightNavIconLinkContainer}`

;<IconLink
  iconPrefix="fal"
  iconName="check"
  iconClassName={`${styles.Icon}`}
  iconContainerClassName={iconContainerClasses}
  textClassName={styles.LinkRight}
  textPosition="right"
  copy="Approve application"
  onClick={(ev) => {
    console.log('Approve application onclick called...')
  }}
/>
```

Decline application

```jsx
import styles from './IconLink.module.scss'
import noraStyles from './NoraIconLink.module.scss'
const iconContainerClasses = `${styles.IconLinkContainer} ${noraStyles.RightNavIconLinkContainer}`

;<IconLink
  iconPrefix="fal"
  iconName="times"
  iconClassName={`${styles.Icon}`}
  iconContainerClassName={iconContainerClasses}
  textClassName={styles.LinkRight}
  textPosition="right"
  copy="Decline application"
  onClick={(ev) => {
    console.log('Decline application onclick called...')
  }}
/>
```

Withdraw

```jsx
import styles from './IconLink.module.scss'
import noraStyles from './NoraIconLink.module.scss'
const iconContainerClasses = `${styles.IconLinkContainer} ${noraStyles.RightNavIconLinkContainer}`

;<IconLink
  iconPrefix="fal"
  iconName="octagon"
  iconClassName={`${styles.Icon}`}
  iconContainerClassName={iconContainerClasses}
  textClassName={styles.LinkRight}
  textPosition="right"
  copy="Withdraw"
  onClick={(ev) => {
    console.log('Withdraw onclick called...')
  }}
/>
```

Back Button Chevron

```jsx
import styles from './IconLink.module.scss'
;<IconLink
  iconPrefix="far"
  iconName="chevron-left"
  iconClassName={`${styles.Icon}`}
  iconContainerClassName={styles.IconLinkContainer}
  textClassName={styles.LinkRight}
  textPosition="right"
  copy="Back"
  onClick={(ev) => {
    console.log('Back button -- onclick called...')
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
  textClassName={styles.LinkLeft}
  textPosition="left"
  copy="Find it…"
  onClick={(ev) => {
    console.log('mvr (Waived) onclick called...')
  }}
/>
```
