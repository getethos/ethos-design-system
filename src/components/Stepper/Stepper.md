```jsx
import { Spacer, Button } from '../index.js'
const Demo = () => {
  const [steps, setSteps] = React.useState([
    {
      title: 'Complete step',
      status: 'complete',
    },
    {
      title: 'Active step',
      status: 'active',
    },
    {
      title: 'Upcoming step',
      status: 'incomplete',
    },
  ])

  const set1 = () => {
    console.log('set1')
    const stepz = steps
    stepz[0].status = 'active'
    stepz[0].title = 'Now Active'
    stepz[1].status = 'incomplete'
    stepz[1].title = 'Now Incomplete'
    stepz[2].status = 'incomplete'
    stepz[2].title = 'Now Incomplete'
    setSteps([...stepz])
  }
  const set2 = () => {
    const stepz = steps
    stepz[0].status = 'complete'
    stepz[0].title = 'Now Complete'
    stepz[1].status = 'active'
    stepz[1].title = 'Active step'
    stepz[2].status = 'incomplete'
    stepz[2].title = 'Now Incomplete'
    setSteps([...stepz])
  }
  const set3 = () => {
    const stepz = steps
    stepz[0].status = 'complete'
    stepz[0].title = 'Now Complete'
    stepz[1].status = 'complete'
    stepz[1].title = 'Now Complete'
    stepz[2].status = 'active'
    stepz[2].title = 'Now Active'

    setSteps([...stepz])
  }

  return (
    <>
      <Button.Medium.Black onClick={set1} key={1}>
        Set 1 To Active
      </Button.Medium.Black>{' '}
      <Button.Medium.Black onClick={set2} key={2}>
        Set 2 To Active
      </Button.Medium.Black>{' '}
      <Button.Medium.Black onClick={set3} key={3}>
        Set 3 To Active
      </Button.Medium.Black>{' '}
      <Spacer.H16 />
      <Stepper steps={steps} />
    </>
  )
}
;<Demo />
```
