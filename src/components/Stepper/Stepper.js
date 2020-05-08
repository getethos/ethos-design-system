import React from 'react'
import { COLORS, Caption2, Icon } from '../index'
import PropTypes from 'prop-types'
import uuidv4 from 'uuid/v4'
import styles from './Stepper.module.scss'

export const Stepper = ({ steps }) => {
  const getIconForStatus = (status) => {
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

  const getTitle = (step) => {
    if (step.status == 'complete' || step.status == 'active') {
      return (
        <Caption2.Regular400 color={COLORS.GRAY_PRIMARY}>
          {step.title}
        </Caption2.Regular400>
      )
    }
    return (
      <Caption2.Regular400 color={COLORS.GRAY_STROKE_AND_DISABLED}>
        {step.title}
      </Caption2.Regular400>
    )
  }

  return (
    <div className={styles.StepperContainer} role="group" aria-label="progress">
      <ol>
        {steps.map((step, i) => (
          <React.Fragment key={uuidv4()}>
            <li className={styles.Node}>
              {getIconForStatus(step.status)}
              {getTitle(step)}
            </li>
            {/* Do not put a vertical line after last one :) */}
            {i !== steps.length - 1 && (
              <li className={styles.Node}>
                <span
                  className={
                    step.status == 'complete'
                      ? styles.VerticalLineComplete
                      : styles.VerticalLine
                  }
                ></span>
              </li>
            )}
          </React.Fragment>
        ))}
      </ol>
    </div>
  )
}

Stepper.propTypes = {
  steps: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      status: PropTypes.oneOf(['complete', 'active', 'incomplete']).isRequired,
    })
  ),
}
