import { useCallback, useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { COLORS, MOBILE_GAP, MOBILE_LINE_HEIGHT, MOBILE_MENU_PADDING, MOBILE_VERT_GAP, STROKE_WIDTH } from '../../../constants/styleConstants'
import { GlobalContext } from '../../../contexts/context'
import mixins from '../../../utils/mixins'
import { remify } from '../../../utils/stylesBase'
import GridItem from '../../common/gridItem'
import ScrollMeter from '../../menu/scrollMeter'


const MobileMenu = ({ scrollMeterAltText, loaded }) => {
  const links = useContext(GlobalContext)?.menuLinks
  const [isOpened, setIsOpened] = useState(false)

  useEffect(() => {
    if (isOpened) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
  }, [isOpened])

  const OneTimeLink = useCallback(props =>
    <Link {...props} onClick={() => setIsOpened(false)} />, [])

  return (
    <MenuOuterContainer>
      <MenuContainer>
        <GridItem $start='span 6'>
          <OneTimeLink to='/'>
            Perform — Produce
          </OneTimeLink>
        </GridItem>
        <GridItem $start={7} $end={11} $alignRight>
          <ScrollMeter
            loaded={loaded}
            altText={scrollMeterAltText} />
        </GridItem>
        <ExpandMenuContainer $end={13}>
          <button onClick={() => setIsOpened(prev => !prev)}>
            {isOpened ? '×' : '+'}
          </button>
        </ExpandMenuContainer>

      </MenuContainer>
      {
        isOpened && links &&
        <ExpandedMenu>
          {
            links.map(({ sectionId, title }) =>
              <OneTimeLink key={sectionId} to={`/#${sectionId}`}>
                {title}
              </OneTimeLink>
            )
          }
          <div>
            <OneTimeLink to='appendix'>Appendix: Production</OneTimeLink>
            <OneTimeLink to='about'>About</OneTimeLink>
          </div>
        </ExpandedMenu>
      }
    </MenuOuterContainer>
  )
}

const MenuOuterContainer = styled.menu`
  ${mixins.highZIndex(5)}
  position: fixed;
  top: 0;
  margin: 0;
  padding: 0;
`

const MenuContainer = styled.div`
  ${mixins.grid}
  padding: ${MOBILE_MENU_PADDING} ${MOBILE_GAP};
  outline: black solid ${STROKE_WIDTH};

  width: calc(100dvw - ${MOBILE_GAP} * 2);

  background-color: ${COLORS.WHITE};
`

const ExpandMenuContainer = styled(GridItem)`
  justify-self: flex-end;
  button {
    ${mixins.flex('center', 'center')}
    width: fit-content;
    color: black;
    height: ${MOBILE_LINE_HEIGHT};
    border: none;
    background: none;
    padding: 0;
  }
`

const paddingTop = remify(16)
const menuLineHeight = remify(28)
const ExpandedMenu = styled.div`
  height: calc(100dvh - (${MOBILE_MENU_PADDING} * 2 + ${MOBILE_LINE_HEIGHT} + ${paddingTop}));
  padding: ${MOBILE_VERT_GAP} ${MOBILE_GAP} 0;

  background-color: ${COLORS.WHITE};

  overflow: scroll;

  a {
    display: block;
    padding-bottom: calc(${menuLineHeight} - ${MOBILE_LINE_HEIGHT});
  }

  div {
    margin-top: ${menuLineHeight};
  }
`

export default MobileMenu