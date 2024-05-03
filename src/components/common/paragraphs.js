import styled from 'styled-components'
import GridItem from './gridItem'
import { LINE_HEIGHT } from '../../constants'


const Paragraphs = ({ interviewIntro, $start, $end, ...rest }) => <StyledParagraphs  {...rest} $start={$start ?? (interviewIntro ? 3 : 4)} $end={$end ?? 11} />

const StyledParagraphs = styled(GridItem)`
  p {
    position: relative;
  }
  blockquote {
    margin: 0;

    &:not(:first-child) {
      margin-top: ${LINE_HEIGHT}em;
    }

    &:not(:last-child) {
      margin-bottom: ${LINE_HEIGHT}em;
    }
  }
`

export default Paragraphs