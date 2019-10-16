import React, { useState } from 'react'
export function TestFormWrapper({ children }) {
  const [count, setCount] = useState(0)

  return (
    <>
      {children({
        count,
        setCount,
      })}
    </>
  )
}
