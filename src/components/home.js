import { useContext, useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components'
import Grid from './common/grid'
import { COLORS, MENU_PADDING_BOT, MENU_PADDING_TOP } from '../constants'
import { getLineHeight, getPx, lineHeight } from '../utils/styleUtils'
import GridItem from './common/gridItem'
import mixins from '../utils/mixins'
import Essay from './common/essay'
import Interview from './common/interview'
import { GlobalContext } from '../contexts/context'


const Home = () => {
  const location = useLocation()
  const { contentIsLoading } = useContext(GlobalContext)
  useLayoutEffect(() => {
    const id = location.hash.replace(/^#/, '')
    const section = document.getElementById(id) // bad practice shorthands
    if (!section) return window.scrollTo({ top: 0, behavior: 'smooth' })

    const { top } = section.getBoundingClientRect()
    window.scrollBy({
      top: top - (getPx(MENU_PADDING_TOP) + getPx(MENU_PADDING_BOT) + getLineHeight()),
      behavior: 'smooth'
    })
  }, [location, contentIsLoading])

  return (
    <>
      <Cover>
        <GridItem $end='span 8'>
          <p>Perform—Produce defines graphic design as a discipline rooted in work rather than a process that springs forth spontaneously from the creative imagination.</p>
          <p>Perform—Produce is driven by strict constraints and machine-like craft, but employs outdated tools and the physical body in processes of making that are stubbornly slow.</p>
          <p>Perform—Produce deploys performance as a tactic to expose the otherwise invisible labor of design and its valuation.</p>
          <p>Perform—Produce proposes a new organizational model that integrates live happenings, cross-disciplinary dialogue, and self-publishing to consider not just the product of design but also the conditions under which it is produced.</p>
        </GridItem>
      </Cover>
      <Essay uuid='dfbd1abd-990c-4d4e-a11f-8ce0214e8856' />
      <Interview uuid='1a69da58-ec1b-4297-8053-e525d05214d6' backgroundColor={COLORS.PINK} />
      <Essay uuid='33b481a0-7166-41c6-ae88-e6f08cf16062' />
      <Interview uuid='f658fa2e-a44c-49fb-ac7e-be2a4597916d' backgroundColor={COLORS.YELLOW} />
    </>
  )
}

const Cover = styled(Grid)`
  ${mixins.cover(lineHeight(3))}
`


export default Home