import { DRUPAL_ENDPOINT } from '../constants'
import { querySelectorArray, validateString } from '../utils/commonUtils'
import httpServices from './httpServices'
import parse from 'html-react-parser'
import he from 'he'

const getParagraphClass = className => 'paragraph--type--' + className
const getField = fieldName => 'field_' + fieldName
const getFieldClass = className => 'field--name-field-' + className

const PARAGRAPH = 'paragraph'
const BLOCK_PARAGRAPH = getParagraphClass('paragraph')
const INTERVIEW_SECTION_PARAGRAPH = getParagraphClass('interview-section')

const BLOCK_PARAGRAPH_TEXT = getFieldClass('paragraph')

const CITATION_TITLE = getFieldClass('citation-title')
const CITATION_SUBTITLE = getFieldClass('citation-subtitle')
const CITATION_BODY = getFieldClass('citation-body')
const CITATION_IMG = getFieldClass('citation-image')
const CITATION_THE_BODY_AS = getFieldClass('the-body-as')

const IMG = getFieldClass('image')
const IMG_ALIGNMENT = getFieldClass('image-alignment')
const IMG_CAPTION = getFieldClass('image-caption')

const SIDE_ANNOTATIONS = getFieldClass('side-annotations')
const INTERVIEW_SPEAKER = getFieldClass('interview-speaker')

const SECTION_ID = getField('section_id')
const ESSAY_CONTENT = getField('essay_content')
const HOVER_CITATIONS = getField('hover_citations')
const INTERVIEW_SUBTITLE = getField('interview_subtitle')
const INTERVIEW_SECTION = getField('interview_section')
const INTERVIEW_INTERVIEWEE = getField('interviewee')
const INTERVIEW_PULL_QUOTE_TITLE = getField('pull_quote_title')
const INTERVIEW_PULL_QUOTE_BODY = getField('pull_quote_body')
const INTERVIEW_PULL_QUOTE_PAGE_NUMBER = getField('pull_quote_page_number')
const INTERVIEW_INTRO = getField('interview_intro')

const removeSpan = (htmlString = '') => htmlString.replaceAll(/<\/?span>/g, '')
const parseNoSpan = (htmlString = '') => parse(removeSpan(he.decode(htmlString)))
const strip = (htmlString = '') => parseNoSpan((htmlString?.match(/(?<=<p>)(.*?)(?=<\/p>)/) || [])[0])

const redirectSrc = src => validateString(src, DRUPAL_ENDPOINT + src?.replace(window.location.origin, ''))
const extractImgData = html => {
  if (!html) return {}
  if (typeof html === 'string') {
    const tempDiv = document.createElement('div')
    tempDiv.innerHTML = html
    html = tempDiv
  }

  const { src, alt } = html.querySelector('img')
  return { src: redirectSrc(src), alt }
}

const getBlocks = content => {
  const tempHtml = document.createElement('div')
  tempHtml.innerHTML = content

  return querySelectorArray(
    tempHtml
      .children[0]
      .children[0],
    `li > .${PARAGRAPH}`
  )
}

const getCitations = content => getBlocks(content[HOVER_CITATIONS]).map(parseCitations)
const getContents = async () =>
  (await httpServices.get(`${DRUPAL_ENDPOINT}/web/json/contents`)).data


const getEssay = contents =>
  contents.filter(content => content.type === 'Essay')
    .map(essay => ({
      uuid: essay.uuid,
      title: essay.title,
      sectionId: essay[SECTION_ID],
      blocks: parseBlocks(essay, ESSAY_CONTENT),
      citations: getCitations(essay)
    }))


const getInterview = contents =>
  contents.filter(content => content.type === 'Interview')
    .map(interview => ({
      uuid: interview.uuid,
      title: interview.title,
      sectionId: interview[SECTION_ID],
      subtitle: interview[INTERVIEW_SUBTITLE],
      interviewee: interview[INTERVIEW_INTERVIEWEE],
      pullQuote: {
        title: interview[INTERVIEW_PULL_QUOTE_TITLE],
        body: interview[INTERVIEW_PULL_QUOTE_BODY],
        pageNumber: interview[INTERVIEW_PULL_QUOTE_PAGE_NUMBER]
      },
      intro: interview[INTERVIEW_INTRO],
      blocks: parseBlocks(interview, INTERVIEW_SECTION),
      citations: getCitations(interview)
    }))

const getAppendices = contents => {
  return contents.filter(content => content.type === 'Appendix')
    .sort((a, b) => parseInt(a.field_appendix_order) - parseInt(b.field_appendix_order))
    .map(appendix => ({
      title: appendix.title,
      type: appendix.field_appendix_type,
      metrics: appendix.field_appendix_metrics,
      images: [
        extractImgData(appendix.field_appendix_image_1),
        extractImgData(appendix.field_appendix_image_2),
      ],
      body: appendix.field_appendix_body,
      number: appendix.field_appendix_number
    }))
}

const getPerformingBody = contents => {
  const essay = contents.find(content => content.uuid === '37489294-5229-4639-8b59-9622b8fd63d9')
  const entries = getBlocks(essay.field_the_performing_body_entry)
    .map(entry => {
      const { getContent } = getContentParsers(entry)
      return {
        ...extractImgData(entry),
        title: getContent(CITATION_TITLE),
        subtitle: getContent(CITATION_SUBTITLE),
        text: getContent(CITATION_THE_BODY_AS),
      }
    })
  return {
    title: essay.title,
    sectionId: essay[SECTION_ID],
    entries
  }
}

const getBlockParser = (block, type, parser) => ({ type, content: parser(block) })
const parseBlocks = (content, fieldName) =>
  getBlocks(content[fieldName]).map(block =>
    block.classList.contains(INTERVIEW_SECTION_PARAGRAPH) ?
      getBlockParser(block, 'section', parseInterviewSection) :
      block.classList.contains(BLOCK_PARAGRAPH) ?
        getBlockParser(block, 'paragraph', parseParagraph) :
        getBlockParser(block, 'image', parseImg)
  )

const parseCitations = elem => {
  const { getContent, getItem } = getContentParsers(elem)
  return {
    ...extractImgData(getItem(CITATION_IMG)),
    title: getContent(CITATION_TITLE),
    subtitle: getContent(CITATION_SUBTITLE),
    body: getContent(CITATION_BODY),
  }
}

const parseParagraph = elem => getContent(elem, BLOCK_PARAGRAPH_TEXT)

const parseImg = elem => {
  const { getItem, getContent } = getContentParsers(elem)
  return {
    ...extractImgData(getItem(IMG)),
    alignLeft: getContent(IMG_ALIGNMENT) === 'Left',
    caption: getContent(IMG_CAPTION)
  }
}

const parseInterviewSection = elem => ({
  speaker: getContent(elem, INTERVIEW_SPEAKER),
  body: parseParagraph(elem),
  annotations: getItems(elem, SIDE_ANNOTATIONS)
    .map(annotation => {
      const annotationContainer = annotation.children[0]
      return annotationContainer.children.length ? parseImg(annotationContainer) : undefined
    })
    .filter(a => a)
})

const getFieldItemQuery = (className, plural) => `.${className} > div.field__item${validateString(plural, 's')}`
const getItem = (elem, className) => elem.querySelector(getFieldItemQuery(className))
const getItems = (elem, className) => Array.from(elem.querySelectorAll(getFieldItemQuery(className, true))[0]?.children || [])
const getContent = (elem, className) => getItem(elem, className)?.innerHTML

const getContentParsers = elem => ({
  getItem: className => getItem(elem, className),
  getItems: className => getItems(elem, className),
  getContent: className => getContent(elem, className)
})

const drupalServices = {
  removeSpan,
  parseNoSpan,
  strip,
  redirectSrc,
  getContents,
  getEssay,
  getInterview,
  getAppendices,
  getPerformingBody
}

export default drupalServices