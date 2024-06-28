import { wordSpace } from '../utils/styleUtils'
import { remify, getPx } from '../utils/stylesBase'

export const MOBILE_BP = 992
export const MOBILE_QUERY = `max-width: ${MOBILE_BP}px`
export const DESKTOP_QUERY = `min-width: ${MOBILE_BP + 1}px`

export const DESKTOP_LINE_HEIGHT_PX = 36
export const DESKTOP_LINE_HEIGHT = remify(DESKTOP_LINE_HEIGHT_PX)
export const DESKTOP_HALF_LINE_PADDING = `calc((${remify(DESKTOP_LINE_HEIGHT_PX)} - 1em) / 2)`

export const MOBILE_LINE_HEIGHT_PX = 25
export const MOBILE_LINE_HEIGHT = remify(MOBILE_LINE_HEIGHT_PX)

export const DESKTOP_GAP = remify(50)
export const DESKTOP_VERT_GAP = remify(50)

export const MOBILE_GAP = remify(20)
export const MOBILE_VERT_GAP = remify(MOBILE_LINE_HEIGHT_PX * 1.5)

export const GRID_VW = 2.25
export const GRID_GAP_PX = -10
export const GRID_GAP = `calc(${GRID_VW}vw + ${remify(GRID_GAP_PX)})`

export const GRID_COUNT = 12
export const PERFORMING_BODY_GRID_COUNT = 14
export const IMG_POPUP_GRID_SPAN = 3
export const TEXT_POPUP_GRID_SPAN = 5
export const POP_UP_TIMEOUT = 125
export const POP_UP_TOP_PADDING = remify(22.5)
export const PERFORMING_BODY_GRID_SPAN = 4.5
export const PERFORMING_BODY_FIGMA_COL_WIDTH = 117
export const PERFORMING_BODY_FIGMA_COL_WIDTH_MOBILE = 32
export const RULER_SECTION_MARGIN_TOP = remify(90)

export const EM_PER_UNIT = 1000
export const GLYPH_SPACE = 414 / EM_PER_UNIT
export const GLYPH_DESC = 210 / EM_PER_UNIT
export const GLYPH_CAP_SPACE = 116 / EM_PER_UNIT

export const MOBILE_FIGURE_GAP = MOBILE_LINE_HEIGHT
export const MOBILE_GRID_COUNT = 12
export const MOBILE_GRID_GAP = remify(10)
export const TEXT_INDENT = wordSpace(5)

export const SECTION_PADDING_LINE_HEIGHT = 3

export const DESKTOP_MENU_PADDING_TOP = remify(35)
export const DESKTOP_MENU_PADDING_BOT = remify(15)
const DESKTOP_MENU_HEIGHT_PX =
  getPx(DESKTOP_MENU_PADDING_TOP) +
  getPx(DESKTOP_MENU_PADDING_BOT) +
  DESKTOP_LINE_HEIGHT_PX
export const DESKTOP_MENU_HEIGHT = remify(DESKTOP_MENU_HEIGHT_PX)

export const MOBILE_MENU_PADDING = remify(16)
export const MOBILE_MENU_HEIGHT =
  `calc(${MOBILE_MENU_PADDING} * 2 + ${MOBILE_LINE_HEIGHT})`

export const SECTION_HEADING_PADDING_TOP = remify(35)
export const SECTION_HEADING_TOP =
  remify(DESKTOP_MENU_HEIGHT_PX + getPx(SECTION_HEADING_PADDING_TOP))

export const DESKTOP_STROKE_WIDTH = '2px'
export const MOBILE_STROKE_WIDTH = '1.5px'

export const COLORS = {
  WHITE: 'white',
  GRAY: '#EAEAEA',
  PINK: '#FFE7DA',
  YELLOW: '#FCF7BB',
  BROWN: '#D2AB8E',
  GREEN: '#E1F0E1',
  CYAN: '#B2CFE6',
  LIGTH_GRAY: '#D2D2D2'
}

