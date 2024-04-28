import styled from 'styled-components'
import mixins from '../../utils/mixins'
import { GAP, IMG_POPUP_GRID_SPAN, TEXT_POPUP_GRID_SPAN } from '../../constants'
import { emify, wordSpace } from '../../utils/styleUtils'
import GridItem from './gridItem'
import FilteredImg from './filteredImg'

const PopUpCitation = ({
  x,
  y,
  number,
  alt,
  header,
  subheader,
  src,
  children,
  handleMouseLeave,
  backgroundColor
}) => {
  return (
    <PopUp
      style={{ left: x, top: y }}
      onMouseLeave={handleMouseLeave}
      as={src ? 'figure' : undefined}
      $span={src ? IMG_POPUP_GRID_SPAN : TEXT_POPUP_GRID_SPAN}
      $backgroundColor={backgroundColor}>
      {src && <FilteredImg src={src} alt={alt} />}
      <TextContainer as={src ? 'figcaption' : undefined}>
        <HeaderContainer>
          <div>{number}.</div>
          <div>
            <Header>{header}</Header>
            <p>{subheader}</p>
          </div>
        </HeaderContainer>
        <div>{children}</div>
      </TextContainer>
    </PopUp>
  )
}

const PopUp = styled(GridItem)`
  position: absolute;
  box-sizing: border-box;

  border: 1.5px dashed black;
  left: ${GAP};
  transform: translateY(-50%);
  cursor: default;

  ${props => mixins
    .chain()
    .highZIndex(2)
    .background(props)
    .spansCol(props.$span)}
`

const TextContainer = styled.div`
  padding: ${emify(10)} 1em ${emify(22.5)};
`

const HeaderContainer = styled.hgroup`
  display: flex;
  :first-child {
    width: ${wordSpace(4)};
    flex: none;
  }
`

const Header = styled.h4`
  display: inline;
`

export default PopUpCitation