import React from 'react'
import PropTypes from 'prop-types'
import { Option } from './Option'
import styles from './Options.module.scss'
import uuidv4 from 'uuid/v4'

/**
 * @param {object} props -- the props
 * @param {int} activeOption - the currently active option item
 * @param {string} dataKey - the key that will be used to access the
 * items within the entities list which is also passed in
 * @param {array} entities - an array of object that have the
 * `dataKey` which is used to access the items individually
 * @param {func} onChange - callback for on change
 * @param {array} optionsRefs- an array of option refs
 * @param {int} selectedOption - the currently selected option item
 * @param {func} setSelectedAndActiveOptions - callback that gets called
 * once an option is selected
 */
export const Options = ({
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
Options.displayName = 'Option'
Options.propTypes = {
  activeOption: PropTypes.number,
  dataKey: PropTypes.string,
  entities: PropTypes.array,
  onChange: PropTypes.func,
  optionsRefs: PropTypes.array,
  selectedOption: PropTypes.number,
  setSelectedAndActiveOptions: PropTypes.func,
}
