import he from 'he'
import parse, { domToReact } from 'html-react-parser'
import UnderlineLink from '../components/common/underlineLink'
import { DRUPAL_ENDPOINT } from '../constants/apiConstants'
import { validateString } from '../utils/commonUtils'


const noSpan = (htmlString = '') => he.decode(htmlString).replaceAll(/<\/?span>/g, '').replaceAll('&nbsp;', '').replaceAll(/\s+/g, ' ')
const parseWithNoSpan = (htmlString = '', replace) => parse(noSpan(htmlString), {
  replace: domNode => {
    if (domNode.tagName === 'a')
      return <UnderlineLink {...domNode.attribs} target='_blank'>{domToReact(domNode.children)}</UnderlineLink>
    if (replace) return replace(domNode)
  }
})
const stripParagraph = (htmlString = '') => parseWithNoSpan((htmlString?.match(/(?<=<p>)(.*?)(?=<\/p>)/) || [])[0])

const parseTitleWithName = title => {
  const [prefix, name] = title.split(': ')
  return <>{prefix}: <br />{name}</>
}

const redirectSrc = src => validateString(src, DRUPAL_ENDPOINT + src?.replace(window.location.origin, ''))


const parserServices = {
  noSpan,
  parseWithNoSpan,
  stripParagraph,
  parseTitleWithName,
  redirectSrc,
}

export default parserServices
