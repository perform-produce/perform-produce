import { useContext } from 'react'
import styled from 'styled-components'
import { PopUpContext } from '../../contexts/context'
import WhiteSpace from './whitespace'

const Citation = ({ number, ...rest }) => {
  const { onCitationHover, prefix } = useContext(PopUpContext)
  return (
    <>
      <WhiteSpace> </WhiteSpace>
      <StyledCitation onMouseEnter={e => onCitationHover(e, { number, ...rest })}>
        [{prefix + number}]
      </StyledCitation >
      <WhiteSpace> </WhiteSpace>
    </>
  )
}

const StyledCitation = styled.span`
  cursor: default;
`

export default Citation