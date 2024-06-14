import styled from 'styled-components'
import GridItem from '../common/gridItem'
import mixins from '../../utils/mixins'
import { lineHeight } from '../../utils/styleUtils'
import WhiteSpace from '../common/whitespace'
import { DESKTOP_LINE_HEIGHT, MOBILE_LINE_HEIGHT, MOBILE_QUERY } from '../../constants/styleConstants'


const SectionSubhead = ({ subheader, interviewee, ...rest }) =>
  <Header {...rest} $start={4} $end={9} as='hgroup'>
    <h3>{subheader}</h3>
    <Interviewee><WhiteSpace>    </WhiteSpace>{interviewee}</Interviewee>
  </Header>

const Header = styled(GridItem)`
  h3 {
    margin-bottom: ${DESKTOP_LINE_HEIGHT};

    @media (${MOBILE_QUERY}) {
      margin-bottom: ${MOBILE_LINE_HEIGHT};
    }
  }
  margin-bottom: ${lineHeight(7)};
  @media (${MOBILE_QUERY}) {
      margin-bottom: ${lineHeight(14, true)};
    }
`

const Interviewee = styled.p`
  ${mixins.underline}
`
export default SectionSubhead