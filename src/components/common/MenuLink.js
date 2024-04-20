import { Link, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import mixins from '../../utils/mixins'

const MenuLink = ({ to, noUnderline, ...rest }) => {
  const location = useLocation()
  const pathRegex = new RegExp(`${to}$`)
  return (
    <StyledLink
      {...rest}
      $shouldUnderline={!noUnderline && location.pathname.match(pathRegex)}
      to={to} />
  )
}

const StyledLink = styled(Link)`
  ${({ $shouldUnderline }) => $shouldUnderline ? mixins.underline() : undefined}
`

export default MenuLink