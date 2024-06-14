import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { IMG_POPUP_GRID_SPAN, MOBILE_GAP, MOBILE_LINE_HEIGHT, MOBILE_VERT_GAP, TEXT_INDENT, TEXT_POPUP_GRID_SPAN } from '../../constants/styleConstants'
import { SectionContext } from '../../contexts/context'
import { closest } from '../../utils/commonUtils'
import mixins from '../../utils/mixins'
import { getGridData, getGridGapPx } from '../../utils/styleUtils'


const MobileSection = ({ children, id, header, backgroundColor, getCitationData, ...rest }) => {
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

  const hanldeHeaderClick = () => navigate(`/#${id}`)

  return (
    <SectionContext.Provider value={{
      backgroundColor,
    }}>
      <SectionContainer ref={sectionRef} as='section' id={id} {...rest}>
        <StyledSection $backgroundColor={backgroundColor}>
          {
            header && <SectionHeader onClick={hanldeHeaderClick}>
              {header}
            </SectionHeader>
          }
          {children}
        </StyledSection>
      </SectionContainer>
    </SectionContext.Provider >
  )
}


const SectionContainer = styled.div`
  position: relative;

  &:first-of-type {
    margin-top: calc(${MOBILE_VERT_GAP} / 2);
  }
`

const StyledSection = styled.div`
  ${mixins.background}
  padding: 0 ${MOBILE_GAP};

  ol {
    list-style: none;
    counter-reset: list-counter;
    padding-left: 0;
    margin: 0;
    &:not(:first-child) {
      text-indent: ${TEXT_INDENT};
    }
  }

  ol li {
    counter-increment: list-counter;
  }


  ol li::before {
    content: counter(list-counter) ". ";
  }

  ol + p {
    text-indent: 0 !important;
  }

  >:last-child {
    margin-bottom: 0;
  }

  padding-top: ${MOBILE_VERT_GAP};
  padding-bottom: ${MOBILE_VERT_GAP};
`

const SectionHeader = styled.h2`
  cursor: pointer;
  margin-bottom: ${MOBILE_LINE_HEIGHT};
  &, & span {
    ${mixins.underline}
  }
`

export default MobileSection
