```jsx
import React, { useRef, useState, useEffect } from 'react'

const Container = ({ children }) => {
  return (
    <div
      style={{
        overflow: 'scroll',
        height: '200px',
        width: '100%',
      }}
    >
      Scroll Down!
      <div
        style={{
          height: '600px',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        Hover over this thing for more information ->
        <span>
          <Tooltip behavior={'flip'} placement={'top'} />
        </span>
      </div>
    </div>
  )
}

;<>
  <Container></Container>
</>
```
