import { validateString } from '../utils/commonUtils'
import httpServices from './httpServices'
import parserServices from './parserServices'
import { PARAGRAPH_CLASS_NAME, PARAGRAPH_CLASSES, FIELD_CLASSES, FIELDS, UUID_LIST, DRUPAL_ENDPOINT, APPENDIX_UUID, FOOTER_UUID } from '../constants/apiConstants'

const querySelectorArray = (elem, query) => Array.from(elem.querySelectorAll(query))
const createHtml = htmlString => {
  const tempDiv = document.createElement('div')
  tempDiv.innerHTML = htmlString
  return tempDiv
}

const images = []
const extractImgData = html => {
  if (!html) return {}
  if (typeof html === 'string')
    html = createHtml(html)

  const { src, alt } = html.querySelector('img')
  const parsedSrc = parserServices.redirectSrc(src)
  images.push(parsedSrc)
  return { src: parsedSrc, alt }
}

const getBlocks = content => querySelectorArray(
  createHtml(content)
    .children[0]
    .children[0],
  `li > .${PARAGRAPH_CLASS_NAME}`
)

const getCitations = content =>
  getBlocks(content[FIELDS.HOVER_CITATIONS]).map(parseCitations)

const data = (
  async () => {
    const { data } = (await httpServices.get(`${DRUPAL_ENDPOINT}/web/json/contents`))
    return {
      contents: UUID_LIST.map(uuid => data.find(content => content.uuid === uuid)),
      appendix: data.find(({ uuid }) => uuid === APPENDIX_UUID),
      footer: data.find(({ uuid }) => uuid === FOOTER_UUID)
    }
  }
)()

const getBasicData = (content, {
  blockKey,
  withCitations,
  isInterview
} = {}) => {
  let results = {
    uuid: content.uuid,
    title: content.title,
    sectionId: content[FIELDS.SECTION_ID],
  }

  if (blockKey) results.blocks = parseBlocks(content, blockKey)
  if (withCitations) results.citations = getCitations(content)
  if (isInterview) results = {
    ...results,
    subtitle: content[FIELDS.INTERVIEW_SUBTITLE],
    interviewee: content[FIELDS.INTERVIEW_INTERVIEWEE],
    pullQuote: {
      title: content[FIELDS.INTERVIEW_PULL_QUOTE_TITLE],
      body: content[FIELDS.INTERVIEW_PULL_QUOTE_BODY],
      pageNumber: content[FIELDS.INTERVIEW_PULL_QUOTE_PAGE_NUMBER]
    },
    intro: content[FIELDS.INTERVIEW_INTRO],
  }

  return results
}

const getMenuLinks = contents => contents.map(
  content => ({
    title: content.title,
    sectionId: content[FIELDS.SECTION_ID]
  })
)

const getEssay = content => getBasicData(content, {
  blockKey: FIELDS.ESSAY_CONTENT,
  withCitations: true
})

const getInterview = content => getBasicData(content, {
  blockKey: FIELDS.INTERVIEW_SECTION,
  withCitations: true,
  isInterview: true
})

const getPerformingBody = content => ({
  ...getBasicData(content),
  entries: getBlocks(content[FIELDS.PERFORMING_BODY])
    .map(entry => {
      const { getContent } = getContentParsers(entry)
      return {
        ...extractImgData(entry),
        title: getContent(FIELD_CLASSES.CITATION_TITLE),
        subtitle: getContent(FIELD_CLASSES.CITATION_SUBTITLE),
        text: getContent(FIELD_CLASSES.CITATION_THE_BODY_AS),
      }
    })
})


const getDougScottsRulers = content => ({
  ...getBasicData(content, { isInterview: true }),
  entries: getBlocks(content.field_ruler_section)
    .map(entry => {
      const { getContent } = getContentParsers(entry)
      return {
        ...extractImgData(entry),
        description: getContent(FIELDS.RULER_DESCRIPTION),
        units: getContent(FIELDS.RULER_UNITS),
        purpose: getContent(FIELDS.RULER_PURPOSE),
        details: getContent(FIELDS.RULER_DETAILS)
      }
    })
})

const getFooter = content => ({
  copyright: content[FIELDS.FOOTER_COPYRIGHT],
  credentials: content[FIELDS.FOOTER_CREDENTIALS],
  disclaimer: content[FIELDS.FOOTER_DISCLAIMER],
})


const getAppendices = ({ title, ...appendices }) => ({
  title,
  appendices: getBlocks(appendices.field_appendix)
    .map(appendix => {
      const { getContent } = getContentParsers(appendix)
      return {
        number: getContent(FIELD_CLASSES.APPENDIX_NUMBER),
        images: [
          extractImgData(getContent(FIELD_CLASSES.APPENDIX_IMAGE_1)),
          extractImgData(getContent(FIELD_CLASSES.APPENDIX_IMAGE_2)),
        ],
        title: getContent(FIELD_CLASSES.APPENDIX_TITLE),
        type: getContent(FIELD_CLASSES.APPENDIX_TYPE),
        metrics: getContent(FIELD_CLASSES.APPENDIX_METRICS),
        body: getContent(FIELD_CLASSES.APPENDIX_BODY)
      }
    })
})

const getBlockParser = (block, type, parser) => ({ type, content: parser(block) })
const parseBlocks = (content, fieldName) => {
  return getBlocks(content[fieldName]).map(block =>
    block.classList.contains(PARAGRAPH_CLASSES.INTERVIEW_SECTION_PARAGRAPH) ?
      getBlockParser(block, 'section', parseInterviewSection) :
      block.classList.contains(PARAGRAPH_CLASSES.PARAGRAPH) ?
        getBlockParser(block, 'paragraph', parseParagraph) :
        getBlockParser(block, 'image', parseImg)
  )
}

const parseCitations = elem => {
  const { getContent, getItem } = getContentParsers(elem)
  const result = {
    ...extractImgData(getItem(FIELD_CLASSES.CITATION_IMG)),
    title: getContent(FIELD_CLASSES.CITATION_TITLE),
    subtitle: getContent(FIELD_CLASSES.CITATION_SUBTITLE),
    body: getContent(FIELD_CLASSES.CITATION_BODY),
  }
  return result
}

const parseParagraph = elem => getContent(elem, FIELD_CLASSES.PARAGRAPH)

const parseImg = elem => {
  const { getItem, getContent } = getContentParsers(elem)
  return {
    ...extractImgData(getItem(FIELD_CLASSES.IMG)),
    caption: getContent(FIELD_CLASSES.IMG_CAPTION)
  }
}

const parseInterviewSection = elem => {
  return {
    speaker: getContent(elem, FIELD_CLASSES.INTERVIEW_SPEAKER),
    body: parseParagraph(elem),
    annotations: getItems(elem, FIELD_CLASSES.SIDE_ANNOTATIONS)
      .map(annotation => {
        const annotationContainer = annotation.children[0]
        return annotationContainer.children.length ? parseImg(annotationContainer) : undefined
      })
      .filter(a => a)
  }
}

const getFieldItemQuery = (className, plural) => `.${className} > div.field__item${validateString(plural, 's')}`
const getItem = (elem, className) => elem.querySelector(getFieldItemQuery(className))
const getItems = (elem, className) => Array.from(elem.querySelectorAll(getFieldItemQuery(className, true))[0]?.children || [])
const getContent = (elem, className) => getItem(elem, className)?.innerHTML

const getContentParsers = elem => ({
  getItem: className => getItem(elem, className),
  getItems: className => getItems(elem, className),
  getContent: className => getContent(elem, className)
})

const apiServices = {
  data,
  images,
  getMenuLinks,
  getEssay,
  getInterview,
  getPerformingBody,
  getDougScottsRulers,
  getFooter,
  getAppendices,
}

export default apiServices