import { useEffect, useLayoutEffect, useRef } from 'react'
import { addEventListener } from '../utils/reactUtils'

const useClickAway = (onClickAway) => {
  const ref = useRef(null)
  const handlerRef = useRef(onClickAway)

  useLayoutEffect(() => {
    handlerRef.current = onClickAway
  })

  useEffect(() => {
    const handler = (e) => {
      const element = ref.current
      if (
        element &&
        !element.contains(e.target) &&
        typeof handlerRef.current === 'function'
      )
        handlerRef.current(e)
    }

    const removeHandlers = ['mousedown', 'touchstart', 'touchmove'].map(
      eventName => addEventListener(document, eventName, handler)
    )

    return () => removeHandlers.forEach(remover => remover())
  }, [])

  return ref
}

export default useClickAway