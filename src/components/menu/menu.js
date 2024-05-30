import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import { COLORS, MENU_PADDING_BOT, MENU_PADDING_TOP, STROKE_WIDTH } from '../../constants/styleConstants'
import apiServices from '../../services/apiServices'
import mixins from '../../utils/mixins'
import { conditionalStyle, lineHeight } from '../../utils/styleUtils'
import Grid from '../common/grid'
import GridItem from '../common/gridItem'
import MenuItem from './menuItem'
import ScrollMeter from './scrollMeter'

const Menu = ({ contents, scrollMeterAltText, loaded }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const handleFoldMenu = () => setIsExpanded(false)
  const links = contents && apiServices.getMenuLinks(contents)

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
          isExpanded && links &&
          <div>
            {links.map(({ sectionId, title }) =>
              <Link key={sectionId} to={`/#${sectionId}`} onClick={handleFoldMenu}>{title}</Link>)}
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
        <ScrollMeter
          loaded={loaded}
          altText={scrollMeterAltText} />
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
  outline: ${conditionalStyle('$outline', `black solid ${STROKE_WIDTH}`)};
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
    margin-bottom: ${lineHeight(0.5)};

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