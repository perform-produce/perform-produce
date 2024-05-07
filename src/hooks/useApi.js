import { useMemo } from 'react'


const useApi = (content, getContents) =>
  useMemo(() => {
    const data = content && getContents(content)
    return {
      ...(data || {}),
      loading: !data
    }
  }, [content])


export default useApi