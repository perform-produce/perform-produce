import { useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components'
import Grid from './common/grid'
import { COLORS, SECTION_HEADING_TOP, SECTION_PADDING_LINE_HEIGHT } from '../constants/styleConstants'
import { getLineHeight, lineHeight } from '../utils/styleUtils'
import GridItem from './common/gridItem'
import mixins from '../utils/mixins'
import Essay from './section/essay'
import Interview from './interview/interview'
import PerformingBody from './visualEssays/performingBody'
import DougScottsRulers from './visualEssays/dougScottsRulers'
import { getPx } from '../utils/stylesBase'
import Footer from './footer'


const Home = ({ contents, footer }) => {
  const location = useLocation()

  useLayoutEffect(() => {
    const id = location.hash.replace(/^#/, '')
    const section = document.getElementById(id)
    if (!section) return window.scrollTo({ top: 0, behavior: 'smooth' })
    const { top } = section.getBoundingClientRect()
    window.scrollBy({ top: top + SECTION_PADDING_LINE_HEIGHT * getLineHeight() - getPx(SECTION_HEADING_TOP), behavior: 'smooth' })
  }, [location, contents])

  const componentMap = {
    'Essay': Essay,
    'Interview': Interview,
    'Visual Essay: The Performing Body': PerformingBody,
    'Visual Essay: Doug Scott’s Rulers': DougScottsRulers
  }

  const interviewColorMap = [
    COLORS.PINK,
    COLORS.YELLOW
  ]

  return (
    <>
      <Cover>
        <GridItem $end='span 8'>
          <p>Perform — Produce defines graphic design as a discipline rooted in work rather than a process that springs forth spontaneously from the creative imagination.</p>
          <p>Perform — Produce is driven by strict constraints and machine-like craft, but employs outdated tools and the physical body in processes of making that are stubbornly slow.</p>
          <p>Perform — Produce deploys performance as a tactic to expose the otherwise invisible labor of design and its valuation.</p>
          <p>Perform — Produce proposes a new organizational model that integrates live happenings, cross-disciplinary dialogue, and self-publishing to consider not just the product of design but also the conditions under which it is produced.</p>
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