import { useContext, useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'
import { useWindowSize } from '@uidotdev/usehooks'
import _ from 'lodash'
import PerformingBodyContainer from './performingBodyContainer'
import Section from '../common/section'
import GridItem from '../common/gridItem'
import { COLORS, SECTION_HEADING_TOP, SECTION_HEADING_PADDING_TOP_PX, SECTION_HEADING_PADDING_TOP, SECTION_HEADING_TOP_PX, LINE_HEIGHT } from '../../constants'
import mixins from '../../utils/mixins'
import { getLineHeight, vh } from '../../utils/styleUtils'
import { quickArray } from '../../utils/commonUtils'
import { GlobalContext } from '../../contexts/context'
import drupalServices from '../../services/drupalServices'


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


const PerformingBody = () => {
  const { contents, contentIsLoading } = useContext(GlobalContext)
  const essay = useMemo(() => contents && drupalServices.getPerformingBody(contents), [contents])
  const { title, sectionId, entries } = essay ?? {}
  const getColumnLength = () => (vh() - SECTION_HEADING_TOP_PX - SECTION_HEADING_PADDING_TOP_PX) / getLineHeight()
  const [columnLength, setColumnLength] = useState(getColumnLength())
  const [textList, setTextList] = useState([])
  const { height } = useWindowSize()
  useEffect(() => setColumnLength(getColumnLength()), [height])

  if (contentIsLoading || !entries) return

  const onEnter = indices => setTextList(prev => _.uniq([...prev, ...indices].sort((a, b) => a - b)))
  const onExit = indices => setTextList(prev => _.uniq(_.without(prev, ...indices)))
  const renderList = () => {
    const children = []
    const getData = i => {
      const { title, subtitle, src, alt } = entries[i]
      const [start, end, citationPosition, positionConfigs] = entryPositions[i]
      return {
        entryData: {
          citation: {
            header: title,
            subheader: subtitle,
            toRight: citationPosition
          },
          image: { start, end, src, alt },
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
  }

  return (
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
        {renderList()}
      </GridItem>
    </Section>
  )
}

const TextContainer = styled(GridItem)`
  ${mixins.visualEssayGrid}
  height: calc(100vh - ${SECTION_HEADING_TOP} - ${SECTION_HEADING_PADDING_TOP});
  position: sticky;
  top: calc(${SECTION_HEADING_TOP} + ${LINE_HEIGHT}em);
`

const List = styled(GridItem)`
  list-style-type: none;
  padding: 0;
  margin: 0;
  position: relative;
  top: -${LINE_HEIGHT}em;
`

export default PerformingBody