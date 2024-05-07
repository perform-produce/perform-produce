import apiServices from '../../services/apiServices'
import Section from '../section/section'
import DrupalBlocks from '../drupal/drupalBlocks'
import useApi from '../../hooks/useApi'
import parserServices from '../../services/parserServices'
import InterviewIntro from '../section/interviewIntro'


const Interview = ({ content, backgroundColor }) => {
  const data = useApi(content, apiServices.getInterview)
  const { sectionId, title, blocks, citations, loading } = data

  return (
    !loading &&
    <Section id={sectionId} header={parserServices.parseTitleWithName(title)} backgroundColor={backgroundColor}>
      <InterviewIntro content={data} />
      <DrupalBlocks blocks={blocks} citations={citations} />
    </Section>
  )
}

export default Interview