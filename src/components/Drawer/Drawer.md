#### Skinning Drawers

Drawers -- Note that you can override some of the styles by using CSS custom property overrides. If you look at `Drawer.module.scss`, you'll note that we've
pretty much overriden every `--drawer-override-*` property, and thus you can use these to skin the drawer to your liking. Please note though, that this is a one-time global override as per how CSS properties generally work, and so it's best to use if you
have a separate application that uses a differing skinning for example.

Here are the custom properties you can override:

- `--drawer-override-depth` -- pixel value used to indicate width or height depending on the orientation of the drawer. For example, if it's positioned left the depth will be used for the width; if it's oriented to the top, the depth will be used for the height.

- `--drawer-override-padding` -- padding for the drawer's content
- `--drawer-override-box-shadow` -- box shadow for the drawer

```jsx
import { Button } from '../index'

const MyApp = () => {
  const [open, setOpen] = React.useState(false)
  const toggleDrawer = () => {
    console.log('toggle drawer called...')
    setOpen(!open)
  }

  /**
   * Try changing the position below to "top", "bottom", or "right" and toggling the drawer.
   */
  return (
    <>
      <Drawer onDismiss={setOpen} isOpen={open} position="left">
        <h3>
          Don't forget you can override some of the{' '}
          <pre>--drawer-override-*</pre> CSS properties!
        </h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis tempor
          urna sed quam rhoncus lobortis. In malesuada cursus lacus, quis dictum
          odio suscipit vitae. Interdum et malesuada fames ac ante ipsum primis
          in faucibus. Aenean dignissim ligula quis varius ullamcorper. In magna
          enim, lacinia ut mattis ac, mattis sit amet lorem. Sed malesuada id
          leo id tempor. Phasellus sodales felis ac malesuada scelerisque.
          Mauris eget metus pellentesque, dictum velit et, gravida elit. Aenean
          non volutpat quam. Sed eu vehicula ipsum. Suspendisse mattis est ac
          mauris sodales ultrices sed id velit. Mauris congue elementum magna
          non dictum.
        </p>
        <p>
          Fusce eu elit at ex elementum rhoncus a tincidunt eros. Curabitur
          scelerisque nibh ipsum, eu maximus ligula varius quis. Cras ex turpis,
          tempus quis elit vitae, vulputate suscipit tortor. Integer placerat
          leo nisi, ac pulvinar mauris tempus sit amet. Ut at neque nec metus
          blandit maximus eget non odio. Nullam diam est, gravida at ullamcorper
          quis, aliquet ac magna. Aliquam ultricies faucibus orci quis sodales.
          Pellentesque placerat eleifend nisi, in rutrum sapien euismod
          vehicula. Curabitur nec augue pellentesque, maximus orci et, viverra
          felis. Sed sed dui ipsum. Ut mi sem, ultrices vel quam a, ultricies
          sodales purus. Vivamus rutrum laoreet lectus.
        </p>
      </Drawer>
      <Button.Medium.Black onClick={toggleDrawer}>
        Toggle Drawer
      </Button.Medium.Black>
    </>
  )
}
;<MyApp />
```

By default, drawers will be dimissed when you click outside of them, or hit the Escape key (in addition to any button you might have to manually close the drawer like the `renderCloseButton` we have here). However, you can opt-out of this behavior by passing in the prop `lock={true}`.

```jsx
import { Button } from '../index'

const MyApp = () => {
  const [open, setOpen] = React.useState(false)
  const openDrawer = () => {
    setOpen(true)
  }

  const closeDrawer = () => {
    setOpen(false)
  }

  const renderCloseButton = () => {
    const inlinedStyles = {
      position: 'absolute',
      left: '20px',
      bottom: '20px',
      zIndex: '10',
    }

    return (
      <div style={inlinedStyles}>
        <Button.Medium.Black onClick={closeDrawer}>Close</Button.Medium.Black>
      </div>
    )
  }
  return (
    <>
      <Drawer
        onDismiss={closeDrawer}
        floatingDrawerContentRenderer={renderCloseButton}
        isOpen={open}
        position="left"
        lock={true}
      >
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis tempor
          urna sed quam rhoncus lobortis. In malesuada cursus lacus, quis dictum
          odio suscipit vitae. Interdum et malesuada fames ac ante ipsum primis
          in faucibus. Aenean dignissim ligula quis varius ullamcorper. In magna
          enim, lacinia ut mattis ac, mattis sit amet lorem. Sed malesuada id
          leo id tempor. Phasellus sodales felis ac malesuada scelerisque.
          Mauris eget metus pellentesque, dictum velit et, gravida elit. Aenean
          non volutpat quam. Sed eu vehicula ipsum. Suspendisse mattis est ac
          mauris sodales ultrices sed id velit. Mauris congue elementum magna
          non dictum.
        </p>
        <p>
          Fusce eu elit at ex elementum rhoncus a tincidunt eros. Curabitur
          scelerisque nibh ipsum, eu maximus ligula varius quis. Cras ex turpis,
          tempus quis elit vitae, vulputate suscipit tortor. Integer placerat
          leo nisi, ac pulvinar mauris tempus sit amet. Ut at neque nec metus
          blandit maximus eget non odio. Nullam diam est, gravida at ullamcorper
          quis, aliquet ac magna. Aliquam ultricies faucibus orci quis sodales.
          Pellentesque placerat eleifend nisi, in rutrum sapien euismod
          vehicula. Curabitur nec augue pellentesque, maximus orci et, viverra
          felis. Sed sed dui ipsum. Ut mi sem, ultrices vel quam a, ultricies
          sodales purus. Vivamus rutrum laoreet lectus.
        </p>
      </Drawer>
      <Button.Medium.Black onClick={openDrawer}>
        Open Drawer
      </Button.Medium.Black>
    </>
  )
}
;<MyApp />
```
