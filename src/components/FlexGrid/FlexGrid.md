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

Offsets

```jsx
import { FlexRow } from './FlexRow.js'
import { FlexCol } from './FlexCol.js'
;<FlexGrid fluid>
  <FlexRow>
    <FlexCol sm={2} style={{ border: '1px solid #f7cac9' }}>
      <p>First column</p>
    </FlexCol>
    <FlexCol sm={2} smOffset={1} style={{ border: '1px solid #39cccc' }}>
      <p>Second column</p>
    </FlexCol>
    <FlexCol sm={2} smOffset={1} style={{ border: '1px solid #7fdbff' }}>
      <p>Third column</p>
    </FlexCol>
    <FlexCol sm={2} smOffset={1} style={{ border: '1px solid #ff6f61' }}>
      <p>Fourth column</p>
    </FlexCol>
  </FlexRow>
</FlexGrid>
```


Opt out of horizontal padding

```jsx
import { FlexRow } from './FlexRow.js'
import { FlexCol } from './FlexCol.js'
;<FlexGrid fluid>
  <FlexRow>
    <FlexCol nopad sm={2} style={{ border: '1px solid #f7cac9' }}>
      <p>First column</p>
    </FlexCol>
    <FlexCol nopad sm={2} smOffset={1} style={{ border: '1px solid #39cccc' }}>
      <p>Second column</p>
    </FlexCol>
    <FlexCol nopad sm={2} smOffset={1} style={{ border: '1px solid #7fdbff' }}>
      <p>Third column</p>
    </FlexCol>
    <FlexCol nopad sm={2} smOffset={1} style={{ border: '1px solid #ff6f61' }}>
      <p>Fourth column</p>
    </FlexCol>
  </FlexRow>
</FlexGrid>
```
