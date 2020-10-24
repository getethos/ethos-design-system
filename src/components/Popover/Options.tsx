import * as React from 'react'
import { v4 as uuidv4 } from 'uuid'
import { Option } from './Option'
import styles from './Options.module.scss'
type OptionsProps = {
  activeOption: number
  dataKey: string
  entities: any[]
  onChange: (...args: any[]) => any
  optionsRefs: any[]
  selectedOption: number
  setSelectedAndActiveOptions: (...args: any[]) => any
}
/**
 * @param {object} props -- the props
 * @param {int} activeOption - the currently active option item.
 * This is the item that is currently being focused on (but not
 * necessarily selected yet!)
 * @param {string} dataKey - the key that will be used to access the
 * items within the entities list which is also passed in
 * @param {array} entities - an array of object that have the
 * `dataKey` which is used to access the items individually
 * @param {func} onChange - callback for on change
 * @param {array} optionsRefs- an array of option refs
 * @param {int} selectedOption - the currently selected option item.
 * Unlike an active item, this signifies that the user has actually selected
 * or chosen this item. Of course an item can be both active and selected.
 * @param {func} setSelectedAndActiveOptions - callback that gets called
 * once an option is selected
 */
export const Options: React.FC<OptionsProps> = ({
  activeOption,
  dataKey,
  entities,
  onChange,
  optionsRefs,
  selectedOption,
  setSelectedAndActiveOptions,
}) => {
  return (
    <ul data-testid="typeahead-options-container" className={styles.Options}>
      {entities.map((item, i) => {
        optionsRefs[i] = React.createRef()
        return (
          <Option
            selectedOption={selectedOption}
            setSelectedAndActiveOptions={setSelectedAndActiveOptions}
            onChange={onChange}
            currentActive={activeOption}
            item={item}
            itemIndex={i}
            dataKey={dataKey}
            key={uuidv4()}
            ref={optionsRefs[i]}
          />
        )
      })}
    </ul>
  )
}
Options.displayName = 'Options'
