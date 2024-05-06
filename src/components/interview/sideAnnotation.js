import styled from 'styled-components'
import GridItem from '../common/gridItem'
import { getLineHeight, lineHeight, toggleStyle, vw } from '../../utils/styleUtils'
import FilteredImg from '../common/filteredImg'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { addEventListener } from '../../utils/reactUtils'
import { GLYPH_DESC, LINE_PADDING_HALF } from '../../constants'
import { closest, quickArray } from '../../utils/commonUtils'
import { getEm } from '../../utils/stylesBase'


const SideAnnotation = ({ src, alt, caption }) => {
  const [imgHeight, setImgHeight] = useState()
  const [width, setWidth] = useState(vw())
  const imgRef = useRef()
  const aspectRatio = useRef()

  useEffect(() => addEventListener(window, 'resize', () =>
    setWidth(vw())), [])

  useLayoutEffect(() => {
    const img = imgRef.current
    const { height, width } = img.getBoundingClientRect()
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
    <Figure as='figure' $noCaption={!caption}>
      <FilteredImg style={{ height: imgHeight }} src={src} alt={alt} as='img' ref={imgRef} />
      {caption &&
        <FigCaption as='figcaption'>↑<br />{caption}</FigCaption>}
    </Figure>
  )
}

const Figure = styled(GridItem)`
  margin: 0;

  &:not(:last-child){
    margin-bottom: calc(${LINE_PADDING_HALF}em + ${toggleStyle('$noCaption', `${GLYPH_DESC}em`, lineHeight(2))
  });
  }


  img {
    vertical-align: top;
    margin-top: ${LINE_PADDING_HALF}em;
  }
`

const FigCaption = styled.figcaption`
  padding-top: ${GLYPH_DESC}em;
`

export default SideAnnotation