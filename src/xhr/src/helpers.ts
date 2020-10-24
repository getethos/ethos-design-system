import XhrError from './XhrError'

export interface KeyValMap {
  [key: string]: any
}

export interface XhrComponentState {
  status?: string | null
  error?: XhrError | null
  successMessage?: string | null
}

export type FormEvent = React.FormEvent<HTMLFormElement>
