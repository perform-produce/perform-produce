import styled from 'styled-components'
import GridItem from './gridItem'
import mixins from '../../utils/mixins'
import FilteredImg from './filteredImg'

const Img = ({ src, caption, transparent, fullWidth }) => {
  return (
    <Figure $start={fullWidth ? 1 : 2} $end={fullWidth ? 13 : 10} as='figure'>
      <FilteredImg src={'assets/images/' + src} alt={caption} as='img' $start={1} $end={fullWidth ? 9 : 5} $isTransparent={transparent} />
      <FigCaption $start={fullWidth ? 9 : 5} $end={fullWidth ? 13 : 9} as='figcaption'>←<br />{caption}</FigCaption>
    </Figure>
  )
}

const Figure = styled(GridItem)`
  ${mixins.grid}
  align-items: end;
`

const FigCaption = styled(GridItem)`
  padding-left: 1em;
  padding-right: 1em;
`
export default Img