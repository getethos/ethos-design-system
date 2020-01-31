IconList utilizes inversion of control to allow for the most customizability. The `items` prop
allows you to customize the fontawesome icon to use, its CSS, and whether the link text will sit
on the left or right.

Because of the way fontawesome works, we only add icons to the library as needed to control the
bundle size. Thus, you will have to add any new icon to `src/components/fa.js`.

```jsx
// These styles are fairly generic to the icon list
import styles from './IconList.module.scss'

// These styles are specific to the Nora application
// e.g. Labs icon is --NoraOrange-400
import noraStyles from './NoraIconList.module.scss'

const iconKlass = styles.Icon
;<IconList
  items={[
    {
      iconPrefix: 'fas',
      iconName: 'window-close',
      iconClassName: styles.Icon,
      iconContainerClassName: `${styles.IconListContainer} ${noraStyles.LabsIconColor}`,
      linkClassName: styles.LinkRight,
      linkPosition: 'right',
      copy: 'Labs',
      handleClick: () => console.log('labs onclick called...'),
    },
    {
      iconPrefix: 'fas',
      iconName: 'exclamation-triangle',
      iconClassName: styles.Icon,
      iconContainerClassName: `${styles.IconListContainer} ${noraStyles.MVRIconColor}`,
      linkClassName: styles.LinkRight,
      linkPosition: 'right',
      copy: 'MVR',
      handleClick: () => console.log('mvr onclick called...'),
    },
    {
      iconPrefix: 'far',
      iconName: 'search',
      iconClassName: styles.Icon,
      iconContainerClassName: styles.IconListContainer,
      linkClassName: styles.LinkLeft,
      linkPosition: 'left',
      copy: 'TexMex',
      handleClick: () => console.log('onclick called...'),
    },
  ]}
/>
```
