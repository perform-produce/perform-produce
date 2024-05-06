import { HashRouter, Navigate, Route, Routes } from 'react-router-dom'
import Menu from './components/menu/menu.js'
import Home from './components/home.js'
import About from './components/about.js'
import Appendix from './components/appendix/appendix.js'
import drupalServices from './services/drupalServices.js'
import styled from 'styled-components'
import mixins from './utils/mixins.js'
import usePromise from 'react-promise'
import { GlobalContext } from './contexts/context.js'
import { useEffect } from 'react'


const contents = drupalServices.getContents()
const App = () => {
  const { value, loading } = usePromise(contents)
  // useEffect(() => {
  //   if (value)
  //     console.log(drupalServices.getPerformingBody(value))
  // }, [value])
  return (
    <HashRouter>
      <StyledGlobal>
        <Menu />
        <GlobalContext.Provider value={{ contents: value, contentIsLoading: loading }} >
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='/appendix' element={<Appendix />} />
            <Route path='*' element={<Navigate to='/' replace />} />
          </Routes>
        </GlobalContext.Provider>
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
