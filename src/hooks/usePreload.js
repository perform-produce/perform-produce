import _ from 'lodash'
import { useEffect } from 'react'
import { onImgLoad } from '../utils/commonUtils'

function preloadImg(sources) {
  const src = sources.shift()
  onImgLoad(src, () => {
    if (sources.length) preloadImg(sources)
    else console.log('All loaded!')
  })
}

const usePreload = imageData =>
  useEffect(() => {
    if (imageData) preloadImg(Object.keys(imageData))
  }, [imageData])

export default usePreload