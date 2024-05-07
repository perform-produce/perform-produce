import { useEffect } from 'react'
import apiServices from '../services/apiServices'
import _ from 'lodash'


const usePreload = isLoading => {
  useEffect(() => {
    if (isLoading) {
      const { images } = apiServices
      const sources = _.uniq(images)

      function preloadImg() {
        const src = sources.shift()
        new Promise(res => {
          const img = document.createElement('img')
          img.onload = () => res(src)
          img.src = src
        }).then(() => {
          if (sources.length) preloadImg()
        })
      }

      preloadImg()
    }
  }, [isLoading])
}

export default usePreload