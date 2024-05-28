import { useGSAP } from '@gsap/react'
import { useWindowSize } from '@uidotdev/usehooks'
import gsap from 'gsap'
import he from 'he'
import _ from 'lodash'
import { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { COLORS, GAP, LINE_HEIGHT, SECTION_HEADING_TOP } from '../../constants/styleConstants'
import apiServices from '../../services/apiServices'
import parserServices from '../../services/parserServices'
import mixins from '../../utils/mixins'
import { spanCol } from '../../utils/styleUtils'
import GridItem from '../common/gridItem'
import AppendixSection from './appendixSection'

gsap.registerPlugin(useGSAP)

const Appendix = ({ data, onScroll }) => {
  const [index, setIndex] = useState(0)
  const containerRef = useRef()
  const innerContainerRef = useRef()

  const appendixData = data && apiServices.getAppendices(data)
  const { title, appendices } = appendixData ?? {}

  const { width } = useWindowSize()

  useGSAP(() => {
    if (!appendices) return
    const innerContainer = innerContainerRef.current
    const section = innerContainer.children[index]
    const dist = section.getBoundingClientRect().width * index
    gsap.to(innerContainer, { duration: 0.5, x: -dist })
  }, { dependencies: [index, width], scope: containerRef })

  useEffect(() => {
    if (!appendices) return
    onScroll(index, appendices.length)
  }, [index, appendices])

  useEffect(() => onScroll, [])

  const handleClick = increment =>
    setIndex(_.clamp(index + increment, 0, appendices.length - 1))


  return (
    appendices &&
    <AppendixGrid>
      <SideBar>
        <h2 onClick={() => setIndex(0)}>{title}</h2>
        <div>
          <button onClick={() => handleClick(-1)}>←</button>
          <button onClick={() => handleClick(1)}>→</button>
        </div>
      </SideBar>
      <SectionContainer ref={containerRef}>
        <SectionInnerContainer ref={innerContainerRef}>
          {appendices.map(({ number, images, title, type, metrics, body }, i) => {
            return <AppendixSection
              key={i}
              number={number}
              images={images}
              header={title}
              type={type}
              metrics={he.decode(metrics)} >
              {parserServices.parseWithNoSpan(body)}
            </AppendixSection>
          })}
        </SectionInnerContainer>
      </SectionContainer>
    </AppendixGrid >
  )
}

const AppendixGrid = styled.div`
  height: 100vh;
  ${mixins.flex()}
`

const SideBar = styled(GridItem)`
  ${mixins.spansCol(2)}
  height: 100vh;
  padding-left: ${GAP};
  background-color: ${COLORS.GRAY};

  h2 {
    ${mixins.underline}
    margin-top: ${SECTION_HEADING_TOP};
    cursor: pointer;
  }

  div {
    margin-top: ${LINE_HEIGHT * 0.5}em;
  }

  button {
    border: none;
    padding: 0;
    cursor: pointer;
    background-color: ${COLORS.GRAY};

    &:not(:first-of-type) {
      margin-left: 0.5em;
    }
  }
`

const SectionContainer = styled.div`
  ${mixins.flex()}
  > div {
    ${mixins.flex()}
  }

  width: ${spanCol(10, 10, 1)};
  height: 100vh;
  padding: 0;
  overflow: hidden;
  position: relative;
`

const SectionInnerContainer = styled.div`
  position: relative;
`

export default Appendix