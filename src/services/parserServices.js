import { validateString } from '../utils/commonUtils'
import parse from 'html-react-parser'
import he from 'he'
import { DRUPAL_ENDPOINT } from '../constants/apiConstants'

const noSpan = (htmlString = '') => htmlString.replaceAll(/<\/?span>/g, '').replaceAll('&nbsp;', '')
const parseWithNoSpan = (htmlString = '') => parse(noSpan(he.decode(htmlString)))
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