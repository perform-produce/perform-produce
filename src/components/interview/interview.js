import { useContext } from 'react'
import { GlobalContext } from '../../contexts/context'
import useRender from '../../hooks/useRender'
import parserServices from '../../services/parserServices'
import DrupalBlocks from '../drupal/drupalBlocks'
import InterviewIntro from '../section/interviewIntro'
import Section from '../section/section'
import useIsMobile from '../../hooks/useIsMobile'


const Interview = ({ uuid, backgroundColor, onRendered }) => {
  const interviewData = useContext(GlobalContext)?.interviews
    .find(interview => interview.uuid === uuid)
  const { sectionId, title, blocks, citations } = interviewData ?? {}
  const isMobile = useIsMobile()

  useRender(onRendered, !interviewData)
  return (
    interviewData &&
    <Section
      id={sectionId}
      header={isMobile ? undefined : parserServices.parseTitleWithName(title)}
      backgroundColor={backgroundColor}>
      <InterviewIntro content={interviewData} />
      <DrupalBlocks blocks={blocks} citations={citations} />
    </Section>
  )
}

export default Interview