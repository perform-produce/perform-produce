import { useContext, useMemo } from 'react'
import { COLORS } from '../../constants/styleConstants'
import { GlobalContext } from '../../contexts/context'
import useRender from '../../hooks/useRender'
import parserServices from '../../services/parserServices'
import InterviewIntro from '../section/interviewIntro'
import Section from '../section/section'
import RulerSection from './rulerSection'

const rulerWidths = [2.5, 6, 6, 6, 3, 6, 5, 6, 3]

const DougScottsRulers = ({ onRendered }) => {
  const rulersData = useContext(GlobalContext)?.dougScottsRulers
  const { sectionId, entries } = rulersData ?? {}

  const { parseWithNoSpan, stripParagraph } = parserServices

  const memoizedComponents = useMemo(() =>
    entries?.map(({ description, units, purpose, details, src, alt, width, height }, i) =>
      <RulerSection
        key={i}
        index={i}
        src={src}
        alt={alt}
        width={width}
        height={height}
        rulerWidth={rulerWidths[i]}
        description={stripParagraph(description)}
        units={stripParagraph(units)}
        purpose={stripParagraph(purpose)}>
        {parseWithNoSpan(details)}
      </RulerSection>
    ), [entries])

  useRender(onRendered, !rulersData)
  return (
    rulersData &&
    <Section
      id={sectionId}
      header={undefined}
      backgroundColor={COLORS.GREEN}>
      <InterviewIntro content={rulersData} />
      {memoizedComponents}
    </Section>
  )
}


export default DougScottsRulers