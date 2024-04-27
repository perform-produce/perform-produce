import styled from 'styled-components'
import GridItem from './gridItem'
import { getEm, getLineHeight, lineHeight } from '../../utils/styleUtils'
import FilteredImg from './filteredImg'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { addEventListener } from '../../utils/reactUtils'
import { GLYPH_DESC, LINE_HEIGHT, LINE_PADDING } from '../../constants'
import { roundTo } from '../../utils/commonUtils'


const SideAnnotation = ({ src, alt, caption }) => {
  const [imgHeight, setImgHeight] = useState()
  const [width, setWidth] = useState(window.innerWidth)
  const imgRef = useRef()
  const aspectRatio = useRef()

  useEffect(() => addEventListener(window, 'resize', () =>
    setWidth(window.innerWidth)), [])

  useLayoutEffect(() => {
    const img = imgRef.current
    const { height, width } = img.getBoundingClientRect()
    if (!aspectRatio.current && height)
      aspectRatio.current = width / height
    const uncroppedHeight = width / aspectRatio.current
    if (!uncroppedHeight) return

    let multiplier = 1
    const getCroppedHeight = multiplier => getLineHeight(multiplier) + getEm(1 - GLYPH_DESC)
    while (true || multiplier >= 100) {
      const croppedHeight = getCroppedHeight(multiplier)
      if (croppedHeight >= uncroppedHeight) break
      else multiplier++
    }

    const croppedHeight = roundTo(uncroppedHeight, getCroppedHeight(multiplier - 1), getCroppedHeight(multiplier + 1))
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