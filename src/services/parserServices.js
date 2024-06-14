import he from 'he'
import parse, { domToReact } from 'html-react-parser'
import UnderlineLink from '../components/common/underlineLink'
import { DRUPAL_ENDPOINT } from '../constants/apiConstants'
import { validateString } from '../utils/commonUtils'


const noSpan = (htmlString = '') => he.decode(htmlString).replaceAll(/<\/?span>/g, '').replaceAll('&nbsp;', '').replaceAll(/\s+/g, ' ')
const getParsedLink = (domNode, noFocus) =>
  <UnderlineLink {...domNode.attribs} target='_blank' tabIndex={noFocus ? -1 : undefined}>
    {domToReact(domNode.children)}
  </UnderlineLink>

const parseWithNoSpan = (htmlString = '', noFocus) => parse(noSpan(htmlString), {
  replace: domNode => {
    if (domNode.tagName === 'a') return getParsedLink(domNode, noFocus)
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
  getParsedLink,
  parseWithNoSpan,
  stripParagraph,
  parseTitleWithName,
  redirectSrc,
}

export default parserServices
