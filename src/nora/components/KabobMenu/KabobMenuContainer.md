```jsx
import styles from './KabobExample.module.scss'
import { Body2, Spacer } from '../../../components/index'

const ExampleKabobMenuConsumer = () => {
  const [isOpen, setIsOpen] = React.useState(false)
  const [, setActiveOption] = React.useState(0)
  const [, setSelectedOption] = React.useState(-1)

  const [lastSelected, setLastSelected] = React.useState('Select something')

  const items = [
    {
      name: 'OTAF Reason',
    },
    {
      name: 'Amendment',
    },
  ]

  return (
    <>
      <Body2.Regular400>{lastSelected}</Body2.Regular400>
      <Spacer.H24 />
      <KabobMenuContainer
        dataKey="name"
        items={items}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        setLastSelected={setLastSelected}
        kabobContainerClasses={styles.KabobContainer}
        popoverContainerClasses={styles.Container}
      />
    </>
  )
}

;<ExampleKabobMenuConsumer />
```
