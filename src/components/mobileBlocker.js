import styled from 'styled-components'
import { lineHeight } from '../utils/styleUtils'
import { emify } from '../utils/stylesBase'


const MobileBlocker = () => {
  return (
    <Container>
      <p>Please visit this site on your desktop computer.</p>
      <p>A mobile—friendly site will be launched by Summer 2024.</p>
      <img src='assets/RebeccaWilkinson_Thesis_RISD_Landing_GIF.gif' alt='' />
    </Container>
  )
}

const Container = styled.div`
  width: 100vw;
  height: 100dvh;
  position: fixed;
  top: 0;
  left: 0;
  box-sizing: border-box;
  padding: ${emify(20)};
  overflow-y: scroll;

  p:not(:first-child) {
    margin-top: ${lineHeight(1)};
  }

  img, video {
    margin: ${lineHeight(1)} 0;
    width: 100%;
  }
`

export default MobileBlocker
