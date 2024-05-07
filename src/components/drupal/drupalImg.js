import parserServices from '../../services/parserServices'
import Img from '../common/img'

const DrupalImg = ({ content }) => {
  const { src, alt, alignLeft, caption } = content
  return <Img
    src={src}
    alt={alt}
    caption={parserServices.parseWithNoSpan(caption)}
    alignLeft={alignLeft}
    transparent />
}


export default DrupalImg