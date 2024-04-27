import React from 'react'
import Dialogue from '../dialogue'
import DrupalParagraph from './drupalParagraph'

const DrupalInterviewSection = ({ content, citations }) => {
  const { speaker, body, annotations } = content
  return (
    <Dialogue
      speaker={speaker}
      annotations={annotations}
      interviewer={speaker === 'RW'}>
      <DrupalParagraph
        content={body}
        citations={citations} />
    </Dialogue>
  )
}

export default DrupalInterviewSection