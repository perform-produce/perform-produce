import React from 'react'
import DrupalParagraph from './drupalParagraph'
import DrupalImg from './drupalImg'
import DrupalInterviewSection from './drupalInterviewSection'

const DrupalBlocks = ({ blocks, citations }) => {
  return blocks?.map(({ type, content }, i) => {
    const Component = type === 'paragraph' ? DrupalParagraph :
      type === 'image' ? DrupalImg : DrupalInterviewSection
    return <Component
      key={i}
      content={content}
      citations={citations} />

  })
}

export default DrupalBlocks