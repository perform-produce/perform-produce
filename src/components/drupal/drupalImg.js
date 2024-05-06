import drupalServices from '../../services/drupalServices'
import Img from '../common/img'

const DrupalImg = ({ content }) => {
  const { src, alt, alignLeft, caption } = content
  return <Img
    src={src}
    alt={alt}
    caption={drupalServices.parseNoSpan(caption)}
    alignLeft={alignLeft}
    transparent />
}


export default DrupalImg