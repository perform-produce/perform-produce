import { useState } from 'react'
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom'
import styled from 'styled-components'
import _ from 'lodash'
import usePromise from 'react-promise'
import Menu from './components/menu/menu.js'
import Home from './components/home.js'
import About from './components/about.js'
import Appendix from './components/appendix/appendix.js'
import apiServices from './services/apiServices.js'
import mixins from './utils/mixins.js'
import usePreload from './hooks/usePreload.js'

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

  return (
    <HashRouter>
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
    </HashRouter>
  )
}

const StyledGlobal = styled.div`
  u {
    ${mixins.underline}
  }
`

export default App