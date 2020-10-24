import * as React from 'react'
import { Icon } from '../../nora/components'
import styles from './Stepper.module.scss'
type IconForStatusProps = {
  status?: 'complete' | 'active' | 'incomplete'
}
export const IconForStatus: React.SFC<IconForStatusProps> = ({ status }) => {
  if (status == 'complete') {
    return (
      <span className={styles.StepComplete}>
        <Icon iconPrefix="far" iconName="check" />
      </span>
    )
  } else if (status == 'active') {
    return <span className={styles.StepActive}></span>
  }
  return <span className={styles.Step}></span>
}
