
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import he from 'he'
import _ from 'lodash'
import { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import { COLORS, MOBILE_GAP, MOBILE_MENU_HEIGHT, MOBILE_VERT_GAP } from '../../constants/styleConstants'
import { GlobalContext } from '../../contexts/context'
import parserServices from '../../services/parserServices'
import mixins from '../../utils/mixins'
import { remify } from '../../utils/stylesBase'
import GridItem from '../common/gridItem'
import AppendixSection from './appendixSection'

gsap.registerPlugin(useGSAP)

const Appendix = ({ onScroll }) => {
  const [index, setIndex] = useState(0)
  const appendixData = useContext(GlobalContext)?.appendices
  const { title, appendices } = appendixData ?? {}

  useEffect(() => {
    if (!appendices) return
    onScroll(index, appendices.length)
  }, [index, appendices])

  useEffect(() => onScroll, [])

  const handleClick = increment =>
    setIndex(_.clamp(index + increment, 0, appendices.length - 1))

  const { number, images, title: appendixTitle, type, metrics, body } = (appendices?.[index]) ?? {}
  return (
    appendices &&
    <AppendixContainer>
      <Header>
        <GridItem $start='span 5'>
          <h2 onClick={() => setIndex(0)}>{title}</h2>
        </GridItem>
        <GridItem $start={8} $end={11}>
          <button onClick={() => handleClick(-1)}>←</button>
          <button onClick={() => handleClick(1)}>→</button>
        </GridItem>
      </Header>
      <AppendixSection
        number={number}
        images={images}
        header={appendixTitle}
        type={type}
        metrics={he.decode(metrics)} >
        {parserServices.parseWithNoSpan(body, true)}
      </AppendixSection>
    </AppendixContainer>
  )
}

const buttonPadding = '0.25em'
const AppendixContainer = styled.div`
  height: calc(100dvh - ${MOBILE_MENU_HEIGHT} - ${MOBILE_VERT_GAP});
  width: calc(100vw - ${MOBILE_GAP} * 2);
  margin-left: ${MOBILE_GAP};
  padding-top: calc(${MOBILE_MENU_HEIGHT} + ${MOBILE_VERT_GAP});
  background-color: ${COLORS.GRAY};
`

const Header = styled.div`
  ${mixins.grid}
  margin-bottom: ${remify(60)};

  h2 {
    ${mixins.underline}
    width: fit-content;
    cursor: pointer;
    position: relative;
    left: -${buttonPadding};
    padding: 0 ${buttonPadding};
  }

  > div {
    ${mixins.flex('center', 'space-between')}
  }

  button {
    position: relative;
    left: ${buttonPadding};
    padding: 0 ${buttonPadding};
    border: none;
    background-color: ${COLORS.GRAY};
    color: black;
    cursor: pointer;

    &:not(:first-of-type) {
      margin-left: 0.5em;
    }
  }
`


export default Appendix