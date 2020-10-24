import * as React from 'react'
import { Caption2, COLORS } from '../index'
type TitleProps = {
  step: {
    title: string
    status: 'complete' | 'active' | 'incomplete'
  }
}
export const Title: React.FC<TitleProps> = ({ step }) => {
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
