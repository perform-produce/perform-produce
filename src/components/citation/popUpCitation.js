import styled from 'styled-components'
import mixins from '../../utils/mixins'
import { IMG_POPUP_GRID_SPAN, POP_UP_TOP_PADDING, TEXT_POPUP_GRID_SPAN } from '../../constants/styleConstants'
import { conditionalStyle, wordSpace } from '../../utils/styleUtils'
import GridItem from '../common/gridItem'
import FilteredImg from '../common/filteredImg'
import { useContext } from 'react'
import { SectionContext } from '../../contexts/context'
import { validateString } from '../../utils/commonUtils'

const PopUpCitation = ({
  x = 0,
  y = 0,
  width,
  number,
  shouldCenter = true,
  alt,
  header,
  subheader,
  src,
  children,
  backgroundColor,
  noMultiply,
  handleMouseLeave
}) => {
  const { onPopUpEnter } = useContext(SectionContext)
  return (
    <PopUp
      style={{ left: x, top: y }}
      onMouseEnter={onPopUpEnter}
      onMouseLeave={handleMouseLeave}
      as={'span'}
      $width={width}
      $span={src ? IMG_POPUP_GRID_SPAN : TEXT_POPUP_GRID_SPAN}
      $shouldCenter={shouldCenter}
      $backgroundColor={backgroundColor}>
      {src && <FilteredImg src={src} alt={alt} noMultiply={noMultiply} />}
      <TextContainer>
        <HeaderContainer>
          <SpanBlock>{validateString(number, `${number}.`)}</SpanBlock>
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
  transform: ${conditionalStyle('$shouldCenter', 'translateY(-50%)')};
  overflow: hidden;
  cursor: default;

  &, span, p, img {
    text-indent: 0;
  }

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
    aspect-ratio: 7 / 4;
    position: relative;
    left: ${-cropPx}px;
    top: ${-cropPx}px;
  }
`

const SpanBlock = styled.span`
  display: block;
`


const TextContainer = styled.span`
  padding: ${POP_UP_TOP_PADDING} 1em;
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