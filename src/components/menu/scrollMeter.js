import { useEffect, useState } from 'react'
import { addEventListener } from '../../utils/reactUtils'
import { delta } from '../../utils/commonUtils'

// Localizing state to avoid updating global
const ScrollMeter = ({ altText, loaded }) => {
  const [data, setData] = useState({
    pxScrolled: 0, lastScrollY: undefined
  })

  useEffect(() => addEventListener(window, 'scroll', () => {
    if (!loaded) return
    setData(({ pxScrolled, lastScrollY }) => {
      const scrolled = lastScrollY ? delta(window.scrollY, lastScrollY) : 0
      const newPxScrolled = pxScrolled + scrolled

      return {
        lastScrollY: window.scrollY,
        pxScrolled: newPxScrolled
      }

    })
  }), [loaded])


  return (
    <span>{altText ?? `${parseInt(data.pxScrolled).toLocaleString()} px`}</span>
  )
}

export default ScrollMeter