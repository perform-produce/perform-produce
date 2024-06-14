import _ from 'lodash'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components'
import { COLORS, MOBILE_LINE_HEIGHT } from '../../constants/styleConstants'
import { isFirefox } from '../../utils/commonUtils'
import mixins from '../../utils/mixins'
import { addEventListener, windowScrollTo } from '../../utils/reactUtils'
import Footer from '../footer'
import Interview from '../interview/interview'
import Essay from '../section/essay'
import DougScottsRulers from './dougScottsRulers'
import MobileContainer from './mobileContainer'
import PerformingBody from './performingBody'


const Home = ({ contents, allRendered, onRendered }) => {
  const location = useLocation()
  const [childrenRendered, setChildrenRendered] = useState(new Set())
  const browserIsFirefox = isFirefox()

  const scroll = () => {
    const id = location.hash.replace(/^#/, '')
    const section = document.getElementById(id)
    if (!section || !id) return window.scrollTo(0, -window.scrollY)
    windowScrollTo(section, true)
  }

  const firefoxListenerRemovers = [
    useRef(_.noop),
    useRef(_.noop),
    useRef(_.noop),
    useRef(_.noop),
  ]

  const removeListeners = () => firefoxListenerRemovers.forEach(removerRef => {
    removerRef.current()
    removerRef.current = _.noop
  })

  useLayoutEffect(() => {
    if (!allRendered) return
    scroll()

    if (!browserIsFirefox) return

    firefoxListenerRemovers[0].current =
      addEventListener(window, 'resize', () => {
        scroll()
        removeListeners()
      });
    ['mousedown', 'touchstart', 'touchmove']
      .forEach((eventName, i) => firefoxListenerRemovers[i + 1].current =
        addEventListener(document, eventName, removeListeners))

    setTimeout(() => removeListeners(), 500)
  }, [location, contents, allRendered])

  useEffect(() => {
    if (childrenRendered.size === contents?.length)
      onRendered()
  }, [childrenRendered])

  const componentMap = {
    'Essay': Essay,
    'Interview': Interview,
    'Visual Essay: The Performing Body': PerformingBody,
    'Visual Essay: Doug Scott’s Rulers': DougScottsRulers
  }

  const interviewColorMap = [
    COLORS.PINK,
    COLORS.CYAN,
    COLORS.YELLOW
  ]

  const onChildRendered = i =>
    setChildrenRendered(prev => (new Set(prev)).add(i))

  return (
    <>
      <Cover>
        <div>
          <p>
            <i>Perform — Produce</i> defines graphic design as a discipline
            rooted in work rather than a process that springs forth spontaneously
            from the creative imagination.
          </p>
          <p>
            <i>Perform — Produce</i> is driven by strict constraints and
            machine-like craft, but employs outdated tools and the physical
            body in processes of making that are stubbornly slow.
          </p>
          <p>
            <i>Perform — Produce</i> deploys performance as a tactic to expose
            the otherwise invisible labor of design and its valuation.
          </p>
          <p>
            <i>Perform — Produce</i> proposes a new organizational model that
            integrates live happenings, cross-disciplinary dialogue, and self-publishing
            to consider not just the product of design but also the conditions under which
            it is produced.
          </p>
        </div>
      </Cover>
      {
        contents &&
        <>
          {contents
            .map((content, i) => {
              const { type } = content
              const Component = componentMap[type]
              return <Component
                key={i}
                content={content}
                uuid={content.uuid}
                onRendered={() => onChildRendered(i)}
                backgroundColor={type === 'Interview' ? interviewColorMap.shift() : undefined} />
            })}
          <Footer />
        </>
      }
    </>
  )
}

const Cover = styled(MobileContainer)`
  ${mixins.cover(true)}
  background-color: ${COLORS.WHITE};
  display: flex;
  p:not(:first-of-type) {
    margin-top: ${MOBILE_LINE_HEIGHT};
  }
`


export default Home