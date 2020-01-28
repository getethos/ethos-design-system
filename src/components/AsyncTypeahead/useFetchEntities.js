import { useState, useEffect, createRef } from 'react'

export const useFetchEntities = ({
  searchString,
  fetchEntities,
  delay = 250,
}) => {
  const [entities, setEntities] = useState([])
  const [loading, setLoading] = useState(false)

  const mapEntities = (entities) => {
    return entities.map((item) => {
      // TODO -- refactor this to something like item[props.keyName]
      // const id = keyToId(item.name)
      // acc[id] = React.createRef()
      item.ref = createRef()
      return item
    }, {})
  }

  useEffect(() => {
    setLoading(true)
    const debounced = setTimeout(async () => {
      try {
        const response = await fetchEntities(searchString)
        if (!response.ok) {
          throw Error(response.statusText)
        }
        const json = await response.json()
        const entitiesWithReferences = mapEntities(json)
        setEntities(entitiesWithReferences)
        setLoading(false)
      } catch (e) {
        setEntities([
          {
            name: 'Not found...',
            // Not sure if we need this, but maybe if they attempt
            // to navigate to this for some reason.
            ref: createRef(),
          },
        ])
        setLoading(false)
      }
    }, delay)
    return () => {
      clearTimeout(debounced)
    }
  }, [searchString])

  return { entities, loading }
}
