import * as React from 'react'
// EDS core components
import { Button } from '../index'
// Styles
import styles from './CtaButton.module.scss'
type CtaButtonProps = {
  href: string
  trackingFunction?: (...args: any[]) => any
  hideOnMobile?: boolean
}
const CtaButton: React.FC<CtaButtonProps> = ({
  href,
  trackingFunction,
  hideOnMobile,
}) => {
  // We still rely on some legacy UniversalNavbar styles from FancyAnimatedLogo.scss
  // TODO convert these to module.scss capable styles
  const CtaButtonClasses = [
    'cta-button',
    'navbar-expanded',
    'show-when-scrolled',
  ]
  if (hideOnMobile) {
    CtaButtonClasses.push(styles.hidden)
  }
  return (
    <a
      className={CtaButtonClasses.join(' ')}
      onClick={trackingFunction}
      href={href}
    >
      <Button.Small.Black>Check my price</Button.Small.Black>
    </a>
  )
}
export default CtaButton
