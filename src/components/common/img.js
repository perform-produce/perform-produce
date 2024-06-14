import styled from 'styled-components'
import { MOBILE_FIGURE_GAP, MOBILE_LINE_HEIGHT, MOBILE_VERT_GAP } from '../../constants/styleConstants'
import useIsMobile from '../../hooks/useIsMobile'
import mixins from '../../utils/mixins'
import FilteredImg from './filteredImg'
import GridItem from './gridItem'


const Img = ({ src, alt, width, height, caption, noMultiply, fullWidth }) => {
  const isMobile = useIsMobile()
  const Figure = isMobile ? MobileFigure : DesktopFigure
  const Caption = isMobile ? MobileCaption : GridItem

  return (
    <Figure $start={fullWidth ? 1 : 2} $end={fullWidth ? 13 : 11} as='figure'>
      <FilteredImg
        as='img'
        src={src}
        alt={alt}
        width={width}
        height={height}
        $start={1}
        $end={fullWidth ? 9 : 5}
        noMultiply={noMultiply} />
      <Caption $start={fullWidth ? 9 : 5} $end={fullWidth ? 13 : 10} as='figcaption'>
        {isMobile ? '↑' : '←'}
        <br />
        {caption}
      </Caption>
    </Figure>
  )
}

const DesktopFigure = styled(GridItem)`
  ${mixins.grid}
  align-items: end;
`

const MobileFigure = styled.figure`
  margin: 0;
  margin-top: ${MOBILE_LINE_HEIGHT};
  img {
    display: block;
  }
`

const MobileCaption = styled.figcaption`
  margin: ${MOBILE_LINE_HEIGHT} 0 ${MOBILE_VERT_GAP};
`

export default Img