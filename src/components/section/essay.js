import { useContext } from 'react'
import { COLORS } from '../../constants/styleConstants'
import { GlobalContext } from '../../contexts/context'
import useRender from '../../hooks/useRender'
import DrupalBlocks from '../drupal/drupalBlocks'
import Section from './section'


const Essay = ({ uuid, onRendered }) => {
  const essayData = useContext(GlobalContext)?.essays.find(essay => essay.uuid === uuid)
  const { sectionId, title, blocks, citations } = essayData ?? {}

  useRender(onRendered, !essayData)
  return (
    essayData &&
    <Section id={sectionId} header={title} backgroundColor={COLORS.GRAY}>
      <DrupalBlocks blocks={blocks} citations={citations} />
    </Section>
  )
}

export default Essay