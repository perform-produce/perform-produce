import styled from 'styled-components'
import GridItem from './gridItem'
import mixins from '../../utils/mixins'
import { lineHeight } from '../../utils/styleUtils'
import WhiteSpace from './whitespace'


const InterviewHeader = ({ subHeader, interviewee, ...rest }) =>
  <Header {...rest} $start={4} $end={9} as='hgroup'>
    <h3>{subHeader}</h3>
    <Interviewee><WhiteSpace>    </WhiteSpace>{interviewee}</Interviewee>
  </Header>

const Header = styled(GridItem)`
  margin-bottom: ${lineHeight(7)};
`

const Interviewee = styled.p`
  ${mixins.underline}
`
export default InterviewHeader