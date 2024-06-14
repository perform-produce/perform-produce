import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { DESKTOP_VERT_GAP, IMG_POPUP_GRID_SPAN, SECTION_HEADING_TOP, SECTION_PADDING_LINE_HEIGHT, TEXT_POPUP_GRID_SPAN } from '../../constants/styleConstants'
import { SectionContext } from '../../contexts/context'
import { closest } from '../../utils/commonUtils'
import mixins from '../../utils/mixins'
import { getGridData, getGridGapPx, lineHeight } from '../../utils/styleUtils'
import Grid from '../common/grid'
import GridItem from '../common/gridItem'


const DesktopSection = ({ children, id, header, backgroundColor, getCitationData, ...rest }) => {
  const [isQuoteOpened, setIsQuoteOpened] = useState(true)
  const sectionRef = useRef()
  const navigate = useNavigate()

  getCitationData ??= (targetRect, sectionRect, data) => {
    const { left, top, height } = targetRect
    const { colBounds, colWidth } = getGridData()
    const colCount = data.src ? IMG_POPUP_GRID_SPAN : TEXT_POPUP_GRID_SPAN
    const unadjustedPopUpLeft = left - (colWidth * colCount + getGridGapPx() * (colCount - 1)) / 2
    const closestBound =
      closest(colBounds.slice(0, colBounds.length - colCount + 1), unadjustedPopUpLeft)
    return { ...data, x: closestBound, y: top + height / 2 - sectionRect.top }
  }

  const toggleQuoteState = close => setIsQuoteOpened(close)
  const hanldeHeaderClick = () => navigate(`/#${id}`)

  return (
    <SectionContext.Provider value={{
      backgroundColor,
      isQuoteOpened,
      toggleQuoteState
    }}>
      <SectionContainer ref={sectionRef} as='section' id={id} {...rest}>
        <StyledSection $backgroundColor={backgroundColor}>
          <SectionHeader
            as='h2'
            onClick={hanldeHeaderClick}
            $end={'span 2'}>
            {header}
          </SectionHeader>
          {children}
        </StyledSection>
      </SectionContainer>
    </SectionContext.Provider>
  )
}


const SectionContainer = styled.div`
  position: relative;

  &:first-of-type {
    margin-top: calc((${lineHeight(3)} - ${DESKTOP_VERT_GAP}) * 2);
  }
`

const StyledSection = styled(Grid)`
  ${mixins.background}

  ol {
    list-style: none;
    counter-reset: list-counter;
    padding-left: 0;
  }

  ol li {
    counter-increment: list-counter;
  }


  ol li::before {
    content: counter(list-counter) ". ";
  }

  >:not(:first-child, hgroup) {
    margin-bottom: ${DESKTOP_VERT_GAP};
  }

  >:last-child {
    margin-bottom: 0;
  }

  padding-top: ${lineHeight(SECTION_PADDING_LINE_HEIGHT)};
  padding-bottom: ${lineHeight(SECTION_PADDING_LINE_HEIGHT)};
`

const SectionHeader = styled(GridItem)`
  ${mixins.highZIndex(3)}
  position: sticky;
  cursor: pointer;
  top: ${SECTION_HEADING_TOP};
  &, & span {
    ${mixins.underline}
  }
`

export default DesktopSection
