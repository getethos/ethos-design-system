import React from 'react'

/**
 * Import the Xhr factor, notification component, and xhr state custom hook
 */
import { xhrFactory } from '../lib/xhr'
import { XhrComponent } from '../lib/XhrComponent'
import { useXhrState } from '../lib/useXhrState'

import {
  Button,
  /* for consumers outside of EDS this will be ``} from 'ethos-design-system'`` */
} from '../../components/index'

/**
 * NOTE: This ideally would be put in a more top-level place,
 * and of course controlled by a more up-to-date version of
 * createRoot.js (the version in our monorepo is correct)
 */
const xhr = xhrFactory({ baseURL: 'http://localhost:9004' })

function ErrorsExample() {
  /**
   * Use the useXhrState hook to push Xhr status and check state
   */
  const [
    getXhrState,
    handleXhrError,
    handleXhrSuccess,
    resetStatus,
  ] = useXhrState({})

  /**
   * Use `xhr` to make any HTTP requests and handle success / error scenarios
   */
  const doGet = async (e) => {
    e.preventDefault()
    const errorCode = e.currentTarget.textContent.toLowerCase()

    try {
      /**
       * Clear state
       */
      resetStatus()

      /**
       * Make the HTTP request using the convenient xhr API
       */
      const { err } = await xhr({
        path: `api/${errorCode}`,
        method: xhr.GET,
      })
      if (err) throw err

      /**
       * We'd like to present a success notification upon success response from server.
       */
      handleXhrSuccess('Success hitting the server :)')
    } catch (e) {
      /**
       * We'd like to present an error notification upon error condition.
       */
      handleXhrError(e)
    }
  }

  /**
   * The useXhrState custom hook exposes getXhrState to allow us to obtain current
   * Xhr state and pass back to the xhr notification component.
   */
  const xhrState = getXhrState()

  return (
    <>
      {/* Present success or error notification to user */}
      <XhrComponent
        error={xhrState.error}
        successMessage={xhrState.successMessage}
      />
      <section className="card">
        <div className="card-container">
          <Button.Medium.Black onClick={doGet}>400</Button.Medium.Black>{' '}
          <Button.Medium.Black onClick={doGet}>401</Button.Medium.Black>{' '}
          <Button.Medium.Black onClick={doGet}>500</Button.Medium.Black>{' '}
          <Button.Medium.Black onClick={doGet}>Echo</Button.Medium.Black>
        </div>
      </section>
    </>
  )
}

export default ErrorsExample
