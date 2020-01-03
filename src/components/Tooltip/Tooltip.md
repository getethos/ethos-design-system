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
        alignItems: 'center',
      }}
    >
      Top aligned with insufficient space and flip behavior ->
      <span>
        <Tooltip label={'Flip'}>Hi!</Tooltip>
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
        <Tooltip label={'Top Aligned'}> Hi again!</Tooltip>
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
        <Tooltip label={'Information'}> More Information!</Tooltip>
      </span>
    </div>
  </div>
</>
```
