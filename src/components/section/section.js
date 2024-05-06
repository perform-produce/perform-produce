import styled from 'styled-components'
import GridItem from '../common/gridItem'
import { IMG_POPUP_GRID_SPAN, SECTION_HEADING_TOP, SECTION_PADDING_LINE_HEIGHT, TEXT_POPUP_GRID_SPAN, VERT_GAP } from '../../constants'
import { closest, getGridData, getGridGapPx, lineHeight } from '../../utils/styleUtils'
import Grid from '../common/grid'
import { SectionContext } from '../../contexts/context'
import { useRef, useState } from 'react'
import mixins from '../../utils/mixins'


const Section = ({ children, header, backgroundColor, getCitationData, ...rest }) => {
  const [isQuoteOpened, setIsQuoteOpened] = useState(true)
  const sectionRef = useRef()
  getCitationData ??= (targetRect, sectionRect, data) => {
    const { left, top, height } = targetRect
    const { colBounds, colWidth } = getGridData()
    const colCount = data.src ? IMG_POPUP_GRID_SPAN : TEXT_POPUP_GRID_SPAN
    const unadjustedPopUpLeft = left - (colWidth * colCount + getGridGapPx() * (colCount - 1)) / 2
    const closestBound = closest(unadjustedPopUpLeft, ...colBounds.slice(0, colBounds.length - colCount + 1))
    return { ...data, x: closestBound, y: top + height / 2 - sectionRect.top }
  }

  const toggleQuoteState = close => setIsQuoteOpened(close)
  // TODO: font loading for italics delayed which causes a layout shift
  return (
    <SectionContext.Provider value={{
      backgroundColor,
      isQuoteOpened,
      toggleQuoteState
    }}>
      <SectionContainer ref={sectionRef} as='section' {...rest}>
        <StyledSection $backgroundColor={backgroundColor}>
          <SectionHeader as='h2' $end={'span 2'}>{header}</SectionHeader>
          {children}
        </StyledSection>
      </SectionContainer>
    </SectionContext.Provider>
  )
}


const SectionContainer = styled.div`
  position: relative;
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
    content: counter(list-counter) ") ";
  }

  >:not(:first-child, hgroup) {
    margin-bottom: ${VERT_GAP};
  }

  >:last-child {
    margin-bottom: 0;
  }

  padding-top: ${lineHeight(SECTION_PADDING_LINE_HEIGHT)};
  padding-bottom: ${lineHeight(SECTION_PADDING_LINE_HEIGHT)};
`

const SectionHeader = styled(GridItem)`
  position: sticky;
  top: ${SECTION_HEADING_TOP};
  ${mixins.underline}
`

export default Section
