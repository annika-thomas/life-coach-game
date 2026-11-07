export default [
  {
    id: "phil-socrates",
    level: 1,
    title: "The man who knew he knew nothing",
    body: [
      "Socrates wrote nothing down. We know him mainly through his students, above all Plato, who show him wandering the streets of Athens asking people to define things they were sure they understood: courage, justice, piety. Under his patient questioning the confident definitions kept collapsing. When the oracle at Delphi declared that no one was wiser than Socrates, he decided it could only mean this: unlike everyone else, he did not think he knew what he did not know.",
      "Athens was not grateful. In 399 BC, at about 70, he was tried for impiety and corrupting the young, convicted by a jury of his fellow citizens, and executed by drinking hemlock. At his trial, as Plato tells it, he said that the unexamined life is not worth living.",
    ],
    question: "Is the unexamined life really not worth living, or is there something to be said for not overthinking it?",
    quiz: [
      { q: "How was Socrates executed?", a: "By drinking hemlock", w: ["By beheading", "By being thrown from a cliff", "By crucifixion"], why: "Condemned in 399 BC, he died by drinking hemlock." },
      { q: "What did Socrates take the Delphic oracle's verdict to mean?", a: "He alone knew how little he knew", w: ["He alone was fit to rule Athens", "He alone knew more facts than anyone", "He alone was chosen to write laws"], why: "He did not think he knew what he did not know." },
    ],
    timeline: { event: "Trial and death of Socrates", year: -399 },
    estimate: { q: "Roughly how old was Socrates when he was executed?", answer: 70, unit: "years", min: 20, max: 100 },
  },
  {
    id: "phil-cave",
    level: 2,
    title: "Shadows on the cave wall",
    body: [
      "In the Republic, Plato has Socrates describe prisoners chained since birth in a cave, facing a wall. Behind them a fire burns, and objects carried past it cast shadows on the wall. The shadows are all the prisoners have ever seen, so they take them to be reality itself.",
      "One prisoner is freed. The firelight hurts his eyes; the sunlight outside blinds him. Slowly he sees real things, and finally the sun, which Plato uses as an image of the highest truth, the Form of the Good. He returns to tell the others, but stumbling in the dark he looks like a fool, and Plato suggests they would kill anyone who tried to drag them out. Readers have long heard an echo of what Athens did to Socrates. The cave is an image of education as a painful turning around, not just a pouring in of facts.",
    ],
    question: "What is a 'shadow on the wall' in modern life that you think most people mistake for the real thing?",
    quiz: [
      { q: "In Plato's cave, what do the chained prisoners take for reality?", a: "Shadows cast on the wall", w: ["Their own reflections in water", "Voices in the dark", "Paintings made by their guards"], why: "Shadows from the fire are all they have ever seen." },
      { q: "What happens when the freed prisoner returns to the cave?", a: "They mock and resist him", w: ["They beg him to lead them out", "They make him their leader", "They ignore him completely"], why: "Blinded by the dark, he stumbles, and the others want to stay put." },
    ],
    timeline: null,
    estimate: null,
  },
  {
    id: "phil-golden-mean",
    level: 1,
    title: "Aristotle's middle path",
    body: [
      "Aristotle, Plato's student and later tutor to Alexander the Great, asked what makes a whole life go well. His answer was eudaimonia, often translated as happiness but closer to flourishing: living well and doing well over a lifetime, not feeling good for an afternoon.",
      "The route there is virtue, and Aristotle saw most virtues as a mean between two vices. Courage sits between cowardice (too little) and rashness (too much). Generosity sits between stinginess and wastefulness. The mean is not a mathematical midpoint; it depends on the situation, and finding it takes practical wisdom.",
      "Crucially, virtue is a habit. We become brave by doing brave things and fair by acting fairly, the way a musician becomes good by playing. Character, for Aristotle, is built by practice.",
    ],
    question: "Which virtue do you think you overshoot, and which do you fall short of?",
    quiz: [
      { q: "For Aristotle, courage is the mean between cowardice and what?", a: "Rashness", w: ["Patience", "Pride", "Generosity"], why: "Too much daring is rashness; too little is cowardice." },
      { q: "How do we acquire virtues, according to Aristotle?", a: "By practice, as habits", w: ["By birth, as fixed traits", "By studying philosophy", "By the gift of the gods"], why: "We become brave by doing brave things." },
    ],
    timeline: null,
    estimate: null,
  },
  {
    id: "phil-confucius",
    level: 1,
    title: "Confucius and the one word to live by",
    body: [
      "Confucius (traditionally dated 551 to 479 BC) was a teacher and minor official in the Chinese state of Lu. He wrote no treatise; his sayings were gathered by followers into the Analects, a collection of 20 short books. His ideal was the junzi, the exemplary person, marked by ren (humaneness) and li (ritual propriety: the courtesies and customs that hold relationships together).",
      "In one famous exchange, a disciple asks whether a single word could guide a whole life. Confucius offers shu, reciprocity, and explains: what you do not want for yourself, do not impose on others. This 'silver rule' is phrased negatively, centuries before the golden rule in the Gospels. Confucian thought, with its stress on family, education and good government, shaped East Asian societies for two thousand years.",
    ],
    question: "Is the negative 'silver rule' wiser than the golden rule, or does it ask too little of us?",
    quiz: [
      { q: "What is the name of the collection of Confucius's sayings?", a: "The Analects", w: ["The Dao De Jing", "The Art of War", "The Book of Changes"], why: "His followers gathered his sayings into the Analects." },
      { q: "What one word did Confucius offer as a guide for life?", a: "Shu, reciprocity", w: ["Li, ritual", "Dao, the way", "Wu wei, effortless action"], why: "Do not impose on others what you would not want yourself." },
    ],
    timeline: { event: "Birth of Confucius (traditional)", year: -551 },
    estimate: { q: "How many books (chapters) make up the Analects?", answer: 20, unit: "books", min: 1, max: 100 },
  },
  {
    id: "phil-zhuangzi",
    level: 1,
    title: "Zhuangzi's butterfly",
    body: [
      "Zhuangzi, a Daoist thinker of the 4th century BC, tells of dreaming he was a butterfly, fluttering happily with no idea he was Zhuangzi. Then he woke, and there he was, solidly Zhuangzi. But he could not tell: was he Zhuangzi who had dreamt of being a butterfly, or a butterfly now dreaming it was Zhuangzi?",
      "The story is playful rather than anxious. Zhuangzi loved puncturing certainty and showing how our neat categories depend on point of view. In another story he and his friend Huizi watch fish in a river. Zhuangzi says the fish are happy. Huizi objects: 'You are not a fish, so how do you know?' Zhuangzi replies: 'You are not me, so how do you know I don't know?' The Daoist ideal is to flow with change, like water, instead of clinging to fixed answers.",
    ],
    question: "Do you enjoy not being certain about things, or does it unsettle you?",
    quiz: [
      { q: "What did Zhuangzi dream he was?", a: "A butterfly", w: ["A fish", "A crane", "An emperor"], why: "He woke unsure if he was a man who dreamt of a butterfly or the reverse." },
      { q: "In the fish story, what did Huizi object?", a: "You are not a fish, so how can you know?", w: ["Fish cannot feel anything", "The river was too murky to see", "Only the emperor may judge happiness"], why: "Zhuangzi turned the question back on him." },
    ],
    timeline: null,
    estimate: null,
  },
  {
    id: "phil-chariot",
    level: 1,
    title: "Where is the chariot?",
    body: [
      "A central Buddhist teaching is anatta, 'no-self': there is no permanent, unchanging soul behind our experiences, only a shifting stream of bodily and mental processes. A famous illustration comes from the Milindapanha, a dialogue between the monk Nagasena and King Milinda, usually identified with the Indo-Greek king Menander.",
      "The king arrives by chariot. Nagasena asks: is the chariot the axle? The wheels? The frame? The reins? No, the king admits, none of these. Then is it something apart from them all? No again. So where is the chariot? The king concludes that 'chariot' is a convenient name for the parts arranged together. Exactly, says Nagasena: and 'Nagasena' is the same, a useful label for a collection, not a hidden extra thing. For Buddhists, seeing through the fixed self loosens the grip of craving and suffering.",
    ],
    question: "Does the idea that there is no fixed 'you' feel freeing or frightening?",
    quiz: [
      { q: "What everyday object does Nagasena use to explain no-self?", a: "A chariot", w: ["A candle", "A clay pot", "A river"], why: "He shows 'chariot' is just a name for parts arranged together." },
      { q: "What does the Buddhist term anatta mean?", a: "No permanent self", w: ["An eternal soul", "Perfect enlightenment", "Rebirth as an animal"], why: "Anatta is the teaching of no-self." },
    ],
    timeline: null,
    estimate: null,
  },
  {
    id: "phil-stoics",
    level: 1,
    title: "The Stoic dividing line",
    body: [
      "Stoicism began in Athens around 300 BC, when Zeno of Citium taught at the Stoa Poikile, the painted porch that gave the school its name. Its most famous teachers came later and from opposite ends of Roman society: Epictetus, born a slave, and Marcus Aurelius, emperor of Rome.",
      "Epictetus's handbook opens with a dividing line: some things are up to us, and some are not. Our judgements, intentions and actions are up to us; our bodies, reputations and the weather are not. Peace of mind comes from putting our energy into the first and accepting the second. Marcus Aurelius wrote his Meditations, 12 books of notes to himself in Greek, never meant for publication, reminding himself to stay calm, fair and useful amid wars and plague.",
    ],
    question: "What is one thing you worry about that is genuinely not up to you?",
    quiz: [
      { q: "Which Stoic teacher was born a slave?", a: "Epictetus", w: ["Marcus Aurelius", "Seneca", "Zeno of Citium"], why: "Epictetus was born a slave; Marcus Aurelius was an emperor." },
      { q: "Where does the name 'Stoic' come from?", a: "A painted porch in Athens", w: ["A Greek word for calm", "A city in Sicily", "Zeno's family name"], why: "Zeno taught at the Stoa Poikile, the painted porch." },
    ],
    timeline: null,
    estimate: { q: "How many books make up Marcus Aurelius's Meditations?", answer: 12, unit: "books", min: 1, max: 50 },
  },
  {
    id: "phil-cogito",
    level: 1,
    title: "I think, therefore I am",
    body: [
      "René Descartes wanted knowledge built on rock, so he decided to doubt everything that could possibly be doubted. His senses sometimes deceive him, so out they go. He might be dreaming. In his Meditations (1641) he even imagines a powerful evil demon devoting itself to deceiving him about everything, even mathematics.",
      "But one thing survives. However much he is deceived, he must exist in order to be deceived. Doubting is a kind of thinking, and a thinker exists. He had already put it in French in his Discourse on the Method of 1637: 'je pense, donc je suis', later rendered in Latin as 'cogito, ergo sum'. From this single certainty he tried to rebuild everything else. Critics ever since have asked whether he was entitled even to the 'I': perhaps all he could be sure of was that thinking was happening.",
    ],
    question: "If you had to doubt everything, what would be the last thing you would let go of?",
    quiz: [
      { q: "What imaginary figure did Descartes invent to test his doubt?", a: "A deceiving demon", w: ["A wise oracle", "A talking machine", "A sleeping giant"], why: "He imagined a demon deceiving him about everything." },
      { q: "Why can Descartes not doubt his own existence?", a: "To be deceived or to doubt, he must exist", w: ["God told him he existed", "His senses confirm it", "Mathematics proves it"], why: "Doubting is thinking, and a thinker exists." },
    ],
    timeline: { event: "Descartes's Discourse on the Method", year: 1637 },
    estimate: null,
  },
  {
    id: "phil-brain-vat",
    level: 2,
    title: "Are you a brain in a vat?",
    body: [
      "Descartes's evil demon got a modern makeover. Imagine a scientist has removed your brain, kept it alive in a vat of nutrients, and wired it to a computer that feeds it perfectly realistic signals. You would feel exactly as you do now: reading this, sitting somewhere, maybe drinking tea. Could you ever tell the difference? The film The Matrix (1999) brought the idea to a mass audience.",
      "The philosopher Hilary Putnam gave the scenario its most famous treatment in Reason, Truth and History (1981), and then argued that it undermines itself. His reasoning was that words get their meaning partly through causal contact with the things they name. A brain that had only ever been in a vat would never have been in contact with real brains or vats, so when it thought 'I am a brain in a vat', it could not be referring to real ones. If so, the sentence cannot be truly thought by the very brain it describes.",
    ],
    question: "If a perfect simulation felt exactly like real life, would it matter to you whether you were in one?",
    quiz: [
      { q: "Which philosopher argued 'I am a brain in a vat' undermines itself?", a: "Hilary Putnam", w: ["René Descartes", "David Hume", "John Searle"], why: "Putnam made the argument in Reason, Truth and History (1981)." },
      { q: "Putnam's argument rests on the idea that word meaning depends on what?", a: "Contact with the things named", w: ["Definitions in a dictionary", "Agreement among speakers", "Pictures in the speaker's mind"], why: "A vat brain never touched real vats, so its words could not mean them." },
    ],
    timeline: { event: "Putnam's Reason, Truth and History", year: 1981 },
    estimate: null,
  },
  {
    id: "phil-induction",
    level: 1,
    title: "Will the sun rise tomorrow?",
    body: [
      "You are certain the sun will rise tomorrow. But why? Because it always has. The Scottish philosopher David Hume, in A Treatise of Human Nature (1739) and later works, pointed out that this reasoning goes in a circle. Inferring the future from the past assumes that nature will keep behaving as it has, and the only evidence for that assumption is that it has done so in the past.",
      "Hume did not tell us to stop expecting sunrises. He concluded that our expectation rests not on reason but on custom or habit: we are simply built to expect the pattern to continue. Bertrand Russell gave the worry a darker image in 1912: a chicken fed every day by the farmer grows ever more confident in its daily meal, until the day the farmer wrings its neck instead. Every past morning had supported the chicken's prediction.",
    ],
    question: "Which of your firm expectations about the future rests mostly on 'it has always been this way'?",
    quiz: [
      { q: "In Russell's example, what animal trusts the daily pattern too far?", a: "A chicken", w: ["A turkey", "A cat", "A horse"], why: "Russell's chicken is fed daily, until its neck is wrung." },
      { q: "According to Hume, what grounds our expectation that the future resembles the past?", a: "Custom or habit", w: ["Logical proof", "Divine revelation", "Mathematics"], why: "Not reason: Hume said we are built to expect patterns to continue." },
    ],
    timeline: { event: "Hume's Treatise of Human Nature", year: 1739 },
    estimate: null,
  },
  {
    id: "phil-popper",
    level: 2,
    title: "One black swan",
    body: [
      "Karl Popper accepted Hume's point that no number of observations can prove a general law. Seeing a thousand white swans does not prove that all swans are white, and indeed Europeans later found black swans in Australia. But Popper noticed an asymmetry: while no amount of evidence can prove the law, a single black swan can refute it.",
      "In his book first published in German in 1934, later translated as The Logic of Scientific Discovery, he made this the mark of science: a scientific theory must be falsifiable, sticking its neck out with predictions that could turn out wrong. Einstein's relativity did this, predicting how starlight would bend around the sun. Popper contrasted it with theories such as Freud's psychoanalysis, which he felt could explain any behaviour at all. A theory that explains everything, he argued, tells you nothing.",
    ],
    question: "Is there a belief you hold that no possible evidence could change? Is that a strength or a warning sign?",
    quiz: [
      { q: "According to Popper, what can a single black swan do?", a: "Refute 'all swans are white'", w: ["Prove 'all swans are white'", "Nothing, one case never counts", "Only weaken it a little"], why: "One counterexample can falsify a general law." },
      { q: "What did Popper say makes a theory scientific?", a: "It is falsifiable", w: ["It explains everything", "Experts agree with it", "It is mathematically elegant"], why: "A scientific theory makes predictions that could fail." },
    ],
    timeline: { event: "Popper's Logic of Scientific Discovery", year: 1934 },
    estimate: null,
  },
  {
    id: "phil-utilitarianism",
    level: 1,
    title: "The greatest happiness",
    body: [
      "Jeremy Bentham proposed a radical test for laws and actions: do they increase happiness and reduce suffering, counting everyone equally? He took the idea seriously enough to argue for animal welfare, since the question is not whether animals can reason but whether they can suffer. Bentham also left his body to be preserved; his skeleton, dressed in his clothes, still sits in a cabinet at University College London.",
      "His follower John Stuart Mill refined the theory in Utilitarianism (1863). Bentham had treated all pleasures alike; Mill insisted some are higher than others, writing that it is 'better to be Socrates dissatisfied than a fool satisfied'. The appeal of utilitarianism is its simplicity and impartiality. The worry is that adding up happiness might justify terrible acts against a few, if enough others gain.",
    ],
    question: "Should a good decision always be the one that makes the most people happiest? Where would you draw the line?",
    quiz: [
      { q: "Where can you still see Jeremy Bentham's preserved skeleton?", a: "University College London", w: ["Westminster Abbey", "The British Museum", "Oxford's Bodleian Library"], why: "Dressed in his clothes, it sits in a cabinet at UCL." },
      { q: "How did Mill change Bentham's theory?", a: "He said some pleasures are higher than others", w: ["He said all pleasures are exactly equal", "He said duty matters more than happiness", "He said only human pleasures count"], why: "Better Socrates dissatisfied than a fool satisfied." },
    ],
    timeline: { event: "Mill's Utilitarianism published", year: 1863 },
    estimate: null,
  },
  {
    id: "phil-experience-machine",
    level: 2,
    title: "The experience machine",
    body: [
      "If happiness is all that matters, as the classic utilitarians held, Robert Nozick had an awkward offer. In Anarchy, State, and Utopia (1974) he imagined an experience machine: super-neuroscientists can stimulate your brain so you feel you are writing a great novel, falling in love or climbing a mountain, while you float in a tank. You can choose your experiences in advance, and once inside you would not know it was not real. Would you plug in for life?",
      "Most people say no, and Nozick thought that refusal was revealing. We want to actually do things, not just have the feeling of doing them. We want to be a certain kind of person, and to be in contact with reality. If so, pleasant experience cannot be the only thing that matters. Defenders of hedonism reply that our refusal may just reflect fear of the unfamiliar, or attachment to the life we already have.",
    ],
    question: "Would you plug in? What would you miss, if you would never know you were missing it?",
    quiz: [
      { q: "What does the experience machine give you?", a: "Any experience you choose", w: ["A glimpse of your future", "Memories of past lives", "Another person's thoughts"], why: "It stimulates your brain so chosen experiences feel real." },
      { q: "What did Nozick conclude from most people refusing to plug in?", a: "Pleasant experience is not all that matters", w: ["People are irrational about technology", "Happiness is all that matters", "Machines can never feel"], why: "We want to actually do things and be in contact with reality." },
    ],
    timeline: { event: "Nozick's Anarchy, State, and Utopia", year: 1974 },
    estimate: null,
  },
  {
    id: "phil-kant",
    level: 1,
    title: "What if everyone did that?",
    body: [
      "Immanuel Kant, who spent his whole life in and around the Prussian city of Königsberg, thought morality could not rest on consequences or feelings. In the Groundwork of the Metaphysics of Morals (1785) he set out the categorical imperative: act only on a principle you could will to be a universal law. Suppose you borrow money promising to repay, knowing you will not. If everyone did that, promises would mean nothing and the trick would stop working. The principle defeats itself.",
      "A second version says: treat humanity, in yourself and others, never merely as a means but always also as an end. Kant held firm even in hard cases. In a later essay he argued that you should not lie even to a murderer asking where your friend is hiding, a conclusion that many readers, including admirers, find hard to accept.",
    ],
    question: "Is it ever right to lie? Where do you draw your own line?",
    quiz: [
      { q: "Kant's test asks whether your principle could become what?", a: "A universal law", w: ["A popular custom", "A source of profit", "A royal decree"], why: "Act only on a principle you could will as a universal law." },
      { q: "What did Kant say about lying to a murderer at the door?", a: "You still should not lie", w: ["Lying is then a duty", "It depends on the outcome", "Lie only to save a life"], why: "He argued the duty not to lie holds even then." },
    ],
    timeline: { event: "Kant's Groundwork published", year: 1785 },
    estimate: null,
  },
  {
    id: "phil-bat",
    level: 1,
    title: "What is it like to be a bat?",
    body: [
      "In 1974 Thomas Nagel published an essay with an unforgettable title: 'What Is It Like to Be a Bat?' Bats find their way by echolocation, sending out high-pitched calls and building a picture of the world from the echoes. We can learn every fact about how this works, Nagel argued, and still have no idea what it is like, from the inside, to perceive the world that way.",
      "His point was about consciousness in general. An organism is conscious if there is something it is like to be that organism. Science describes the world objectively, from no particular point of view, yet experience is essentially subjective. So a complete physical account of the bat's brain might seem to leave out the most important thing: the experience itself. Nagel did not claim this proved that the mind is not physical, only that we do not yet understand how it could be.",
    ],
    question: "Could you ever truly know what it is like to be someone very different from you?",
    quiz: [
      { q: "How do bats perceive the world in Nagel's example?", a: "By echolocation", w: ["By smell alone", "By sensing magnetic fields", "By infrared vision"], why: "They build a picture from the echoes of their calls." },
      { q: "According to Nagel, when is an organism conscious?", a: "When there is something it is like to be it", w: ["When it can speak", "When it has a large brain", "When it passes a memory test"], why: "Consciousness means there is something it is like, from the inside." },
    ],
    timeline: { event: "Nagel's 'What Is It Like to Be a Bat?'", year: 1974 },
    estimate: null,
  },
  {
    id: "phil-mary",
    level: 2,
    title: "Mary's black-and-white room",
    body: [
      "Frank Jackson sharpened Nagel's worry in a 1982 paper. Mary is a brilliant scientist who has lived her whole life in a black-and-white room, learning about the world through black-and-white screens. She knows every physical fact about colour: wavelengths, how the eye works, what happens in the brain when someone sees a ripe tomato.",
      "One day she walks outside and sees red for the first time. Does she learn something new? Most people feel she does: she learns what seeing red is like. But she already knew all the physical facts. So, Jackson argued, there must be facts that are not physical, and physicalism is false. Critics reply that Mary gains a new ability or a new way of knowing an old fact, not a new fact. Intriguingly, Jackson himself later changed his mind and came to defend physicalism.",
    ],
    question: "When Mary first sees red, does she learn a new fact, or just get a new experience of something she already knew?",
    quiz: [
      { q: "What colour is Mary's world before she leaves the room?", a: "Black and white", w: ["Entirely red", "Shades of blue", "Completely dark"], why: "She has only ever seen black-and-white rooms and screens." },
      { q: "What did Frank Jackson later do about his own argument?", a: "Changed his mind about it", w: ["Expanded it into a book", "Never revisited it", "Tested it on a real person"], why: "He later came to defend physicalism." },
    ],
    timeline: { event: "Jackson's Mary's room paper", year: 1982 },
    estimate: null,
  },
  {
    id: "phil-chinese-room",
    level: 1,
    title: "The Chinese room",
    body: [
      "In 1980 John Searle asked us to imagine him locked in a room. Slips of paper covered in Chinese characters are pushed under the door. Searle knows no Chinese, but he has a huge rule book in English telling him which characters to send back in reply. The rules are so good that people outside believe they are corresponding with a fluent Chinese speaker.",
      "Yet Searle understands nothing; he is just shuffling symbols. And that, he argued, is all a computer program does. So running the right program could never by itself be enough for genuine understanding, however convincing the output. The most famous reply, the 'systems reply', says that Searle is like a single part of a brain: he does not understand Chinese, but the whole system of man, rules and room might. With today's chatbots, the debate has never felt more alive.",
    ],
    question: "If a machine answered every question as well as a person, would you say it understands? What would it take to convince you?",
    quiz: [
      { q: "What does Searle use to answer messages in the Chinese room?", a: "A rule book for manipulating symbols", w: ["A Chinese dictionary he studies", "A hidden Chinese speaker", "A translation machine"], why: "He follows English rules without understanding the characters." },
      { q: "What does the 'systems reply' claim?", a: "The whole system might understand", w: ["Searle secretly learns Chinese", "Computers can never pass tests", "Understanding is an illusion in humans too"], why: "Searle is just one part, like a single part of a brain." },
    ],
    timeline: { event: "Searle's Chinese room argument", year: 1980 },
    estimate: null,
  },
  {
    id: "phil-pascal-wager",
    level: 1,
    title: "Pascal's wager",
    body: [
      "Blaise Pascal, mathematician and devout Catholic, left notes for a defence of Christianity unfinished at his death in 1662. Published as the Pensées in 1670, they include a famous bet. Reason, he said, cannot settle whether God exists, yet you cannot avoid choosing, because not deciding amounts to deciding against.",
      "So weigh the stakes. If you wager on God and God exists, you gain infinite happiness; if God does not exist, you lose little. If you wager against God and are wrong, you lose everything. With an infinite prize on one side, even a small chance makes belief the better bet. Critics raise sharp objections. Which God? Many religions promise rewards, and backing the wrong one might be costly. And can you simply decide to believe? Pascal's answer to the second was to act as believers do, and belief may follow.",
    ],
    question: "Can you choose to believe something because it is a good bet, or does belief not work that way?",
    quiz: [
      { q: "In Pascal's wager, what do you gain if you bet on God and God exists?", a: "Infinite happiness", w: ["Nothing at all", "A long life on earth", "Worldly riches"], why: "An infinite prize makes even a small chance worth betting on." },
      { q: "What is the 'many gods' objection to the wager?", a: "You might back the wrong religion", w: ["God would not like gambling", "Infinity is not a real number", "Pascal was not religious"], why: "Many religions promise rewards, so which do you bet on?" },
    ],
    timeline: { event: "Pascal's Pensées published", year: 1670 },
    estimate: null,
  },
  {
    id: "phil-sartre",
    level: 1,
    title: "Condemned to be free",
    body: [
      "In October 1945, in a packed Paris lecture hall, Jean-Paul Sartre summed up existentialism in three words: existence precedes essence. A paper knife is designed for a purpose before it is made; its essence comes first. Humans, Sartre argued, have no designer and no fixed nature. We exist first, and then define ourselves by what we choose and do.",
      "That freedom is a weight as much as a gift. We are, he said, condemned to be free: there is no excuse, no human nature or God to hand responsibility to. He told of a student who came to him during the war, torn between staying with his mother, who lived only for him, and leaving to join the Free French forces. No rule book could decide. Sartre's advice: you are free, so choose, that is, invent. Pretending we have no choice is what he called bad faith.",
    ],
    question: "Is there a part of your life where you tell yourself 'I have no choice' when, really, you do?",
    quiz: [
      { q: "What is Sartre's three-word summary of existentialism?", a: "Existence precedes essence", w: ["Think, therefore exist", "Nothing is permanent", "God is dead"], why: "We exist first, then define ourselves by our choices." },
      { q: "What did Sartre call pretending we have no choice?", a: "Bad faith", w: ["Good sense", "Original sin", "Learned helplessness"], why: "Denying our freedom is bad faith." },
    ],
    timeline: { event: "Sartre's 'Existentialism is a Humanism'", year: 1945 },
    estimate: null,
  },
  {
    id: "phil-ubuntu",
    level: 1,
    title: "I am because we are",
    body: [
      "Ubuntu is a southern African idea, captured in the Zulu saying 'umuntu ngumuntu ngabantu': a person is a person through other people. Where much Western philosophy starts from the individual mind, as Descartes did, ubuntu starts from relationships. You become fully human through how you treat others and how they treat you, through hospitality, generosity and recognising the dignity of the people around you.",
      "The idea gained worldwide attention after apartheid. Archbishop Desmond Tutu, who chaired South Africa's Truth and Reconciliation Commission, often explained ubuntu as the reason to seek restoration rather than revenge: if my humanity is bound up with yours, then harming you diminishes me too. South Africa's interim constitution of 1993 even spoke of a need for ubuntu but not for victimisation. Critics ask whether a strong communal ethic can sometimes press too hard on individual dissent.",
    ],
    question: "Who are the people who have made you who you are? Could you be 'you' without them?",
    quiz: [
      { q: "What does 'umuntu ngumuntu ngabantu' mean?", a: "A person is a person through other people", w: ["Every person stands alone", "The land belongs to the ancestors", "Strength comes from the chief"], why: "Ubuntu holds that we become human through others." },
      { q: "Which leader often explained ubuntu after apartheid?", a: "Desmond Tutu", w: ["Kwame Nkrumah", "Haile Selassie", "Jomo Kenyatta"], why: "Tutu chaired the Truth and Reconciliation Commission." },
    ],
    timeline: null,
    estimate: null,
  },
];

// Advice requests: a visiting villager asks the player for help applying something from these cards.
export const requests = [
  { card: "phil-stoics", ask: "The harvest festival is next week and I cannot sleep for worrying about rain. My neighbour says an old Stoic would have advice. What would it be?", q: "What would a Stoic like Epictetus advise?", a: "Prepare what you can; accept the weather", w: ["Worry harder so you are ready", "Cancel the festival to be safe"], why: "The weather is not up to us; our preparations and attitude are." },
  { card: "phil-kant", ask: "A gossip asked me where my friend was hiding from him, and I fibbed. My cousin, who reads Kant, says I did wrong. Would Kant really agree with him?", q: "What did Kant argue about lying to protect someone?", a: "Yes: Kant held you should not lie even then", w: ["No: Kant said lying to bad people is a duty", "Kant never wrote about lying"], why: "Kant argued against lying even to a murderer at the door." },
  { card: "phil-popper", ask: "My uncle has a theory that explains every single thing that happens in the village, good or bad. He says that proves it is right. Is he right?", q: "What would Popper say about a theory that explains everything?", a: "It tells you nothing, as it can never be tested", w: ["It must be true if it fits all cases", "It just needs more supporters"], why: "Popper said a scientific theory must risk being proved wrong." },
  { card: "phil-induction", ask: "The miller says the old bridge has held for fifty years, so it is bound to hold forever. Something about that bothers me. What is it?", q: "Which idea best captures the worry?", a: "Past regularity does not guarantee the future", w: ["Bridges always get stronger with age", "Fifty years is proof enough"], why: "Like Russell's chicken, a long record can end without warning." },
  { card: "phil-experience-machine", ask: "A travelling showman offers a dream helmet: wear it and you will feel you have lived a wonderful life. My sister says only feelings matter, so why not? What do you think Nozick would say?", q: "What was Nozick's point about such a machine?", a: "We want to really do things, not just feel them", w: ["Pleasure is the only thing that matters", "Machines always break eventually"], why: "Most refuse to plug in, suggesting experience is not all that matters." },
];
