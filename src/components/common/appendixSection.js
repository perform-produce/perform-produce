import styled from 'styled-components'
import mixins from '../../utils/mixins'
import { COLORS } from '../../constants'
import { wordSpace } from '../../utils/styleUtils'


const AppendixSection = ({ srcs, notation, header, subheader, metrics, children }) => {
  return (
    <Section>
      <ImgContainer>
        <p>{notation}</p>
        <div>
          {srcs && srcs.map((src, i) => <img src={'assets/images/' + src} alt='' key={i}></img>)}
        </div>
      </ImgContainer>
      <hgroup>
        <h3>{header}</h3>
        <p>{subheader}</p>
        <p>{metrics}</p>
      </hgroup>
      <div>{children}</div>
    </Section>
  )
}

const Section = styled.section`
  ${mixins.spansCol(4)}
  background-color: ${COLORS.GRAY};

  img {
    width: 62.5%; // TODO
    background-color: black;
  }
`

const imgNotationWidth = wordSpace(6)
const ImgContainer = styled.div`
  ${mixins.grid(3)};
  column-gap: 0;
  grid-template-columns: ${imgNotationWidth} minmax(1fr, 62.5%) ${imgNotationWidth};
`

export default AppendixSection