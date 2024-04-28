import { useContext } from 'react'
import _ from 'lodash'
import drupalServices from '../../services/drupalServices'
import Section from './section'
import InterviewHeader from './interviewHeader'
import PullQuote from './pullQuote'
import { GlobalContext } from '../../contexts/context'
import DrupalBlocks from './drupal/drupalBlocks'
import Paragraphs from './paragraphs'


const Interview = ({ uuid, backgroundColor }) => {
  const { contents, contentIsLoading } = useContext(GlobalContext)
  const interviewData = contents &&
    _.find(drupalServices.getInterview(contents), { uuid })
  const { sectionId, title, subtitle, interviewee, blocks, pullQuote, intro, citations } = interviewData ?? {}
  const { parseNoSpan } = drupalServices

  return (
    !contentIsLoading && interviewData &&
    <Section id={sectionId} header={title} backgroundColor={backgroundColor}>
      <InterviewHeader
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