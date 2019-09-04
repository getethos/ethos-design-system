/**
* Hooks cannot be called from anywhere like regular javascript
* functions. They can only be called from a functional component
* or from other hooks. This gets around it and the Invariant Violation
* when testing custom hooks that in turn call hook e.g. useState
*/
import React from 'react'
import renderer from 'react-test-renderer'

const TestHook = ({ callback }) => {
  callback()
  return null
}

export default (callback) => {
  renderer.create(<TestHook callback={callback} />)
}
