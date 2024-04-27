import parse from 'html-react-parser'
import drupalServices from '../../../services/drupalServices'
import Paragraphs from '../paragraphs'
import Citation from '../citation'
import { stripParagraph } from '../../../utils/commonUtils'

const { removeSpan, parseNoSpan } = drupalServices
const DrupalParagraph = ({ content, citations = [] }) => {
  return <Paragraphs>
    {
      parse(removeSpan(content), {
        replace: domNode => {
          if (domNode.tagName !== 'sup') return
          const citationNumber = parseInt(domNode.childNodes[0].data)
          const citation = citations[citationNumber - 1]
          if (!citation) return
          const { subtitle, body, src, alt } = citation
          const title = parseNoSpan(stripParagraph(citation.title))
          const subheader = parseNoSpan(stripParagraph(subtitle))
          const header = src ? <>{title}, {subheader}</> : title
          return (
            <Citation
              number={citationNumber}
              header={header}
              subheader={src ? undefined : subheader}
              alt={alt}
              src={src}>
              {parseNoSpan(body)}
            </Citation>
          )
        }
      })
    }
  </Paragraphs>
}


export default DrupalParagraph