import { Link } from 'react-router-dom'
import styled from 'styled-components'
import GridItem from './common/gridItem'
import Grid from './common/grid'
import { emify, lineHeight } from '../utils/styleUtils'
import { COLORS, MENU_PADDING_BOT, MENU_PADDING_TOP } from '../constants'
import mixins from '../utils/mixins'
import MenuLink from './common/MenuLink'
import { useState } from 'react'
import ScrollMeter from './scrollMeter'


const Menu = () => {
  const [isExpanded, setIsExpanded] = useState(false)
  const handleMouseEnter = () => setIsExpanded(true)
  const handleMouseLeave = () => setIsExpanded(false)

  return (
    <MenuContainer as='menu' onMouseLeave={handleMouseLeave}>
      <LinkWrapper $end='span 2'>
        <MenuLink noUnderline to='/'>Perform Produce</MenuLink>
      </LinkWrapper>
      <ContentLink $end='span 5'>
        <MenuLink to='/' onMouseEnter={handleMouseEnter}>Contents</MenuLink>
        {isExpanded &&
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
      <LinkWrapper $alignRight $start={10}>
        <MenuLink to='appendix'>Appendix</MenuLink>
      </LinkWrapper>
      <LinkWrapper $alignRight>
        <MenuLink to='about'>About</MenuLink>
      </LinkWrapper>
      <LinkWrapper $alignRight>
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
  > a, > span {
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