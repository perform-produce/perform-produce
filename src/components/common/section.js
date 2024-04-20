import styled from 'styled-components'
import GridItem from './gridItem'
import { GAP, IMG_POPUP_GRID_SPAN, SECTION_PADDING_LINE_HEIGHT, TEXT_POPUP_GRID_SPAN } from '../../constants'
import { closest, emify, getGridData, lineHeight } from '../../utils/styleUtils'
import Grid from './grid'
import { PopUpContext } from '../../contexts/context'
import { useRef, useState } from 'react'
import mixins from '../../utils/mixins'
import Fade from './fade'
import PopUp from './popUp'


const Section = ({ children, header, backgroundColor, prefix = '', ...rest }) => {
  const [citationData, setCitationData] = useState()
  const [isQuoteOpened, setIsQuoteOpened] = useState(true)
  const sectionRef = useRef()

  const onCitationHover = ({ target }, data) => {
    const { left, top, height } = target.getBoundingClientRect()
    const sectionRect = sectionRef.current.getBoundingClientRect()
    const { colBounds, colWidth } = getGridData()
    const unadjustedPopUpLeft = left - colWidth * (data.src ? IMG_POPUP_GRID_SPAN : TEXT_POPUP_GRID_SPAN) / 2
    const closestBound = closest(unadjustedPopUpLeft, ...colBounds)
    setCitationData({ ...data, x: closestBound, y: top + height / 2 - sectionRect.top })
  }

  const toggleQuoteState = close => setIsQuoteOpened(close)

  // TODO: font loading for italics delayed which causes a layout shift
  return (
    <PopUpContext.Provider value={{ onCitationHover, prefix, isQuoteOpened, toggleQuoteState }}>
      <SectionContainer ref={sectionRef} as='section' {...rest}>
        <StyledSection $backgroundColor={backgroundColor}>
          <SectionHeader as='h2' $end={'span 2'}>{header}</SectionHeader>
          {children}
        </StyledSection>
        <Fade
          display={!!citationData}
          state={citationData}
          timeout={125}
          render={
            (state = {}) => <PopUp
              {...state}
              handleMouseLeave={() => setCitationData()}
              backgroundColor={backgroundColor} />
          } />
      </SectionContainer>
    </PopUpContext.Provider>
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
    margin-bottom: ${GAP};
  }

  >:last-child {
    margin-bottom: 0;
  }

  padding-top: ${lineHeight(SECTION_PADDING_LINE_HEIGHT)};
  padding-bottom: ${lineHeight(SECTION_PADDING_LINE_HEIGHT)};
`

const SectionHeader = styled(GridItem)`
  position: sticky;
  top: ${emify(140)};
  ${mixins.underline}
`

export default Section
