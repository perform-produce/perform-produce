import _ from 'lodash'
import { loopObject, validateString } from './commonUtils'
import { COLORS, GRID_COUNT, GRID_GAP, PERFORMING_BODY_GRID_COUNT, STROKE_WIDTH, VERT_GAP } from '../constants/styleConstants'
import { spanCol } from './styleUtils'

const flex = (
  alignItems = 'initial',
  justifyContent = 'initial',
  isInLine = false
) => `
  display: ${validateString(isInLine, 'inline-')}flex;
  justify-content: ${justifyContent};
  align-items: ${alignItems};
`

const grid = colCount => ({ $start, $end }) => {
  let cols
  if ($start ?? $end)
    cols = ($end ?? GRID_COUNT) - ($start ?? 0)
  else cols = typeof colCount === 'number' ? colCount : GRID_COUNT
  return `
      display: grid;
      grid-template-columns: repeat(${cols}, 1fr);
      column-gap: ${GRID_GAP};
      margin: 0;
    `
}

const visualEssayGrid = ({ $start, $end }) => `
  ${grid(PERFORMING_BODY_GRID_COUNT)({ $start, $end })}
  grid-column-start: span 12;
  column-gap: 0;
`

const _spansCol = colCount => `
  width: ${spanCol(colCount)};
`

const background = ({ $backgroundColor }) => `
  background-color: ${$backgroundColor};
`
const highZIndex = level => `z-index: ${'9'.repeat(level)};`

const underline = () => `
  text-decoration: underline;
  text-decoration-thickness: ${STROKE_WIDTH};
  text-underline-offset: 0.07em;
  text-decoration-skip-ink: none;
`

const border = isBottom => `
  border${validateString(isBottom, '-bottom')}: black solid ${STROKE_WIDTH};
`

const cover = () => `
  height: calc(100vh - ${VERT_GAP});
  align-items: end;
  background-color: ${COLORS.GRAY};
`

const noScrollBar = () => `
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`

const mixins = {
  flex,
  grid,
  visualEssayGrid,
  spansCol: _spansCol,
  background,
  highZIndex,
  underline,
  border,
  cover,
  noScrollBar,
  chain: function () {
    const chainedObject = {}
    let accumulatedReturn = ''
    loopObject(_.omit(mixins, 'chain'), (mixinName, originalMixin) => {
      chainedObject[mixinName] = function (...args) {
        accumulatedReturn += originalMixin(...args)
        const returnFunction = () => accumulatedReturn
        return Object.assign(returnFunction, this)
      }
    })
    return chainedObject
  }
}

export default mixins