import styled from 'styled-components'
import { GAP } from '../../constants'
import mixins from '../../utils/mixins'
import { lineHeight } from '../../utils/styleUtils'

const Grid = styled.div`
  ${mixins.grid}
  width: calc(100vw - ${GAP} * 2);
  padding-left: ${GAP};
  padding-right: ${GAP};

  p:not(:first-of-type) {
    margin-top: ${lineHeight(1)};
  }
`

export default Grid