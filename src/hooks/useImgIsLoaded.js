import { useEffect, useState } from 'react'
import { onImgLoad } from '../utils/commonUtils'

const useImgIsLoaded = src => {
  const [isLoaded, setIsLoaded] = useState()
  useEffect(() => {
    onImgLoad(src, () => setIsLoaded(true))
  }, [])
  return isLoaded
}

export default useImgIsLoaded