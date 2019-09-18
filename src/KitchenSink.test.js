import React from 'react'
import ReactDOM from 'react-dom'
import KitchenSink from './KitchenSink'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<KitchenSink />, div)
})
