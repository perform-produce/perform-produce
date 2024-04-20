import styled from 'styled-components'
import GridItem from './gridItem'
import { emify, wordSpace } from '../../utils/styleUtils'

const DialogueCaption = props => <GridItem {...props} $end='span 4' />

const Dialogue = ({
  interviewer,
  speaker,
  children,
  caption,
  ...rest
}) => {
  return (
    <>
      {!interviewer && <DialogueCaption $start={1}>{caption}</DialogueCaption>}
      <Speaker {...rest} $alignRight $start={interviewer ? 2 : 5} $end='span 1' >
        {speaker}
      </Speaker>
      <Text {...rest} $start={interviewer ? 3 : 6} $end='span 6' >
        {children}
      </Text>
      {interviewer && <DialogueCaption>{caption}</DialogueCaption>}
    </>
  )
}


const Speaker = styled(GridItem)`
  padding-right: ${emify(35)};
`

const Text = styled(GridItem)`
  p:not(:first-of-type) {
    margin-top: 0;
    text-indent: ${wordSpace(5)};
  }
`


export default Dialogue