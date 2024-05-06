import styled from 'styled-components'
import { COLORS } from '../../constants'
import Section from '../section/section'
import GridItem from '../common/gridItem'
import SectionSubhead from '../section/sectionSubhead'
import Paragraphs from '../common/paragraphs'
import RulerSection from './rulerSection'

const Rulers = () => {
  return (
    <Section
      id='instruction-doug-scotts-rulers'
      header='Instruction: Doug Scott'
      backgroundColor={COLORS.GREEN}>
      <SectionSubhead
        subheader='A 1,300 pica lesson on tools of measurement from:'
        interviewee='Doug Scott'
      />
      <Paragraphs $end={13}>
        <p>Douglass Scott is a graphic designer and educator whose career spans multiple developments in design technology, production techniques, and labor arrangements. He holds a Bachelor of Architecture degree from the University of Nebraska, a Master of Fine Arts from Yale University, and studied the history of graphic design with Louis Danziger at Harvard University. Scott has been teaching graphic design, exhibit design, typography, and graphic design history at the Rhode Island School of Design since 1980, and taught graphic design and design history at the Yale University School of Art from 1984 to 2023. He is also a Full Teaching Professor at Northeastern University where he has been teaching since 2010. Scott has been a visiting critic at over 35 colleges and art schools, and has given over 200 lectures on the history of design and printing,
          as well as on his own work, at various colleges, universities and symposia. From 1971–1977, Scott worked as a draftsman/cartographer and Operations & Intelligence Sergeant in the United States Army Reserve.</p>
      </Paragraphs>
      <RulerSection
        isLong
        number='01'
        src='1.png'
        width={1}
        description='36 Inch Metal Ruler'
        units='Inches, Millimeters'
        purpose='Measuring, Cutting'>
        <p>This ruler is a very long one. It’s metal and I use it to measure things but also to cut because I think it's always important to have a good metal ruler to cut with. It has cork on the back so it doesn't move when you’re using it. I use this all the time. I don’t use that rolling cutter over there because it's a piece of crap and it's never exact. It malfunctions a lot. This thing (this ruler) never malfunctions when you hold the knife the right way.</p>
        <p>This ruler has two scales on it: inches and the metric scale which, as an American, I usually don’t use. But if I do I want to break something up into smaller pieces, I’ll use the metric side because there are more little increments there.</p>
      </RulerSection>
      <RulerSection
        number='02'
        src='2.png'
        width={2.25}
        description='36 Inch Metal Ruler'
        units='Inches, Millimeters'
        purpose='Cutting'>
        <p>This ruler is a very long one. It’s metal and I use it to measure things but also to cut because I think it's always important to have a good metal ruler to cut with. It has cork on the back so it doesn't move when you’re using it. I use this all the time. I don’t use that rolling cutter over there because it's a piece of crap and it's never exact. It malfunctions a lot. This thing (this ruler) never malfunctions when you hold the knife the right way.</p>
        <p>This ruler has two scales on it: inches and the metric scale which, as an American, I usually don’t use. But if I do I want to break something up into smaller pieces, I’ll use the metric side because there are more little increments there.</p>
      </RulerSection>
      <RulerSection
        number='03'
        src='3.png'
        width={2}
        description='Type Gauge'
        units='Inches, Millimeters, Picas, Points'
        purpose='Measuring Type (Pre-Macintosh)'>
        <p>This is an older Schaedler type gauge that I used before I got the newer one I just showed you. There’s something weird that's happened in my life which is that the measurement of a pica has changed. There used to be almost six picas in an inch (which is what I had always thought it was), but when desktop publishing came in, the organization that takes care of type measurement decided to change the pica to exactly 1/6 of an inch (or 12 points). So picas today are slightly different than they were before we all started using computers. If you line this one up next to the previous type gauge, you’ll see that after a while, the picas don’t line up.</p>
      </RulerSection>
      <RulerSection
        number='04'
        src='4.png'
        width={2.25}
        description='Type Gauge'
        units='Picas, Points, Agates'
        purpose='Measuring Type (Pre-Macintosh)'>
        <p>This used to be one of my favorite type gauges because it has these little holes in the middle that show you the size of the leading. You put it over a paragraph of text and see where the lines align to the baseline. Instead of being transparent, there are troughs in it so you can look through to the page. The one thing that’s nice about this one is that it goes all the way down to 5.5 point leading. And it also has these numbers that tell you how many lines something is which is useful if you’re designing a book and need to estimate how many lines you can get on a page.</p>
        <p>This ruler also has agates which are what every newspaper in the United States once used to measure ads. You’d always measure an ad by a certain number of columns wide (which varied depending on the paper) and a certain number of agates deep. I just love this as an object. It was given to me for free by a typesetting company because I bought so much type from them.</p>
      </RulerSection>
      <RulerSection
        number='05'
        src='5.png'
        width={1}
        description='Newspaper Gaugee'
        units='Inches, Points, Agates'
        purpose='Measuring Type and Newspaper Ads'>
        <p>Here’s a newspaper gauge. You can see that it also has agates on it (like the previous type gauge I just shared). See that it has this top edge that you can hook on something to help you measure it. Note that 1 agate is the equivalent of 5.5 points. It was tradition in newspapers to use 5.5 point type which was what many people thought was the smallest type size you could read. This type size was used in the sports pages for scores, for the stock market section, and it was also used for the little ads that would go into newspapers. Agates were used to measure the depth of newspaper ads. For example, a typical ad might be two columns wide by 30 agates deep. That’s how the papers calculated the price of the ad.</p>
      </RulerSection>
      <RulerSection
        number='06'
        src='6.png'
        width={3.25}
        description='Flexible Ruler'
        units='Inches, Millimeters'
        purpose='Drawing'>
        <p>This is one of my favorite little things right here, which I’ve shown you before. It’s a flexible rubbery thing that has two scales on it. It’s metric on one side and inches on the other. It’s a bendy ruler that you can draw round and natural curvy things with, and you can measure them exactly while you draw. I use this ruler for drawing weird shapey things because it tells you exactly how long that shape you just drew is. I can draw a line that’s exactly 18 inches long, but I can curve it in a lot of different ways. See? This is good for drawing architectural things that are more organic. For example, if you wanted to draw a kidney-shaped swimming pool, you could use this as a guide and you would be able to make it the exact right length because you can measure at the same time as you draw. My friends in architecture school and I always call these “Norwegian straight edges” although I have no idea why.</p>
      </RulerSection>
      <RulerSection
        number='07'
        src='7.png'
        width={1.75}
        description='Parallel Rolling Ruler'
        units='Inches, Centimeters'
        purpose='Precise Drawing'>
        <p>This is a combination ruler and roller and it’s mostly meant for drawing. This ruler has little rubbery things on it so you can move it by exact increments and everything stays exactly parallel because it creates friction. The rolling mechanism doesn’t move once you press down on it. You can draw horizontal lines with the ruler’s edge, and it has these holes for you to place a pencil in so you can draw perfectly straight columns. It works like a T-square. There are measurements on the roller that tell you how far you’ve moved the ruler, and it also gives you extra information you might need to know like how to calculate spherical area, circumference, and other things like that.</p>
      </RulerSection>
      <RulerSection
        number='08'
        src='8.png'
        width={4}
        left={-0.5}
        description='79 Inch Folding Ruler'
        units='Inches, Centimeters'
        purpose='Measuring Large Things'>
        <p>This ruler was given to me by Erin Kim, a previous student who studied design and architecture. She bought it in Germany when she was working there because she noticed that architects and everybody on a construction team would constantly carry one of these around. It’s great because it folds out and you can instantly measure really long or wide things. Like, if you’re measuring the space between these two tables right here, you can see the space is 36 inches. It’s easy and less annoying to use than a tape measure because it doesn’t flop.</p>      When I measure big pieces of paper, I will often use this ruler. I have some other ones like this, but they’re not made as nicely as this one because they’re from the United States. This one is beautifully made because it’s from Germany. I love this ruler.
        <p>When I measure big pieces of paper, I will often us this ruler. I have some other ones like this, but they’re not made as nicely as this one because they’re from the United States. This one is beautifully made because it’s from Germany. I love this ruler.</p>
      </RulerSection>
      <RulerSection
        number='09'
        src='9.png'
        width={0.75}
        description='Architect’s Scale'
        units='1/4 inch = 1 foot, 1/2 inch = 1 foot etc.'
        purpose='Architectural Drawing'>
        <p>Let me show you this little thing. This is an architect’s ruler. It shows various scales such as a quarter inch = a foot, or a half inch = a foot. It has eight different scales on it and I use it all the time when I’m teaching exhibit design class. You can’t take this one with you (you’ll have to take a picture of it here) because I’ve had it for years and I’m worried you might lose it.</p>
      </RulerSection>
    </Section>
  )
}


const Container = styled(GridItem)`
  height: 100vh;
`


export default Rulers