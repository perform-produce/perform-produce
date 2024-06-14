import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { GLYPH_CAP_SPACE, GLYPH_DESC, DESKTOP_LINE_HEIGHT, DESKTOP_HALF_LINE_PADDING, MOBILE_QUERY, DESKTOP_QUERY, MOBILE_FIGURE_GAP, MOBILE_VERT_GAP, MOBILE_LINE_HEIGHT } from '../../constants/styleConstants'
import { closest, quickArray } from '../../utils/commonUtils'
import mixins from '../../utils/mixins'
import { addEventListener } from '../../utils/reactUtils'
import { conditionalStyle, getLineHeight, getSpanCol, lineHeight, toggleStyle, vw } from '../../utils/styleUtils'
import { getFontSize, getPx, remify } from '../../utils/stylesBase'
import FilteredImg from '../common/filteredImg'
import GridItem from '../common/gridItem'
import useIsMobile from '../../hooks/useIsMobile'


const SideAnnotation = ({ src, alt, caption, alignRight }) => {
  const [imgHeight, setImgHeight] = useState()
  const [imgWidth, setImgWidth] = useState(vw())
  const imgRef = useRef()
  const aspectRatio = useRef()
  const isMobile = useIsMobile()

  useEffect(() => {
    if (isMobile) return
    return addEventListener(window, 'resize', () =>
      setImgWidth(vw()))
  }, [isMobile])

  useLayoutEffect(() => {
    if (isMobile) return
    const img = imgRef.current
    const { height, width: w } = img.getBoundingClientRect()
    const width = w * (alignRight ? (getSpanCol(3) / getSpanCol(4)) : 1)
    if (!aspectRatio.current && height)
      aspectRatio.current = width / height
    const uncroppedHeight = width / aspectRatio.current
    if (!uncroppedHeight) return

    const croppedHeight = closest(
      quickArray(50, multiplier =>
        getLineHeight(multiplier) +
        getFontSize(1 - GLYPH_DESC - GLYPH_CAP_SPACE) +
        (getPx(DESKTOP_LINE_HEIGHT) - getFontSize()) / 2
      ),
      uncroppedHeight
    )

    setImgHeight(croppedHeight)
  }, [isMobile, src, imgWidth])

  return (
    <Figure as='figure' $noCaption={!caption} $alignRight={alignRight}>
      <FilteredImg
        style={{ height: isMobile ? undefined : imgHeight }}
        as='img'
        src={src}
        alt={alt}
        ref={imgRef} />
      {caption &&
        <Caption as='figcaption'>{(alignRight && !isMobile) ? '↗' : '↑'}<br />{caption}</Caption>}
    </Figure>
  )
}

const Figure = styled(GridItem)`
  margin: 0;
  display: flex;
  flex-direction: column;

  &:not(:last-child){
    margin-bottom: calc(${DESKTOP_HALF_LINE_PADDING} + ${toggleStyle('$noCaption', `${GLYPH_DESC}em`, lineHeight(2))});
    @media (${MOBILE_QUERY}) {
      margin-bottom: ${toggleStyle('$noCaption', remify(10), 0)};
    }
  }

  img {
    @media (${DESKTOP_QUERY}) {
      ${conditionalStyle('$alignRight', mixins.spansCol(3))}
      margin-top: ${DESKTOP_HALF_LINE_PADDING};
    }

    vertical-align: top;
    align-self: flex-end;
  }

  &:last-child > figcaption {
    @media (${MOBILE_QUERY}) {
      padding-bottom: ${lineHeight(2, true)};
    }
  }
`

const Caption = styled.figcaption`
  @media (${MOBILE_QUERY}) {
    padding: ${MOBILE_FIGURE_GAP} 0 ${lineHeight(1.5, true)}; // TODO: Q
  }

  @media (${DESKTOP_QUERY}) {
    padding-top: ${GLYPH_DESC}em;
  }
  text-align: left;
`

export default SideAnnotation
