import * as React from 'react'
import { Faq } from './index'
import { ButtonSelectGroup } from './index'

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

class ButtonSelectGroupTest extends React.Component<any, any> {
  render() {
    return (
      <ButtonSelectGroup initialValue={false} column labelCopy="Yes no">
        <ButtonSelectGroup.Option value={true}>True</ButtonSelectGroup.Option>
        <ButtonSelectGroup.Option value={false}>False</ButtonSelectGroup.Option>
      </ButtonSelectGroup>
    )
  }
}
