import _ from 'lodash'
import { createContext } from 'react'

export const PopUpContext = createContext({
  onCitationHover: _.noop,
  isQuoteOpened: true,
  toggleQuoteState: _.noop
})

export const GlobalContext = createContext({
  contents: null,
  contentIsLoading: true
})
