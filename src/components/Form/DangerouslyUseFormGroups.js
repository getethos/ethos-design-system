import React, { useState } from 'react'

export function DangerouslyUseFormGroups({ children }) {
  const [group, setGroup] = useState(0)
  return (
    <React.Fragment key={group}>
      {children({group, setGroup})}
    </React.Fragment>
  )
}
