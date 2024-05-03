import { useContext, useState } from 'react'
import styled from 'styled-components'
import _ from 'lodash'
import WhiteSpace from './whitespace'
import { getGridData, getGridGapPx } from '../../utils/styleUtils'
import { IMG_POPUP_GRID_SPAN, POP_UP_TIMEOUT, TEXT_POPUP_GRID_SPAN } from '../../constants'
import { closest } from '../../utils/commonUtils'
import Fade from './fade'
import PopUpCitation from './popUpCitation'
import { SectionContext } from '../../contexts/context'

const Citation = ({ number, ...rest }) => {
  const { backgroundColor } = useContext(SectionContext)
  const [citationData, setCitationData] = useState()

  const onEnter = e => {
    const citationRect = e.target.getBoundingClientRect()
    const parentRect = e.target.parentNode.getBoundingClientRect()
    const { left, height } = citationRect
    const { colBounds, colWidth } = getGridData()
    const colCount = rest.src ? IMG_POPUP_GRID_SPAN : TEXT_POPUP_GRID_SPAN

    const unadjustedPopUpLeft = left - (colWidth * colCount + getGridGapPx() * (colCount - 1)) / 2
    const closestBound = closest(colBounds.slice(0, colBounds.length - colCount + 1), unadjustedPopUpLeft)
    setCitationData({
      ...rest,
      number,
      x: closestBound - parentRect.left,
      y: height / 2
    })
  }

  return (
    <>
      <Container>
        <Fade
          display={!!citationData}
          state={citationData}
          timeout={POP_UP_TIMEOUT}
          render={
            (state = {}) => <PopUpCitation
              {...state}
              handleMouseLeave={() => setCitationData()}
              backgroundColor={backgroundColor} />
          } />
      </Container>
      <WhiteSpace> </WhiteSpace>
      <StyledCitation onMouseEnter={onEnter}>
        [{_.padStart(`${number}`, 2, '0')}]
      </StyledCitation >
    </>
  )
}

const Container = styled.span`
  display: block;
  position: absolute;
`
const StyledCitation = styled.span`
  cursor: default;
`

export default Citation