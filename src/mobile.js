import { useEffect, useLayoutEffect } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import About from './components/mobile/about'
import Appendix from './components/mobile/appendix'
import Home from './components/mobile/home'
import MobileMenu from './components/mobile/menu/mobileMenu'
import { MOBILE_LINE_HEIGHT } from './constants/styleConstants'


const Mobile = ({
  apiResults,
  scrollMeterAltText,
  allRendered,
  handleAllRendered,
  handleAppendixScroll
}) => {
  const location = useLocation()
  useEffect(() => {
    window.scrollTo(0, -window.scrollY)
  }, [location.pathname])
  return (
    <MobileContainer>
      <MobileMenu
        scrollMeterAltText={scrollMeterAltText}
        loaded={allRendered} />
      <Routes>
        <Route path='/' element={<Home
          contents={apiResults?.contents}
          allRendered={allRendered}
          onRendered={handleAllRendered} />} />
        <Route path='/about' element={<About />} />
        <Route path='/appendix' element={<Appendix onScroll={handleAppendixScroll} />} />
        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
    </MobileContainer>
  )
}

const MobileContainer = styled.div`
  line-height: ${MOBILE_LINE_HEIGHT};
`

export default Mobile
