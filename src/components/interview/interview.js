import drupalServices from '../../services/drupalServices'
import Section from '../section/section'
import SectionSubhead from '../section/sectionSubhead'
import PullQuote from './pullQuote'
import DrupalBlocks from '../drupal/drupalBlocks'
import Paragraphs from '../common/paragraphs'
import useDrupal from '../../hooks/useDrupal'


const Interview = ({ uuid, backgroundColor }) => {
  const interviewData = useDrupal(uuid, drupalServices.getInterview)
  const { sectionId, title, subtitle, interviewee, blocks, pullQuote, intro, citations } = interviewData ?? {}
  const { parseNoSpan } = drupalServices

  return (
    interviewData &&
    <Section id={sectionId} header={title} backgroundColor={backgroundColor}>
      <SectionSubhead
        subheader={parseNoSpan(subtitle)}
        interviewee={interviewee} />
      <PullQuote header={parseNoSpan(pullQuote.title)} pageNumber={pullQuote.pageNumber}>
        {parseNoSpan(pullQuote.body)}
      </PullQuote>
      {intro &&
        <Paragraphs $end={13}>{parseNoSpan(intro)}</Paragraphs>
      }
      <DrupalBlocks blocks={blocks} citations={citations} />
    </Section>
  )
}

export default Interview