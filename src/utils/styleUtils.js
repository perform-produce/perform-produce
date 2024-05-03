import { DEFAULT_EM, GAP, GAP_PX, GLYPH_SPACE, GRID_COUNT, GRID_GAP, GRID_GAP_PX, GRID_VW, LINE_HEIGHT } from '../constants'
import { delta, quickArray } from './commonUtils'

export const vw = (percentage = 100) => percentage / 100 * window.innerWidth
export const vh = (percentage = 100) => percentage / 100 * window.innerHeight

export const emify = px => `${px / DEFAULT_EM}em`
export const lineHeight = (lines = 1) => `${lines * LINE_HEIGHT}em`
export const wordSpace = words => `${GLYPH_SPACE * words}em`
export const getEm = (em = 1) => parseInt(getComputedStyle(document.body).fontSize) * em
export const getLineHeight = (lines = 1) => LINE_HEIGHT * getEm() * lines
export const getPx = px => px / DEFAULT_EM * getEm()

export const getGridGapPx = () => vw(GRID_VW) + getPx(GRID_GAP_PX)
export const getGridData = () => {
  const gap = getPx(GAP_PX)
  const gridGap = getGridGapPx()
  const colWidth = (vw() - gap * 2 - gridGap * (GRID_COUNT - 1)) / GRID_COUNT
  const colBounds = quickArray(GRID_COUNT, i => gap + (colWidth + gridGap) * i)
  return { gap, gridGap, colWidth, colBounds }
}

// TODO: same as commonUtil?
export const closest = (number, ...bounds) => {
  let currentBound
  let lowestDiff = Infinity
  for (let i = 0; i < bounds.length; i++) {
    const bound = bounds[i]
    const diff = delta(number, bound)
    if (diff < lowestDiff) {
      currentBound = bound
      lowestDiff = diff
    }
  }
  return currentBound
}

export const extractStyle = (key, fallbackString) => props =>
  fallbackString ? (props[key] ?? fallbackString) : props[key]

export const conditionalStyle = (key, string) => props =>
  props[key] ? string : ''

export const getSpanCol = colCount => (vw() - getPx(GAP_PX) * 2 - getGridGapPx() * (GRID_COUNT - 1)) / GRID_COUNT * colCount + (colCount - 1) * getGridGapPx()
export const spanCol = colCount => `calc((100vw - ${GAP} * 2 - ${GRID_GAP} * ${GRID_COUNT - 1}) / ${GRID_COUNT} * ${colCount} + ${colCount - 1} * ${GRID_GAP})`