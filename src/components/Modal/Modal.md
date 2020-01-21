## Description
The `<Modal />` component provides a container that renders content into an accessible modal outlet. By default, the container will render `children` centered in the screen with an overlay. Out of the box, the `<Modal />` will handle setting proper focus on tabable elements within the inner content, trapping focus within the `modal`,  and toggle the state of the modal through keyboard events.

The container makes no assumptions about the inner content and can be styled to fit whatever implementation is needed.

## Examples

### Basic Usage
Activating the modal is done through passing a `boolean` flag as the `showModal` `prop`. This gives the parent the ability to set if the modal will render open or closed on initial render.

Toggling the state of the modal is also handled by passing a callback through the `toggle` `prop`. The callback is a `voided` function that accepts a  `boolean` as whether the modal is visible. When either the `escape` key is hit, or outside of the modal content is clicked, the modal will pass a boolean value of `false` to the `toggle` method.


```jsx
  import React, { useState } from 'react'

  function ModalExample() {
    const [isOpen, setIsOpen] = useState(false)

    return (
      <>
        <button onClick={() => setIsOpen(true)}>Open Modal</button>
        <Modal showModal={isOpen} toggle={setIsOpen}>
          <div style={{ background: '#fff', padding: '16px 24px', width: '400px' }}>
            <h1>You're a Wizard Harry!</h1>
            <p>
              Mobilicorpus lumos aparecium impedimenta nox serpensortia flagrate. Tarantallegra totalus levicorpus aparecium aresto immobilus. Inflamarae leviosa protego aresto imperio impedimenta unction locomotor alohomora locomotor. Me specialis impedimenta patronum wingardium mortis impedimenta evanesco immobilus finite.
            </p>
            <button type="button" onClick={() => setIsOpen(false)}>Okay</button>
          </div>
        </Modal>
      </>
    )
  }

  <ModalExample />
```

### Setting `aria-describedby` and `aria-labelledby`

Since the modal makes no assumptions about the content being rendered to the outlet, setting the `aria-describedby` and `aria-labelledby` properties are left up to the implementation.  The `<Modal />` does accept to optional properties, `props.ariaDescribedBy` and `props.ariaLabelledBy` which will set their respective `aria` properties on the inner modal to whatever `id` selector is passed to them.

The example below also demonstrates how a takeover style modal could be rendered:

```jsx
  import React, { useState } from 'react'

  function ModalExample() {
    const [isOpen, setIsOpen] = useState(false)

    const HEADER_ID = 'long-modal-heading'
    const DESC_ID = 'long-modal'

    return (
      <>
        <button onClick={() => setIsOpen(true)}>Open Modal</button>
        <Modal showModal={isOpen} toggle={setIsOpen} ariaLabelledBy={HEADER_ID} ariaDescribedBy={DESC_ID}>
          <div style={{ background: '#fff', padding: '16px 24px', overflow: 'scroll', width: '100vw', height: '100vh' }}>
            <header>
              <h1 id={HEADER_ID}>You're a Wizard Harry!</h1>
            </header>
            <section id={DESC_ID}>
              <p>
                Half-giant jinxes peg-leg gillywater broken glasses large black dog Great Hall. Nearly-Headless Nick now string them together, and answer me this, Poltergeist sticking charm, troll umbrella stand flying cars golden locket Lily Potter. Pumpkin juice Trevor wave your wand out glass orbs, a Grim knitted hats. Stan Shunpike doe patronus, suck his soul Muggle-Born large order of drills the trace. Bred in captivity fell through the veil, quaffle blue flame ickle diddykins Aragog. Yer a wizard, Harry Doxycide the woes of Mrs. Weasley Goblet of Fire.
              </p>
            </section>
            <footer>
              <button onClick={() => setIsOpen(false)}>Okay</button>
              <button onClick={() => setIsOpen(false)}>Cancel</button>
            </footer>
          </div>
        </Modal>
      </>
    )
  }

  <ModalExample />

```
