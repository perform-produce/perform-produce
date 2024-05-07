import { useEffect, useState } from 'react'
import { addEventListener } from '../../utils/reactUtils'
import { delta } from '../../utils/commonUtils'

// Localizing state to avoid updating global
const ScrollMeter = ({ altText }) => {
  const [data, setData] = useState({
    pxScrolled: 0, lastScrollY: 0
  })

  useEffect(() => addEventListener(window, 'scroll', () => {
    setData(({ pxScrolled, lastScrollY }) => {
      const scrolled = delta(window.scrollY, lastScrollY)
      const newPxScrolled = pxScrolled + scrolled

      return {
        lastScrollY: window.scrollY,
        pxScrolled: newPxScrolled
      }

    })
  }), [])


  return (
    <span>{altText ?? `${parseInt(data.pxScrolled).toLocaleString()} px`}</span>
  )
}

export default ScrollMeter