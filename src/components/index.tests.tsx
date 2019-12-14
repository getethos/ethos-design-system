import * as React from 'react'
import { Faq } from './index'

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
class MyTest extends React.Component<any, any> {
  render() {
    return <Faq questions={demoQuestions} />
  }
}
