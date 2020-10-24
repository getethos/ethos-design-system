import * as React from 'react'
import { codes } from '../../helpers/constants.js'
type HeaderBarProps = {
  index?: number
  title: string
  renderToggle: (expanded: boolean) => JSX.Element
  focusRef: React.MutableRefObject<number | null | undefined>
  onToggle?: (...args: any[]) => any
  toggleChildIsTarget?: boolean
  onNavigation: (...args: any[]) => any
  expanded?: boolean
  sectionId?: string
  labelId?: string
  labelRef?: React.Ref<any>
  labelClassName?: string
  toggleClassName?: string
}
/**
 * HeaderBar will place all the event handlers on the header itself,
 * if `toggleChildIsTarget` is false. If `toggleChildIsTarget` is true,
 * we put those handlers ont the <Toggler /> itself.
 */
export const HeaderBar: React.SFC<HeaderBarProps> = ({
  renderToggle,
  focusRef,
  onToggle,
  toggleChildIsTarget,
  onNavigation,
  expanded = false,
  sectionId,
  labelId,
  labelRef,
  index,
  title,
  labelClassName = '',
  toggleClassName = '',
}) => {
  const onKeyDown = (e) => {
    switch (e.keyCode) {
      case codes.SPACE:
      case codes.RETURN:
        e.preventDefault()
        onToggle && onToggle(index)
        break
      case codes.DOWN:
        e.preventDefault()
        onNavigation(codes.DOWN)
        break
      case codes.UP:
        e.preventDefault()
        onNavigation(codes.UP)
        break
      case codes.HOME:
        e.preventDefault()
        onNavigation(codes.HOME)
        break
      case codes.END:
        e.preventDefault()
        onNavigation(codes.END)
        break
      default:
    }
  }
  const onFocus = () => {
    focusRef.current = index
  }
  const onBlur = () => {
    focusRef.current = null
  }
  const onClick = () => {
    onToggle && onToggle(index)
  }
  /**
   * It's important here that we've done the following:
   * 1. Have HeaderBar outside of AccordionSection
   * 2. Not have multiple return statements which trigger rerenders
   * https://medium.com/@cowi4030/optimizing-conditional-rendering-in-react-3fee6b197a20
   * All of these allow focus to be preserved as we toggle the AccordionSection
   * since we aren't triggering needless rerenders.
   */
  return (
    <>
      {toggleChildIsTarget && (
        <div className={labelClassName}>
          {title}
          <span
            role="button"
            aria-expanded={expanded}
            aria-controls={sectionId}
            id={labelId}
            tabIndex={0}
            className={toggleClassName}
            onClick={onClick}
            onKeyDown={onKeyDown}
            onFocus={onFocus}
            onBlur={onBlur}
            ref={labelRef}
          >
            {renderToggle(expanded)}
          </span>
        </div>
      )}
      {!toggleChildIsTarget && (
        <div
          role="button"
          aria-expanded={expanded}
          aria-controls={sectionId}
          id={labelId}
          tabIndex={0}
          className={labelClassName}
          onClick={onClick}
          onKeyDown={onKeyDown}
          onFocus={onFocus}
          onBlur={onBlur}
          ref={labelRef}
        >
          {title}
          {renderToggle(expanded)}
        </div>
      )}
    </>
  )
}
