import { useContext } from 'react'
import styled from 'styled-components'
import { MOBILE_GAP, MOBILE_LINE_HEIGHT, MOBILE_QUERY, MOBILE_VERT_GAP } from '../constants/styleConstants'
import { GlobalContext } from '../contexts/context'
import parserServices from '../services/parserServices'
import { lineHeight } from '../utils/styleUtils'
import Grid from './common/grid'
import GridItem from './common/gridItem'
import Paragraphs from './common/paragraphs'


const Footer = () => {
  const footerData = useContext(GlobalContext)?.footer
  const { copyright, credentials, disclaimer } = footerData || {}

  return (
    footerData &&
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
  margin: ${lineHeight(5)} 0 ${lineHeight(2)};

  @media (${MOBILE_QUERY}) {
    display: block;
    padding: 0 ${MOBILE_GAP};
    margin: ${lineHeight(5, true)} 0 calc(${MOBILE_VERT_GAP} / 2);
    width: 100%;
    box-sizing: border-box;

    p:not(:first-child) {
      text-indent: 0;
    }

    div > p:last-child {
      margin-top: ${MOBILE_LINE_HEIGHT};
    }
  }

  ${GridItem} {
    ${Credientials} > p {
      margin-top: 0;
    }
    &:last-of-type {
      align-self: flex-end;
    }
  }
`

export default Footer