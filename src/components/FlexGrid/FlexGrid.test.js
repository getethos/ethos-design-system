import React from 'react'
import { FlexGrid, FlexRow, FlexCol } from './index'
import styles from './FlexGridExample.module.scss'
import renderer from 'react-test-renderer'

const Field = () => <p className={styles.Field}>Field</p>

describe('FlexGrid', () => {
  describe('API', () => {
    test('exports properly', () => {
      expect(FlexGrid).toBeDefined()
      expect(FlexRow).toBeDefined()
      expect(FlexCol).toBeDefined()
    })
  })

  describe('rendering component', () => {
    test('default', () => {
      const tree = renderer
        .create(
          <FlexGrid>
            <FlexRow className={styles.DemoCol}>
              <FlexCol xs={12} sm={4} lg={6}>
                <Field />
              </FlexCol>
              <FlexCol xs={12} sm={4} lg={6}>
                <Field />
              </FlexCol>
            </FlexRow>
          </FlexGrid>
        )
        .toJSON()
      expect(tree).toMatchSnapshot()
    })
  })
})
