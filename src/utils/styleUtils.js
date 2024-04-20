import { DEFAULT_EM, GAP, GAP_PX, GLYPH_SPACE, GRID_COUNT, GRID_GAP, GRID_GAP_PX, LINE_HEIGHT } from '../constants'

export const emify = px => `${px / DEFAULT_EM}em`
export const lineHeight = lines => `${lines * LINE_HEIGHT}em`
export const wordSpace = words => `${GLYPH_SPACE * words}em`
export const getEm = (em = 1) => parseInt(getComputedStyle(document.body).fontSize) * em
export const getLineHeight = () => LINE_HEIGHT * getEm()
export const getPx = px => px / DEFAULT_EM * getEm()

export const getGridData = () => {
  const gap = getPx(GAP_PX)
  const gridGap = getPx(GRID_GAP_PX)
  const colWidth = (window.innerWidth - gap * 2 - gridGap * (GRID_COUNT - 1)) / GRID_COUNT
  const colBounds = Array(GRID_COUNT)
    .fill(0)
    .map((_, i) => gap + (colWidth + gridGap) * i)
  return {
    gap, gridGap, colWidth, colBounds
  }
}

export const closest = (number, ...bounds) => {
  let currentBound
  let lowestDiff = Infinity
  for (let i = 0; i < bounds.length; i++) {
    const bound = bounds[i]
    const diff = Math.abs(bound - number)
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

export const spanCol = colCount => `calc((100vw - ${GAP} * 2 - ${GRID_GAP} * ${GRID_COUNT - 1}) / ${GRID_COUNT} * ${colCount} + ${colCount - 1} * ${GRID_GAP})`