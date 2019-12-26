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
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        Top aligned with insufficient space and flip behavior ->
        <span>
          <Tooltip behavior={'flip'} placement={'top'} />
        </span>
      </div>
      <div
        style={{
          height: '100px',
          display: 'flex',
          alignItems: 'flex-end',
        }}
      >
        Top aligned with enough space ->
        <span>
          <Tooltip behavior={'flip'} placement={'top'} />
        </span>
      </div>
      <br />
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
