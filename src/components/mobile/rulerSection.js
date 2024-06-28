import _ from 'lodash'
import { useState } from 'react'
import styled from 'styled-components'
import { ReactComponent as MarkSvg } from '../../assets/svg/mark.svg'
import { COLORS, MOBILE_GAP, MOBILE_GRID_COUNT, MOBILE_GRID_GAP, MOBILE_LINE_HEIGHT, POP_UP_TIMEOUT, DESKTOP_STROKE_WIDTH, TEXT_INDENT } from '../../constants/styleConstants'
import useClickAway from '../../hooks/useClickAway'
import mixins from '../../utils/mixins'
import { conditionalStyle, getLineHeight, lineHeight } from '../../utils/styleUtils'
import Fade from '../citation/fade'
import PopUpCitation from '../citation/popUpCitation'
import FilteredImg from '../common/filteredImg'
import GridItem from '../common/gridItem'
import IndentText from '../common/indentText'


const RulerSection = ({
  index,
  src,
  alt,
  width,
  height,
  rulerWidth,
  description,
  units,
  purpose,
  children
}) => {
  const [citationData, setCitationData] = useState()

  const number = _.padStart(index + 1, 2, '0')
  const isLast = index === 8

  const handleMouseEnter = () => {
    setCitationData({
      x: 0,
      y: getLineHeight(3, true) - 1
    })
  }

  const handleMouseLeave = () => setCitationData()
  const ref = useClickAway(handleMouseLeave)
  return (
    <>
      <InfoContainer>
        <div>{number}</div>
        <div>
          <Description>
            <p>Description: {description}</p>
            <p>{isLast ? 'Scales' : 'Units of Measurement'}: {units}</p>
            <p>Purpose: {purpose}</p>
          </Description>
          <Details>
            {children}
          </Details>
        </div>
      </InfoContainer>
      <FigureContainer>
        <CitationContainer $start='span 2'
          ref={ref}
          onMouseOver={handleMouseEnter}
          onMouseOut={handleMouseLeave} >
          <GridItem><p>{number}</p></GridItem>
          <SvgContainer>
            <MarkSvg />
          </SvgContainer>
          <Fade
            display={citationData}
            state={citationData}
            timeout={POP_UP_TIMEOUT}
            render={
              (state = {}) => <PopUpCitation
                {...state}
                shouldCenter={false}
                backgroundColor={COLORS.WHITE}>
                While the rulers you see on this page are visually proportional to each other,
                they are not accurate 1:1 representations of their physical counterparts.
              </PopUpCitation>
            } />
        </CitationContainer>
        <ImgContainer
          onClick={() => setCitationData()}
          $start={3}
          $end={13}
          $colSpan={rulerWidth}
          $isLong={false}
          $isLast={isLast}>
          <FilteredImg src={src} alt={alt} width={width} height={height} />
        </ImgContainer>
      </FigureContainer>
    </>
  )
}



const Description = styled.div``
const Details = styled(IndentText)`
  margin: ${MOBILE_LINE_HEIGHT} 0;
`

const InfoContainer = styled.div`
  margin-top: ${lineHeight(4, true)};

  &>:first-child {
    position: absolute;
  }

  ${Description} {
    position: relative;
    left: ${TEXT_INDENT};
    width: calc(100% - ${TEXT_INDENT});
  }
`

const FigureContainer = styled(GridItem)`
  ${mixins.grid}
  position: relative;
`

const CitationContainer = styled(GridItem)`
  ${mixins.grid(2)(1, 2)}

  > span {
    position: absolute;
  }
`

const SvgContainer = styled.div`
  width: fit-content;
  height: fit-content;
  svg {
    height: ${lineHeight(6, true)};
    stroke-width: ${DESKTOP_STROKE_WIDTH};
  }
`

const ImgContainer = styled(GridItem)`
  img {
    width: ${({ $colSpan }) =>
    `calc((100vw - ${MOBILE_GAP} * 2 - ${MOBILE_GRID_GAP} * ${MOBILE_GRID_COUNT - 1}) /
     ${MOBILE_GRID_COUNT} * ${$colSpan} +
     ${Math.max(Math.floor($colSpan), 0)} * ${MOBILE_GRID_GAP})`};
  }

  padding-bottom: ${conditionalStyle('$isLast', lineHeight(8, true))};
`

export default RulerSection