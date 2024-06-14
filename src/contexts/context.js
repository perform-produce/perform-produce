import _ from 'lodash'
import { createContext } from 'react'

export const GlobalContext = createContext({
  menuLinks: [],
  essays: [],
  interviews: [],
  dougScottsRulers: undefined,
  performingBody: undefined,
  footer: undefined,
  appendices: undefined,
  about: undefined,
})

export const SectionContext = createContext({
  isQuoteOpened: true,
  toggleQuoteState: _.noop,
  backgroundColor: ''
})