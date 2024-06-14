import { useWindowSize } from '@uidotdev/usehooks'
import _ from 'lodash'
import { useContext, useEffect, useMemo, useRef, useState } from 'react'
import styled from 'styled-components'
import { COLORS, MOBILE_MENU_HEIGHT, MOBILE_VERT_GAP } from '../../constants/styleConstants'
import { GlobalContext } from '../../contexts/context'
import useRender from '../../hooks/useRender'
import { delta, isFirefox } from '../../utils/commonUtils'
import { addEventListener } from '../../utils/reactUtils'
import { getLineHeight, getMobileMenuHeight, vh } from '../../utils/styleUtils'
import { getPx } from '../../utils/stylesBase'
import GridItem from '../common/gridItem'
import Section from '../section/section'
import PerformingBodyContainer from './performingBodyContainer'


const entryPositions = [
  [1, 4, true, { margin: 90 }],
  [4, 9, true],
  [9, 13, true],
  [1, 7, false, { margin: 235, sameRow: true }],
  [7, 11, false],
  [1, 6, true, { margin: 295, sameRow: true, alignEnd: true }],
  [6, 8, true],
  [8, 13, true],
  [8, 11, false, { margin: 215 }],
  [1, 5, true, { margin: 195 }],
  [5, 11, true],
  [9, 13, false, { margin: 250 }],
  [1, 6, true, { margin: 250 }],
  [6, 10, true],
  [3, 10, false, { margin: 375, sameRow: true }],
  [10, 13, false],
  [1, 4, true, { margin: 225 }],
  [7, 11, false, { margin: 200 }],
  [1, 7, false],
  [3, 7, true, { margin: 450 }],
  [7, 13, true],
  [7, 10, false, { margin: 325 }],
  [1, 7, false],
  [2, 7, true, { margin: 315 }],
  [7, 12, true],
  [4, 7, true],
  [8, 12, false, { margin: 375 }],
  [2, 8, true],
  [5, 12, false, { margin: 375 }],
  [1, 8, true, { margin: 345 }],
  [8, 13, true],
  [7, 12, false, { margin: 375 }]
]


const PerformingBody = ({ onRendered }) => {
  const data = useContext(GlobalContext)?.performingBody
  const { title, sectionId, entries } = data ?? {}

  const textRef = useRef()
  const getColumnLength = () => Math.floor((
    vh() -
    getMobileMenuHeight() -
    getPx(MOBILE_VERT_GAP) * 2
  ) / getLineHeight(1, true))
  const [columnLength, setColumnLength] = useState(getColumnLength())
  const [textList, setTextList] = useState([])
  const { height } = useWindowSize()

  const columnLengthListener = shouldBypassFirefox => {
    const { top } = textRef.current.getBoundingClientRect()
    if (
      (shouldBypassFirefox && isFirefox()) ||
      delta(top, getMobileMenuHeight() + getPx(MOBILE_VERT_GAP)) <= 10
    ) setColumnLength(getColumnLength())
  }

  useEffect(() => columnLengthListener(true), [height])
  useEffect(() => addEventListener(window, 'scroll', () => columnLengthListener(false)), [])

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
      <TextContainer ref={textRef}>
        <List>
          {entries
            .slice(0, Math.max(...textList) + 1)
            .slice(-columnLength)
            .map(({ text }, i) => <li key={i}>The body as {text}.</li>)}
        </List>
      </TextContainer>
      <BodyContainer>
        {memoizedComponents}
      </BodyContainer>
    </Section>
  )
}

const textTop = `calc(${MOBILE_MENU_HEIGHT} + ${MOBILE_VERT_GAP})`
const textHeight = `calc(100lvh - ${textTop} - ${MOBILE_VERT_GAP})`
const TextContainer = styled(GridItem)`
  position: sticky;
  top: ${textTop};
  height: ${textHeight};
`

const List = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`

const BodyContainer = styled(GridItem)`
  padding-bottom: ${MOBILE_VERT_GAP};
`

export default PerformingBody
