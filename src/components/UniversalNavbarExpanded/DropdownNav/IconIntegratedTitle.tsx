import React from 'react'
// Helpers
import { getLastWord, removeLastWord } from '../../../helpers/words'
type IconIntegratedTitleProps = {
  title?: string
}
/**
 * Use this to wrap things like icons in a span with the last word of a text string.
 * Doing so will prevent the icon from being isolated on a newline without any word.
 *
 * @param {string} title - Some text to integrate the icon into.
 * @param {ReactNode} children - Icon to integrate into title.
 *
 * @return {JSX.Element}
 */
const IconIntegratedTitle: React.SFC<IconIntegratedTitleProps> = ({
  title,
  children,
}) => {
  return (
    <>
      <span>{removeLastWord(title)}</span>
      <div style={{ display: 'inline-block' }}>
        <span>{getLastWord(title)}</span>
        {children}
      </div>
    </>
  )
}
export default IconIntegratedTitle
