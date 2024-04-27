import { Link, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import mixins from '../../utils/mixins'
import { extractStyle } from '../../utils/styleUtils'

const MenuItem = ({ to, forceUnderline, hoverUnderlineOnly, ...rest }) => {
  const location = useLocation()
  const pathRegex = new RegExp(`${to}$`)
  return (
    <StyledLink
      {...rest}
      to={to}
      as={to ? undefined : 'p'}
      $shouldUnderline={forceUnderline || (!hoverUnderlineOnly && location.pathname.match(pathRegex))}
      $cursor={to ? 'pointer' : 'default'} />
  )
}

const StyledLink = styled(Link)`
  cursor: ${extractStyle('$cursor')};
  ${({ $shouldUnderline }) => $shouldUnderline ? mixins.underline() : undefined}
  &:hover {
    ${mixins.underline}
  }
`

export default MenuItem