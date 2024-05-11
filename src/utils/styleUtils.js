import { GAP, GLYPH_SPACE, GRID_COUNT, GRID_GAP, GRID_GAP_PX, GRID_VW, LINE_HEIGHT } from '../constants/styleConstants'
import { quickArray } from './commonUtils'
import { emify, getEm, getPx } from './stylesBase'

export const vw = (percentage = 100) => percentage / 100 * window.innerWidth
export const vh = (percentage = 100) => percentage / 100 * window.innerHeight

export const lineHeight = (lines = 1) => `${lines * LINE_HEIGHT}em`
export const wordSpace = words => `${GLYPH_SPACE * words}em`
export const getLineHeight = (lines = 1) => LINE_HEIGHT * getEm() * lines
export const getEmifiedPx = px => getPx(emify(px))

export const getGridGapPx = () => vw(GRID_VW) + getEmifiedPx(GRID_GAP_PX)
export const getGridData = () => {
  const gap = getPx(GAP)
  const gridGap = getGridGapPx()
  const colWidth = (vw() - gap * 2 - gridGap * (GRID_COUNT - 1)) / GRID_COUNT
  const colBounds = quickArray(GRID_COUNT, i => gap + (colWidth + gridGap) * i)
  return { gap, gridGap, colWidth, colBounds }
}

export const extractStyle = (key, fallbackString) => props =>
  fallbackString ? (props[key] ?? fallbackString) : props[key]

export const conditionalStyle = (key, string) => props =>
  props[key] ? string : ''

export const toggleStyle = (key, styleIfTrue, styleIfFalse) => props =>
  props[key] ? styleIfTrue : styleIfFalse


export const getSpanCol = colCount => (vw() - getPx(GAP) * 2 - getGridGapPx() * (GRID_COUNT - 1)) / GRID_COUNT * colCount + (colCount - 1) * getGridGapPx()
export const spanCol = (colCount, gridGapCount, gapCount = 0) => `calc((100vw - ${GAP} * 2 - ${GRID_GAP} * ${GRID_COUNT - 1}) / ${GRID_COUNT} * ${colCount} + ${gridGapCount ?? Math.max(Math.floor(colCount) - 1, 0)} * ${GRID_GAP} + ${gapCount} * ${GAP})`