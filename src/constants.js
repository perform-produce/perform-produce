
// Duplicate - to resolve circular import
const emify = px => `${px / DEFAULT_EM}em`
export const DEFAULT_EM = 30
export const LINE_HEIGHT = 1.2
export const LINE_PADDING = LINE_HEIGHT - 1
export const GAP_PX = 50
export const GAP = emify(GAP_PX)
export const VERT_GAP = emify(50)

export const GRID_VW = 2
export const GRID_GAP_PX = -15
export const GRID_GAP = `calc(${GRID_VW}vw + ${emify(GRID_GAP_PX)})`

export const GRID_COUNT = 12
export const PERFORMING_BODY_GRID_COUNT = 14
export const IMG_POPUP_GRID_SPAN = 3
export const TEXT_POPUP_GRID_SPAN = 5
export const POP_UP_TIMEOUT = 125
export const PERFORMING_BODY_GRID_SPAN = 4.5
export const PERFORMING_BODY_FIGMA_COL_WIDTH = 117

export const EM_PER_UNIT = 1000
export const GLYPH_SPACE = 414 / EM_PER_UNIT
export const GLYPH_DESC = 210 / EM_PER_UNIT

export const SECTION_PADDING_LINE_HEIGHT = 3

export const MENU_PADDING_TOP_PX = 35
export const MENU_PADDING_BOT_PX = 15
export const MENU_PADDING_TOP = emify(MENU_PADDING_TOP_PX)
export const MENU_PADDING_BOT = emify(MENU_PADDING_BOT_PX)
export const MENU_HEIGHT_PX = MENU_PADDING_TOP_PX + MENU_PADDING_BOT_PX + LINE_HEIGHT * DEFAULT_EM
export const MENU_HEIGHT = emify(MENU_HEIGHT_PX)

export const SECTION_HEADING_PADDING_TOP_PX = 35
export const SECTION_HEADING_PADDING_TOP = emify(35)
export const SECTION_HEADING_TOP_PX = MENU_HEIGHT_PX + SECTION_HEADING_PADDING_TOP_PX
export const SECTION_HEADING_TOP = emify(SECTION_HEADING_TOP_PX)

export const COLORS = {
  WHITE: 'white',
  GRAY: '#EAEAEA',
  PINK: '#FFE7DA',
  YELLOW: '#FCF7BB',
  BROWN: '#D2AB8E'
}

export const DRUPAL_ENDPOINT = 'https://rw-sux.iamasq.works'