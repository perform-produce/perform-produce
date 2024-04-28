import styled from 'styled-components'
import GridItem from './common/gridItem'
import { emify, lineHeight, spanCol } from '../utils/styleUtils'
import { COLORS, GAP, GRID_GAP, GRID_GAP_PX, MENU_PADDING_BOT, MENU_PADDING_TOP } from '../constants'
import mixins from '../utils/mixins'
import AppendixSection from './common/appendixSection'
import { usePrevious } from '@uidotdev/usehooks'
import { useRef } from 'react'
import { querySelectorArray } from '../utils/commonUtils'


const Appendix = () => {
  const sectionContainerRef = useRef()
  const scrollRef = useRef(0)

  const handleScroll = e => {
    const sectionContainer = sectionContainerRef.current
    if (!sectionContainer) return
    const { scrollLeft } = sectionContainer
    const isRight = scrollLeft > scrollRef.current
    const leftBound = sectionContainer.getBoundingClientRect().left + GRID_GAP_PX
    // TODO
    const sectionLeftBounds = querySelectorArray(sectionContainer, 'section')
      .map(section => section.getBoundingClientRect().left)

    console.log(isRight, leftBound, sectionLeftBounds)
    scrollRef.current = scrollLeft
  }
  return (
    <AppendixGrid>
      <SideBar>
        <h2>Production</h2>
      </SideBar>
      <SectionContainer ref={sectionContainerRef} onScroll={handleScroll}>
        <AppendixSection
          notation='A-01'
          srcs={['test_appendix_1.png', 'test_appendix_2.png']}
          header={'(New) Mechanick Exercises'}
          subheader={'Research Plates'}
          metrics={'6" x 9"'} >
          A series of 10 plates that perform a close read of Joseph Moxon’s 1677 Mechanick Exercises or The Doctrine of Handy-Works, the first English-language book (and intructional manual) ever published on typesetting and print production. This work explores the history of design techlnology, labor, and their connection to the measurement and design of the human body.
        </AppendixSection>
        <AppendixSection
          notation='A-01'
          srcs={['test_appendix_1.png', 'test_appendix_2.png']}
          header={'(New) Mechanick Exercises'}
          subheader={'Research Plates'}
          metrics={'6" x 9"'} >
          A series of 10 plates that perform a close read of Joseph Moxon’s 1677 Mechanick Exercises or The Doctrine of Handy-Works, the first English-language book (and intructional manual) ever published on typesetting and print production. This work explores the history of design techlnology, labor, and their connection to the measurement and design of the human body.
        </AppendixSection>
        <AppendixSection
          notation='A-01'
          srcs={['test_appendix_1.png', 'test_appendix_2.png']}
          header={'(New) Mechanick Exercises'}
          subheader={'Research Plates'}
          metrics={'6" x 9"'} >
          A series of 10 plates that perform a close read of Joseph Moxon’s 1677 Mechanick Exercises or The Doctrine of Handy-Works, the first English-language book (and intructional manual) ever published on typesetting and print production. This work explores the history of design techlnology, labor, and their connection to the measurement and design of the human body.
        </AppendixSection>
        <AppendixSection
          notation='A-01'
          srcs={['test_appendix_1.png', 'test_appendix_2.png']}
          header={'(New) Mechanick Exercises'}
          subheader={'Research Plates'}
          metrics={'6" x 9"'} >
          A series of 10 plates that perform a close read of Joseph Moxon’s 1677 Mechanick Exercises or The Doctrine of Handy-Works, the first English-language book (and intructional manual) ever published on typesetting and print production. This work explores the history of design techlnology, labor, and their connection to the measurement and design of the human body.
        </AppendixSection>
        <AppendixSection
          notation='A-01'
          srcs={['test_appendix_1.png', 'test_appendix_2.png']}
          header={'(New) Mechanick Exercises'}
          subheader={'Research Plates'}
          metrics={'6" x 9"'} >
          A series of 10 plates that perform a close read of Joseph Moxon’s 1677 Mechanick Exercises or The Doctrine of Handy-Works, the first English-language book (and intructional manual) ever published on typesetting and print production. This work explores the history of design techlnology, labor, and their connection to the measurement and design of the human body.
        </AppendixSection>
        <AppendixSection
          notation='A-01'
          srcs={['test_appendix_1.png', 'test_appendix_2.png']}
          header={'(New) Mechanick Exercises'}
          subheader={'Research Plates'}
          metrics={'6" x 9"'} >
          A series of 10 plates that perform a close read of Joseph Moxon’s 1677 Mechanick Exercises or The Doctrine of Handy-Works, the first English-language book (and intructional manual) ever published on typesetting and print production. This work explores the history of design techlnology, labor, and their connection to the measurement and design of the human body.
        </AppendixSection>
        <AppendixSection
          notation='A-01'
          srcs={['test_appendix_1.png', 'test_appendix_2.png']}
          header={'(New) Mechanick Exercises'}
          subheader={'Research Plates'}
          metrics={'6" x 9"'} >
          A series of 10 plates that perform a close read of Joseph Moxon’s 1677 Mechanick Exercises or The Doctrine of Handy-Works, the first English-language book (and intructional manual) ever published on typesetting and print production. This work explores the history of design techlnology, labor, and their connection to the measurement and design of the human body.
        </AppendixSection>
      </SectionContainer>
    </AppendixGrid>
  )
}

const menuHeight = `calc(${emify(MENU_PADDING_TOP)} + ${emify(MENU_PADDING_BOT)} + ${lineHeight(1)})`
const AppendixGrid = styled.div`
  height: 100vh;
  ${mixins.flex()}
`

const SideBar = styled(GridItem)`
  ${mixins.spansCol(2)}
  height: calc(100vh - ${menuHeight});
  padding: ${menuHeight} 0 0 ${GAP};
  background-color: ${COLORS.GRAY};

  h2 {
    margin-top: ${emify(45)};
    ${mixins.underline}
  }
`

const SectionContainer = styled.div`
  ${mixins.flex()}
  width: calc(${spanCol(10)} + ${GAP});
  height: 100vh;
  padding: 0;
  overflow: scroll;

  > section {
    height: calc(100vh - ${menuHeight});
    padding-top: ${menuHeight};

  }
`

export default Appendix