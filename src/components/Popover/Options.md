```jsx
import { useState } from 'react'
import { Button, Spacer, TitleSmall2 } from '../index'
import useScrollItemIntoView from '../../hooks/useScrollItemIntoView'
import usePopoverNavigation from '../../hooks/usePopoverNavigation'
import styles from './Example.module.scss'

const ExamplePopoverConsumer = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [activeOption, setActiveOption] = useState(0)
  const [selectedOption, setSelectedOption] = useState(-1)
  const { scrollItemIntoView } = useScrollItemIntoView()
  const { handlePopoverNavigation } = usePopoverNavigation()

  // Whatever you actually care about from popover options
  const [location, setLocation] = useState('')
  const [lastSelected, setLastSelected] = useState('Select something')

  const items = [
    {
      name: 'Macedonia',
    },
    {
      name: 'Madagascar',
    },
    {
      name: 'Maldives',
    },
    {
      name: 'Mexico',
    },
  ]

  const optionsRefs = Array(items.length)
    .fill(0)
    .map(() => React.createRef())

  const handleOnChange = (item) => {
    setLastSelected(item.name)
  }

  const setSelectedAndActiveOptions = (index) => {
    console.log('setSelectedAndActiveOptions called w/index: ', index)
    setSelectedOption(index)
    setActiveOption(index)
  }

  const openPopover = () => {
    setIsOpen(true)
  }

  return (
    <div
      onKeyDown={(ev) =>
        handlePopoverNavigation({
          ev: ev,
          items: items,
          onChange: handleOnChange,
          optionsRefs: optionsRefs,
          activeOption: activeOption,
          setActiveOption: setActiveOption,
          scrollItemIntoView: scrollItemIntoView,
          showPopover: isOpen,
          setShowPopover: setIsOpen,
          setSelectedAndActiveOptions: setSelectedAndActiveOptions,
        })
      }
    >
      {console.log('isOpen: ', isOpen)}
      {isOpen && (
        <ul className={styles.Container}>
          <Options
            activeOption={activeOption}
            dataKey="name"
            entities={items}
            onChange={handleOnChange}
            optionsRefs={optionsRefs}
            selectedOption={selectedOption}
            setSelectedAndActiveOptions={setSelectedAndActiveOptions}
          />
        </ul>
      )}
      <Button.Medium.Black fullWidth onClick={openPopover}>
        Toggle Popover Options
      </Button.Medium.Black>
      <Spacer.H24 />
      <TitleSmall2.Sans.Regular400>{lastSelected}</TitleSmall2.Sans.Regular400>
    </div>
  )
}
;<ExamplePopoverConsumer />
```
