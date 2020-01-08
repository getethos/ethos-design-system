## Example

```jsx
  import React, { useState, useRef } from 'react'

  function ModalExample() {
    const [isOpen, setIsOpen] = useState(false)
    const onActiveHandler = () => setIsOpen(isOpen);

    return (
      <div>
        <button onClick={() => setIsOpen(true)}>Open Modal</button>
        <Modal showModal={isOpen} toggle={setIsOpen}>
          <div style={{ background: '#fff', padding: '16px 24px', overflow: 'scroll' }}>
            <h1>I am a modal!</h1>
            <p>Here's some text blah balh balh balh</p>
            <button tabIndex="-1" onClick={() => setIsOpen(false)}>Okay</button>
            <button onClick={() => setIsOpen(false)}>Cancel</button>
          </div>
        </Modal>
      </div>
    )
  }

  <ModalExample />
```