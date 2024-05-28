import parse, { domToReact } from 'html-react-parser'
import { useMemo } from 'react'
import styled from 'styled-components'
import parserServices from '../../services/parserServices'
import Citation from '../citation/citation'
import FilteredImg from '../common/filteredImg'
import Paragraphs from '../common/paragraphs'

const { noSpan, stripParagraph } = parserServices
const DrupalParagraph = ({ content, citations = [] }) => {
  const memoizedContent = useMemo(() => {
    return parse(noSpan(content), {
      replace: domNode => {
        const hasNestedImg = domNode.tagName === 'p' &&
          domNode.firstChild.tagName === 'img'
        if (domNode.tagName === 'img' || hasNestedImg) {
          const imgNode = hasNestedImg ? domNode.firstChild : domNode
          return <NestedImg
            {...domNode.attribs}
            src={parserServices.redirectSrc(imgNode.attribs.src)} />
        }

        if (domNode.tagName !== 'sup') return
        const citationNumber = parseInt(domNode.childNodes[0].data)
        const citation = citations[citationNumber - 1]
        if (!citation) return
        const { subtitle, body, src, alt, noMultiply } = citation
        const title = stripParagraph(citation.title)
        const subheader = stripParagraph(subtitle)
        return (
          <Citation
            number={citationNumber}
            header={title}
            subheader={subheader}
            alt={alt}
            src={src}
            noMultiply={noMultiply}>
            {parse(
              noSpan(body),
              {
                replace: domNode => {
                  if (domNode.tagName === 'p')
                    return <SpanParagraph>{domToReact(domNode.children)}</SpanParagraph>
                }
              }
            )}
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

const SpanParagraph = styled.span`
  display: block;
`

export default DrupalParagraph