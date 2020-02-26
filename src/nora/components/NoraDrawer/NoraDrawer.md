```jsx
import { Button } from '../../../components/index'

const MyApp = () => {
  const [open, setOpen] = React.useState(false)
  const toggleDrawer = () => {
    setOpen(!open)
  }
  return (
    <>
      <NoraDrawer
        isOpen={open}
        position="right" // Try changing this to "left"
        labelCopy="Order Evidences"
        closeCopy="Cancel"
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
      </NoraDrawer>
      <Button.Medium.Black onClick={toggleDrawer}>
        Toggle Drawer
      </Button.Medium.Black>
    </>
  )
}
;<MyApp />
```
