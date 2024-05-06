import { Link, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import GridItem from './common/gridItem'
import Grid from './common/grid'
import { conditionalStyle, emify, lineHeight } from '../utils/styleUtils'
import { COLORS, MENU_PADDING_BOT, MENU_PADDING_TOP } from '../constants'
import mixins from '../utils/mixins'
import MenuItem from './common/menuItem'
import { useState } from 'react'
import ScrollMeter from './scrollMeter'

// TODO feed from backend
const sectionLinks = [
  ['the-designer-as-machine', 'The Designer as Machine'],
  ['exchange-bridget-moser', 'Exchange: Bridget Moser'],
  ['the-performing-body', 'The Performing Body'],
  ['exchange-j-dakota-brown', 'Exchange: J. Dakota Brown'],
  ['on-the-value-of-exchange', 'On The Value of Exchange'],
  ['exchange-micah-lexier', 'Exchange: Micah Lexier'],
  ['instruction-doug-scotts-rulers', 'Instruction: Doug Scott’s Rulers'],
  ['readings-and-viewings', 'Readings & Viewings']
]

const Menu = () => {
  const [isExpanded, setIsExpanded] = useState(false)
  const handleFoldMenu = () => setIsExpanded(false)
  const location = useLocation()

  return (
    <MenuContainer
      as='menu'
      $outline={location.pathname.match(/appendix$/) && !isExpanded}>
      <LinkWrapper $end='span 2'>
        <MenuItem
          to='/'
          hoverUnderlineOnly>
          Perform — Produce
        </MenuItem>
      </LinkWrapper>
      <ContentLink $end='span 5' onMouseLeave={handleFoldMenu}>
        <MenuItem
          hoverUnderlineOnly
          forceUnderline={isExpanded}
          onMouseEnter={() => setIsExpanded(true)}>
          Contents
        </MenuItem>
        {
          isExpanded &&
          <div>
            {sectionLinks.map(([hash, title]) =>
              <Link key={hash} to={`/#${hash}`} onClick={handleFoldMenu}>{title}</Link>)}
          </div>
        }
      </ContentLink>
      <LinkWrapper $alignRight $start={9}>
        <MenuItem
          to='appendix'>
          Appendix
        </MenuItem>
      </LinkWrapper>
      <LinkWrapper $alignRight>
        <MenuItem
          to='about'>
          About
        </MenuItem>
      </LinkWrapper>
      <LinkWrapper $start={11} $end={13} $alignRight>
        <ScrollMeter />
      </LinkWrapper>
    </MenuContainer>
  )
}

const MenuContainer = styled(Grid)`
  ${mixins.highZIndex(5)}
  padding-top: ${MENU_PADDING_TOP};
  padding-bottom: ${MENU_PADDING_BOT};
  position: fixed;
  top: 0;
  background-color: ${COLORS.WHITE};
  outline: ${conditionalStyle('$outline', 'black solid 2px')};
`

const LinkWrapper = styled(GridItem)`
  > a, > span, > p {
    width: fit-content;
  }
`

const hoverPadding = '1em'
const ContentLink = styled(LinkWrapper)`
  padding: 0 ${hoverPadding};
  position: relative;
  left: -${hoverPadding};
  width: fit-content;
  div {
    display: block;
    margin: ${lineHeight(1)} 0;

    a {
      display: block;
      width: fit-content;
      cursor: pointer;
      &:hover {
        font-style: italic;
      }
    }
  }
`

export default Menu