import styled from 'styled-components'
import GridItem from '../common/gridItem'
import SideAnnotation from './sideAnnotation'
import drupalServices from '../../services/drupalServices'
import IndentText from '../common/indentText'
import { emify } from '../../utils/stylesBase'

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
      <IndentText {...rest} $start={interviewer ? 3 : 6} $end='span 6' >
        {children}
      </IndentText>
      {interviewer && <SideAnnotations>{sideAnnotations}</SideAnnotations>}
    </>
  )
}


const Speaker = styled(GridItem)`
  padding-right: ${emify(35)};
`

const StyledAnnotation = styled(GridItem)`
  align-self: flex-end;
`

export default Dialogue