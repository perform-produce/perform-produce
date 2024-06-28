import { useIntersectionObserver } from '@uidotdev/usehooks'
import { useContext, useEffect } from 'react'
import styled from 'styled-components'
import { ReactComponent as CloseSvg } from '../../assets/svg/close.svg'
import { COLORS, SECTION_PADDING_LINE_HEIGHT, DESKTOP_STROKE_WIDTH } from '../../constants/styleConstants'
import { SectionContext } from '../../contexts/context'
import mixins from '../../utils/mixins'
import { lineHeight, spanCol } from '../../utils/styleUtils'
import { remify } from '../../utils/stylesBase'
import GridItem from '../common/gridItem'

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
    null &&
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
  padding: ${remify(40)};

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
    padding-bottom: ${remify(20)};
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
    stroke-width: ${DESKTOP_STROKE_WIDTH};
    cursor: pointer;

    &:hover {
      color: ${COLORS.LIGTH_GRAY};
    }
  }

  margin-bottom: ${lineHeight(5)};
`

export default PullQuote