import { useState, useEffect, createRef } from 'react'

/**
 * This is a custom hook that hits API with search term
 * and exposes `loading` (boolean indicating we're in the
 * process of an http request), and also a list of `entities`
 * once they've resolved (we use async/await). These
 * entities are returned by the hook to the caller.
 */
export const useFetchEntities = ({
  searchString,
  fetchEntities,
  entitiesKey,
  delay = 250,
}) => {
  const [entities, setEntities] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    const debounced = setTimeout(async () => {
      try {
        const response = await fetchEntities(searchString)
        if (!response.ok) {
          throw Error(response.statusText)
        }
        const json = await response.json()
        /**
         * If they haven't passed `entitiesKey`, we have to assume
         * JSON is already structured with entities at the top level.
         */
        const resolvedEntities = entitiesKey ? json[entitiesKey] : json
        setEntities(resolvedEntities)
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
