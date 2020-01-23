/*
MIT License

Copyright (c) 2018 Juan Carlos Medina

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
import React, { useState } from 'react'
import PropTypes from 'prop-types'

import RefType from './ref'

export const Position = (props) => {
  const initialState = {
    positionX: -1,
    positionY: -1,
  }
  const [position, setPosition] = useState(initialState)

  const handleKey = (event, nextPosition) => {
    event.preventDefault()
    setPosition(nextPosition)
  }

  const onClick = (event) => {
    let x

    const y = props.refs.findIndex((columnRefs) => {
      x = columnRefs.findIndex(
        (columnRef) =>
          columnRef.current && columnRef.current.contains(event.target)
      )
      return x !== -1
    })

    if (x !== -1 && y !== -1) {
      setPosition({
        positionX: x,
        positionY: y,
      })
    }
  }

  const onKeyDown = (event) => {
    switch (event.key) {
      case 'ArrowDown':
        return handleKey(event, (state) => ({
          positionX: state.positionX === -1 ? 0 : position.positionX,
          positionY: Math.min(state.positionY + 1, props.refs.length - 1),
        }))
      case 'ArrowLeft':
        return handleKey(event, (state) => ({
          positionX: Math.max(state.positionX - 1, 0),
          positionY: state.positionY === -1 ? 0 : state.positionY,
        }))
      case 'ArrowRight':
        return handleKey(event, (state) => ({
          positionX: Math.min(state.positionX + 1, props.refs[0].length - 1),
          positionY: state.positionY === -1 ? 0 : state.positionY,
        }))
      case 'ArrowUp':
        return handleKey(event, (state) => ({
          positionX: state.positionX === -1 ? 0 : state.positionX,
          positionY: Math.max(state.positionY - 1, 0),
        }))
      case 'End':
        return handleKey(event, (state) => ({
          positionX: props.refs[0].length - 1,
          positionY: state.positionY === -1 ? 0 : state.positionY,
        }))
      case 'Home':
        return handleKey(event, (state) => ({
          positionX: 0,
          positionY: state.positionY === -1 ? 0 : state.positionY,
        }))
      case 'PageDown':
        return handleKey(event, (state) => ({
          positionX: state.positionX === -1 ? 0 : state.positionX,
          positionY: props.refs.length - 1,
        }))
      case 'PageUp':
        return handleKey(event, (state) => ({
          positionX: state.positionX === -1 ? 0 : state.positionX,
          positionY: 0,
        }))
      default:
    }

    return undefined
  }

  const tabIndex = position.positionY === -1 ? 0 : -1

  return (
    <div
      className={props.className}
      onClick={onClick}
      onKeyDown={onKeyDown}
      role={props.role}
      tabIndex={tabIndex}
    >
      {props.children(position.positionX, position.positionY)}
    </div>
  )
}

Position.propTypes = {
  children: PropTypes.func.isRequired,
  className: PropTypes.string,
  refs: PropTypes.arrayOf(PropTypes.arrayOf(RefType)).isRequired,
  role: PropTypes.string,
}

Position.defaultProps = {
  className: undefined,
  role: 'presentation',
}

Position.displayName = 'Position'
