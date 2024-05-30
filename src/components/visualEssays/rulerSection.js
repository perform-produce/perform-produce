import { useState } from 'react'
import styled from 'styled-components'
import _ from 'lodash'
import GridItem from '../common/gridItem'
import { conditionalStyle, getGridData, getLineHeight, lineHeight, spanCol, toggleStyle } from '../../utils/styleUtils'
import IndentText from '../common/indentText'
import { COLORS, GLYPH_CAP_SPACE, GLYPH_DESC, LINE_PADDING_HALF, POP_UP_TIMEOUT, POP_UP_TOP_PADDING, RULER_SECTION_MARGIN_TOP, STROKE_WIDTH } from '../../constants/styleConstants'
import FilteredImg from '../common/filteredImg'
import { ReactComponent as MarkSvg } from '../../assets/svg/mark.svg'
import mixins from '../../utils/mixins'
import Fade from '../citation/fade'
import PopUpCitation from '../citation/popUpCitation'
import { emify, getPx } from '../../utils/stylesBase'


const RulerSection = ({ index, src, alt, width, description, units, purpose, children }) => {
  const [citationData, setCitationData] = useState()

  const number = _.padStart(index + 1, 2, '0')
  const isLong = !index
  const isLast = index === 8
  const left = index === 7 ? -0.5 : 0

  const handleMouseEnter = () => {
    const { colWidth, gridGap } = getGridData()
    setCitationData({
      x: isLong ? (colWidth + gridGap) * -2 : 0,
      y: -getPx(POP_UP_TOP_PADDING) - 1 + getLineHeight(3)
    })
  }

  return (
    <>
      <NumberContainer $end={2}>{number}</NumberContainer>
      <Container $start={2} $end={8}>
        <Description>
          <p>Description: {description}</p>
          <p>{isLast ? 'Scales' : 'Units of Measurement'}: {units}</p>
          <p>Purpose: {purpose}</p>
        </Description>
        <Details>
          {children}
        </Details>
      </Container>
      <MarkContainer
        $start={isLong ? 11 : 8}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={() => setCitationData()}>
        <SvgContainer>
          <MarkSvg />
        </SvgContainer>
        <p>{number}</p>
        <Fade
          display={citationData}
          state={citationData}
          timeout={POP_UP_TIMEOUT}
          render={
            (state = {}) => <PopUpCitation
              {...state}
              width={spanCol(3.5)}
              shouldCenter={false}
              backgroundColor={COLORS.WHITE}>
              While the rulers you see on this page are visually proportional to each other,
              they are not accurate 1:1 representations of their physical counterparts.
            </PopUpCitation>
          } />
      </MarkContainer>
      <ImgContainer
        $start={isLong ? 12 : 9}
        $end={13}
        $colSpan={width}
        $left={left}
        $isLong={isLong}
        $isLast={isLast}>
        <FilteredImg src={src} alt={alt} />
      </ImgContainer>
    </>
  )
}


const Description = styled.div``
const Details = styled(IndentText)`
  margin-top: ${lineHeight(1)};
`

const Container = styled(GridItem)`
  margin-top: ${RULER_SECTION_MARGIN_TOP};
  > ${Description} > p {
    margin: 0;
  }
`

const NumberContainer = styled(Container)`
  position: relative;
  left: ${spanCol(0.5)};
`

const MYSTERY_FIX_VALUE = 3
const nonTypeMarginTop = `calc(${LINE_PADDING_HALF + GLYPH_CAP_SPACE}em + ${MYSTERY_FIX_VALUE}px)`
const MarkContainer = styled(Container)`
  ${mixins.flex('initial', 'center')}
  position: relative;

  p {
    position: absolute;
    left: calc(${spanCol(0.5)} + ${emify(25)});
  }
`

const vertPadding = '0.25em'
const SvgContainer = styled.div`
  width: fit-content;
  padding: ${vertPadding} 0.5em;
  position: relative;
  top: -${vertPadding};

  svg {
    height: calc(${lineHeight(6)} - ${nonTypeMarginTop} - ${GLYPH_DESC}em);
    margin-top: ${nonTypeMarginTop};
    stroke-width: ${STROKE_WIDTH};
  }
`

const ImgContainer = styled(Container)`
  img {
    width: ${({ $colSpan }) => spanCol($colSpan)};
    position: ${toggleStyle('$isLong', 'absolute', 'relative')};
    left: ${({ $left }) => $left ? spanCol($left) : ''};
    margin-top: ${nonTypeMarginTop};
  }

  padding-bottom: ${conditionalStyle('$isLast', lineHeight(10))};
`

export default RulerSection