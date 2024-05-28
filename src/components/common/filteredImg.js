import { forwardRef } from 'react'
import styled from 'styled-components'
import { conditionalStyle } from '../../utils/styleUtils'
import GridItem from './gridItem'

const FilteredImg = forwardRef(({ noMultiply, ...rest }, ref) => <StyledImg {...rest} $transparent={!noMultiply} as='img' ref={ref} />)

const StyledImg = styled(GridItem)`
  width: 100%;
  height: auto;
  object-fit: cover;
  filter: grayscale(100%);
  mix-blend-mode: ${conditionalStyle('$transparent', 'multiply')};
`

export default FilteredImg