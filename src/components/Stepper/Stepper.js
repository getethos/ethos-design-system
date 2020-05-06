import React, { useState } from 'react'
import { Icon } from '../index'
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

  const getTitleClassForStatus = (status) => {
    if (status == 'complete') {
      return styles.TitleComplete
    } else if (status == 'active') {
      return styles.TitleActive
    }
    return styles.Title
  }

  return (
    <div className={styles.StepperContainer} role="group" aria-label="progress">
      {console.log('rerendering...')}
      <ol>
        {steps.map((step, i) => (
          <React.Fragment key={uuidv4()}>
            <li className={styles.Node}>
              {getIconForStatus(step.status)}
              <span className={getTitleClassForStatus(step.status)}>
                {step.title}
              </span>
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
