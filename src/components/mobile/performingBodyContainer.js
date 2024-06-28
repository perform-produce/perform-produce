import { useWindowSize } from '@uidotdev/usehooks'
import { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { COLORS, MOBILE_GAP, MOBILE_GRID_COUNT, PERFORMING_BODY_FIGMA_COL_WIDTH_MOBILE, POP_UP_TIMEOUT } from '../../constants/styleConstants'
import parserServices from '../../services/parserServices'
import { quickArray } from '../../utils/commonUtils'
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
  onEnter,
  onExit
}) => {
  const containerRef = useRef()
  const [citationData, setCitationData] = useState()
  const [isIntersecting, setIsIntersecting] = useState(false)
  const { width, height } = useWindowSize()

  const checkIsIntersecting = () => {
    const { top } = containerRef.current.getBoundingClientRect()
    setIsIntersecting(top < vh(75))
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

  const getColWidth = () => (vw() - getPx(MOBILE_GAP) * 2) / MOBILE_GRID_COUNT
  const handleMouseEnter = (e, i) => {
    const citationRect = e.target.getBoundingClientRect()
    const { height } = citationRect
    const { citation, image } = data[i]
    const { header, subheader } = citation

    setCitationData({
      header: parserServices.stripParagraph(header),
      subheader: parserServices.stripParagraph(subheader),
      number: startIndex + i,
      x: -getColWidth() * (image.start - 1),
      y: height / 2
    })
  }

  const renderImg = ({ src, alt, width, height, start, end }, i = 0) =>
    <GridItem
      key={i}
      $start={start}
      $end={end}
      onMouseLeave={() => setCitationData()}
    >
      <CitationContainer>
        <Fade
          display={citationData?.number === startIndex + i}
          state={citationData}
          timeout={POP_UP_TIMEOUT}
          render={
            (state = {}) => <PopUpCitation
              {...state}
              number={state.number + 1}
              backgroundColor={COLORS.BROWN} />
          } />
      </CitationContainer>
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
      $margin={margin / PERFORMING_BODY_FIGMA_COL_WIDTH_MOBILE * getColWidth()}>
      {data.map((entryData, i) => renderImg(entryData.image, i))}
    </ImgContainer>
  )
}

const CitationContainer = styled.div`
  display: flex;
  position: relative;
`

const ImgContainer = styled(GridItem)`
  display: grid;
  grid-template-columns: repeat(${MOBILE_GRID_COUNT}, 1fr);
  column-gap: 0;
  margin-top: ${extractStyle('$margin', 0)}px;

  > div {
    display: flex;
  }
`

export default PerformingBodyContainer