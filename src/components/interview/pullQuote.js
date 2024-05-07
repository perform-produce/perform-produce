import styled from 'styled-components'
import GridItem from '../common/gridItem'
import mixins from '../../utils/mixins'
import { COLORS, SECTION_PADDING_LINE_HEIGHT, STROKE_WIDTH } from '../../constants/styleConstants'
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
        <h3>{header} PP.{pageNumber}</h3>
        <CloseSvg width='1em' onClick={() => toggleQuoteState(false)} />
      </Header>
      {children}
    </Container>
  )
}

const Container = styled(GridItem)`
  ${mixins.border()}
  position: absolute;
  background-color: ${COLORS.WHITE};
  left: ${spanCol(1, 1, 1)};
  top: ${lineHeight(SECTION_PADDING_LINE_HEIGHT + 5)};
  padding: ${emify(40)};

  ${mixins
    .chain()
    .highZIndex(3)
    .spansCol(10)}
`

const Header = styled.div`
  ${mixins
    .chain()
    .flex('center', 'space-between')
    .border(true)
  }

  > * {
    padding-bottom: ${emify(20)};
  }

  h3 {
    > p {
      display: inline;
    }

    > u {
      ${mixins.underline}
    }
  }

  svg {
    stroke-width: ${STROKE_WIDTH};
    cursor: pointer;

    &:hover {
      color: ${COLORS.LIGTH_GRAY};
    }
  }

  margin-bottom: ${lineHeight(5)};
`

const PageNumber = styled.p`
  padding-top: ${emify(100)};
`


export default PullQuote