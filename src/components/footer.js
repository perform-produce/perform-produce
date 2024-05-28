import styled from 'styled-components'
import useApi from '../hooks/useApi'
import apiServices from '../services/apiServices'
import parserServices from '../services/parserServices'
import { lineHeight } from '../utils/styleUtils'
import Grid from './common/grid'
import GridItem from './common/gridItem'
import Paragraphs from './common/paragraphs'


const Footer = ({ content }) => {
  const { copyright, credentials, disclaimer } = useApi(content, apiServices.getFooter)

  return (
    <StyledFooter as='footer'>
      <Paragraphs $start={1} $end={5}>
        <div>{parserServices.parseWithNoSpan(copyright)}</div>
        <div>{parserServices.parseWithNoSpan(credentials)}</div>
      </Paragraphs>
      <Paragraphs $start={6} $end={11}>
        {parserServices.parseWithNoSpan(disclaimer)}
      </Paragraphs>
    </StyledFooter>
  )
}

const Credientials = styled.div``
const StyledFooter = styled(Grid)`
  ${GridItem} {
    ${Credientials} > p {
      margin-top: 0;
    }
    &:last-of-type {
      align-self: flex-end;
    }
  }

  margin: ${lineHeight(5)} 0 ${lineHeight(2)};
`

export default Footer