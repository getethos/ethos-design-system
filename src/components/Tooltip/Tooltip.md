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
        height: '50px',
        display: 'flex',
        alignItems: 'flex-end',
      }}
    >
      Top aligned with insufficient space <Tooltip label="Flip" details="Hi!" />
    </div>
    <br />
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-end',
      }}
    >
      Top aligned with insufficient space <Tooltip label="Flip" details="Hi!" />
    </div>
    <div>
      Hey there this
      <Tooltip label="Inline" details="Hi again" inline /> is an inline tooltip
    </div>
    <br />
    <br />
    <br />
    This tooltip flips on the WINDOW and not the scrollable parent
    <Tooltip
      label="Label"
      details="Not Broken"
      boundariesElement={Tooltip.BOUNDARIES_ELEMENT.WINDOW}
      inline
    />
    <br />
    This tooltip flips on the VIEWPORT
    <Tooltip
      label="Label"
      details="Not Broken"
      boundariesElement={Tooltip.BOUNDARIES_ELEMENT.VIEWPORT}
      inline
    />
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
