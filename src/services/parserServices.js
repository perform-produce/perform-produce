import { validateString } from '../utils/commonUtils'
import parse from 'html-react-parser'
import he from 'he'
import { DRUPAL_ENDPOINT } from '../constants/apiConstants'

const linkToBlankConfig = {
  replace: domNode => {
    if (domNode.tagName === 'a')
      domNode.attribs.target = '_blank'
  }
}
const noSpan = (htmlString = '') => he.decode(htmlString).replaceAll(/<\/?span>/g, '').replaceAll('&nbsp;', '').replaceAll(/\s+/g, ' ')
const parseWithNoSpan = (htmlString = '', config) => parse(noSpan(htmlString), config)
const stripParagraph = (htmlString = '') => parseWithNoSpan((htmlString?.match(/(?<=<p>)(.*?)(?=<\/p>)/) || [])[0])

const parseTitleWithName = title => {
  const [prefix, name] = title.split(': ')
  return <>{prefix}: <br />{name}</>
}

const redirectSrc = src => validateString(src, DRUPAL_ENDPOINT + src?.replace(window.location.origin, ''))


const parserServices = {
  linkToBlankConfig,
  noSpan,
  parseWithNoSpan,
  stripParagraph,
  parseTitleWithName,
  redirectSrc,
}

export default parserServices