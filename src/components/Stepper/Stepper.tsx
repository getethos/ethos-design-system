import * as React from 'react'
import { v4 as uuidv4 } from 'uuid'
import { IconForStatus } from './IconForStatus'
import styles from './Stepper.module.scss'
import { Title } from './Title'
type StepperProps = {
  steps: {
    title: string
    status: 'complete' | 'active' | 'incomplete'
  }[]
}
export const Stepper: React.FC<StepperProps> = ({ steps = [] }) => {
  return (
    <div className={styles.StepperContainer} role="group" aria-label="progress">
      <ol>
        {steps.map((step, i) => (
          <React.Fragment key={uuidv4()}>
            <li className={styles.Node}>
              <IconForStatus status={step.status} />
              <Title step={step} />
            </li>

            {i !== steps.length - 1 && (
              <li className={styles.Node}>
                <span
                  className={
                    step.status == 'complete'
                      ? styles.VerticalLineComplete
                      : styles.VerticalLine
                  }
                />
              </li>
            )}
          </React.Fragment>
        ))}
      </ol>
    </div>
  )
}
