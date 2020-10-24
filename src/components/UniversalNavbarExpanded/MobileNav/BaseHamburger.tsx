import * as React from 'react'
import TransformingBurgerButton from '../../UniversalNavbar/TransformingBurgerButton/TransformingBurgerButton'
type BaseHamburgerProps = {
  className: string
  visibleState: boolean
  clickHandler: (...args: any[]) => any
  keyPressHandler: (...args: any[]) => any
}
export const BaseHamburger: React.FC<BaseHamburgerProps> = ({
  className,
  visibleState,
  clickHandler,
  keyPressHandler,
}) => {
  return (
    <div className={className}>
      <TransformingBurgerButton
        showMobileMenu={visibleState}
        clickHandler={() => clickHandler()}
        keyPressHandler={(e) => keyPressHandler(e)}
      />
    </div>
  )
}
