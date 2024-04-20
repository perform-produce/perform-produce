import styled from 'styled-components'
import GridItem from './gridItem'
import { getLineHeight, lineHeight } from '../../utils/styleUtils'
import FilteredImg from './filteredImg'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { addEventListener } from '../../utils/reactUtils'


const DialogueCaption = ({ src, caption }) => {
  const [imgHeight, setImgHeight] = useState()
  const [width, setWidth] = useState(window.innerWidth)
  const imgRef = useRef()
  const aspectRatio = useRef()

  useEffect(() => addEventListener(window, 'resize', () =>
    setWidth(window.innerWidth)), [])

  src = 'assets/images/' + src
  useLayoutEffect(() => {
    const img = imgRef.current
    const { height, width } = img.getBoundingClientRect()
    if (!aspectRatio.current && height)
      aspectRatio.current = width / height
    const uncroppedHeight = width / aspectRatio.current
    if (!uncroppedHeight) return
    setImgHeight(Math.floor(uncroppedHeight / getLineHeight()) * getLineHeight())
  }, [src, width])

  return (
    <Figure as='figure'>
      <FilteredImg style={{ height: imgHeight }} src={src} alt={caption} as='img' ref={imgRef} />
      <FigCaption as='figcaption'>↑<br />{caption}</FigCaption>
    </Figure>
  )
}

const Figure = styled(GridItem)`
  margin: 0;
  margin-bottom: ${lineHeight(2)};

  img {
    vertical-align: top;
  }
`

const FigCaption = styled.figcaption`
  padding-top: ${lineHeight(1)};
`

export default DialogueCaption