import styled from 'styled-components'
import { conditionalStyle, extractStyle } from '../../utils/styleUtils'

const GridItem = styled.div`
  text-align: ${conditionalStyle('$alignRight', 'right')};
  grid-column-start: ${extractStyle('$start', '')};
  grid-column-end: ${extractStyle('$end', '')};
  height: fit-content;
`

export default GridItem