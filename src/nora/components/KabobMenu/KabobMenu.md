```jsx
import React, { useCallback, useState } from 'react'
import uuidv4 from 'uuid/v4'
import styles from '../../../components/AsyncTypeahead/AsyncTypeahead.module.scss'
import kabobExampleStyles from './KabobExample.module.scss'

const PopoverChildren = ({ options, setSelected }) => {
  // TODO -- requires a keydown handler
  // const [activeOption, setActiveOption] = useState(0)
  const [selectedOption, setSelectedOption] = useState(-1)

  const optionsRefs = Array(options.length)
    .fill(0)
    .map(() => React.createRef())

  const onChange = useCallback((item, i) => {
    setSelected({ index: i, value: item.value })
  })

  return (
    <div className={kabobExampleStyles.Container}>
      <ul className={styles.Options}>
        {options.map((item, i) => {
          optionsRefs[i] = React.createRef()
          return (
            <li key={uuidv4()} ref={optionsRefs[i]}>
              <button
                className={styles.Option}
                onClick={() => {
                  setSelectedOption(i)
                  onChange(item, i)
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
  const [showOptions, setShowOptions] = useState(false)
  const options = [
    {
      value: 'OTAF Reason',
    },
    {
      value: 'Amendment',
    },
  ]

  const setActiveOption = (option) => {
    console.log('setActiveOption--option: ', option)
  }

  const setSelectedOption = (option) => {
    console.log('setSelectedOption--option: ', option)
    setShowOptions(false)
  }

  return (
    <KabobMenu
      onFocus={(ev) => {
        setShowOptions(true)
      }}
      onClick={(ev) => {
        setShowOptions(true)
      }}
    >
      {showOptions && (
        <PopoverChildren options={options} setSelected={setSelectedOption} />
      )}
    </KabobMenu>
  )
}
;<ExampleConsumer />
```
