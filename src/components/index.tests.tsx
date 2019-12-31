import * as React from 'react'
import { Faq } from './index'
import { Select } from './index'

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

const options = [
  { value: 'nyc', label: 'New York' },
  { value: 'sf', label: 'San Francisco' },
]
const onSelected = (selectedOption: any) => {}

class SelectTest extends React.Component<any, any> {
  // Tests the various types of react selects based on booleans set
  render() {
    return (
      <>
        <Select
          onChange={onSelected}
          options={options}
          isAsync={true}
          isCreatable={true}
        />
        <Select onChange={onSelected} options={options} isAsync={true} />
        <Select onChange={onSelected} options={options} isCreatable={true} />
        <Select onChange={onSelected} options={options} />
      </>
    )
  }
}
