import React, { useState } from 'react'
import PropTypes from 'prop-types'

export function DangerouslyUseFormGroups({ children }) {
  const [group, setGroup] = useState(0)
  return (
    <React.Fragment key={group}>{children({ group, setGroup })}</React.Fragment>
  )
}

DangerouslyUseFormGroups.propTypes = {
  children: PropTypes.func.isRequired,
}
