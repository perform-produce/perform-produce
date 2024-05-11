import styled from 'styled-components'
import GridItem from './gridItem'
import { forwardRef } from 'react'
import { conditionalStyle } from '../../utils/styleUtils'

const FilteredImg = forwardRef(({ noMultiply, ...rest }, ref) => <StyledImg {...rest} $transparent={!noMultiply} as='img' ref={ref} />)

const StyledImg = styled(GridItem)`
  width: 100%;
  object-fit: cover;
  filter: grayscale(100%);
  mix-blend-mode: ${conditionalStyle('$transparent', 'multiply')};
`

export default FilteredImg