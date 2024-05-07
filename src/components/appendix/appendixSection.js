import styled from 'styled-components'
import mixins from '../../utils/mixins'
import { COLORS, GRID_GAP, LINE_HEIGHT, SECTION_HEADING_TOP } from '../../constants/styleConstants'
import { spanCol, wordSpace } from '../../utils/styleUtils'
import Paragraphs from '../common/paragraphs'
import { forwardRef } from 'react'
import { emify } from '../../utils/stylesBase'


const AppendixSection = forwardRef(({ images, number, header, type, metrics, children }, ref) => {
  return (
    <Section ref={ref} data-appendix-number={number}>
      <InnerContainer>
        <ImgContainer>
          <p>{number}</p>
          <div>
            {images.map(({ src, alt }, i) => <img src={src} alt={alt} key={i} />)}
          </div>
        </ImgContainer>
        <HeaderContainer>
          <h3>{header}</h3>
          <p>{type}</p>
          {metrics && <p>{metrics}</p>}
        </HeaderContainer>
        <BodyContainer>
          <Paragraphs>
            {children}
          </Paragraphs>
        </BodyContainer>
      </InnerContainer>
    </Section>
  )
})

const HeaderContainer = styled.hgroup``

const Section = styled.section`
  ${mixins
    .chain()
    .spansCol(4)
    .noScrollBar()}
  height: 100vh;
  padding-left: ${GRID_GAP};
  overflow-y: scroll;
  flex: none;
`

const InnerContainer = styled.div`
  background-color: ${COLORS.GRAY};
  padding-top: ${SECTION_HEADING_TOP};
  height: max(fit-content, calc(100% - ${SECTION_HEADING_TOP}));

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
  margin-bottom: ${emify(140)};

  > div {
    ${mixins.flex('center', 'initial')}
    flex-direction: column;

    img {
      width: calc(${spanCol(4)} * 0.625);
      background-color: black;
      aspect-ratio: 10 / 7 ;

      &:not(:first-child) {
        margin-top: 1em;
      }
    }
  }
`

const BodyContainer = styled.div`
  padding: ${LINE_HEIGHT}em 0;
`

export default AppendixSection