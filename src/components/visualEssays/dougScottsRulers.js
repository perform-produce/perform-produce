import { useMemo } from 'react'
import { COLORS } from '../../constants/styleConstants'
import useApi from '../../hooks/useApi'
import useRender from '../../hooks/useRender'
import apiServices from '../../services/apiServices'
import parserServices from '../../services/parserServices'
import InterviewIntro from '../section/interviewIntro'
import Section from '../section/section'
import RulerSection from './rulerSection'

const rulerWidths = [1, 2.25, 2, 2.25, 1, 3.25, 1.75, 4, 0.75]

const DougScottsRulers = ({ content, onRendered }) => {
  const data = useApi(content, apiServices.getDougScottsRulers)
  const { sectionId, title, entries, loading } = data

  const { parseWithNoSpan, stripParagraph } = parserServices

  const memoizedComponents = useMemo(() =>
    entries?.map(({ description, units, purpose, details, src, alt }, i) =>
      <RulerSection
        key={i}
        index={i}
        src={src}
        alt={alt}
        width={rulerWidths[i]}
        description={stripParagraph(description)}
        units={stripParagraph(units)}
        purpose={stripParagraph(purpose)}>
        {parseWithNoSpan(details)}
      </RulerSection>
    ), [entries])

  useRender(onRendered, loading)
  return (
    !loading &&
    <Section
      id={sectionId}
      header={parserServices.parseTitleWithName(title)}
      backgroundColor={COLORS.GREEN}>
      <InterviewIntro content={data} />
      {memoizedComponents}
    </Section>
  )
}


export default DougScottsRulers