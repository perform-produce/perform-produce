import { useContext } from 'react'
import styled from 'styled-components'
import { MOBILE_LINE_HEIGHT } from '../../constants/styleConstants'
import { GlobalContext } from '../../contexts/context'
import parserServices from '../../services/parserServices'
import mixins from '../../utils/mixins'
import MobileContainer from './mobileContainer'

const About = () => {
  const aboutData = useContext(GlobalContext)
  const { about, credits } = aboutData?.about ?? {}

  const parser = html => parserServices.parseWithNoSpan(html)
  return (
    <Cover>
      {
        aboutData &&
        <>
          <div>
            <AboutContainer>
              {parser(about)}
            </AboutContainer>
            <div>
              {parser(credits)}
            </div>
          </div>
        </>
      }
    </Cover>
  )
}


const Cover = styled(MobileContainer)`
  ${mixins.cover(false)}
  overflow: scroll;
  display: flex;

  a {
    ${mixins.underline}
  }
`

const AboutContainer = styled.div`
  p:not(:first-of-type) {
    margin: ${MOBILE_LINE_HEIGHT} 0;
  }
`


export default About