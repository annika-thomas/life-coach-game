// History & words cards. See js/cards/README note in the main brief.
export default [
  {
    id: 'hist-sandwich',
    level: 1,
    title: 'The Earl who lent his name to lunch',
    body: [
      'People had been putting food between bread for centuries, but the name comes from John Montagu, the 4th Earl of Sandwich, an eighteenth-century British politician. According to a French visitor\'s account from the 1760s, the Earl once spent a full day at the gaming table and asked for beef between slices of bread so he could eat without stopping play. Others, including a later biographer, suggest he was more likely eating at his desk while working. Either way, people began asking for "the same as Sandwich".',
      'The Earl left his mark elsewhere too. As First Lord of the Admiralty he supported Captain Cook\'s voyages, and Cook named the Sandwich Islands, today\'s Hawaii, after him. Sandwich itself is a small town in Kent, so in a roundabout way your lunch is named after a place, not just a person.',
    ],
    question: 'If a food were named after you, what would it be, and what habit of yours would it celebrate?',
    quiz: [
      { q: 'Who is the sandwich named after?', a: 'The 4th Earl of Sandwich', w: ['A Kentish baker', 'Captain James Cook', 'Queen Victoria'], why: 'John Montagu, 4th Earl of Sandwich, gave the snack its name.' },
      { q: 'Which islands did Captain Cook name after the Earl?', a: 'The islands now called Hawaii', w: ['The Falkland Islands', 'The Channel Islands', 'The Canary Islands'], why: 'Cook named them the Sandwich Islands.' },
    ],
    timeline: null,
    estimate: null,
  },
  {
    id: 'hist-eponyms',
    level: 2,
    title: 'People who became words',
    body: [
      'The Earl of Sandwich is not alone. Words named after people are called eponyms, and everyday English is full of them. In 1880 tenants in County Mayo, Ireland, refused to work for or trade with Captain Charles Boycott, an unpopular land agent. The tactic worked so well that his surname became a verb within months.',
      'The cardigan is named after the 7th Earl of Cardigan, who led the doomed Charge of the Light Brigade in the Crimean War and favoured a knitted woollen waistcoat. The leotard comes from Jules Léotard, a French acrobat credited with inventing the flying trapeze act. And the silhouette is probably named after Étienne de Silhouette, a French finance minister of 1759 whose penny-pinching made his name a byword for anything done cheaply, including cut-paper profile portraits. Most of these people never chose their immortality.',
    ],
    question: 'Which person alive today do you think is most likely to become a word, and what would it mean?',
    quiz: [
      { q: 'What was Captain Boycott\'s job?', a: 'Land agent', w: ['Ship\'s captain', 'Army general', 'Shopkeeper'], why: 'Tenants in County Mayo shunned the unpopular land agent in 1880.' },
      { q: 'Which garment is named after the Earl who led the Charge of the Light Brigade?', a: 'The cardigan', w: ['The leotard', 'The wellington', 'The mackintosh'], why: 'The 7th Earl of Cardigan favoured a knitted waistcoat.' },
    ],
    timeline: { event: 'Captain Boycott is boycotted', year: 1880 },
    estimate: null,
  },
  {
    id: 'hist-gregorian',
    level: 1,
    title: 'The days that never happened',
    body: [
      'The old Julian calendar, set up under Julius Caesar, assumed a year of exactly 365 and a quarter days. The true year is about 11 minutes shorter, and over the centuries the calendar drifted away from the seasons. In 1582 Pope Gregory XIII fixed it: Thursday 4 October was followed directly by Friday 15 October, and leap years were tweaked so that most century years skip them.',
      'Catholic countries switched quickly, but Protestant Britain held out until 1752, by which time it had to drop 11 days: Wednesday 2 September was followed by Thursday 14 September. Stories of crowds rioting to demand "give us our eleven days" are probably exaggerated, partly inspired by a Hogarth painting. Russia waited until 1918, which is why its "October Revolution" of 1917 took place in November by everyone else\'s calendar.',
    ],
    question: 'If your country announced it was skipping eleven days next month, what would you worry about first?',
    quiz: [
      { q: 'In 1582, which date came right after Thursday 4 October?', a: 'Friday 15 October', w: ['Friday 5 October', 'Monday 1 November', 'Friday 14 October'], why: 'Ten days were dropped to realign the calendar.' },
      { q: 'Why did the Julian calendar drift?', a: 'Its year was about 11 minutes too long', w: ['It had no leap years', 'It used the Moon only', 'It had 13 months'], why: 'The small error added up over centuries.' },
    ],
    timeline: { event: 'Gregorian calendar introduced', year: 1582 },
    estimate: { q: 'How many days did Britain drop from its calendar in 1752?', answer: 11, unit: 'days', min: 1, max: 30 },
  },
  {
    id: 'hist-tax-year',
    level: 2,
    title: 'Why the UK tax year starts on 6 April',
    body: [
      'Britain\'s odd tax year is a fossil of the calendar change. Until 1752 the English legal year began not on 1 January but on 25 March, Lady Day, a traditional quarter day when rents and debts fell due. So the year 1751 was unusually short: it ran from 25 March to 31 December.',
      'When eleven days were dropped in September 1752, the Treasury had no wish to lose eleven days of tax, so it pushed the end of the financial year forward to 4 April. In 1800, a year that would have been a leap year under the old calendar but was not under the new one, it shifted by one more day, to 5 April. That is why the UK tax year still begins on 6 April: a little monument to an eighteenth-century calendar fix, re-enacted every spring by accountants.',
    ],
    question: 'What other everyday rules do you follow that might secretly be fossils of some long-forgotten decision?',
    quiz: [
      { q: 'On what date does the UK tax year begin?', a: '6 April', w: ['1 January', '25 March', '1 April'], why: 'The calendar change and an 1800 adjustment pushed it to 6 April.' },
      { q: 'Before 1752, when did the English legal year begin?', a: '25 March, Lady Day', w: ['1 January', '25 December', '1 September'], why: 'Lady Day was the traditional start of the year.' },
    ],
    timeline: { event: 'Britain switches calendars', year: 1752 },
    estimate: null,
  },
  {
    id: 'hist-longitude',
    level: 1,
    title: 'The longitude prize',
    body: [
      'For centuries sailors could find their latitude from the Sun or stars, but not their longitude, their position east or west. Ships ran aground and crews died because they did not know where they were. The key insight: the Earth turns 15 degrees every hour, so if you know the time at home and the local time at sea, the difference tells you your longitude. The problem was building a clock that kept accurate time on a rolling, damp ship.',
      'In 1714 the British Parliament passed the Longitude Act, offering up to £20,000, a fortune at the time, for a practical method. A Yorkshire carpenter and clockmaker, John Harrison, spent decades building sea clocks. His pocket-watch-sized H4 performed superbly on a voyage to Jamaica in the 1760s. The board was slow to pay, and Harrison only received most of his reward late in life, after appealing to King George III.',
    ],
    question: 'Would you spend decades on a single problem, knowing the reward might never fully come?',
    quiz: [
      { q: 'How many degrees does the Earth turn each hour?', a: '15 degrees', w: ['1 degree', '24 degrees', '60 degrees'], why: '360 degrees divided by 24 hours is 15.' },
      { q: 'What was John Harrison\'s original trade?', a: 'Carpenter and clockmaker', w: ['Admiral', 'Astronomer Royal', 'Mapmaker'], why: 'Harrison was a Yorkshire carpenter turned clockmaker.' },
    ],
    timeline: { event: 'Longitude Act passed', year: 1714 },
    estimate: { q: 'What was the maximum Longitude Act prize, in pounds?', answer: 20000, unit: 'pounds', min: 1000, max: 100000 },
  },
  {
    id: 'hist-time-zones',
    level: 2,
    title: 'When every town kept its own time',
    body: [
      'Knowing the time at Greenwich solved longitude at sea, but on land every town kept its own local time, set by the Sun. Bristol, further west, ran about ten minutes behind London. Nobody minded until the railways arrived and timetables became a nightmare. In 1840 the Great Western Railway began using London time across its network, and other lines followed. Bristol\'s Corn Exchange clock still has two minute hands, one for local time and one for London.',
      'Britain made Greenwich Mean Time the legal standard in 1880. Then in 1884, at a conference in Washington, delegates chose the Greenwich meridian as the world\'s prime meridian, the zero line for longitude and the basis for time zones. France abstained and kept using the Paris meridian for decades. Our tidy global clock is, in other words, a railway timetable that went global.',
    ],
    question: 'Would you prefer one single world time, so noon happens at different hours of daylight everywhere, or keep time zones?',
    quiz: [
      { q: 'Which industry pushed Britain to adopt a single national time?', a: 'The railways', w: ['The navy', 'The postal service', 'The cotton mills'], why: 'Railway timetables needed one time across the network.' },
      { q: 'What does Bristol\'s Corn Exchange clock famously have?', a: 'Two minute hands', w: ['No hour hand', 'Thirteen hours', 'A backwards dial'], why: 'One shows local Bristol time and one London time.' },
    ],
    timeline: { event: 'Greenwich chosen as prime meridian', year: 1884 },
    estimate: null,
  },
  {
    id: 'hist-gutenberg',
    level: 1,
    title: 'Gutenberg\'s gamble',
    body: [
      'Around 1455, in the German city of Mainz, Johannes Gutenberg finished printing a Bible using movable metal type. He was not the first to print with movable type: it had been used in China centuries earlier, and in Korea with metal type. But his combination of a durable metal alloy, oil-based ink and an adapted wine press made printing fast and cheap enough to change Europe.',
      'He reportedly printed around 180 copies of his Bible, some on paper and some on vellum, and fewer than fifty survive today, many incomplete. Within fifty years printing presses had spread to hundreds of European towns. Books stopped being rare objects copied by hand and became affordable, helping fuel the Reformation and the scientific revolution. Ironically, Gutenberg himself did not get rich: he lost control of his business to his financial backer after a lawsuit.',
    ],
    question: 'Which modern invention do you think will turn out to be as big a shift as the printing press, and why?',
    quiz: [
      { q: 'In which city did Gutenberg print his Bible?', a: 'Mainz', w: ['Venice', 'Paris', 'London'], why: 'Gutenberg worked in Mainz, in Germany.' },
      { q: 'Where had movable type been used before Gutenberg?', a: 'China and Korea', w: ['Egypt and Persia', 'Rome and Greece', 'Nowhere at all'], why: 'Movable type existed in China, and metal type in Korea, earlier.' },
    ],
    timeline: { event: 'Gutenberg Bible printed', year: 1455 },
    estimate: { q: 'Roughly how many copies of his Bible did Gutenberg print?', answer: 180, unit: 'copies', min: 10, max: 1000 },
  },
  {
    id: 'hist-upper-case',
    level: 2,
    title: 'Upper case, lower case and clichés',
    body: [
      'After Gutenberg, printing gave English a whole vocabulary we still use without noticing. Typesetters kept their metal letters in wooden cases. The capital letters sat in the upper case, the small letters in the lower case, closer to hand because they were used more. The names stuck long after the wooden cases disappeared.',
      'Printers also made solid metal plates of whole pages so popular texts could be reprinted without resetting every letter. In English this plate was a "stereotype", and in French a "cliché". Both words later drifted to describe ideas or phrases that are repeated without change, which is exactly what a printing plate does. "Leading", the space between lines of type, comes from the strips of lead placed between them. So every time you call a phrase a cliché, you are quietly quoting an old print shop.',
    ],
    question: 'Which modern technical terms do you think will survive after the technology itself has vanished?',
    quiz: [
      { q: 'Why are small letters called "lower case"?', a: 'They were kept in the lower type case', w: ['They are lower in height', 'They were cheaper to make', 'They were used by lower classes'], why: 'Typesetters stored small letters in the lower, handier case.' },
      { q: 'What was a "cliché" originally?', a: 'A printing plate', w: ['A type of ink', 'A French poem', 'A bookbinding knot'], why: 'It was the French term for a stereotype plate.' },
    ],
    timeline: null,
    estimate: null,
  },
  {
    id: 'hist-quarantine',
    level: 1,
    title: 'Why quarantine means forty',
    body: [
      'In 1377 the Adriatic port of Ragusa, today\'s Dubrovnik, passed a rule that ships arriving from plague-hit areas had to wait in isolation for thirty days before people could enter the city. It is often described as the first known quarantine law.',
      'Venice and other ports later extended the wait to forty days, in Venetian "quaranta giorni", and that is where the word quarantine comes from. Why forty? Nobody is quite sure. It may have been a practical guess at how long it took the disease to show itself, but forty also had strong religious echoes, from the forty days of Lent to Jesus\'s forty days in the desert. Venice also built a lazaretto, an island hospital where the sick and suspected could be separated. Centuries before anyone understood germs, people had worked out that separation slowed contagion.',
    ],
    question: 'How long would you be willing to isolate to protect your community, and what would make it bearable?',
    quiz: [
      { q: 'What number is hidden in the word "quarantine"?', a: 'Forty', w: ['Four', 'Fourteen', 'Thirty'], why: 'It comes from the Venetian quaranta giorni, forty days.' },
      { q: 'Which port passed an early 30-day isolation law in 1377?', a: 'Ragusa, now Dubrovnik', w: ['Genoa', 'Marseille', 'Lisbon'], why: 'Ragusa required a thirty-day isolation for arrivals.' },
    ],
    timeline: { event: 'Ragusa\'s isolation law', year: 1377 },
    estimate: { q: 'How many days long was the Venetian quarantine that gave us the word?', answer: 40, unit: 'days', min: 5, max: 100 },
  },
  {
    id: 'hist-ring-a-roses',
    level: 2,
    title: 'Ring a ring o\' roses is not about the plague',
    body: [
      'Many of us learned that this nursery rhyme describes the plague: the rosy rash, the posies to ward off bad air, sneezing, then "we all fall down", dead. It is a gripping story, and folklorists are fairly sure it is wrong.',
      'The rhyme first appears in print in 1881, centuries after the great plagues, and many early versions have no sneezing or falling at all. The plague interpretation does not show up until the mid-twentieth century. The famous folklorists Iona and Peter Opie, who studied children\'s rhymes for decades, dismissed it, noting that the symptoms do not really match. Falling down at the end is a common feature of children\'s singing games, which are about play rather than history. The plague theory is a lovely example of how a neat explanation, once told, spreads like, well, a contagion.',
    ],
    question: 'Why do you think dark explanations of innocent things are so appealing and spread so easily?',
    quiz: [
      { q: 'When does "Ring a ring o\' roses" first appear in print?', a: '1881', w: ['1348', '1665', '1952'], why: 'It was first printed in 1881, long after the great plagues.' },
      { q: 'When did the plague interpretation first appear?', a: 'The mid-twentieth century', w: ['During the Black Death', 'In the 1600s', 'In Roman times'], why: 'The plague reading is a modern invention.' },
    ],
    timeline: null,
    estimate: null,
  },
  {
    id: 'hist-norse-words',
    level: 1,
    title: 'The Vikings in your vocabulary',
    body: [
      'Viking raiders and settlers left more than burnt monasteries. From the late eighth century, Norse speakers settled large parts of northern and eastern England, and their language, Old Norse, mingled with Old English. The result is hiding in your most basic words: sky, egg, knife, skin, leg, window and husband all came from Norse. Window was originally "wind eye", a hole in the roof to let smoke out and air in.',
      'Most remarkably, English borrowed the pronouns they, them and their from Norse, which is rare: languages usually guard such basic words closely. The map remembers too. Place names ending in -by, meaning farm or village, such as Derby and Whitby, and -thorpe, meaning a smaller settlement, cluster in the areas where Vikings settled. Next time you say "they ate eggs by the window", you are speaking partly Viking.',
    ],
    question: 'Which word from another language would you most like English to adopt, and why?',
    quiz: [
      { q: 'What did "window" originally mean in Old Norse?', a: 'Wind eye', w: ['Glass hole', 'Light door', 'Sun gap'], why: 'It was a "wind eye" in the roof for smoke and air.' },
      { q: 'What does the place-name ending "-by" mean?', a: 'Farm or village', w: ['River crossing', 'Hill fort', 'Church'], why: 'Places like Derby and Whitby mark Norse settlement.' },
    ],
    timeline: null,
    estimate: null,
  },
  {
    id: 'hist-napoleon-height',
    level: 1,
    title: 'Napoleon was not short',
    body: [
      'Ask people about Napoleon and many will mention his height. Yet he was probably about 1.69 metres, roughly 5 feet 7 inches, around average or slightly above for a Frenchman of his time. So where did the myth come from?',
      'Partly from units. At his death his height was recorded as about 5 feet 2 inches in French measures, but the French inch was longer than the English one, so the figure was mistranslated into something much shorter. Partly from affection: his soldiers called him "le petit caporal", the little corporal, a nickname of endearment rather than measurement. And partly from propaganda. British cartoonists, especially James Gillray, loved drawing him as a tiny, tantrum-throwing figure. He was also often surrounded by his Imperial Guard, who were selected partly for height. The myth even inspired a psychological label, the "Napoleon complex", built on a man who was not short.',
    ],
    question: 'What is something people commonly believe about you that is not really true? Where do you think it came from?',
    quiz: [
      { q: 'Roughly how tall was Napoleon?', a: 'About 5 feet 7 inches', w: ['About 4 feet 11 inches', 'About 5 feet 2 inches', 'About 6 feet 2 inches'], why: 'He was about 1.69 metres, average or slightly above.' },
      { q: 'Why did "5 feet 2 inches" mislead people?', a: 'French inches were longer than English ones', w: ['It was measured lying down', 'It was a typing error', 'It was his height as a child'], why: 'The French figure was converted as if it were English.' },
    ],
    timeline: null,
    estimate: { q: 'Roughly how tall was Napoleon, in centimetres?', answer: 169, unit: 'cm', min: 140, max: 200 },
  },
  {
    id: 'hist-folk-etymology',
    level: 1,
    title: 'Too good to be true etymologies',
    body: [
      'Some word origins are so satisfying they spread everywhere, despite being false. "Sincere" is said to come from the Latin "sine cera", without wax, supposedly because honest sculptors did not hide cracks with wax. Lovely, but wrong: it comes from the Latin "sincerus", meaning clean or pure. "Posh" is said to stand for "port out, starboard home", the shady side on ships to India. Dictionaries find no evidence; the real origin is unknown.',
      'A useful rule of thumb: be suspicious of any old word supposedly formed from an acronym. Making words from initials only became common in the twentieth century, so tales of medieval or Victorian acronyms are almost always invented after the fact. Linguists call these stories folk etymologies. They tell us less about the words than about our love of a neat story with a twist at the end.',
    ],
    question: 'Should we correct friends who repeat a charming but false word story, or let it go?',
    quiz: [
      { q: 'What does "sincere" really come from?', a: 'Latin "sincerus", clean or pure', w: ['Latin "sine cera", without wax', 'Greek "syn kera", with horns', 'French "sans cire"'], why: 'The "without wax" story is a folk etymology.' },
      { q: 'Why are acronym origins for old words usually false?', a: 'Acronyms only became common in the 1900s', w: ['Old English had no letters', 'Acronyms were illegal', 'Printers banned capitals'], why: 'Making words from initials is a largely twentieth-century habit.' },
    ],
    timeline: null,
    estimate: null,
  },
  {
    id: 'hist-mayday',
    level: 1,
    title: 'Mayday, mayday, mayday',
    body: [
      'Why would pilots in distress shout the name of a spring festival? They are not. In 1923 Frederick Mockford, a senior radio officer at Croydon Airport near London, was asked to come up with a distress word that any pilot or ground staff would instantly understand. Much of the air traffic at the time was between Croydon and Paris, so he chose something that sounded like the French "m\'aider", meaning "help me", from "venez m\'aider", "come and help me".',
      'It is said three times, "Mayday, mayday, mayday", so it cannot be mistaken for a normal mention of the word. There is a lesser alarm too: "pan-pan", from the French "panne", a breakdown, used for an urgent problem that is not yet life-threatening. Using a false mayday is a serious offence in many countries, because rescuers will drop everything to respond.',
    ],
    question: 'If you had to invent a word for an emergency that everyone in the world would understand, what would you choose?',
    quiz: [
      { q: 'Which language does "mayday" come from?', a: 'French', w: ['German', 'Latin', 'Old English'], why: 'It imitates the French "m\'aider", help me.' },
      { q: 'What is "pan-pan" used for?', a: 'An urgent but not life-threatening problem', w: ['A celebration message', 'A weather report', 'A false alarm'], why: 'It comes from the French "panne", breakdown.' },
    ],
    timeline: { event: 'Mayday chosen as distress call', year: 1923 },
    estimate: null,
  },
  {
    id: 'hist-sos',
    level: 2,
    title: 'SOS does not stand for anything',
    body: [
      'Before voice radio and mayday, distress calls were tapped in Morse code. Different companies used different signals, including the Marconi company\'s CQD. In 1906 an international radiotelegraph conference in Berlin agreed a common signal, which came into force in 1908: three dots, three dashes, three dots. In Morse that spells SOS.',
      'It was chosen for its rhythm, not its meaning: easy to send and impossible to mistake, even through static. "Save our souls" and "save our ship" were invented afterwards to fit the letters, a classic case of what linguists call a backronym. When the Titanic sank in 1912, its radio operators sent both the old CQD and the newer SOS, one of the most famous early uses of the signal. Like mayday, its power lies in being simple, distinctive and recognised everywhere.',
    ],
    question: 'What do you think makes a signal or symbol truly universal: simplicity, history or something else?',
    quiz: [
      { q: 'What does SOS originally stand for?', a: 'Nothing, it was chosen for its Morse pattern', w: ['Save our souls', 'Save our ship', 'Send out support'], why: 'The phrases were added later to fit the letters.' },
      { q: 'Which older distress signal did the Titanic also send?', a: 'CQD', w: ['XYZ', 'HELP', 'MAYDAY'], why: 'Its operators sent both CQD and SOS in 1912.' },
    ],
    timeline: { event: 'SOS agreed in Berlin', year: 1906 },
    estimate: null,
  },
  {
    id: 'hist-great-stink',
    level: 1,
    title: 'The Great Stink',
    body: [
      'In the hot summer of 1858, the River Thames, which carried London\'s untreated sewage, smelled so bad that it became known as the Great Stink. The Houses of Parliament, right on the riverbank, hung curtains soaked in chemicals to block the stench. When the people who make laws can no longer breathe at work, laws get made quickly.',
      'Parliament backed a vast plan by the engineer Joseph Bazalgette: around 82 miles of large intercepting sewers and about 1,100 miles of street sewers, carrying waste away from central London. Ironically, many MPs believed disease spread through bad smells, or "miasma". The physician John Snow had already argued in 1854 that cholera spread through dirty water, and he was right. The sewers worked anyway, because they removed sewage from the drinking water too. Much of Bazalgette\'s system still serves London today.',
    ],
    question: 'Can you think of a problem today that will only be fixed when the people in charge feel it personally?',
    quiz: [
      { q: 'Which engineer built London\'s great sewer network after 1858?', a: 'Joseph Bazalgette', w: ['Isambard Kingdom Brunel', 'Thomas Telford', 'John Snow'], why: 'Bazalgette designed the system Parliament backed.' },
      { q: 'What did John Snow argue spread cholera?', a: 'Dirty water', w: ['Bad smells', 'Rats', 'Cold weather'], why: 'Snow argued in 1854 that cholera was waterborne.' },
    ],
    timeline: { event: 'The Great Stink', year: 1858 },
    estimate: { q: 'About how many miles of street sewers did Bazalgette\'s plan include?', answer: 1100, unit: 'miles', min: 100, max: 5000 },
  },
  {
    id: 'hist-qwerty',
    level: 1,
    title: 'Why your keyboard says QWERTY',
    body: [
      'The keyboard layout you probably use was designed for a machine you have probably never touched. In the 1860s and 1870s the American inventor Christopher Latham Sholes developed a typewriter and kept rearranging its keys. A version went on sale through the gun maker Remington in 1874, with the QWERTY layout.',
      'A common story says the layout was designed to slow typists down. The likelier explanation is that it aimed to stop the metal typebars jamming by separating some letters often typed together, and some historians think it was also shaped by feedback from telegraph operators. Rival layouts, such as the Dvorak keyboard patented in the 1930s, claimed to be faster, but evidence of a big advantage is disputed, and by then millions of people had learned QWERTY. Economists use it as a famous example of "lock-in": once everyone has adopted a standard, switching costs more than it gains.',
    ],
    question: 'Is there something you keep doing a certain way only because switching would be a hassle?',
    quiz: [
      { q: 'Which company sold the early QWERTY typewriter in 1874?', a: 'Remington', w: ['IBM', 'Olivetti', 'Singer'], why: 'The gun maker Remington put Sholes\'s typewriter on sale.' },
      { q: 'What do economists call it when a standard sticks because switching is costly?', a: 'Lock-in', w: ['Inflation', 'Arbitrage', 'Comparative advantage'], why: 'QWERTY is the classic example of lock-in.' },
    ],
    timeline: { event: 'QWERTY typewriter on sale', year: 1874 },
    estimate: null,
  },
  {
    id: 'hist-tea-britain',
    level: 1,
    title: 'How Britain fell for tea',
    body: [
      'Tea seems timelessly British, but it arrived only in the seventeenth century, an exotic import from China. By the late 1650s London coffee houses were selling it, and the diarist Samuel Pepys recorded drinking his first cup in 1660.',
      'The real boost came in 1662, when King Charles II married the Portuguese princess Catherine of Braganza. She was already a tea drinker, and her habit made it fashionable at court. Tea then spread down through society, though for a long time heavy taxes made it a luxury, and smuggling became a huge business. Later, Britain\'s appetite for Chinese tea shaped world history in darker ways: paying for it helped drive the opium trade with China, and in the nineteenth century the British established large tea plantations in India to break China\'s hold. Your cuppa has a surprisingly global backstory.',
    ],
    question: 'Which everyday habit of yours do you think has the most surprising history behind it?',
    quiz: [
      { q: 'Which queen helped make tea fashionable at the English court?', a: 'Catherine of Braganza', w: ['Elizabeth I', 'Queen Victoria', 'Mary Queen of Scots'], why: 'The Portuguese princess brought her tea habit when she married Charles II.' },
      { q: 'Where did Britain\'s tea originally come from?', a: 'China', w: ['India', 'Portugal', 'Kenya'], why: 'Tea arrived from China; Indian plantations came much later.' },
    ],
    timeline: { event: 'Charles II marries Catherine of Braganza', year: 1662 },
    estimate: null,
  },
  {
    id: 'hist-alphabet',
    level: 1,
    title: 'The ox hiding in the letter A',
    body: [
      'Turn a capital A upside down and squint: you might see the head of an ox with two horns. That is not a coincidence. Most of the world\'s alphabets, including the one you are reading, descend from an early script developed by Semitic-speaking people nearly 4,000 years ago, later refined by the Phoenicians, a seafaring trading people of the eastern Mediterranean.',
      'Their letters were named after everyday things, and the first, aleph, meant ox. The second, beth, meant house. The Greeks borrowed the system, turning aleph and beth into alpha and beta, which is where the word alphabet comes from. They also made a key improvement: the Phoenician script wrote only consonants, and the Greeks repurposed some letters as vowels. The Romans then adapted the Greek letters into the Latin alphabet, and over centuries the ox slowly rotated onto its horns.',
    ],
    question: 'If you could redesign one letter or spelling rule in English, what would you change?',
    quiz: [
      { q: 'What did the Phoenician letter aleph, ancestor of A, mean?', a: 'Ox', w: ['House', 'Water', 'Eye'], why: 'Aleph meant ox; A began as an ox head.' },
      { q: 'What key change did the Greeks make to the Phoenician script?', a: 'They added vowels', w: ['They removed consonants', 'They wrote right to left', 'They added numbers'], why: 'Phoenician wrote only consonants; Greek repurposed letters as vowels.' },
    ],
    timeline: null,
    estimate: null,
  },
  {
    id: 'hist-dord',
    level: 1,
    title: 'Dord, the word that never was',
    body: [
      'In 1934 the second edition of Webster\'s New International Dictionary, one of the most respected American dictionaries, included the word "dord", defined as density in physics and chemistry. There was just one problem: no such word existed.',
      'The mistake came from a slip of paper meant to note that "D or d" could be used as an abbreviation for density. Somewhere between the card and the typesetter, "D or d" was read as a single word, and it slipped into the dictionary with a pronunciation and everything. An editor finally noticed in 1939 that the entry had no etymology, and it was quietly removed from later printings in the 1940s. Lexicographers call such errors "ghost words". Dord is now the most famous of them, and, rather wonderfully, it has become a real word after all: the word for that very mistake.',
    ],
    question: 'Who should decide what counts as a real word: dictionaries, or the people who use them?',
    quiz: [
      { q: 'What was "dord" supposed to mean?', a: 'Density', w: ['A kind of bird', 'A Scottish hill', 'A unit of time'], why: 'It came from a note that "D or d" could abbreviate density.' },
      { q: 'What do lexicographers call words that exist only by mistake?', a: 'Ghost words', w: ['Phantom nouns', 'Eponyms', 'Backronyms'], why: 'Dord is the most famous ghost word.' },
    ],
    timeline: { event: 'Dord appears in Webster\'s', year: 1934 },
    estimate: null,
  },
];

// Advice requests: a visiting villager asks the player for help applying something from these cards.
export const requests = [
  { card: 'hist-folk-etymology', ask: 'I want to start my wedding speech by saying "posh" stands for "port out, starboard home". It is such a fun fact! Should I use it?', q: 'What is the honest situation with that origin?', a: 'There is no evidence for it; origin unknown', w: ['It is fully proven by shipping records', 'It is from Latin, without wax'], why: 'Dictionaries find no evidence, and acronym origins for old words are rarely true.' },
  { card: 'hist-quarantine', ask: 'My grandson asked why we say "quarantine" when people isolate for all sorts of lengths of time. I have no idea!', q: 'What does the word quarantine originally refer to?', a: 'Forty days of isolation in Venice', w: ['A Latin word for sickness', 'A ship\'s yellow flag'], why: 'It comes from the Venetian quaranta giorni, forty days.' },
  { card: 'hist-tax-year', ask: 'I have just moved here and the tax people say my year starts on 6 April. That seems so random. Is there any reason?', q: 'What best explains the 6 April start?', a: 'Old 25 March new year plus calendar-change days', w: ['It was the King\'s birthday', 'It follows the end of Lent'], why: 'Lady Day plus eleven dropped days and one more in 1800 gives 6 April.' },
  { card: 'hist-sos', ask: 'I am painting SOS on the side of my boat, along with "Save Our Souls" underneath. My friend says that is not what it means. Who is right?', q: 'What does SOS actually stand for?', a: 'Nothing; it was chosen for its Morse rhythm', w: ['Save our souls', 'Ship overturned at sea'], why: 'Three dots, three dashes, three dots; the phrases were invented later.' },
  { card: 'hist-napoleon-height', ask: 'My short nephew keeps being teased about having a "Napoleon complex". I would love a comeback for him. Any ideas?', q: 'What is the best historical comeback?', a: 'Napoleon was about average height for his time', w: ['Napoleon was actually a giant', 'Napoleon never existed'], why: 'He was about 1.69 metres; the "short" idea came from unit confusion and propaganda.' },
];
