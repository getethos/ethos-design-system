import XhrError from './XhrError'

export interface KeyValMap {
  [key: string]: any
}

export interface XhrComponentState {
  status?: string
  error?: XhrError
  successMessage?: string
}

export type FormEvent = React.FormEvent<HTMLFormElement>

