import styled from 'styled-components'
import GridItem from './gridItem'
import mixins from '../../utils/mixins'
import { GAP, GRID_GAP, SECTION_PADDING_LINE_HEIGHT } from '../../constants'
import { emify, lineHeight, spanCol } from '../../utils/styleUtils'
import { ReactComponent as CloseSvg } from '../../assets/svg/close.svg'
import { useContext, useEffect } from 'react'
import { PopUpContext } from '../../contexts/context'
import { useIntersectionObserver } from '@uidotdev/usehooks'

const PullQuote = ({ header, pageNumber, children }) => {
  const { isQuoteOpened, toggleQuoteState } = useContext(PopUpContext)

  const [ref, entry] = useIntersectionObserver({
    threshold: 0,
    root: null,
    rootMargin: "0px",
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
  background-color: white;
  left: calc(${GAP} + ${GRID_GAP} + ${spanCol(1)});
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