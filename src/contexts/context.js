import _ from 'lodash'
import { createContext } from 'react'

export const PopUpContext = createContext({
  onCitationHover: _.noop,
  prefix: undefined,
  isQuoteOpened: true,
  toggleQuoteState: _.noop
})
