import { useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components'
import Grid from './common/grid'
import { MENU_PADDING_BOT, MENU_PADDING_TOP } from '../constants'
import { getLineHeight, getPx, lineHeight } from '../utils/styleUtils'
import GridItem from './common/gridItem'
import mixins from '../utils/mixins'
import Essay from './common/essay'
import Interview from './common/interview'


const Home = () => {
  const location = useLocation()

  useLayoutEffect(() => {
    const id = location.hash.replace(/^#/, '')
    const section = document.getElementById(id) // bad practice shorthands
    if (!section) return window.scrollTo({ top: 0, behavior: 'smooth' })

    const { top } = section.getBoundingClientRect()
    window.scrollBy({
      top: top - (getPx(MENU_PADDING_TOP) + getPx(MENU_PADDING_BOT) + getLineHeight()),
      behavior: 'smooth'
    })
  }, [location])

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
      <Interview uuid='1a69da58-ec1b-4297-8053-e525d05214d6' />
    </>
  )
}

const Cover = styled(Grid)`
  ${mixins.cover(lineHeight(3))}
`


export default Home