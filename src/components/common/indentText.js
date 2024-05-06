import styled from 'styled-components'
import { wordSpace } from '../../utils/styleUtils'
import GridItem from './gridItem'

const IndentText = styled(GridItem)`
  p:not(:first-child) {
    margin-top: 0;
    text-indent: ${wordSpace(5)};
  }
`
export default IndentText