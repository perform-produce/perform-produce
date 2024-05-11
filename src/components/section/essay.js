import apiServices from '../../services/apiServices'
import Section from './section'
import { COLORS } from '../../constants/styleConstants'
import DrupalBlocks from '../drupal/drupalBlocks'
import useApi from '../../hooks/useApi'
import useRender from '../../hooks/useRender'


const Essay = ({ content, onRendered }) => {
  const { sectionId, title, blocks, citations, loading } = useApi(content, apiServices.getEssay)

  useRender(onRendered, loading)
  return (
    !loading &&
    <Section id={sectionId} header={title} backgroundColor={COLORS.GRAY}>
      <DrupalBlocks blocks={blocks} citations={citations} />
    </Section>
  )
}

export default Essay