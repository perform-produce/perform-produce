import GridItem from './gridItem'


const Paragraphs = ({ interviewIntro, ...rest }) => <GridItem {...rest} $start={interviewIntro ? 3 : 4} $end={11} />

export default Paragraphs