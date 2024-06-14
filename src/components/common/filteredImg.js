import { forwardRef } from 'react'
import styled from 'styled-components'
import { validateString } from '../../utils/commonUtils'
import { conditionalStyle } from '../../utils/styleUtils'
import GridItem from './gridItem'

const FilteredImg = forwardRef(function FilteredImg({
  src,
  width,
  height,
  noMultiply,
  ...rest
}, ref) {
  return <StyledImg
    {...rest}
    src={src}
    $width={width}
    $height={height}
    $transparent={!noMultiply}
    as='img'
    ref={ref} />
})

const StyledImg = styled(GridItem)`
  width: 100%;
  height: auto;
  aspect-ratio: ${({ $width, $height }) => validateString($width && $height, `${$width} / ${$height}`)};
  object-fit: cover;
  filter: grayscale(100%);
  mix-blend-mode: ${conditionalStyle('$transparent', 'multiply')};
  background: rgba(255, 255, 255, 0.4);
`

export default FilteredImg