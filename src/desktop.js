import { Navigate, Route, Routes } from 'react-router-dom'
import styled from 'styled-components'
import About from './components/about'
import Appendix from './components/appendix/appendix'
import Home from './components/home'
import Menu from './components/menu/menu'
import { DESKTOP_LINE_HEIGHT } from './constants/styleConstants'

const Desktop = ({
  apiResults,
  scrollMeterAltText,
  allRendered,
  handleAllRendered,
  handleAppendixScroll
}) => {
  return (
    <>
      <DesktopContainer>
        <Menu
          scrollMeterAltText={scrollMeterAltText}
          loaded={allRendered} />
        <Routes>
          <Route path='/' element={<Home
            contents={apiResults?.contents}
            footer={apiResults?.footer}
            allRendered={allRendered}
            onRendered={handleAllRendered} />} />
          <Route path='/about' element={<About />} />
          <Route path='/appendix' element={<Appendix onScroll={handleAppendixScroll} />} />
          <Route path='*' element={<Navigate to='/' replace />} />
        </Routes>
      </DesktopContainer>
    </>
  )
}


const DesktopContainer = styled.div`
  &, & * {
    line-height: ${DESKTOP_LINE_HEIGHT};
  }
`

export default Desktop