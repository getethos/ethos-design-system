import * as React from 'react'
// Helpers
import { preventCurrentPageNavigation } from '../../helpers/preventCurrentPageNavigation'
// Reused assets from UniversalNavbar
import { default as BaseNavLink } from '../UniversalNavbar/NavLink'
type NavLinkProps = React.HTMLAttributes<HTMLAnchorElement> & {
  key?: string
  href: string
  currentPageAwareness?: boolean
  currentPageFunction?: (...args: any[]) => any
  currentPageCondition?: boolean
  LinkComponent?: React.ElementType
}
const NavLink: React.SFC<NavLinkProps> = ({
  className,
  key,
  href,
  currentPageAwareness,
  currentPageFunction,
  currentPageCondition,
  LinkComponent,
  children,
}) => {
  if (currentPageAwareness) {
    return (
      <BaseNavLink
        className={className}
        key={key ? key : null}
        href={href}
        LinkComponent={LinkComponent}
        onClick={(e) => {
          preventCurrentPageNavigation({
            event: e,
            href: href,
            keyPress: false,
            currentPageFunction: currentPageFunction,
            currentPageCondition: currentPageCondition,
          })
        }}
        onKeyPress={(e) =>
          preventCurrentPageNavigation({
            event: e,
            href: href,
            keyPress: true,
            currentPageFunction: currentPageFunction,
            currentPageCondition: currentPageCondition,
          })
        }
      >
        {children}
      </BaseNavLink>
    )
  }
  return (
    <BaseNavLink
      className={className}
      key={key ? key : null}
      href={href}
      LinkComponent={LinkComponent}
    >
      {children}
    </BaseNavLink>
  )
}
export default NavLink
