import parse from 'html-react-parser'
import Paragraphs from '../common/paragraphs'
import Citation from '../citation/citation'
import styled from 'styled-components'
import FilteredImg from '../common/filteredImg'
import { useMemo } from 'react'
import parserServices from '../../services/parserServices'

const { noSpan: removeSpan, parseWithNoSpan: parseNoSpan, stripParagraph: strip } = parserServices
const DrupalParagraph = ({ content, citations = [] }) => {
  const memoizedContent = useMemo(() => {
    return parse(removeSpan(content), {
      replace: domNode => {
        const hasNestedImg = domNode.tagName === 'p' &&
          domNode.firstChild.tagName === 'img'
        if (domNode.tagName === 'img' || hasNestedImg) {
          const imgNode = hasNestedImg ? domNode.firstChild : domNode
          return <NestedImg
            {...domNode.attribs}
            src={parserServices.redirectSrc(imgNode.attribs.src)} />
        }

        // TODO !!! replace p with span
        if (domNode.tagName !== 'sup') return
        const citationNumber = parseInt(domNode.childNodes[0].data)
        const citation = citations[citationNumber - 1]
        if (!citation) return
        const { subtitle, body, src, alt } = citation
        const title = strip(citation.title)
        const subheader = strip(subtitle)
        return (
          <Citation
            number={citationNumber}
            header={title}
            subheader={subheader}
            alt={alt}
            src={src}>
            {parseNoSpan(body)}
          </Citation>
        )
      }
    })
  }, [content, citations])

  return <Paragraphs>{memoizedContent}</Paragraphs>
}

const nestedPadding = 0.5
const NestedImg = styled(FilteredImg)`
  width: 100%;

  &:not(:first-child) {
    padding-top: ${nestedPadding}em;
  }

  &:not(:last-child) {
    padding-bottom: ${nestedPadding}em;
  }

`

export default DrupalParagraph