import styled from 'styled-components'
import { TEXT_INDENT } from '../../constants/styleConstants'
import GridItem from './gridItem'

const IndentText = styled(GridItem)`
  p:not(:first-child) {
    margin-top: 0;
    text-indent: ${TEXT_INDENT};
  }
`
export default IndentText