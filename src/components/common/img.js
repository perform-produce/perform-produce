import styled from 'styled-components'
import GridItem from './gridItem'
import mixins from '../../utils/mixins'
import FilteredImg from './filteredImg'

const Img = ({ src, alt, caption, noMultiply, fullWidth }) => {
  return (
    <Figure $start={fullWidth ? 1 : 2} $end={fullWidth ? 13 : 10} as='figure'>
      <FilteredImg src={src} alt={alt} as='img' $start={1} $end={fullWidth ? 9 : 5} noMultiply={noMultiply} />
      <GridItem $start={fullWidth ? 9 : 5} $end={fullWidth ? 13 : 9} as='figcaption'>←<br />{caption}</GridItem>
    </Figure>
  )
}

const Figure = styled(GridItem)`
  ${mixins.grid}
  align-items: end;
`

export default Img