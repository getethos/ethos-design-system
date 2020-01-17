import XhrError from './XhrError'

interface XhrState {
  error: XhrError
  successMessage: string
  displayErrorDetails?: boolean
}

export default XhrState
