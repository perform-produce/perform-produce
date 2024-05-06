import styled from 'styled-components'
import Grid from './common/grid'
import GridItem from './common/gridItem'
import { useState } from 'react'
import mixins from '../utils/mixins'
import { emify } from '../utils/stylesBase'

const About = () => {
  const [isCreditShown, setIsCreditShown] = useState(false)
  return (
    <Cover>
      <GridItem $end='span 6'>
        <p>Perform — Produce is an MFA thesis by Rebecca Wilkinson at the Rhode Island School of Design. This project was developed in 2024 under the guidance and with the support of Pouya Ahmadi, Bethany Johns, Anther Kiley, Wael Morcos, Ali S. Qadeer, and Ryan Waller.</p>
        <p>To see more of Rebecca’s work, visit her personal website here. If you’d like to get in touch, email rebeccawilkI@gmail.com.</p>
      </GridItem>
      {isCreditShown ?
        <Credits $start={10} $end='span 3'>
          <p>Site design: Rebecca Wilkinson</p>
          <p>Site development: Donald Zhu</p>
          <p>Font: OPS Placard</p>
        </Credits> :
        <CreditToggle $end={13}>
          <button onClick={() => setIsCreditShown(true)}>
            <div>?</div>
          </button>
        </CreditToggle>
      }
    </Cover>
  )
}

const Credits = styled(GridItem)``
const Cover = styled(Grid)`
  ${mixins.cover()}

  ${Credits} {
    > p {
      margin: 0;
    }
  }
`

const CreditToggle = styled(GridItem)`
  ${mixins.flex()}
  justify-self: right;

  button {
    width: ${emify(50)};
    aspect-ratio: 1;
    border: solid black 2px;
    border-radius: 1em;
    cursor: pointer;

    &:active {
      background-color: #E5E5E5;
    }

    div {
      position: relative;
      top: -0.05em;
    }
  }
`



export default About