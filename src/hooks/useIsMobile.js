import { useMediaQuery } from '@uidotdev/usehooks'
import { MOBILE_QUERY } from '../constants/styleConstants'

const useIsMobile = () =>
  useMediaQuery(`only screen and (${MOBILE_QUERY})`)

export default useIsMobile