import { useContext } from 'react'
import styled from 'styled-components'
import _ from 'lodash'
import { PopUpContext } from '../../contexts/context'
import WhiteSpace from './whitespace'

const Citation = ({ number, ...rest }) => {
  const { onCitationHover } = useContext(PopUpContext)
  return (
    <>
      <WhiteSpace> </WhiteSpace>
      <StyledCitation onMouseEnter={e => onCitationHover(e, { number, ...rest })}>
        [{_.padStart(`${number}`, 2, '0')}]
      </StyledCitation >
    </>
  )
}

const StyledCitation = styled.span`
  cursor: default;
`

export default Citation