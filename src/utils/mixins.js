import _ from 'lodash'
import { COLORS, GRID_COUNT, GRID_GAP, DESKTOP_MENU_HEIGHT, PERFORMING_BODY_GRID_COUNT, DESKTOP_STROKE_WIDTH, DESKTOP_VERT_GAP, MOBILE_VERT_GAP, MOBILE_MENU_HEIGHT, MOBILE_QUERY, MOBILE_GRID_GAP, MOBILE_GRID_COUNT } from '../constants/styleConstants'
import { loopObject, validateString } from './commonUtils'
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
  const getCols = isMobile => {
    const gridCount = isMobile ? MOBILE_GRID_COUNT : GRID_COUNT
    let cols
    if ($start ?? $end)
      cols = ($end ?? gridCount) - ($start ?? 0)
    else cols = typeof colCount === 'number' ? colCount : gridCount
    return cols
  }

  return `
      display: grid;
      grid-template-columns: repeat(${getCols(false)}, 1fr);
      column-gap: ${GRID_GAP};

      @media (${MOBILE_QUERY}) {
        grid-template-columns: repeat(${getCols(true)}, 1fr);
        column-gap: ${MOBILE_GRID_GAP};
      }
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
  text-decoration-thickness: ${DESKTOP_STROKE_WIDTH};
  text-underline-offset: 0.07em;
  text-decoration-skip-ink: none;

  @media (${MOBILE_QUERY}) {
    text-decoration-thickness: ${DESKTOP_STROKE_WIDTH};
  }
`

const border = isBottom => `
  border${validateString(isBottom, '-bottom')}: black solid ${DESKTOP_STROKE_WIDTH};
`

const cover = isMobile => {
  const vertTopGap = isMobile ? MOBILE_VERT_GAP : DESKTOP_VERT_GAP
  const menuHeight = isMobile ? MOBILE_MENU_HEIGHT : DESKTOP_MENU_HEIGHT
  return `
    height: calc(100svh - ${vertTopGap} * 2 - ${menuHeight});
    min-height: fit-content;
    align-items: end;
    padding-top: calc(${vertTopGap} + ${menuHeight});
    background-color: ${COLORS.GRAY};

    @media (${MOBILE_QUERY}) {
      height: calc(100svh - ${vertTopGap} - ${MOBILE_VERT_GAP} / 2 - ${menuHeight});
      padding-bottom: calc(${MOBILE_VERT_GAP} / 2);
    }

    div {
      margin-top: auto;
    }
  `
}

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