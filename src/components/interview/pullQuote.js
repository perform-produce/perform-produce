import styled from 'styled-components'
import GridItem from '../common/gridItem'
import mixins from '../../utils/mixins'
import { COLORS, SECTION_PADDING_LINE_HEIGHT } from '../../constants'
import { lineHeight, spanCol } from '../../utils/styleUtils'
import { ReactComponent as CloseSvg } from '../../assets/svg/close.svg'
import { useContext, useEffect } from 'react'
import { SectionContext } from '../../contexts/context'
import { useIntersectionObserver } from '@uidotdev/usehooks'
import { emify } from '../../utils/stylesBase'

const PullQuote = ({ header, pageNumber, children }) => {
  const { isQuoteOpened, toggleQuoteState } = useContext(SectionContext)

  const [ref, entry] = useIntersectionObserver({
    threshold: 0,
    root: null,
    rootMargin: '0px',
  })

  useEffect(() => {
    if (!entry?.isIntersecting)
      toggleQuoteState(true)
  }, [entry])

  return (
    <Container as='aside' ref={ref} style={{ opacity: isQuoteOpened ? 1 : 0 }}>
      <Header>
        <h3>{header}</h3>
        <CloseSvg width='1em' onClick={() => toggleQuoteState(false)} />
      </Header>
      <PageNumber>{pageNumber && <>P. {pageNumber}</>}</PageNumber>
      {children}
    </Container>
  )
}

const Container = styled(GridItem)`
  position: absolute;
  background-color: ${COLORS.WHITE};
  left: ${spanCol(1, 1, 1)};
  top: ${lineHeight(SECTION_PADDING_LINE_HEIGHT + 5)};
  padding: ${emify(40)};
  border: 2px solid black;

  ${mixins
    .chain()
    .highZIndex(3)
    .spansCol(10)}
`

const Header = styled.div`
  ${mixins.flex('center', 'space-between')}
  border-bottom: 2px solid black;

  > * {
    padding-bottom: ${emify(20)};
  }

  h3 {
    > u {
      ${mixins.underline}
    }
  }

  svg {
    stroke-width: 2px;
    cursor: pointer;
  }
`

const PageNumber = styled.p`
  padding-top: ${emify(100)};
`


export default PullQuote