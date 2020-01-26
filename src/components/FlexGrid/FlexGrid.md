```jsx
import { FlexRow } from './FlexRow.js'
import { FlexCol } from './FlexCol.js'
import styles from './FlexGridExample.module.scss'
const Field = () => <p className={styles.Field}>Field</p>
;<FlexGrid fluid>
  <FlexRow className={styles.DemoCol}>
    <FlexCol xs={12} sm={4} lg={6}>
      <Field />
    </FlexCol>
    <FlexCol xs={12} sm={4} lg={6}>
      <Field />
    </FlexCol>
    <FlexCol xs={12} sm={4} lg={3}>
      <Field />
    </FlexCol>
    <FlexCol xs={12} sm={4} lg={3}>
      <Field />
    </FlexCol>
    <FlexCol xs={12} sm={4} lg={3}>
      <Field />
    </FlexCol>
    <FlexCol xs={12} sm={4} lg={3}>
      <Field />
    </FlexCol>
  </FlexRow>
</FlexGrid>
```
