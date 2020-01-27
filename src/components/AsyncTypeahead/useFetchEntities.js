import { useState, useEffect } from 'react'

export const useFetchEntities = ({
  searchString,
  fetchEntities,
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
        setEntities(json)
        setLoading(false)
      } catch (e) {
        setEntities([
          {
            name: 'Not found...',
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
