import { useEffect, useLayoutEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components'
import { COLORS } from '../constants/styleConstants'
import mixins from '../utils/mixins'
import { windowScrollTo } from '../utils/reactUtils'
import Grid from './common/grid'
import GridItem from './common/gridItem'
import Footer from './footer'
import Interview from './interview/interview'
import Essay from './section/essay'
import DougScottsRulers from './visualEssays/dougScottsRulers'
import PerformingBody from './visualEssays/performingBody'


const Home = ({ contents, footer, allRendered, onRendered }) => {
  const location = useLocation()
  const [childrenRendered, setChildrenRendered] = useState(new Set())

  useLayoutEffect(() => {
    if (!allRendered) return
    const id = location.hash.replace(/^#/, '')
    const section = document.getElementById(id)
    if (!section) return window.scrollTo({ top: 0 })
    windowScrollTo(section)
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
        <GridItem $end='span 8'>
          <p><i>Perform — Produce</i> defines graphic design as a discipline rooted in work rather than a process that springs forth spontaneously from the creative imagination.</p>
          <p><i>Perform — Produce</i> is driven by strict constraints and machine-like craft, but employs outdated tools and the physical body in processes of making that are stubbornly slow.</p>
          <p><i>Perform — Produce</i> deploys performance as a tactic to expose the otherwise invisible labor of design and its valuation.</p>
          <p><i>Perform — Produce</i> proposes a new organizational model that integrates live happenings, cross-disciplinary dialogue, and self-publishing to consider not just the product of design but also the conditions under which it is produced.</p>
        </GridItem>
      </Cover>
      {
        contents && footer &&
        <>
          {contents?.map((content, i) => {
            const { type } = content
            const Component = componentMap[type]
            return <Component
              key={i}
              content={content}
              onRendered={() => onChildRendered(i)}
              backgroundColor={type === 'Interview' ? interviewColorMap.shift() : undefined} />
          })}
          <Footer content={footer} />
        </>
      }

    </>
  )
}

const Cover = styled(Grid)`
  ${mixins.cover()}
  background-color: ${COLORS.WHITE};
`


export default Home