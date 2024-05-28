import { COLORS } from '../../constants/styleConstants'
import useApi from '../../hooks/useApi'
import useRender from '../../hooks/useRender'
import apiServices from '../../services/apiServices'
import DrupalBlocks from '../drupal/drupalBlocks'
import Section from './section'


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