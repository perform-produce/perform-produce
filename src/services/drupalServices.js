import { DRUPAL_ENDPOINT } from '../constants'
import { querySelectorArray, validateString } from '../utils/commonUtils'
import httpServices from './httpServices'
import parse, { domToReact } from 'html-react-parser'

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


const removeSpan = (htmlString = '') => htmlString.replaceAll(/<\/?span>/g, '')
const parseNoSpan = (htmlString = '') => parse(removeSpan(htmlString))

const redirectSrc = src => validateString(src, DRUPAL_ENDPOINT + src?.replace(window.location.origin, ''))

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
      blocks: getBlocks(essay[ESSAY_CONTENT]).map(parseBlock),
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
      blocks: getBlocks(interview[INTERVIEW_SECTION])
        .map(block => block.classList.contains(INTERVIEW_SECTION_PARAGRAPH) ? {
          type: 'section',
          content: parseInterviewSection(block)
        } : parseBlock(block)), // TODO
      citations: getCitations(interview)
    }))


const parseBlock = block => {
  return block.classList.contains(BLOCK_PARAGRAPH) ? {
    type: 'paragraph',
    content: parseParagraph(block)
  } : {
    type: 'image',
    content: parseImg(block)
  }
}

const parseCitations = elem => {
  const { getContent, getItem } = getContentParsers(elem)
  const imgContainer = getItem(CITATION_IMG)
  const { src, alt } = imgContainer ? imgContainer.querySelector('img') : {}
  return {
    title: getContent(CITATION_TITLE),
    subtitle: getContent(CITATION_SUBTITLE),
    body: getContent(CITATION_BODY),
    src: redirectSrc(src),
    alt
  }
}

const parseParagraph = elem => getContent(elem, BLOCK_PARAGRAPH_TEXT)

const parseImg = elem => {
  const { getItem, getContent } = getContentParsers(elem)
  const img = getItem(IMG).querySelector('img')
  const { src, alt } = img
  return {
    src: redirectSrc(src),
    alt,
    alignLeft: getContent(IMG_ALIGNMENT) === 'Left',
    caption: getContent(IMG_CAPTION)
  }
}

const parseInterviewSection = elem => {
  return {
    speaker: getContent(elem, INTERVIEW_SPEAKER),
    body: parseParagraph(elem),
    annotations: getItems(elem, SIDE_ANNOTATIONS)
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

const getContentParsers = elem => {
  const _getItem = className => getItem(elem, className)
  const _getItems = className => getItems(elem, className)
  const _getContent = className => getContent(elem, className)
  return {
    getItem: _getItem,
    getItems: _getItems,
    getContent: _getContent
  }
}

const drupalServices = {
  removeSpan,
  parseNoSpan,
  getContents,
  getEssay,
  getInterview
}

export default drupalServices