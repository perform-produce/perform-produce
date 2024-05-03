import styled from 'styled-components'
import mixins from '../../utils/mixins'
import GridItem from '../common/gridItem'
import FilteredImg from '../common/filteredImg'
import { extractStyle, vh, vw } from '../../utils/styleUtils'
import { useIntersectionObserver } from '@uidotdev/usehooks'
import { useEffect, useRef, useState } from 'react'
import { quickArray } from '../../utils/commonUtils'
import Fade from '../common/fade'
import PopUpCitation from '../common/popUpCitation'
import { COLORS, GAP, GAP_PX, PERFORMING_BODY_FIGMA_COL_WIDTH, PERFORMING_BODY_GRID_COUNT, PERFORMING_BODY_GRID_SPAN, POP_UP_TIMEOUT } from '../../constants'
import drupalServices from '../../services/drupalServices'


const PerformingBodyContainer = ({
  data,
  margin,
  startIndex,
  alignEnd,
  onEnter,
  onExit
}) => {
  const [ref, entry] = useIntersectionObserver({
    threshold: 0,
    root: null,
    rootMargin: '0px',
  })
  const [citationData, setCitationData] = useState()
  const containerRef = useRef()

  useEffect(() => ref(containerRef.current), [containerRef])

  useEffect(() => {
    const indices = quickArray(data.length, i => startIndex + i)
    if (entry?.isIntersecting) onEnter(indices)
    else if (containerRef.current?.getBoundingClientRect().top >= vh())
      onExit(indices)
  }, [entry?.isIntersecting])

  const getColWidth = () => (vw() - GAP_PX * 2) / PERFORMING_BODY_GRID_COUNT
  const onHover = (e, i) => {
    const citationRect = e.target.getBoundingClientRect()
    const colWidth = getColWidth()
    const { width, height } = citationRect
    const { citation } = data[i]
    const { header, subheader, toRight } = citation

    setCitationData({
      header: drupalServices.strip(header),
      subheader: drupalServices.strip(subheader),
      number: startIndex + i,
      x: toRight ? width - colWidth : -colWidth * (PERFORMING_BODY_GRID_SPAN - 1),
      y: height / 2
    })
  }


  const renderImg = ({ src, alt, start, end }, i = 0) =>
    <GridItem key={i} $start={start} $end={end} onMouseLeave={() => setCitationData()}>
      <Container>
        <Fade
          display={citationData?.number === startIndex + i}
          state={citationData}
          timeout={POP_UP_TIMEOUT}
          render={
            (state = {}) => <PopUpCitation
              {...state}
              width={`calc((100vw - ${GAP} * 2) / ${PERFORMING_BODY_GRID_COUNT} * ${PERFORMING_BODY_GRID_SPAN})`}
              backgroundColor={COLORS.BROWN} />
          } />
      </Container>
      <FilteredImg
        src={src}
        alt={alt}
        onMouseEnter={e => onHover(e, i)} />
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
`

const ImgContainer = styled(GridItem)`
  ${mixins.visualEssayGrid}
  margin-top: ${extractStyle('$margin', 0)}px;
  align-items: ${({ $alignEnd }) => $alignEnd ? 'end' : ''};
`

export default PerformingBodyContainer