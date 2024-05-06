import { useContext, useRef, useState } from 'react'
import styled from 'styled-components'
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import _ from 'lodash'
import he from 'he'
import GridItem from './common/gridItem'
import { spanCol } from '../utils/styleUtils'
import { COLORS, GAP, GRID_GAP, LINE_HEIGHT, SECTION_HEADING_TOP } from '../constants'
import mixins from '../utils/mixins'
import AppendixSection from './common/appendixSection'
import { useWindowSize } from '@uidotdev/usehooks'
import { GlobalContext } from '../contexts/context'
import drupalServices from '../services/drupalServices'

gsap.registerPlugin(useGSAP)

const Appendix = () => {
  const [index, setIndex] = useState(0)
  const containerRef = useRef()
  const innerContainerRef = useRef()
  const { contents, contentIsLoading } = useContext(GlobalContext)
  const appendixData = contents &&
    drupalServices.getAppendices(contents)
  const { title, appendices } = appendixData ?? {}

  const { width } = useWindowSize()
  useGSAP(() => {
    if (contentIsLoading || !appendices) return
    const innerContainer = innerContainerRef.current
    const section = innerContainer.children[index]
    const dist = section.getBoundingClientRect().width * index
    gsap.to(innerContainer, { duration: 0.5, x: -dist })
  }, { dependencies: [index, width], scope: containerRef })

  if (contentIsLoading || !appendices) return

  const handleClick = increment =>
    setIndex(_.clamp(index + increment, 0, appendices.length - 1))

  return (
    <AppendixGrid>
      <SideBar>
        <h2>{title}</h2>
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
              {drupalServices.parseNoSpan(body)}
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
    margin-top: ${SECTION_HEADING_TOP};
    ${mixins.underline}
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

  width: calc(${spanCol(10)} + ${GAP} + ${GRID_GAP});
  height: 100vh;
  padding: 0;
  overflow: hidden;
  position: relative;
`

const SectionInnerContainer = styled.div`
  position: relative;
`

export default Appendix