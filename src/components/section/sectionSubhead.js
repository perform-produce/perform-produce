import styled from 'styled-components'
import GridItem from '../common/gridItem'
import mixins from '../../utils/mixins'
import { lineHeight } from '../../utils/styleUtils'
import WhiteSpace from '../common/whitespace'


const SectionSubhead = ({ subheader, interviewee, ...rest }) =>
  <Header {...rest} $start={4} $end={9} as='hgroup'>
    <h3>{subheader}</h3>
    <Interviewee><WhiteSpace>    </WhiteSpace>{interviewee}</Interviewee>
  </Header>

const Header = styled(GridItem)`
  h3 {
    margin-bottom: ${lineHeight(1)};
  }
  margin-bottom: ${lineHeight(7)};
`

const Interviewee = styled.p`
  ${mixins.underline}
`
export default SectionSubhead