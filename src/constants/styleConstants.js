import { DEFAULT_EM, emify, getPx } from '../utils/stylesBase'

export const LINE_HEIGHT = 1.2
export const LINE_PADDING_HALF = (LINE_HEIGHT - 1) / 2
export const GAP = emify(50)
export const VERT_GAP = emify(50)

export const GRID_VW = 2.25
export const GRID_GAP_PX = -10
export const GRID_GAP = `calc(${GRID_VW}vw + ${emify(GRID_GAP_PX)})`

export const GRID_COUNT = 12
export const PERFORMING_BODY_GRID_COUNT = 14
export const IMG_POPUP_GRID_SPAN = 3
export const TEXT_POPUP_GRID_SPAN = 5
export const POP_UP_TIMEOUT = 125
export const POP_UP_TOP_PADDING = emify(22.5)
export const PERFORMING_BODY_GRID_SPAN = 4.5
export const PERFORMING_BODY_FIGMA_COL_WIDTH = 117
export const RULER_SECTION_MARGIN_TOP = emify(90)

export const EM_PER_UNIT = 1000
export const GLYPH_SPACE = 414 / EM_PER_UNIT
export const GLYPH_DESC = 210 / EM_PER_UNIT
export const GLYPH_CAP_SPACE = 116 / EM_PER_UNIT

export const SECTION_PADDING_LINE_HEIGHT = 3

export const MENU_PADDING_TOP = emify(35)
export const MENU_PADDING_BOT = emify(15)
const MENU_HEIGHT_PX = getPx(MENU_PADDING_TOP) + getPx(MENU_PADDING_BOT) + LINE_HEIGHT * DEFAULT_EM
export const MENU_HEIGHT = emify(MENU_HEIGHT_PX)

export const SECTION_HEADING_PADDING_TOP = emify(35)
export const SECTION_HEADING_TOP = emify(MENU_HEIGHT_PX + getPx(SECTION_HEADING_PADDING_TOP))

export const STROKE_WIDTH = '3px'

export const COLORS = {
  WHITE: 'white',
  GRAY: '#EAEAEA',
  PINK: '#FFE7DA',
  YELLOW: '#FCF7BB',
  BROWN: '#D2AB8E',
  GREEN: '#E1F0E1',
  LIGTH_GRAY: '#D2D2D2'
}

