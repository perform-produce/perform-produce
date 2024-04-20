import { useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components'
import _ from 'lodash'
import Grid from './common/grid'
import { COLORS, MENU_PADDING_BOT, MENU_PADDING_TOP } from '../constants'
import Section from './common/section'
import { getLineHeight, getPx, lineHeight } from '../utils/styleUtils'
import GridItem from './common/gridItem'
import Paragraphs from './common/paragraphs'
import Img from './common/img'
import Citation from './common/citation'
import InterviewHeader from './common/interviewHeader'
import Dialogue from './common/dialogue'
import DialogueCaption from './common/dialogueCaption'
import PullQuote from './common/pullQuote'
import mixins from '../utils/mixins'


const Home = () => {
  const location = useLocation()

  useLayoutEffect(() => {
    const id = location.hash.replace(/^#/, '')
    const section = document.getElementById(id) // bad practice shorthands
    if (!section) return _.noop

    const { top } = section.getBoundingClientRect()
    window.scrollBy({
      top: top - (getPx(MENU_PADDING_TOP) + getPx(MENU_PADDING_BOT) + getLineHeight()),
      behavior: 'smooth'
    })
  }, [location])

  return (
    <>
      <Cover>
        <GridItem $end='span 8'>
          <p>Perform—Produce defines graphic design as a discipline rooted in work rather than a process that springs forth spontaneously from the creative imagination.</p>
          <p>Perform—Produce is driven by strict constraints and machine-like craft, but employs outdated tools and the physical body in processes of making that are stubbornly slow.</p>
          <p>Perform—Produce deploys performance as a tactic to expose the otherwise invisible labor of design and its valuation.</p>
          <p>Perform—Produce proposes a new organizational model that integrates live happenings, cross-disciplinary dialogue, and self-publishing to consider not just the product of design but also the conditions under which it is produced.</p>
        </GridItem>
      </Cover>
      <Section id='the-designer-as-machine' header='The Designer as Machine' backgroundColor={COLORS.GRAY} prefix='A'>
        <Paragraphs>
          <p>As a designer, I measure, translate, and produce. I’m guided by rules and restrictions. I reject speculation, interpretation, and self-expression. I am a designing machine.</p>
          <p>Each project I make begins with a series of rules I set for myself. For example:</p>
          <ol>
            <li>Select format and medium;</li>
            <li>Identify processes;</li>
            <li>Establish formal constraints;</li>
            <li>Produce.</li>
          </ol>
          <p>Like a sign painter or a restaurant server, once the task is defined, I merely show up for the job.</p>
        </Paragraphs>
        <Img src='test.jpg' caption='Measuring the lines of a crosswalk in Providence, RI. The dimensions are later translated into a paper version of these lines at an exact 1:1 scale. See Appendix A-12 for more on this project.' />
        <Paragraphs>
          <p>Constraints are integral to my process—they shape the form of my work and often serve as the subject matter itself. Some projects begin with a series of procedural instructions — measure, fold, jump!— that guide an entire work. Others start with a looser score that sets the tone and takes on more restrictions as the work comes into focus. Sometimes I write a manifesto. This may complicate rather than clarify a work. To be clear, I welcome this contradiction.</p>
          <p>
            I didn’t invent this approach, I stole the idea from others who came before me. Sol Lewitt
            <Citation number={1} header='Bertolt Brecht' subheader={<><i>A Short Organum for the Theatre</i> (1948)</>}>
              The alienation effect was central to 	Brecht’s approach to theater. This technique aimed to prevent the audience from losing themselves in the narrative and encourage them to think critically about the work’s content and its underlying social implications.
            </Citation>
            wrote instructions for wall drawings meant to be produced by others. This shifted our understanding of artistic agency and production. It meant anyone able to read and draw a line could produce the work. The final product, the wall drawing itself, was no longer precious. It was infinitely reproducible. Yvonne Rainer
            <Citation number={2} header='Bertolt Brecht' subheader={<><i>A Short Organum for the Theatre</i> (1948)</>}>
              The alienation effect was central to 	Brecht’s approach to theater. This technique aimed to prevent the audience from losing themselves in the narrative and encourage them to think critically about the work’s content and its underlying social implications.
            </Citation>
            wrote dance scores for ordinary movements. She favoured objective action over expressive movement. This shifted the audience’s understanding of dance in their own lives. Walking, sitting, and jumping were now seen as art.
          </p>
          <p>Instructions allow me to position my own design practice as an everyday act rooted in work rather than a magical process that springs forth from the creative imagination. While the work of design is often invisible, it nonetheless constitutes the cultural, moral, and economic valuation of its product. I expose the work behind my work in order to make this labor visible, so that it might hold its value.</p>
        </Paragraphs>
        <Img src='test.jpg' caption='Measuring the lines of a crosswalk in Providence, RI. The dimensions are later translated into a paper version of these lines at an exact 1:1 scale. See Appendix A-12 for more on this project.' />
        <Paragraphs>
          <p>The work of graphic design today is largely immaterial. Our work relies more on taste and the manipulation of style than a deep knowledge of material and craft.
            <Citation number={3} header='Bertolt Brecht' subheader={<><i>A Short Organum for the Theatre</i> (1948)</>}>
              The alienation effect was central to 	Brecht’s approach to theater. This technique aimed to prevent the audience from losing themselves in the narrative and encourage them to think critically about the work’s content and its underlying social implications.
            </Citation>
            Design transforms visual form into cultural capital, which in turn produces economic value for ourselves and our clients. This transformation of aesthetic form into value is what makes design seem magical, as something that appears out of thin air.
          </p>
          <p>The performance of design takes this immaterial labor, this work that is otherwise obfuscated, and presents it in front of an audience. The rematerialization of design labor is the reason I make work that is performative in nature.</p>
          <p>
            Sometimes this work is explicitly performative in that my body performs the act of designing in front of an audience. This type of performance is characterized by a flat visual style that exposes the artifice of the “stage.” This is a tactic I borrowed from playwright Bertolt Brecht who used the distance produced by the “alienation effect”
            <Citation number={4} header={<>Yvonne Rainer, <i>Trio A</i> (1978)</>} src='assets/images/test-citation.jpg' />
            to encourage a sober, intellectual engagement of the audience with his critique of the material conditions of society.
          </p>
          <p>My performances are highly instructional, often timed, and may include the participation of the audience. These enactments are explicitly self-referential — they make no effort to pretend they’re about anything other than the work of design itself.</p>
          <p>I also produce performative objects. I use exaggerated scale, visual and auditory markers of time, repetition, and extreme literalness to activate otherwise inanimate objects. These performative artifacts stand in for me, “the designer,” and are animated by visual cues that show the audience that a human is behind the work.</p>
          <p>Evidence of the human in the product of design is important to me. This is why the body (usually my own) often makes an appearance. I’m interested in how design shapes the body via measurement, standardization, and optimization, and I make work that investigates these themes through the reenactment of the mundane actions of design labor. These physical performances ask how the tools and objects we design in turn design us in an endless cycle of performance, production, design, and self-reproduction.I’ve learned the literal presence of the human is not always necessary. Some objects can serve as surrogates or stand-ins. The chair for example, is an everyday prosthesis that shares many of the body’s anatomical features. As a designed object, a chair’s value is often rooted more in its aesthetic form and symbolic meaning than its usefulness. Because of both its ubiquity and status as a design meme, the chair as a subject allows me to investigate design labor, value, and the body without requiring the physical presence of a human being.</p>
          <p>Even when the subject matter of my work doesn’t directly address questions about labor, design tools and the body, the mediums I work in still engage these topics. Slow, outdated tools and physical mediums change the speed of production and expose the flatness of today’s ultra-fast, screen-based technologies. The use of analog tools and media requires more time and physical exertion than digital ones, and an insistence on their use highlights technology’s active participation in the process of design. My refusal to use only the latest screen-based technologies forces questions not just about the pace of technological progress in the field, but its dominance over our physical lives. While we no longer need to stand for hours at a press, we still spend most of our days obediently clicking at our desks.</p>
        </Paragraphs>
      </Section>
      <Section id='exchange-bridget-moser' header='Exchange: Bridget Moser' backgroundColor={COLORS.PINK} prefix='0'>
        <InterviewHeader subHeader='A Conversation About Pantone® Colors, Prop Comedy, and Marcel Duchamp With:' interviewee='Bridget Moser' />
        <PullQuote header={<><u>Sianne Ngai</u>, <i>Our Aesthetic Categories: Zany, Cute, Interesting</i> (2022)</>} pageNumber={7}>
          <p>In contrast to the rational coolness of the interesting, the aesthetic of nonstop acting or doing that is zaniness is hot: hot under the collar; hot and bothered, hot to trot. Highlighting the affect, libido, and physicality of an unusually beset agent, these idioms underscore zaniness's uniqueness as the only aesthetic category in our repertoire about a strenuous relation to playing that seems to be on a deeper level about work. When brought out by the post-Fordist, service-economy zaniness of performers like Lucille Ball in I Love Lucy and Richard Pryor in The Toy, the zany more specifically evokes  the performance of affective labor—the production of affects and social relationships—as it comes to increasingly trouble the distinction between work and play. The formal dynamics of this seemingly lighthearted but strikingly vehement aesthetic, in which the potential for injury always seems right around the corner; are thus most sharply visible in the arts of live and recorded performance—dance, Happenings, walkabopts, reenactments, game shows, video games-and in the arts of rhythm and movement in particular.</p>
        </PullQuote>
        <Paragraphs interviewIntro>
          <p>Bridget Moser is a performance and video artist who combines strategies associated with prop comedy, experimental theatre, absurd literature, and intuitive dance in her work. She uses everyday objects that embody the aesthetics of mainstream consumer trends as her performance props, and often references popular cinema, advertising, home decor, and influencer culture in the design of her stage environments. Moser’s work uses humor and physical perfomance to explore themes of loneliness, absurdity, existential anxiety, and consumer culture, and often makes reference to art and design history in both her video pieces and live performances. She has presented work at the Art Gallery of Ontario, Remai Modern, le Musée d’art contemporain de Montréal, and the Vancouver Art Gallery among other venues.</p>
        </Paragraphs>
        <Img fullWidth src='test-interviewee.jpg' caption='Still from Every Room is a Waiting Room, 2016, featuring a backdrop borrowed from a scene in Stanleyn Kubrik’s iconic 1968 film, 2001: A Space Odyssey.' />
        <Dialogue speaker='RW' interviewer>
          <p>I first discovered you when I saw ‘Every Room is a Waiting Room at the Art Museum at the University of Toronto back in 2017. As a designer, I was intrigued by how the work spoke in this visual language that was soft and familiar but cold and alienating at the same time.</p>
          <p>I wanted to start the conversation by asking you a little bit about your sets (or performance environments) and the props you select for these performances. A lot of the props you use in your work are mass-produced objects that you bring into these visual worlds that feel very advertising-adjacent.</p>
          <p>I read that Every Room is a Waiting Room was influenced by the 2016 Pantone Colors of the year. Your more recent video, My Crops are Dying but My Body Persists, features two sets that sort of look like ads you’d see on Instagram.</p>
          <p>Can you speak a little bit about the spaces you construct and the objects you perform with? Why crocs, hair dryers, pink velvet sofas? Why dusty pink, lavender, rose gold?</p>
        </Dialogue>
        <Dialogue
          speaker='BM'
          caption={
            <DialogueCaption src='test-dialogue-caption.jpg' caption='Still from Every Room is a Waiting Room, 2016, featuring a backdrop borrowed from a scene in Stanleyn Kubrik’s iconic 1968 film, 2001: A Space Odyssey.' />
          }>
          <p>
            Duciis enem sita di dolupta inctur, ut voles et aut maio ium et lique comnimi licabo. Maxima comniscitem quae occupta delis reiunto et eariatium volupta tionsed quianda nonempos consed quis et porum ligenit, sedi ut expelec totatiandis sit exceatiantem re, soluptaquae cora quibearciam invelentum et que conseque corepuda porro vitistium cum quis exeror alignit iusdantinus am faces nonectem eiur rerro illaborrovid quistrum dis iustotatur sit rem
            <Citation number={1} header='Pantone' subheader='Color of the Year:' src='assets/images/test-dialogue-citation.jpg'>
              <p>13-1520 Rose Quartz &</p>
              <p>15-3919 Serenity (2016)</p>
            </Citation>
            quiaerum nus dignat eum evendi am antotatur, nullaborro cum aut ipsam, sit eum ipsa veris maio molore eiume volum ullant postorro tem evelent ius as eseditis nobit autati blatur? Iliquo consed militatat aute sapicab is expelloriam dolum rem quae odi blam ilignis volo inis ium nobis minvelit audande aliquo blaut adis ma entis ut derum nobitiam dolorerciet fugiass inciisi nusdaep tatione nuscill eseque sapid ulparum hilitatum ex est alita simporatus que expe sitae est eatenihil idit am nonemped quo illabo.
          </p>
          <p>Nam dendest, omnihillat que pre nobis eum nectist, con pos enditibus, offictem as dolliae voloreperia experis eatios dellit et eicil is enis dici re volupta temperc hillore ratureh enimaiorem quam aut officipsae et, es ellorepe dolorepudi duntemq uidebis simi, conse volupta verunt premoll uptaturitam rem ius eossum verum arumquis re rem cum ipsanti asitem ero que nobitatur? Quidernamus.</p>
          <p>Buscia core volenti nvelignit, unditaquas eiciae eiciam et eossequis es derum ius, voluptatur, quisquide sitibus.</p>
          <p>Cuptatus ma velicat alique re pa veriossumet aperrum doluptium commolest, si nulpa consed quuntio enis ab ipitatquam earum ipsantem ratur sa dolupta tatum, conestrum nulparit ium quosa qui qui dolorat iuntios et et ma core ea necti dolupta tiatempos diciene cesequo inum sim aperspe rorionet, cus sunda vellaccum ius aniate por autem faceribust, eiunt, ea</p>
        </Dialogue>
        <Dialogue
          interviewer
          speaker='RW'
          caption={
            <>
              <DialogueCaption src='test-dialogue-caption.jpg' caption='Still from Every Room is a Waiting Room, 2016, featuring a backdrop borrowed from a scene in Stanleyn Kubrik’s iconic 1968 film, 2001: A Space Odyssey.' />
              <DialogueCaption src='test-dialogue-caption.jpg' caption='Still from Every Room is a Waiting Room, 2016, featuring a backdrop borrowed from a scene in Stanleyn Kubrik’s iconic 1968 film, 2001: A Space Odyssey.' />
            </>
          }>
          <p>Nam dendest, omnihillat que pre nobis eum nectist, con pos enditibus, offictem as dolliae voloreperia experis eatios dellit et eicil is enis dici re volupta temperc hillore ratureh enimaiorem quam aut officipsae et, es ellorepe dolorepudi duntemq uidebis simi, conse volupta verunt premoll uptaturitam rem ius eossum verum arumquis re rem cum ipsanti asitem ero que nobitatur? Quidernamus.</p>
          <p>Buscia core volenti nvelignit, unditaquas eiciae eiciam et eossequis es derum ius, voluptatur, quisquide sitibus.</p>
          <p>Cuptatus ma velicat alique re pa veriossumet aperrum doluptium commolest, si nulpa consed quuntio enis ab ipitatquam earum ipsantem ratur sa dolupta tatum, conestrum nulparit ium quosa qui qui dolorat iuntios et et ma core ea necti dolupta tiatempos diciene cesequo inum sim aperspe rorionet, cus sunda vellaccum ius aniate por autem faceribust.</p>
          <p>Volentiscid ut voloreicipis duciduci rem facea coribus, qui reicae dolore lat qui ut excea delestrum anditio nsendam elignis volestiis molenient el idemporem il ius maiorum issimusam, optatem porpor am fugit exerecae ius intorio rporrum, tor sinctem quuntur iaspietum volorem et omnis sitatquo vellaut paris ipsam, qui nate sum quibus eserferum eati dolore idus reperumene volupta dit elique ne vit, officid ebissim inveliquat enihicid que vendanti atis es mo ipit id ex enet, officabore cuptaquunt et et de dolesti oriberum aut vel ium laccae eossit enitiae nonsequ isquatenis dolecto eaquassit ma cume porias deris unt mi, que landae esequibus molor sum eicatquas expliquas res et quodist quaturita et aut recus non re everibusae vitat.</p>
          <p>Buscia core volenti nvelignit, unditaquas eiciae eiciam et eossequis es derum ius, voluptatur, quisquide sitibus.</p>
          <p>Cuptatus ma velicat alique re pa veriossumet aperrum doluptium commolest, si nulpa consed quuntio enis ab ipitatquam earum ipsantem ratur sa dolupta tatu</p>
        </Dialogue>
      </Section>
    </>
  )
}

const Cover = styled(Grid)`
  ${mixins.cover(lineHeight(3))}
`


export default Home