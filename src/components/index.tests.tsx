import * as React from 'react'
import { CheckboxInput } from './index'
import { Faq } from './index'

// Usage: `yarn test:types` -- see [package.json](../../package.json):

const demoQuestions = [
  {
    summary: 'First',
    content: 'uno',
  },
  {
    summary: 'Second',
    content: 'dos',
  },
]

// Localized test
class FaqTest extends React.Component<any, any> {
  render() {
    return <Faq questions={demoQuestions} />
  }
}

class CheckboxInputTest extends React.Component<any, any> {
  render() {
    return (
      <>
        <CheckboxInput
          name="name: string -- is required"
          data-tid="data-tid: string -- is required"
        >
          I agree to the{' '}
          <a href="/" target="_blank">
            Agreement
          </a>
        </CheckboxInput>
      </>
    )
  }
}
