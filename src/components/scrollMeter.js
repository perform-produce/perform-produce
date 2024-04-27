import { useEffect, useState } from 'react'
import { addEventListener } from '../utils/reactUtils'


const ScrollMeter = () => {
  const [data, setData] = useState({
    pxScrolled: 0, lastScrollY: 0
  })

  useEffect(() => addEventListener(window, 'scroll', () => {
    setData(({ pxScrolled, lastScrollY }) => {
      const scrolled = Math.abs(window.scrollY - lastScrollY)
      return {
        lastScrollY: window.scrollY,
        pxScrolled: pxScrolled + scrolled
      }
    })

  }), [])

  return (
    <span>{parseInt(data.pxScrolled).toLocaleString()} px</span>
  )
}

export default ScrollMeter