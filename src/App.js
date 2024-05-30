import { useMediaQuery } from '@uidotdev/usehooks'
import _ from 'lodash'
import { useState } from 'react'
import usePromise from 'react-promise'
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom'
import styled from 'styled-components'
import About from './components/about'
import Appendix from './components/appendix/appendix'
import Home from './components/home'
import Menu from './components/menu/menu'
import MobileBlocker from './components/mobileBlocker'
import usePreload from './hooks/usePreload'
import apiServices from './services/apiServices'
import mixins from './utils/mixins'

const App = () => {
  const { value } = usePromise(apiServices.data)
  const { contents, footer, appendix, about } = value ?? {}
  const [scrollMeterAltText, setScrollMeterAltText] = useState()
  const [allRendered, setAllRendered] = useState(false)

  usePreload(!!value)

  const handleAppendixScroll = (index, length) => {
    if (index === undefined && length === undefined)
      return setScrollMeterAltText()
    const pad = number => _.padStart(number, 2, '0')
    setScrollMeterAltText(`A–${pad(index + 1)}/${pad(length)}`)
  }

  const isMobile = useMediaQuery('only screen and (max-width : 992px)')

  return (
    <HashRouter>
      {isMobile ?
        <MobileBlocker /> :
        <StyledGlobal>
          <Menu
            contents={contents}
            scrollMeterAltText={scrollMeterAltText}
            loaded={allRendered} />
          <Routes>
            <Route path='/' element={<Home
              contents={contents}
              footer={footer}
              allRendered={allRendered}
              onRendered={() => setAllRendered(true)} />} />
            <Route path='/about' element={<About data={about} />} />
            <Route path='/appendix' element={<Appendix data={appendix} onScroll={handleAppendixScroll} />} />
            <Route path='*' element={<Navigate to='/' replace />} />
          </Routes>
        </StyledGlobal>
      }
    </HashRouter>
  )
}

const StyledGlobal = styled.div`
  u {
    ${mixins.underline}
  }
`

export default App

