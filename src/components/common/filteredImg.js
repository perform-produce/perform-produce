import styled from 'styled-components'
import GridItem from './gridItem'
import { forwardRef } from 'react'

const FilteredImg = forwardRef((props, ref) => <StyledImg {...props} as='img' ref={ref} />)

const StyledImg = styled(GridItem)`
  width: 100%;
  object-fit: cover;
  filter: grayscale(100%);
  mix-blend-mode: multiply;
`

export default FilteredImg