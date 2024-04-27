import { Link } from 'react-router-dom'
import styled from 'styled-components'
import GridItem from './common/gridItem'
import Grid from './common/grid'
import { emify, lineHeight } from '../utils/styleUtils'
import { COLORS, MENU_PADDING_BOT, MENU_PADDING_TOP } from '../constants'
import mixins from '../utils/mixins'
import MenuItem from './common/menuItem'
import { useState } from 'react'
import ScrollMeter from './scrollMeter'


const Menu = () => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [noContentUnderline, setNoContentUnderline] = useState(true)

  const linkHoverHandlers = {
    onMouseEnter: () => setNoContentUnderline(true),
    onMouseLeave: () => setNoContentUnderline(false)
  }

  const handleMouseLeaveMenu = () => setIsExpanded(false)

  return (
    <MenuContainer as='menu' onMouseLeave={handleMouseLeaveMenu}>
      <LinkWrapper $end='span 2'>
        <MenuItem
          to='/'
          hoverUnderlineOnly
          {...linkHoverHandlers}>
          Perform—Produce
        </MenuItem>
      </LinkWrapper>
      <ContentLink $end='span 5'>
        <MenuItem
          hoverUnderlineOnly
          forceUnderline={isExpanded && !noContentUnderline}
          onMouseEnter={() => {
            setIsExpanded(true)
            setNoContentUnderline(false)
          }}>
          Contents
        </MenuItem>
        {
          isExpanded &&
          <div>
            <Link to='/#the-designer-as-machine'>The Designer as Machine</Link>
            <Link to='/#exchange-bridget-moser'>Exchange: Bridget Moser</Link>
            <Link to='/#the-performing-body'>The Performing Body</Link>
            <Link to='/#exchange-j-dakota-brown'>Exchange: J. Dakota Brown</Link>
            <Link to='/#on-the-value-of-exchange'>On The Value of Exchange</Link>
            <Link to='/#exchange-micah-lexier'>Exchange: Micah Lexier</Link>
            <Link to='/#instruction-doug-scotts-rulers'>Instruction: Doug Scott’s Rulers</Link>
            <Link to='/#readings-and-viewings'>Readings & Viewings</Link>
          </div>
        }
      </ContentLink>
      <LinkWrapper $alignRight $start={9}>
        <MenuItem
          to='appendix'
          {...linkHoverHandlers}>
          Appendix
        </MenuItem>
      </LinkWrapper>
      <LinkWrapper $alignRight>
        <MenuItem
          to='about'
          {...linkHoverHandlers}>
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
  padding-top: ${emify(MENU_PADDING_TOP)};
  padding-bottom: ${emify(MENU_PADDING_BOT)};
  position: fixed;
  top: 0;
  background-color: ${COLORS.WHITE};
`

const LinkWrapper = styled(GridItem)`
  > a, > span, > p {
    width: fit-content;
  }
`

const ContentLink = styled(LinkWrapper)`
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