```jsx
import React, { useCallback, useRef, useState } from 'react'
import uuidv4 from 'uuid/v4'
import { codes } from '../../../helpers/constants.js'
import styles from '../../../components/AsyncTypeahead/AsyncTypeahead.module.scss'
import kabobExampleStyles from './KabobExample.module.scss'

const PopoverChildren = ({
  options,
  setSelected,
  showPopover,
  setShowPopover,
  activeOption,
  selectedOption,
}) => {
  const optionsRefs = Array(options.length)
    .fill(0)
    .map(() => React.createRef())

  const onClick = useCallback((item, i) => {
    setSelected({ index: i, value: item.value })
  })

  const getOptionClasses = (index) => {
    let klasses = styles.Option
    if (activeOption === index) {
      console.log('Setting active classes...')
      klasses = `${klasses} ${styles.ActiveOption}`
    }
    if (index === selectedOption) {
      console.log('Setting selected classes...')
      klasses = `${klasses} ${styles.SelectedOption}`
    }
    return klasses
  }

  return (
    <div className={kabobExampleStyles.Container}>
      <ul className={styles.Options}>
        {options.map((item, i) => {
          optionsRefs[i] = React.createRef()
          return (
            <li key={uuidv4()} ref={optionsRefs[i]}>
              <button
                className={getOptionClasses(i)}
                onClick={() => {
                  onClick(item, i)
                }}
              >
                {item.value}
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
const ExampleConsumer = () => {
  console.log('ExampleConsumer...')
  const [showPopover, setShowPopover] = useState(false)
  const [activeOption, setActiveOption] = useState(0)
  const [selectedOption, setSelectedOption] = useState(-1)
  const options = [
    {
      value: 'OTAF Reason',
    },
    {
      value: 'Amendment',
    },
  ]
  /**
   * Handles keydown events so we can navigate via tabs and arrows
   */
  const handleOnKeydown = (ev) => {
    console.log('handleOnKeydown')
    switch (ev.keyCode) {
      case codes.SPACE:
      case codes.RETURN:
        console.log('space or return')
        setSelected({ index: i, value: item.value })
        break
      case codes.TAB:
        if (ev.shiftKey) {
          console.log('shift tab')
        } else {
          console.log('tab')
        }
        break
      case codes.UP:
        console.log('up')
        ev.preventDefault()
        if (activeOption > 0) {
          const previous = activeOption - 1
          setActiveOption(previous)
        }
        break
      case codes.DOWN:
        console.log('down')
        ev.preventDefault()
        if (!showPopover) {
          setShowPopover(true)
        }
        if (activeOption < options.length - 1) {
          console.log('increment next active')
          const next = activeOption + 1
          setActiveOption(next)
        } else {
          console.log('circle aournd next active')
          setActiveOption(0)
        }
        break
      default:
        break
    }
  }

  return (
    <KabobMenu
      onFocus={(ev) => {
        console.log('onFocus from KabobMenu Button...')
        if (!showPopover) {
          setShowPopover(true)
        }
      }}
      onClick={(ev) => {
        console.log('onClick from clicking on KabobMenu Button...')
        if (!showPopover) {
          setShowPopover(true)
        }
      }}
      // onChange={handleInputChange}
      onKeyDown={handleOnKeydown}
      // onBlur={() => setTimeout(() => setSelectedOption(false), 200)}
    >
      {showPopover && (
        <PopoverChildren
          options={options}
          setSelected={setSelectedOption}
          showPopover
          setShowPopover
          activeOption
          selectedOption
        />
      )}
    </KabobMenu>
  )
}
;<ExampleConsumer />
```
