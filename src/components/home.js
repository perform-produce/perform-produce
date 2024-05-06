import { useContext, useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components'
import Grid from './common/grid'
import { COLORS, SECTION_HEADING_TOP, SECTION_PADDING_LINE_HEIGHT } from '../constants'
import { getLineHeight, lineHeight } from '../utils/styleUtils'
import GridItem from './common/gridItem'
import mixins from '../utils/mixins'
import Essay from './section/essay'
import Interview from './interview/interview'
import { GlobalContext } from '../contexts/context'
import PerformingBody from './visualEssays/performingBody'
import Rulers from './visualEssays/rulers'
import { getPx } from '../utils/stylesBase'
import Paragraphs from './common/paragraphs'


const Home = () => {
  const location = useLocation()
  const { contentIsLoading } = useContext(GlobalContext)
  useLayoutEffect(() => {
    const id = location.hash.replace(/^#/, '')
    const section = document.getElementById(id) // bad practice shorthands
    if (!section) return window.scrollTo({ top: 0, behavior: 'smooth' })
    const { top } = section.getBoundingClientRect()
    window.scrollBy({ top: top + SECTION_PADDING_LINE_HEIGHT * getLineHeight() - getPx(SECTION_HEADING_TOP), behavior: 'smooth' })
  }, [location, contentIsLoading])

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
      <Essay uuid='dfbd1abd-990c-4d4e-a11f-8ce0214e8856' />
      <Interview uuid='1a69da58-ec1b-4297-8053-e525d05214d6' backgroundColor={COLORS.PINK} />
      <PerformingBody />
      <Essay uuid='33b481a0-7166-41c6-ae88-e6f08cf16062' />
      <Interview uuid='f658fa2e-a44c-49fb-ac7e-be2a4597916d' backgroundColor={COLORS.YELLOW} />
      <Rulers />
      <Footer as='footer'>
        <Paragraphs $start={1} $end={5}>
          <p>© 2024 Rebecca Wilkinson</p>
          <p>Rhode Island School of Design</p>
          <p>Master of Fine Arts, Graphic Design</p>
        </Paragraphs>
        <Paragraphs $start={6} $end={11}>
          <p>All efforts have been made to contact and credit the copyright holders of images used on this website. I apologize for any inadvertent omissions and will amend if informed.</p>
        </Paragraphs>
      </Footer>
    </>
  )
}

const Cover = styled(Grid)`
  ${mixins.cover(lineHeight(3))}
  background-color: ${COLORS.WHITE};
`

const Footer = styled(Grid)`
  ${GridItem} {
    p:last-child {
      margin-top: 0;
    }

    &:last-of-type {
      align-self: flex-end;
    }
  }

  margin: ${lineHeight(5)} 0 ${lineHeight(2)};
`

export default Home