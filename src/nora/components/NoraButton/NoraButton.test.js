import React from 'react'
import renderer from 'react-test-renderer'
import { NoraButton } from './NoraButton'
import styles from './NoraButton.module.scss'

describe('NoraButton', () => {
  it('renders default NoraButton', () => {
    const tree = renderer.create(<NoraButton>default</NoraButton>).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('allows className to be passed as a prop', () => {
    const tree = renderer
      .create(<NoraButton className={styles.DemoWidth}>customized</NoraButton>)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
