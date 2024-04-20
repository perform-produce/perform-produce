import { HashRouter, Navigate, Route, Routes } from 'react-router-dom'
import Menu from './components/menu.js'
import Home from './components/home.js'

const App = () => {
  return (
    <HashRouter>
      <Menu />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
    </HashRouter>
  )
}

export default App
