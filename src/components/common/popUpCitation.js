import styled from 'styled-components'
import mixins from '../../utils/mixins'
import { IMG_POPUP_GRID_SPAN, TEXT_POPUP_GRID_SPAN } from '../../constants'
import { emify, wordSpace } from '../../utils/styleUtils'
import GridItem from './gridItem'
import FilteredImg from './filteredImg'
import { useContext } from 'react'
import { SectionContext } from '../../contexts/context'

const PopUpCitation = ({
  x,
  y,
  width,
  number,
  alt,
  header,
  subheader,
  src,
  children,
  backgroundColor,
  handleMouseLeave
}) => {
  const { onPopUpEnter } = useContext(SectionContext)
  console.log(number, header, subheader)
  return (
    <PopUp
      style={{ left: x, top: y }}
      onMouseEnter={onPopUpEnter}
      // onMouseLeave={handleMouseLeave}
      as={'span'}
      $width={width}
      $span={src ? IMG_POPUP_GRID_SPAN : TEXT_POPUP_GRID_SPAN}
      $backgroundColor={backgroundColor}>
      {src && <FilteredImg src={src} alt={alt} />}
      <TextContainer>
        <HeaderContainer>
          <SpanBlock>{number}.</SpanBlock>
          <SpanBlock>
            <SpanBlock>{header}</SpanBlock>
            <SpanBlock>{subheader}</SpanBlock>
          </SpanBlock>
        </HeaderContainer>
        <SpanBlock>{children}</SpanBlock>
      </TextContainer>
    </PopUp>
  )
}

const cropPx = 3
const PopUp = styled(GridItem)`
  display: block;
  position: absolute;
  box-sizing: border-box;
  margin: 0;
  border: 1.5px dashed black;
  transform: translateY(-50%);
  overflow: hidden;
  cursor: default;

  ${props =>
    mixins
      .chain()
      .highZIndex(2)
      .background(props)() +
    (props.$width ?
      `width: ${props.$width};` :
      mixins.spansCol(props.$span))
  }

  img {
    width: calc(100% + ${cropPx * 2}px);
    position: relative;
    left: ${-cropPx}px;
    top: ${-cropPx}px;
  }
`

const SpanBlock = styled.span`
  display: block;
`


const TextContainer = styled.span`
  padding: ${emify(10)} 1em ${emify(22.5)};
  display: block;
`

const HeaderContainer = styled.span`
  display: flex;
  > :first-child {
    width: ${wordSpace(4)};
    flex: none;
  }
`


export default PopUpCitation