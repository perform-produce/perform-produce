import { SECTION_HEADING_TOP, SECTION_PADDING_LINE_HEIGHT } from '../constants/styleConstants'
import { getLineHeight } from './styleUtils'
import { getPx } from './stylesBase'

export const addEventListener = (target, type, listener, options) => {
  target.addEventListener(type, listener, options)
  return () => target.removeEventListener(type, listener, options)
}

export const windowScrollTo = section => {
  const { top } = section.getBoundingClientRect()
  window.scrollBy({ top: top + SECTION_PADDING_LINE_HEIGHT * getLineHeight() - getPx(SECTION_HEADING_TOP) })
}