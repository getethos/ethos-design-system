```jsx
import React, { useRef, useState, useEffect } from 'react'
;<>
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
      }}
    >
      Top aligned with insufficient space <Tooltip label="Flip" details="Hi!" />
    </div>
    Hey there this
    <Tooltip label="Inline" details="Hi again" inline /> is an inline tooltip
    <div
      style={{
        height: '100px',
        display: 'flex',
        alignItems: 'flex-end',
      }}
    >
      Enough space to display above tooltip{' '}
      <Tooltip
        label="Label"
        details="I flip to show below when in at the limit of my container"
      />
    </div>
    <br />
    Scroll Down!
    <div
      style={{
        height: '150px',
      }}
    />
  </div>
</>
```
