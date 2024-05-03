import styled from 'styled-components'
import GridItem from './gridItem'
import { getEm, getLineHeight, lineHeight, vw } from '../../utils/styleUtils'
import FilteredImg from './filteredImg'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { addEventListener } from '../../utils/reactUtils'
import { GLYPH_DESC, LINE_HEIGHT, LINE_PADDING } from '../../constants'
import { closest, quickArray } from '../../utils/commonUtils'


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
        getLineHeight(multiplier) + getEm(1 - GLYPH_DESC)),
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
    margin-bottom: calc(${lineHeight(2)} - 1em + ${({ $noCaption }) =>
    $noCaption ? GLYPH_DESC - LINE_PADDING - LINE_HEIGHT : 0}em);
  }

  img {
    vertical-align: top;
    margin-top: ${LINE_PADDING}em;
  }
`

const FigCaption = styled.figcaption`
  padding-top: ${GLYPH_DESC}em;
`

export default SideAnnotation