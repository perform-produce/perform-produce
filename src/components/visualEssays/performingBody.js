import { useWindowSize } from '@uidotdev/usehooks'
import _ from 'lodash'
import { useContext, useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'
import { COLORS, DESKTOP_LINE_HEIGHT, SECTION_HEADING_PADDING_TOP, SECTION_HEADING_TOP } from '../../constants/styleConstants'
import { GlobalContext } from '../../contexts/context'
import useRender from '../../hooks/useRender'
import { quickArray } from '../../utils/commonUtils'
import mixins from '../../utils/mixins'
import { getLineHeight, vh } from '../../utils/styleUtils'
import { getPx } from '../../utils/stylesBase'
import GridItem from '../common/gridItem'
import Section from '../section/section'
import PerformingBodyContainer from './performingBodyContainer'


const entryPositions = [
  [1, 3, true, { margin: 45 }],
  [3, 7, true],
  [7, 10, true],
  [8, 12, false, { margin: 587, sameRow: true }],
  [12, 15, false],
  [1, 5, true, { margin: 480, sameRow: true, alignEnd: true }],
  [5, 7, true],
  [7, 11, true],
  [13, 15, false, { margin: 284 }],
  [1, 4, true, { margin: 155 }],
  [4, 9, true],
  [11, 14, false, { margin: 480 }],
  [2, 6, true, { margin: 335 }],
  [6, 9, true],
  [8, 13, false, { margin: 652, sameRow: true }],
  [13, 15, false],
  [3, 5, true, { margin: 380 }],
  [10, 13, false, { margin: 394 }],
  [6, 10, false],
  [1, 4, true, { margin: 617 }],
  [4, 8, true],
  [9, 11, false, { margin: 524 }],
  [11, 15, false],
  [2, 5, true, { margin: 544, sameRow: true }],
  [5, 8, true],
  [8, 11, true],
  [11, 14, false, { margin: 736 }],
  [2, 7, true, { margin: 451 }],
  [10, 15, false, { margin: 538 }],
  [2, 7, true, { margin: 451 }],
  [7, 11, true],
  [10, 13, false, { margin: 772 }]
]


const PerformingBody = ({ onRendered }) => {
  const data = useContext(GlobalContext)?.performingBody
  const { title, sectionId, entries } = data ?? {}

  const getColumnLength = () => (
    vh() - getPx(SECTION_HEADING_TOP) - getPx(SECTION_HEADING_PADDING_TOP)
  ) / getLineHeight()
  const [columnLength, setColumnLength] = useState(getColumnLength())
  const [textList, setTextList] = useState([])
  const { height } = useWindowSize()
  useEffect(() => setColumnLength(getColumnLength()), [height])

  const onEnter = indices =>
    setTextList(prev => _.uniq([...prev, ...indices].sort((a, b) => a - b)))
  const onExit = indices =>
    setTextList(prev => _.uniq(_.without(prev, ...indices)))

  useRender(onRendered, !data)
  const memoizedComponents = useMemo(() => {
    if (!data) return
    const children = []
    const getData = i => {
      const { title, subtitle, src, alt, width, height } = entries[i]
      const [start, end, citationPosition, positionConfigs] = entryPositions[i]
      return {
        entryData: {
          citation: {
            header: title,
            subheader: subtitle,
            toRight: citationPosition
          },
          image: { start, end, src, alt, width, height },
        },
        positionConfigs: positionConfigs || {}
      }
    }

    for (let i = 0; i < entries.length; i++) {
      const { entryData, positionConfigs } = getData(i)
      const { sameRow, margin, alignEnd } = positionConfigs

      const data = [entryData]

      if (sameRow) {
        const { entryData } = getData(++i)
        data.push(entryData)
      }

      children.push(<PerformingBodyContainer
        key={i}
        data={data}
        margin={margin}
        startIndex={sameRow ? i - 1 : i}
        alignEnd={alignEnd}
        onEnter={onEnter}
        onExit={onExit} />)
    }
    return children
  }, [entries])


  return (
    data &&
    <Section
      id={sectionId}
      header={title}
      backgroundColor={COLORS.BROWN}>
      <TextContainer>
        {quickArray(2, i => {
          const accumulate = (base, value) => base + value * i
          return (
            <List key={i} as='ul' $start={accumulate(4, 4)} $end={accumulate(8, 4)}>
              {entries
                .slice(0, Math.max(...textList) + 1)
                .slice(
                  accumulate(0, columnLength),
                  accumulate(columnLength, columnLength)
                ).map(({ text }, i) => <li key={i}>The body as {text}.</li>)}
            </List>
          )
        }
        )}
      </TextContainer>
      <GridItem $start='span 12'>
        {memoizedComponents}
      </GridItem>
    </Section>
  )
}

const TextContainer = styled(GridItem)`
  ${mixins.visualEssayGrid}
  height: calc(100vh - ${SECTION_HEADING_TOP} - ${SECTION_HEADING_PADDING_TOP});
  position: sticky;
  top: calc(${SECTION_HEADING_TOP} + ${DESKTOP_LINE_HEIGHT});
`

const List = styled(GridItem)`
  list-style-type: none;
  padding: 0;
  margin: 0;
  position: relative;
  top: -${DESKTOP_LINE_HEIGHT};
`

export default PerformingBody