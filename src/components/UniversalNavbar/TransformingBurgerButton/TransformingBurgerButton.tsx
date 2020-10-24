import * as React from 'react'
import styles from './TransformingBurgerButton.module.scss'
type TransformingBurgerButtonProps = {
  clickHandler: (...args: any[]) => any
  keyPressHandler: (...args: any[]) => any
  showMobileMenu: boolean
}
const TransformingBurgerButton: React.SFC<TransformingBurgerButtonProps> = ({
  clickHandler,
  keyPressHandler,
  showMobileMenu,
}) => {
  return (
    <span className={showMobileMenu ? styles.showMobileMenu : ''}>
      <div
        onClick={clickHandler}
        onKeyPress={keyPressHandler}
        className={styles.iconWrapper}
        role="button"
        tabIndex={0}
        aria-label="Menu"
      >
        <div className={styles.icon}>
          <i />
        </div>
      </div>
    </span>
  )
}
export default TransformingBurgerButton
