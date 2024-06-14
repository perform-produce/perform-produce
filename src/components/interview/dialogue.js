import styled from 'styled-components'
import { MOBILE_LINE_HEIGHT, MOBILE_QUERY } from '../../constants/styleConstants'
import useIsMobile from '../../hooks/useIsMobile'
import parserServices from '../../services/parserServices'
import { toggleStyle, wordSpace } from '../../utils/styleUtils'
import { remify } from '../../utils/stylesBase'
import GridItem from '../common/gridItem'
import IndentText from '../common/indentText'
import SideAnnotation from './sideAnnotation'

const SideAnnotations = props => <StyledAnnotation {...props} $end='span 4' />

const Dialogue = ({
  interviewer,
  speaker,
  children,
  annotations,
  ...rest
}) => {

  const sideAnnotations = annotations.map(({ src, alt, width, height, caption, alignRight }, i) =>
    src && <SideAnnotation
      key={i}
      src={src}
      alt={alt}
      width={width}
      height={height}
      alignRight={alignRight}
      caption={caption ? parserServices.parseWithNoSpan(caption) : undefined} />
  )

  const isMobile = useIsMobile()
  const Speaker = isMobile ? MobileSpeaker : DesktopSpeaker

  const hasAnnotations = !!sideAnnotations.filter(s => s).length
  return (
    <>
      {!interviewer && hasAnnotations &&
        <SideAnnotations $start={1}>{sideAnnotations}</SideAnnotations>}
      <Speaker
        {...rest}
        $alignRight
        $start={interviewer ? 2 : 5}
        $end='span 1'
        $isMicah={speaker === 'ML'} >
        {speaker}
      </Speaker>
      <TextContainer {...rest} $start={interviewer ? 3 : 6} $end='span 6' >
        {children}
      </TextContainer>
      {interviewer && hasAnnotations &&
        <SideAnnotations>{sideAnnotations}</SideAnnotations>}
    </>
  )
}


const DesktopSpeaker = styled(GridItem)`
  padding-right: ${remify(35)};
`

const MobileSpeaker = styled.p`
  position: ${toggleStyle('$isMicah', '', 'absolute')};
  width: fit-content;
  padding-bottom: ${toggleStyle('$isMicah', remify(5))};
`

const StyledAnnotation = styled(GridItem)`
  align-self: flex-end;
`

const TextContainer = styled(IndentText)`
  @media (${MOBILE_QUERY}) {
    &>*>:first-child {
      text-indent: ${wordSpace(7)};
    }
    &:not(:last-child) {
      margin-bottom: ${MOBILE_LINE_HEIGHT};
    }
  }
`

export default Dialogue