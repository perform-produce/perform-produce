import _ from 'lodash'
import { createContext } from 'react'

export const SectionContext = createContext({
  isQuoteOpened: true,
  toggleQuoteState: _.noop,
  backgroundColor: ''
})