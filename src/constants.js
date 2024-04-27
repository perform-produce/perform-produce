
// Duplicate - to resolve circular import
const emify = px => `${px / DEFAULT_EM}em`
export const DEFAULT_EM = 30
export const LINE_HEIGHT = 1.2
export const LINE_PADDING = LINE_HEIGHT - 1
export const GAP_PX = 50
export const GAP = emify(GAP_PX)
export const VERT_GAP = emify(50)
export const GRID_GAP_PX = 20
export const GRID_GAP = emify(GRID_GAP_PX)
export const GRID_COUNT = 12
export const IMG_POPUP_GRID_SPAN = 3
export const TEXT_POPUP_GRID_SPAN = 5

export const GLYPH_SPACE = 414 / 1000
export const GLYPH_DESC = 210 / 1000

export const SECTION_PADDING_LINE_HEIGHT = 3
export const MENU_PADDING_TOP = 35
export const MENU_PADDING_BOT = 15

export const COLORS = {
  WHITE: 'white',
  GRAY: '#F2F2F2',
  PINK: '#FFDCCE'
}

export const DRUPAL_ENDPOINT = 'https://rw-sux.iamasq.works'