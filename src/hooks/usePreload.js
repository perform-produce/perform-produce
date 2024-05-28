import _ from 'lodash'
import { useEffect } from 'react'
import apiServices from '../services/apiServices'

function preloadImg(sources) {
  const src = sources.shift()
  new Promise(res => {
    const img = document.createElement('img')
    img.onload = () => res(src)
    img.src = src
  }).then(() => {
    if (sources.length) preloadImg(sources)
  })
}

const usePreload = isLoading => {
  useEffect(() => {
    if (isLoading) {
      const { images } = apiServices
      const sources = _.uniq(images)

      preloadImg(sources)
    }
  }, [isLoading])
}

export default usePreload