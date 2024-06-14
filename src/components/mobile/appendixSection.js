import styled from 'styled-components'
import { COLORS, MOBILE_GRID_COUNT, MOBILE_GRID_GAP, MOBILE_LINE_HEIGHT } from '../../constants/styleConstants'
import mixins from '../../utils/mixins'
import GridItem from '../common/gridItem'
import Paragraphs from '../common/paragraphs'

const AppendixSection = ({
  images,
  number,
  header,
  type,
  metrics,
  children
}) => {
  return (
    <Section data-appendix-number={number} tabIndex={-1}>
      <ImgContainer>
        <GridItem $start='span 2'>
          <p>{number}</p>
        </GridItem>
        <GridItem $start='span 8'>
          {images.map(({ src, alt }, i) => <img src={src} alt={alt} key={i} />)}
        </GridItem>
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
    </Section>
  )
}

const HeaderContainer = styled.hgroup`
  h3 {
    ${mixins.underline}
  }
`

const Section = styled.section`
  ${mixins.noScrollBar}
  overflow-y: scroll;
  flex: none;
  background-color: ${COLORS.GRAY};
`

const ImgContainer = styled.div`
  ${mixins.grid}
  margin-bottom: ${MOBILE_LINE_HEIGHT};

  > div {
    ${mixins.flex()}
    flex-direction: column;

    img {
      width: 100%;
      background-color: black;
      aspect-ratio: 10 / 7 ;

      &:not(:first-child) {
        margin-top: 1em;
      }
    }
  }
`

const BodyContainer = styled.div`
  padding: ${MOBILE_LINE_HEIGHT} 0;
`

export default AppendixSection