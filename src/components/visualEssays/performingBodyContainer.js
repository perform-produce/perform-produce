import { useWindowSize } from '@uidotdev/usehooks'
import { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { COLORS, DESKTOP_GAP, PERFORMING_BODY_FIGMA_COL_WIDTH, PERFORMING_BODY_GRID_COUNT, PERFORMING_BODY_GRID_SPAN, POP_UP_TIMEOUT } from '../../constants/styleConstants'
import parserServices from '../../services/parserServices'
import { quickArray } from '../../utils/commonUtils'
import mixins from '../../utils/mixins'
import { addEventListener } from '../../utils/reactUtils'
import { extractStyle, vh, vw } from '../../utils/styleUtils'
import { getPx } from '../../utils/stylesBase'
import Fade from '../citation/fade'
import PopUpCitation from '../citation/popUpCitation'
import FilteredImg from '../common/filteredImg'
import GridItem from '../common/gridItem'


const PerformingBodyContainer = ({
  data,
  margin,
  startIndex,
  alignEnd,
  onEnter,
  onExit
}) => {
  const containerRef = useRef()
  const [citationData, setCitationData] = useState()
  const [isIntersecting, setIsIntersecting] = useState(false)
  const { width, height } = useWindowSize()

  const checkIsIntersecting = () => {
    const { top } = containerRef.current.getBoundingClientRect()
    setIsIntersecting(top < vh(60))
  }

  useEffect(() => {
    checkIsIntersecting()
    return addEventListener(window, 'scroll', checkIsIntersecting)
  }, [width, height])

  useEffect(() => {
    const indices = quickArray(data.length, i => startIndex + i)
    if (isIntersecting) onEnter(indices)
    else onExit(indices)
  }, [isIntersecting])

  const getColWidth = () => (vw() - getPx(DESKTOP_GAP) * 2) / PERFORMING_BODY_GRID_COUNT
  const handleMouseEnter = (e, i) => {
    const citationRect = e.target.getBoundingClientRect()
    const colWidth = getColWidth()
    const { width, height } = citationRect
    const { citation } = data[i]
    const { header, subheader, toRight } = citation

    setCitationData({
      header: parserServices.stripParagraph(header),
      subheader: parserServices.stripParagraph(subheader),
      number: startIndex + i,
      x: toRight ? width - colWidth : -colWidth * (PERFORMING_BODY_GRID_SPAN - 1),
      y: height / 2
    })
  }

  const renderImg = ({ src, alt, width, height, start, end }, i = 0) =>
    <GridItem
      key={i}
      $start={start}
      $end={end}
      onMouseLeave={() => setCitationData()}>
      <Container>
        <Fade
          display={citationData?.number === startIndex + i}
          state={citationData}
          timeout={POP_UP_TIMEOUT}
          render={
            (state = {}) => <PopUpCitation
              {...state}
              number={state.number + 1}
              width={`calc((100vw - ${DESKTOP_GAP} * 2) / ${PERFORMING_BODY_GRID_COUNT} * ${PERFORMING_BODY_GRID_SPAN})`}
              backgroundColor={COLORS.BROWN} />
          } />
      </Container>
      <FilteredImg
        src={src}
        alt={alt}
        width={width}
        height={height}
        onMouseEnter={e => handleMouseEnter(e, i)} />
    </GridItem>


  return (
    <ImgContainer
      ref={containerRef}
      $margin={margin / PERFORMING_BODY_FIGMA_COL_WIDTH * getColWidth()}
      $alignEnd={alignEnd}>
      {data.map((entryData, i) => renderImg(entryData.image, i))}
    </ImgContainer>
  )
}

const Container = styled.div`
  position: absolute;
  display: flex;
`

const ImgContainer = styled(GridItem)`
  ${mixins.visualEssayGrid}
  margin-top: ${extractStyle('$margin', 0)}px;
  align-items: ${({ $alignEnd }) => $alignEnd ? 'end' : ''};
`

export default PerformingBodyContainer