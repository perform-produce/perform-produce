import styled from 'styled-components'
import mixins from '../../utils/mixins'
import { COLORS, GRID_GAP, LINE_HEIGHT } from '../../constants'
import { emify, spanCol, wordSpace } from '../../utils/styleUtils'
import Paragraphs from './paragraphs'


const AppendixSection = ({ srcs, notation, header, subheader, metrics, children }) => {
  return (
    <Section>
      <ImgContainer>
        <p>{notation}</p>
        <div>
          {srcs && srcs.map((src, i) => <img src={'assets/images/' + src} alt='' key={i}></img>)}
        </div>
      </ImgContainer>
      <HeaderContainer>
        <h3>{header}</h3>
        <p>{subheader}</p>
        {metrics && <p>[{metrics}]</p>}
      </HeaderContainer>
      <BodyContainer>
        <Paragraphs>
          {children}
        </Paragraphs>
      </BodyContainer>
    </Section>
  )
}

const HeaderContainer = styled.hgroup``

const Section = styled.section`
  ${mixins.spansCol(4)}
  background-color: ${COLORS.GRAY};
  overflow-y: scroll;
  flex: none;
  margin-left: ${GRID_GAP};

  > ${HeaderContainer} {
    h3, p {
      margin-top: 0;
    }
  }
`

const imgNotationWidth = wordSpace(6)
const ImgContainer = styled.div`
  ${mixins.grid(3)};
  column-gap: 0;
  grid-template-columns: ${imgNotationWidth} 1fr ${imgNotationWidth};
  margin: ${emify(45)} 0 ${emify(40)};

  > div {
    ${mixins.flex('center', 'initial')}
    flex-direction: column;

    img {
      width: calc(${spanCol(4)} * 0.625); // TODO
      background-color: black;

      &:not(:first-child) {
        margin-top: 1em;
      }
    }
  }
`

const BodyContainer = styled.div`
  margin: ${LINE_HEIGHT}em 0;
`

export default AppendixSection