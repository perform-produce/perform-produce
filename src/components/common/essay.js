import drupalServices from '../../services/drupalServices'
import Section from './section'
import { COLORS } from '../../constants'
import DrupalBlocks from './drupal/drupalBlocks'
import useDrupal from '../../hooks/useDrupal'


const Essay = ({ uuid }) => {
  const essayData = useDrupal(uuid, drupalServices.getEssay)
  const { sectionId, title, blocks, citations } = essayData ?? {}

  return (
    essayData &&
    <Section id={sectionId} header={title} backgroundColor={COLORS.GRAY}>
      <DrupalBlocks blocks={blocks} citations={citations} />
    </Section>
  )
}

export default Essay