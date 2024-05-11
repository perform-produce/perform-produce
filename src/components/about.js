import styled from 'styled-components'
import Grid from './common/grid'
import GridItem from './common/gridItem'
import { useState } from 'react'
import mixins from '../utils/mixins'
import { emify } from '../utils/stylesBase'
import { VERT_GAP } from '../constants/styleConstants'
import apiServices from '../services/apiServices'
import parserServices from '../services/parserServices'

const About = ({ data }) => {
  const [isCreditShown, setIsCreditShown] = useState(false)
  const aboutData = data && apiServices.getAbout(data)
  const { about, credits } = aboutData ?? {}

  const parser = html => parserServices.parseWithNoSpan(html, parserServices.linkToBlankConfig)
  return (
    <Cover>
      {
        aboutData &&
        <>
          <GridItem $end='span 8'>{parser(about)}</GridItem>
          {isCreditShown ?
            <Credits $start={10} $end='span 3'>
              {parser(credits)}
            </Credits> :
            <CreditToggle $end={13}>
              <button onClick={() => setIsCreditShown(true)}>
                <div>?</div>
              </button>
            </CreditToggle>
          }
        </>
      }
    </Cover>
  )
}

const Credits = styled(GridItem)``

const Cover = styled(Grid)`
  ${mixins.cover()}
  padding-bottom: ${VERT_GAP};

  ${Credits} {
    > p {
      margin: 0;
    }
  }

  a {
    ${mixins.underline}
  }
`

const CreditToggle = styled(GridItem)`
  ${mixins.flex()}
  justify-self: right;

  button {
    ${mixins.border()}
    width: ${emify(50)};
    aspect-ratio: 1;
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