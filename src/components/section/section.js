import useIsMobile from '../../hooks/useIsMobile'
import MobileSection from '../mobile/mobileSection'
import DesktopSection from './desktopSection'


const Section = props => useIsMobile() ?
  <MobileSection  {...props} /> :
  <DesktopSection {...props} />

export default Section