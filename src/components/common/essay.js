import { useContext } from 'react'
import _ from 'lodash'
import drupalServices from '../../services/drupalServices'
import Section from './section'
import { COLORS } from '../../constants'
import { GlobalContext } from '../../contexts/context'
import DrupalBlocks from './drupal/drupalBlocks'


const Essay = ({ uuid }) => {
  const { contents, contentIsLoading } = useContext(GlobalContext)
  const essayData = contents &&
    _.find(drupalServices.getEssay(contents), { uuid })
  const { sectionId, title, blocks, citations } = essayData ?? {}

  return (
    !contentIsLoading && essayData &&
    <Section id={sectionId} header={title} backgroundColor={COLORS.GRAY}>
      <DrupalBlocks blocks={blocks} citations={citations} />
    </Section>
  )
}

export default Essay