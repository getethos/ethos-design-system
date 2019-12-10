import { useState } from 'react'
import XhrError from './XhrError'
import { XhrComponentState } from './helpers'

export function useXhrState({
  status,
  error,
  successMessage,
}: XhrComponentState): Array<(input: any) => void> {
  const [xhrState, setXhrState] = useState({
    status,
    error,
    successMessage,
  })

  /**
   * Allows user of useXhrState to pull the current state.
   */
  function getXhrState(): XhrComponentState {
    return xhrState
  }

  /**
   * Handles any XHR errors thrown from our xhr/fetch chain.
   */
  const handleXhrError = (e): void => {
    const xhrError: XhrError = e
    setXhrState({
      status: 'error',
      error: xhrError,
      successMessage: null,
    })
  }

  /**
   * Handles XHR success for generic success notifications
   * via InfoMessage.Alert.Success
   */
  const handleXhrSuccess = (successMessageArg: string): void => {
    setXhrState({
      status: 'success',
      error: null,
      successMessage: successMessageArg,
    })
  }

  /**
   * Clears any status messages or errors from previous XHRs.
   */
  const resetStatus = (): void => {
    setXhrState({
      status: null,
      error: null,
      successMessage: null,
    })
  }

  return [getXhrState, handleXhrError, handleXhrSuccess, resetStatus]
}
