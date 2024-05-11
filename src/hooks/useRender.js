import { useEffect } from 'react'

const useRender = (onRendered, loading) => {
  useEffect(() => {
    if (!loading) onRendered()
  }, [loading])
}

export default useRender