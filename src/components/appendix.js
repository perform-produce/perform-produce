import styled from 'styled-components'
import Grid from './common/grid'
import GridItem from './common/gridItem'
import { emify, lineHeight } from '../utils/styleUtils'
import { COLORS, GAP, GRID_GAP, MENU_PADDING_BOT, MENU_PADDING_TOP } from '../constants'
import mixins from '../utils/mixins'
import AppendixSection from './common/appendixSection'


const Appendix = () => {
  return (
    <AppendixGrid>
      <SideBar $start='span 2'>
        <h2>Production</h2>
      </SideBar>
      <SectionContainer $start='span 10'>
        <AppendixSection notation='A-01' srcs={['test_appendix_1.png', 'test_appendix_2.png']} />
        <AppendixSection />
        <AppendixSection />
        <AppendixSection />
        <AppendixSection />
        <AppendixSection />
        <AppendixSection />
      </SectionContainer>
    </AppendixGrid>
  )
}

const menuHeight = `calc(${emify(MENU_PADDING_TOP)} + ${emify(MENU_PADDING_BOT)} + ${lineHeight(1)})`
const AppendixGrid = styled(Grid)`
  height: 100vh;


`

const SideBar = styled(GridItem)`
  position: relative;
  left: -${GAP};
  width: 100%;
  padding-left: ${GAP};
  background-color: ${COLORS.GRAY};

  h2 {
    margin-top: ${emify(45)};
    ${mixins.underline}
  }

  height: calc(100vh - ${menuHeight});
  padding-top: ${menuHeight};
`

const SectionContainer = styled(GridItem)`
  height: 100vh;
  padding: 0;
  overflow: scroll;
  padding-top: 0;

  ${mixins.flex}

  > section {
    flex: none;
    height: calc(100vh - ${menuHeight});
    padding-top: ${menuHeight};
    margin-left: ${GRID_GAP};
  }
`

export default Appendix