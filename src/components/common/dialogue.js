import styled from 'styled-components'
import GridItem from './gridItem'
import { emify, wordSpace } from '../../utils/styleUtils'
import SideAnnotation from './sideAnnotation'
import drupalServices from '../../services/drupalServices'

const SideAnnotations = props => <StyledAnnotation {...props} $end='span 4' />

const Dialogue = ({
  interviewer,
  speaker,
  children,
  annotations,
  ...rest
}) => {

  const sideAnnotations = annotations.map(({ src, alt, caption }, i) =>
    <SideAnnotation
      key={i}
      src={src}
      alt={alt}
      caption={caption ? drupalServices.parseNoSpan(caption) : undefined} />
  )

  return (
    <>
      {!interviewer && <SideAnnotations $start={1}>{sideAnnotations}</SideAnnotations>}
      <Speaker {...rest} $alignRight $start={interviewer ? 2 : 5} $end='span 1' >
        {speaker}
      </Speaker>
      <Text {...rest} $start={interviewer ? 3 : 6} $end='span 6' >
        {children}
      </Text>
      {interviewer && <SideAnnotations>{sideAnnotations}</SideAnnotations>}
    </>
  )
}


const Speaker = styled(GridItem)`
  padding-right: ${emify(35)};
`

const Text = styled(GridItem)`
  p:not(:first-child) {
    margin-top: 0;
    text-indent: ${wordSpace(5)};
  }
`

const StyledAnnotation = styled(GridItem)`
  align-self: flex-end;
`

export default Dialogue