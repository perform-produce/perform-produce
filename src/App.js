import { HashRouter, Navigate, Route, Routes } from 'react-router-dom'
import Menu from './components/menu.js'
import Home from './components/home.js'
import About from './components/about.js'

const App = () => {
  return (
    <HashRouter>
      <Menu />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
    </HashRouter>
  )
}

export default App
