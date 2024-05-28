import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { GLYPH_DESC, LINE_PADDING_HALF } from '../../constants/styleConstants'
import { closest, quickArray, validateString } from '../../utils/commonUtils'
import mixins from '../../utils/mixins'
import { addEventListener } from '../../utils/reactUtils'
import { conditionalStyle, getLineHeight, getSpanCol, lineHeight, spanCol, toggleStyle, vw } from '../../utils/styleUtils'
import { getEm } from '../../utils/stylesBase'
import FilteredImg from '../common/filteredImg'
import GridItem from '../common/gridItem'


const SideAnnotation = ({ src, alt, caption, alignRight }) => {
  const [imgHeight, setImgHeight] = useState()
  const [width, setWidth] = useState(vw())
  const imgRef = useRef()
  const aspectRatio = useRef()

  useEffect(() => addEventListener(window, 'resize', () =>
    setWidth(vw())), [])

  useLayoutEffect(() => {
    const img = imgRef.current
    const { height, width: w } = img.getBoundingClientRect()
    const width = w * (alignRight ? (getSpanCol(3) / getSpanCol(4)) : 1)
    if (!aspectRatio.current && height)
      aspectRatio.current = width / height
    const uncroppedHeight = width / aspectRatio.current
    if (!uncroppedHeight) return

    const croppedHeight = closest(
      quickArray(50, multiplier =>
        getLineHeight(multiplier) + getEm(1 + LINE_PADDING_HALF - GLYPH_DESC)),
      uncroppedHeight
    )

    setImgHeight(croppedHeight)
  }, [src, width])

  return (
    <Figure as='figure' $noCaption={!caption} $alignRight={alignRight}>
      <FilteredImg style={{ height: imgHeight }} src={src} alt={alt} as='img' ref={imgRef} />
      {caption &&
        <FigCaption as='figcaption'>{alignRight ? '↗' : '↑'}<br />{caption}</FigCaption>}
    </Figure>
  )
}

const Figure = styled(GridItem)`
  margin: 0;
  display: flex;
  flex-direction: column;

  &:not(:last-child){
    margin-bottom: calc(${LINE_PADDING_HALF}em + ${toggleStyle('$noCaption', `${GLYPH_DESC}em`, lineHeight(2))
  });
  }


  img {
    ${conditionalStyle('$alignRight', mixins.spansCol(3))}
    vertical-align: top;
    align-self: flex-end;
    margin-top: ${LINE_PADDING_HALF}em;
  }
`

const FigCaption = styled.figcaption`
  padding-top: ${GLYPH_DESC}em;
  text-align: left;
`

export default SideAnnotation