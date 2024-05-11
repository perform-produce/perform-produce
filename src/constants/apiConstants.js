const mapApiConstants = (collection, prefix) => {
  Object.keys(collection)
    .forEach(key => collection[key] = prefix + collection[key])
  return collection
}

export const PARAGRAPH_CLASS_NAME = 'paragraph'

export const PARAGRAPH_CLASSES = mapApiConstants(
  {
    PARAGRAPH: 'paragraph',
    INTERVIEW_SECTION_PARAGRAPH: 'interview-section',
  },
  'paragraph--type--'
)


export const FIELD_CLASSES = mapApiConstants(
  {
    PARAGRAPH: 'paragraph',

    CITATION_TITLE: 'citation-title',
    CITATION_SUBTITLE: 'citation-subtitle',
    CITATION_BODY: 'citation-body',
    CITATION_IMG: 'citation-image',
    CITATION_THE_BODY_AS: 'the-body-as',

    IMG: 'image',
    IMG_ALIGN_RIGHT: 'image-align-right',
    IMG_CAPTION: 'image-caption',
    IMG_NO_MULTIPLY: 'no-multiply',
    IMG_FULL_WIDTH: 'full-width',

    SIDE_ANNOTATIONS: 'side-annotations',
    INTERVIEW_SPEAKER: 'interview-speaker',

    APPENDIX_NUMBER: 'appendix-number',
    APPENDIX_IMAGE_1: 'appendix-image-1',
    APPENDIX_IMAGE_2: 'appendix-image-2',
    APPENDIX_TITLE: 'appendix-title',
    APPENDIX_TYPE: 'appendix-type',
    APPENDIX_METRICS: 'appendix-metrics',
    APPENDIX_BODY: 'appendix-body',

    RULER_DESCRIPTION: 'ruler-description',
    RULER_UNITS: 'ruler-units-of-measurement',
    RULER_PURPOSE: 'ruler-purpose',
    RULER_DETAILS: 'ruler-details',
  },
  'field--name-field-'
)

export const FIELDS = mapApiConstants(
  {
    SECTION_ID: 'section_id',
    ESSAY_CONTENT: 'essay_content',
    HOVER_CITATIONS: 'hover_citations',
    INTERVIEW_SUBTITLE: 'interview_subtitle',
    INTERVIEW_SECTION: 'interview_section',
    INTERVIEW_INTERVIEWEE: 'interviewee',
    INTERVIEW_PULL_QUOTE_TITLE: 'pull_quote_title',
    INTERVIEW_PULL_QUOTE_BODY: 'pull_quote_body',
    INTERVIEW_PULL_QUOTE_PAGE_NUMBER: 'pull_quote_page_number',
    INTERVIEW_INTRO: 'interview_intro',
    PERFORMING_BODY: 'the_performing_body_entry',
    FOOTER_COPYRIGHT: 'footer_copyright',
    FOOTER_CREDENTIALS: 'footer_credentials',
    FOOTER_DISCLAIMER: 'footer_disclaimer',
    ABOUT: 'about',
    CREDITS: 'credits'
  },
  'field_'
)


export const BRIDGET_BODY_UUID = '1a69da58-ec1b-4297-8053-e525d05214d6'
export const PERFORMING_BODY_UUID = '37489294-5229-4639-8b59-9622b8fd63d9'
export const RULERS_UUID = 'dfdd4c54-826c-490d-b859-fce65c1cf90f'
export const APPENDIX_UUID = '2e0d1a6e-b879-4995-8933-377e7efab275'
export const ABOUT_UUID = '010715e8-d9d9-487a-b4af-7d92939aed57'
export const FOOTER_UUID = '2d4b607b-1b4c-4fed-8b11-b331a3678d83'
export const UUID_LIST = [
  'dfbd1abd-990c-4d4e-a11f-8ce0214e8856',
  BRIDGET_BODY_UUID,
  PERFORMING_BODY_UUID,
  '7c14fb73-8d5f-4f8f-8236-67b93188255c',
  '33b481a0-7166-41c6-ae88-e6f08cf16062',
  'f658fa2e-a44c-49fb-ac7e-be2a4597916d',
  RULERS_UUID
]

export const DRUPAL_ENDPOINT = 'https://rw-sux.iamasq.works'