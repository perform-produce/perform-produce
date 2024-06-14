import _ from 'lodash'
import { useState } from 'react'
import usePromise from 'react-promise'
import { HashRouter } from 'react-router-dom'
import { createGlobalStyle } from 'styled-components'
import { GlobalContext } from './contexts/context'
import Desktop from './desktop'
import useIsMobile from './hooks/useIsMobile'
import usePreload from './hooks/usePreload'
import Mobile from './mobile'
import apiServices from './services/apiServices'
import mixins from './utils/mixins'

const App = () => {
  const { value } = usePromise(apiServices.data)
  const { results, imageData } = value ?? {}
  const [scrollMeterAltText, setScrollMeterAltText] = useState()
  const [allRendered, setAllRendered] = useState(false)

  usePreload(imageData)

  const handleAppendixScroll = (index, length) => {
    if (index === undefined && length === undefined)
      return setScrollMeterAltText()
    const pad = number => _.padStart(number, 2, '0')
    setScrollMeterAltText(`A–${pad(index + 1)}/${pad(length)}`)
  }


  const Component = useIsMobile() ? Mobile : Desktop

  return (
    <>
      <GlobalStyles />
      <HashRouter>
        <GlobalContext.Provider value={value}>
          <Component
            apiResults={results}
            scrollMeterAltText={scrollMeterAltText}
            allRendered={allRendered}
            handleAllRendered={() => setAllRendered(true)}
            handleAppendixScroll={handleAppendixScroll} />
        </GlobalContext.Provider>
      </HashRouter>
    </>
  )
}

const GlobalStyles = createGlobalStyle`
  u {
    ${mixins.underline}
  }
`

export default App

