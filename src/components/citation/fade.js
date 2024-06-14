import { forwardRef, useEffect, useState } from 'react'
import styled from 'styled-components'
import _ from 'lodash'
import { extractStyle } from '../../utils/styleUtils'
import usePrevious from '../../hooks/usePrevious'

const Fade = forwardRef(function Fade({
  display,
  state,
  timeout = 100,
  render,
  onEnterStart = _.noop,
  onEnterEnd = _.noop,
  onExitStart = _.noop,
  onExitEnd = _.noop
}, ref) {
  const prevState = usePrevious(state)
  const [isDisplayed, setIsDisplayed] = useState(display)
  const [opacity, setOpacity] = useState(display ? 1 : 0)

  const animationState =
    display ?
      (isDisplayed ? 'entered' : 'entering') :
      (isDisplayed ? 'exiting' : 'exited')
  const prevAnimationState = usePrevious(animationState)

  useEffect(() => {
    setTimeout(() => {
      setOpacity(display ? 1 : 0)
    }, 0)
  }, [display])

  useEffect(() => {
    if (prevAnimationState === 'exited' && animationState === 'entering')
      onEnterStart()
    else if (prevAnimationState === 'entering' && animationState === 'entered')
      onEnterEnd()
    else if (prevAnimationState === 'entered' && animationState === 'exiting')
      onExitStart()
    else if (prevAnimationState === 'exiting' && animationState === 'exited')
      onExitEnd()
  }, [animationState, prevAnimationState, onEnterStart, onEnterEnd, onExitStart, onExitEnd])

  return animationState !== 'exited' &&
    <FadeWrapper
      ref={ref}
      style={{ opacity }}
      onTransitionEnd={() => setIsDisplayed(display)}
      $timeout={timeout}>
      {render(animationState === 'exiting' ? prevState : state)}
    </FadeWrapper>

})

const FadeWrapper = styled.span`
  transition: opacity ${extractStyle('$timeout')}ms ease-in-out;
  display: block;
`


export default Fade