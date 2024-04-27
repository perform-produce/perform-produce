import { useContext } from 'react'
import _ from 'lodash'
import drupalServices from '../../services/drupalServices'
import Section from './section'
import { COLORS } from '../../constants'
import InterviewHeader from './interviewHeader'
import PullQuote from './pullQuote'
import { GlobalContext } from '../../contexts/context'
import DrupalBlocks from './drupal/drupalBlocks'


const Interview = ({ uuid }) => {
  const { contents, contentIsLoading } = useContext(GlobalContext)
  const interviewData = contents &&
    _.find(drupalServices.getInterview(contents), { uuid })
  const { sectionId, title, subtitle, interviewee, blocks, pullQuote, citations } = interviewData ?? {}
  const { parseNoSpan } = drupalServices

  return (
    !contentIsLoading && interviewData &&
    <Section id={sectionId} header={title} backgroundColor={COLORS.PINK}>
      <InterviewHeader
        subheader={parseNoSpan(subtitle)}
        interviewee={interviewee} />
      <PullQuote header={parseNoSpan(pullQuote.title)} pageNumber={pullQuote.pageNumber}>
        {parseNoSpan(pullQuote.body)}
      </PullQuote>
      <DrupalBlocks blocks={blocks} citations={citations} />
    </Section>
  )
}

export default Interview