import styled from 'styled-components'
import { DESKTOP_LINE_HEIGHT, MOBILE_QUERY, TEXT_INDENT } from '../../constants/styleConstants'
import GridItem from './gridItem'


const Paragraphs = ({ interviewIntro, $start, $end, ...rest }) =>
  <StyledParagraphs  {...rest} $start={$start ?? (interviewIntro ? 3 : 4)} $end={$end ?? 11} />

const StyledParagraphs = styled(GridItem)`
  p {
    position: relative;

    @media (${MOBILE_QUERY}) {
      &:not(:first-child) {
        text-indent: ${TEXT_INDENT};
      }
    }
  }

  blockquote {
    margin: 0;

    &:not(:first-child) {
      margin-top: ${DESKTOP_LINE_HEIGHT};
    }

    &:not(:last-child) {
      margin-bottom: ${DESKTOP_LINE_HEIGHT};
    }
  }
`

export default Paragraphs