import styled from 'styled-components'
import { DESKTOP_GAP, DESKTOP_LINE_HEIGHT } from '../../constants/styleConstants'
import mixins from '../../utils/mixins'

const Grid = styled.div`
  ${mixins.grid}
  width: calc(100vw - ${DESKTOP_GAP} * 2);
  padding-left: ${DESKTOP_GAP};
  padding-right: ${DESKTOP_GAP};

  p:not(:first-of-type) {
    margin-top: ${DESKTOP_LINE_HEIGHT};
  }
`

export default Grid