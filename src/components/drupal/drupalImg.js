import parserServices from '../../services/parserServices'
import Img from '../common/img'

const DrupalImg = ({ content }) => {
  const { src, alt, width, height, caption, noMultiply, fullWidth } = content
  return <Img
    src={src}
    alt={alt}
    width={width}
    height={height}
    caption={parserServices.parseWithNoSpan(caption)}
    noMultiply={noMultiply}
    fullWidth={fullWidth} />
}


export default DrupalImg