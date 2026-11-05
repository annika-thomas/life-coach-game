// Lesson bank. Each card: id, cat, level (1 = foundation, 2 = builds on an
// earlier card in the same category), title, body (paragraphs), question,
// unlocks (build item id this card counts toward).
//
// To add cards, append objects here. Keep ids unique and stable: history is
// stored by id.

export const CATEGORIES = {
  news:       { label: 'World news',  color: '#e86a5c' },
  robotics:   { label: 'Robotics',    color: '#7a8ca8' },
  fashion:    { label: 'Fashion',     color: '#e27fb0' },
  wine:       { label: 'Wine',        color: '#9c3b5a' },
  cheese:     { label: 'Cheese',      color: '#e8b730' },
  film:       { label: 'Movies & TV', color: '#5a5f8f' },
  food:       { label: 'Food',        color: '#ef8a3c' },
  travel:     { label: 'Travel',      color: '#3fa7b8' },
  art:        { label: 'Art',         color: '#d9534f' },
  culture:    { label: 'Culture',     color: '#c9673a' },
  philosophy: { label: 'Philosophy',  color: '#8a72b8' },
  stats:      { label: 'Probability', color: '#4a9b6e' },
  science:    { label: 'Science',     color: '#3f7fc4' },
  history:    { label: 'History & words', color: '#a5794a' },
};

export const LESSONS = [
  // ── World news & opinions ────────────────────────────────────────────
  {
    id: 'news-unsc-veto', cat: 'news', level: 1, unlocks: 'kiosk',
    title: 'Why the UN Security Council so often stalls',
    body: [
      'The Security Council has fifteen members. Ten are elected for two-year terms; five are permanent: the US, UK, France, Russia and China, the victors of 1945. A resolution needs nine yes votes and no "no" from any of those five. That single no is the veto.',
      'This is why the Council can act decisively on some crises and freeze completely on others: when a permanent member or its close ally is involved, the veto usually comes out. The General Assembly, where every country votes, can pass resolutions on anything, but they are recommendations, not binding law. Reform proposals (adding permanent seats for India, Brazil, Germany, Japan or an African state, or limiting the veto in mass-atrocity cases) have circulated for decades and stall for the same reason: changing the Charter needs the permanent five to agree.',
    ],
    question: 'If you could abolish the veto, add permanent members, or leave it alone, which would you pick, and what would you worry about?',
  },
  {
    id: 'news-central-banks', cat: 'news', level: 1, unlocks: 'kiosk',
    title: 'How to read a central bank decision',
    body: [
      'Most big central banks aim for roughly 2% inflation. Their main lever is the short-term interest rate: raise it and borrowing gets pricier, spending cools, prices calm down. The risk is slowing the economy and costing jobs. Cut it and the reverse.',
      'Markets often move more on the words than the decision itself. Because the rate change is usually expected, traders read the statement for "forward guidance": hints about what comes next. A phrase like "further tightening may be appropriate" can shift mortgage rates before anything actually changes. When you see a headline about a rate decision, the useful questions are: was it expected, and did the tone get more hawkish (worried about inflation) or dovish (worried about growth)?',
    ],
    question: 'Inflation is at 4% and unemployment is starting to rise. If you ran the central bank, would you raise rates, hold, or cut? Why?',
  },
  {
    id: 'news-thucydides', cat: 'news', level: 2, unlocks: 'kiosk',
    title: 'The "Thucydides Trap"',
    body: [
      'The ancient historian Thucydides wrote that the Peloponnesian War was made inevitable by "the rise of Athens and the fear that this instilled in Sparta." In 2017 the political scientist Graham Allison turned that into a framework: he studied sixteen cases over 500 years where a rising power challenged a ruling one, and found that twelve ended in war.',
      'The idea is now a staple of commentary on US-China relations. Critics push back hard: the case selection is debatable, nuclear weapons change the maths, and treating war as a historical pattern risks making it feel natural, even self-fulfilling. Allison himself says the point is the four cases that did not end in war, and what the people involved did differently.',
    ],
    question: 'Is a framework like this useful for thinking about the world, or does naming the "trap" make people more likely to fall into it?',
  },

  // ── Robotics ─────────────────────────────────────────────────────────
  {
    id: 'robo-dof', cat: 'robotics', level: 1, unlocks: 'robot',
    title: 'Degrees of freedom',
    body: [
      'A degree of freedom is one independent way a joint can move. To put a hand anywhere in 3D space and point it in any direction you need six: three for position, three for orientation. That is why the classic factory arm has six joints.',
      'Your arm has seven: three at the shoulder, one at the elbow, three at the wrist. The extra one is redundancy: you can keep your hand perfectly still on a table and still swing your elbow up and down. Redundant robots can reach around obstacles and avoid awkward joint limits, but they are harder to control, because there are infinitely many joint configurations for the same hand pose and the controller has to choose one.',
    ],
    question: 'A home robot: would you rather it had human-like arms that can do anything badly, or a few specialised tools that each do one job well?',
  },
  {
    id: 'robo-moravec', cat: 'robotics', level: 1, unlocks: 'robot',
    title: "Moravec's paradox",
    body: [
      'In 1988 roboticist Hans Moravec pointed out something odd: it is comparatively easy to make computers perform at adult level on intelligence tests or chess, and very hard to give them the perception and mobility of a one-year-old.',
      'His explanation was evolutionary. Seeing, balancing and grasping have been refined for hundreds of millions of years, so they feel effortless to us, but they are enormously complex. Abstract reasoning is evolutionarily new, so it feels hard to us but is actually the thin layer. Decades later the paradox still largely holds: software writes essays, while folding a fitted sheet remains a research problem.',
    ],
    question: 'Which household chore do you think will be the very last one a robot does reliably? What makes it so hard?',
  },
  {
    id: 'robo-slam', cat: 'robotics', level: 2, unlocks: 'robot',
    title: 'SLAM: how a robot knows where it is',
    body: [
      'A robot vacuum dropped into a new house has a chicken-and-egg problem. To build a map it needs to know where it is; to know where it is, it needs a map. The solution is called SLAM (Simultaneous Localisation And Mapping), and it estimates both at once, constantly correcting each with the other.',
      'Small errors accumulate as the robot moves (wheels slip, sensors are noisy), so its idea of its own position drifts. The magic moment is "loop closure": when it recognises a place it has seen before, it can snap the whole map back into consistency. Lidar, cameras and wheel sensors all feed the same estimate.',
    ],
    question: 'Humans get lost too. What do you personally use to "close the loop" when you are somewhere unfamiliar? Landmarks, a mental map, or just your phone?',
  },

  // ── Fashion ──────────────────────────────────────────────────────────
  {
    id: 'fashion-lbd', cat: 'fashion', level: 1, unlocks: 'dressform',
    title: 'The little black dress',
    body: [
      'In 1926 American Vogue published a drawing of a simple, long-sleeved black Chanel dress and compared it to the Ford Model T: a design so straightforward it could become a uniform for everyone. Black had mostly meant mourning or servants; Chanel made it chic and practical.',
      'The idea was cemented in 1961, when Audrey Hepburn wore Givenchy\'s black sheath in Breakfast at Tiffany\'s. The LBD lasts because it is a frame rather than a statement: it lets the wearer, the jewellery and the occasion do the talking.',
    ],
    question: 'What is your own "little black dress", the one piece you trust for almost anything? Why does it work?',
  },
  {
    id: 'fashion-couture', cat: 'fashion', level: 1, unlocks: 'dressform',
    title: 'Haute couture is a protected term',
    body: [
      'In France, "haute couture" is not marketing language. Houses must be approved by the Fédération de la Haute Couture et de la Mode, and the criteria include making clothes to order for private clients with multiple fittings, keeping a Paris workshop with a minimum number of full-time staff, and presenting collections each season.',
      'A couture gown can take hundreds, sometimes thousands, of hours of handwork. Very few people buy it; the shows mostly work as the brand\'s laboratory and billboard, while perfume, handbags and ready-to-wear pay the bills.',
    ],
    question: 'Would you rather own one perfect couture piece or a whole wardrobe of really excellent basics? What does your choice say about how you think about clothes?',
  },
  {
    id: 'fashion-newlook', cat: 'fashion', level: 2, unlocks: 'dressform',
    title: "Dior's New Look, 1947",
    body: [
      'In February 1947 Christian Dior showed his first collection: rounded shoulders, a tightly cinched waist and huge, full skirts that used many metres of fabric. The editor of Harper\'s Bazaar, Carmel Snow, reportedly exclaimed that it was "such a new look", and the name stuck.',
      'After years of wartime rationing and boxy utility clothing, it felt like a return to luxury. It also provoked anger: some saw the fabric use as wasteful while rationing continued, and others saw a step backwards for women who had spent the war in practical work clothes.',
    ],
    question: 'Fashion often reacts against the mood before it. What do you think today\'s clothes are reacting to?',
  },

  // ── Wine ─────────────────────────────────────────────────────────────
  {
    id: 'wine-burgundy', cat: 'wine', level: 1, unlocks: 'trellis',
    title: 'Burgundy: terroir on a map',
    body: [
      'Burgundy grows mainly two grapes (Pinot Noir for reds, Chardonnay for whites) and obsesses over exactly where they grow. Its hierarchy runs from regional wines (just "Bourgogne"), to village wines (named after a village, like Gevrey-Chambertin), to premier cru vineyards, up to grand cru vineyards, which account for only a percent or two of production.',
      'The theory is terroir: soil, slope and microclimate make a site taste like itself. But plots are divided among many owners, so one grand cru vineyard may be farmed by dozens of producers of very different skill. Hence the old Burgundy rule: the name of the producer matters as much as the name of the vineyard.',
    ],
    question: 'Would you pick the $40 village wine from a great producer, or the $120 grand cru from a sloppy one? Why?',
  },
  {
    id: 'wine-structure', cat: 'wine', level: 1, unlocks: 'trellis',
    title: 'Acid, tannin and body',
    body: [
      'Before flavours like "cherry" or "pepper", a wine has structure, and structure is easier to learn. Acidity is the thing that makes your mouth water after a sip; high-acid wines feel fresh and pair well with food. Tannin comes from grape skins, seeds and oak, and it feels drying, like over-steeped black tea.',
      'Body is the weight of the wine on your tongue, mostly driven by alcohol: think skimmed milk versus whole milk. Next time you taste, ignore the fruit words and ask three questions: does my mouth water, does it dry out, and how heavy is it?',
    ],
    question: 'Think of something you drink often (coffee, tea, juice). How would you describe its acid, tannin and body?',
  },
  {
    id: 'wine-champagne', cat: 'wine', level: 2, unlocks: 'trellis',
    title: 'Why Champagne is only Champagne',
    body: [
      'Champagne is a protected name: only sparkling wine from that region of north-eastern France, made by the traditional method, can use it. The bubbles come from a second fermentation inside the bottle itself. Yeast and sugar are added, the bottle is sealed, and the trapped carbon dioxide dissolves into the wine.',
      'The main grapes are Chardonnay, Pinot Noir and Pinot Meunier. Most bottles are "non-vintage": blends of several years, so that a house can make its signature style taste the same every year despite the weather. Cava, Crémant and English sparkling wine use the same method under different names.',
    ],
    question: 'Should regions own names like Champagne or Parmigiano, or is a style a style wherever it\'s made?',
  },

  // ── Cheese ───────────────────────────────────────────────────────────
  {
    id: 'cheese-holes', cat: 'cheese', level: 1, unlocks: 'cheesecart',
    title: 'Why Swiss cheese has holes',
    body: [
      'The holes in Emmental (cheesemakers call them "eyes") are made by bacteria. Propionibacteria eat the lactic acid in the young cheese and release carbon dioxide, which collects in bubbles while the wheel is kept warm. The same bacteria contribute its sweet, nutty flavour.',
      'Interestingly, modern Swiss cheeses were developing fewer holes. A 2015 study by the Swiss research institute Agroscope suggested why: tiny hay particles in milk act as starting points for the bubbles, and ultra-clean modern milking had removed them.',
    ],
    question: 'Sometimes "cleaner" and "more modern" quietly removes something we liked. Can you think of another example?',
  },
  {
    id: 'cheese-washed', cat: 'cheese', level: 1, unlocks: 'cheesecart',
    title: 'Washed rinds: the stinky ones',
    body: [
      'Époisses, Taleggio and Limburger get their orange, sticky rinds by being washed repeatedly with brine, beer or spirits as they age. The washing encourages bacteria such as Brevibacterium linens, a relative of the microbes on human skin, which is why some of these cheeses smell like feet.',
      'The paradox is that the paste inside is often mild, creamy and savoury. Smell and taste are telling you different things: much of the aroma lives in the rind. A good rule for a cheeseboard is to give washed rinds their own knife and taste them last.',
    ],
    question: 'Is there a food you love that you once found off-putting? What changed?',
  },
  {
    id: 'cheese-parm', cat: 'cheese', level: 2, unlocks: 'cheesecart',
    title: 'The rules of Parmigiano Reggiano',
    body: [
      'Parmigiano Reggiano is protected: it must come from a defined area around Parma, Reggio Emilia, Modena and parts of Bologna and Mantua, made from local cows\' milk, with only salt and rennet added. Wheels weigh around 40 kg and must age at least 12 months; many are sold at 24 or 36.',
      'The crunchy white specks in an aged piece are not salt. They are clusters of the amino acid tyrosine, a sign of long ageing as proteins break down. That same breakdown releases glutamate, which is why a little parmesan makes a dish taste deeper.',
    ],
    question: 'Would you rather know every rule behind a food, or just eat it without the lore? Does knowing change the taste for you?',
  },

  // ── Movies & TV ──────────────────────────────────────────────────────
  {
    id: 'film-kuleshov', cat: 'film', level: 1, unlocks: 'cinema',
    title: 'The Kuleshov effect',
    body: [
      'Around 1920 the Soviet filmmaker Lev Kuleshov cut the same neutral close-up of an actor between different shots: a bowl of soup, a child in a coffin, a woman on a sofa. Audiences reportedly praised the actor\'s subtle hunger, grief and desire. His face never changed.',
      'The lesson is that meaning in film comes from the cut: viewers project emotion based on context. Editors use it constantly. A reaction shot borrowed from another scene can change what a moment means.',
    ],
    question: 'Where else in life do we read emotion into a "neutral face" purely from context?',
  },
  {
    id: 'film-bomb', cat: 'film', level: 1, unlocks: 'cinema',
    title: "Hitchcock's bomb under the table",
    body: [
      'Alfred Hitchcock explained suspense with a simple scene. Two people talk at a table; suddenly a bomb goes off. The audience gets fifteen seconds of surprise. Now show the audience the bomb first, ticking, set for one o\'clock, and the same dull conversation becomes fifteen minutes of agony.',
      'Suspense comes from giving the audience information the characters do not have. It turns viewers into participants: they want to shout at the screen.',
    ],
    question: 'Do you prefer stories that surprise you or ones that let you see the bomb under the table? Name one that did it well.',
  },
  {
    id: 'film-rashomon', cat: 'film', level: 2, unlocks: 'cinema',
    title: 'Kurosawa and the Rashomon effect',
    body: [
      'In Akira Kurosawa\'s Rashomon (1950), a crime in a forest is told four times: by a bandit, a wife, a dead samurai speaking through a medium, and a woodcutter. Each version is self-serving, and the film never says which is true. It won the Golden Lion at Venice and helped introduce Japanese cinema to the West.',
      'The "Rashomon effect" is now used by lawyers, psychologists and journalists for any situation where witnesses give sincere but contradictory accounts.',
    ],
    question: 'Think of a disagreement you\'ve seen recently. How would each side tell the story?',
  },

  // ── Food ─────────────────────────────────────────────────────────────
  {
    id: 'food-maillard', cat: 'food', level: 1, unlocks: 'grill',
    title: 'The Maillard reaction',
    body: [
      'The brown crust on steak, toast and roasted coffee comes from the Maillard reaction, a cascade between amino acids and sugars that produces hundreds of flavour compounds. It gets going properly at high heat, well above the boiling point of water.',
      'That is why wet food will not brown: as long as there is water on the surface, it stays near 100°C. Pat meat dry, don\'t crowd the pan (crowding traps steam), and let the pan get hot. It is different from caramelisation, which is sugar alone breaking down.',
    ],
    question: 'What\'s one thing you cook that would get better if you applied this tonight?',
  },
  {
    id: 'food-umami', cat: 'food', level: 1, unlocks: 'grill',
    title: 'Umami, the fifth taste',
    body: [
      'In 1908 the Japanese chemist Kikunae Ikeda wondered what made kombu seaweed broth so savoury. He isolated glutamate and named its taste umami. It was dismissed in the West for decades until taste receptors for it were identified around 2000.',
      'Umami is everywhere in "comfort" food: tomatoes, parmesan, mushrooms, soy sauce, anchovies, miso, aged meats. Combining glutamate with certain other compounds (found in meat, fish and dried mushrooms) multiplies the effect, which is why dashi pairs kombu with bonito flakes.',
    ],
    question: 'Which umami ingredient would you smuggle into a dish to make it better, and which dish?',
  },
  {
    id: 'food-mother-sauces', cat: 'food', level: 2, unlocks: 'grill',
    title: 'The French mother sauces',
    body: [
      'The chef Auguste Escoffier, around 1900, organised French cooking around five "mother sauces": béchamel (milk thickened with roux), velouté (stock with roux), espagnole (brown stock with roux), tomato, and hollandaise (butter emulsified into egg yolk).',
      'Each mother has children. Add cheese to béchamel and you get Mornay; tarragon and shallot reduction in hollandaise make béarnaise. Learning the five is like learning chords: suddenly hundreds of recipes become variations rather than things to memorise.',
    ],
    question: 'Is there a "mother recipe" in your own cooking? One base you twist into many dishes?',
  },

  // ── Travel ───────────────────────────────────────────────────────────
  {
    id: 'travel-venice', cat: 'travel', level: 1, unlocks: 'signpost',
    title: 'Why Venice floods (and charges a fee)',
    body: [
      'Venice sits on wooden piles driven into a lagoon. The city has slowly sunk while sea levels rise, so high tides, called acqua alta, flood St Mark\'s Square more often. Since 2020 the MOSE system of mobile barriers can rise from the seabed to close the lagoon during exceptional tides.',
      'The other pressure is people. Millions of visitors arrive each year, many just for the day, while the resident population has shrunk dramatically. In 2024 Venice began trialling an entry fee for day-trippers on peak days, the first city to try it.',
    ],
    question: 'Should famous places charge entry or cap visitors? Would that make you more or less likely to go?',
  },
  {
    id: 'travel-silkroad', cat: 'travel', level: 1, unlocks: 'signpost',
    title: 'The Silk Road wasn\'t a road',
    body: [
      'The term "Silk Road" was coined in 1877 by the German geographer Ferdinand von Richthofen. In reality there was no single road but a shifting web of routes between China, Central Asia, Persia and the Mediterranean, used over many centuries.',
      'Few traders went end to end; goods passed hand to hand through oasis cities like Samarkand and Kashgar. And silk was only one cargo. Ideas travelled the same way: Buddhism, paper-making, and probably the plague.',
    ],
    question: 'If you could walk one leg of an ancient trade route, which would you choose and what would you want to see?',
  },
  {
    id: 'travel-shinkansen', cat: 'travel', level: 2, unlocks: 'signpost',
    title: 'Japan\'s obsession with punctuality',
    body: [
      'The Tōkaidō Shinkansen between Tokyo and Osaka opened in 1964, just before the Tokyo Olympics. Its operator reports average delays measured in seconds per train, and it has carried billions of passengers without a passenger fatality from a collision or derailment.',
      'Station staff famously "point and call", pointing at signals and saying their status aloud. The habit has been shown to reduce errors. In 2017 a rail company publicly apologised for a train leaving 20 seconds early.',
    ],
    question: 'Is extreme punctuality a virtue, or does it come at a cost? Where do you land personally?',
  },

  // ── Art ──────────────────────────────────────────────────────────────
  {
    id: 'art-rothko', cat: 'art', level: 1, unlocks: 'easel',
    title: "Rothko's colour fields",
    body: [
      'Mark Rothko\'s mature paintings are huge canvases with two or three soft-edged rectangles of colour floating on a coloured ground. They look simple in reproduction; in person they glow, because he built them up in thin, translucent layers.',
      'Rothko insisted they were not about colour but about emotion ("tragedy, ecstasy, doom"), and he wanted viewers to stand close, so the painting fills your vision. His final major project, the Rothko Chapel in Houston, is a quiet room of dark canvases that many visitors find moving and some find nothing at all.',
    ],
    question: 'Can a painting with no recognisable subject move you? Has one ever?',
  },
  {
    id: 'art-impression', cat: 'art', level: 1, unlocks: 'easel',
    title: 'Impressionism started as an insult',
    body: [
      'In 1874 a group of painters rejected by the official Paris Salon put on their own show. One of Claude Monet\'s paintings was a hazy harbour titled Impression, Sunrise. The critic Louis Leroy mocked it, writing that wallpaper in its early stages was more finished, and called the whole group "Impressionists".',
      'The painters adopted the name. What they were chasing was light: quick, broken brushstrokes, painted outdoors, capturing a moment rather than a polished studio scene.',
    ],
    question: 'Can you think of another label that started as an insult and became a badge of honour?',
  },
  {
    id: 'art-monalisa', cat: 'art', level: 2, unlocks: 'easel',
    title: 'Why the Mona Lisa is so famous',
    body: [
      'Leonardo\'s portrait was admired for centuries, especially for sfumato, the smoky blending of tones that makes her smile seem to shift. But global superstardom came from a crime. In 1911 a handyman named Vincenzo Peruggia walked out of the Louvre with it under his smock.',
      'For two years newspapers worldwide printed her face, crowds came to stare at the empty wall, and when she was recovered in Florence in 1913 she was the most famous painting on Earth.',
    ],
    question: 'How much of fame, for art or for people, do you think is quality, and how much is story?',
  },

  // ── Culture ──────────────────────────────────────────────────────────
  {
    id: 'culture-ichigo', cat: 'culture', level: 1, unlocks: 'lanterns',
    title: 'Ichi-go ichi-e',
    body: [
      'A phrase associated with the Japanese tea ceremony, ichi-go ichi-e means roughly "one time, one meeting". Each gathering is unique and will never happen again in exactly the same way, so it deserves full attention.',
      'The tea ceremony itself, with its precise movements, single bowl and seasonal flower, is less about tea than about creating a shared moment of presence between host and guest.',
    ],
    question: 'What is a recurring moment in your week you could treat as "one time, one meeting"?',
  },
  {
    id: 'culture-muertos', cat: 'culture', level: 1, unlocks: 'lanterns',
    title: 'Día de Muertos is not "Mexican Halloween"',
    body: [
      'Celebrated mainly on 1 and 2 November, Día de Muertos welcomes the dead home for a visit. Families build ofrendas: altars with photos, candles, the person\'s favourite food and drink, and bright orange cempasúchil marigolds whose scent is said to guide spirits.',
      'The mood is warm rather than spooky: a celebration of memory. UNESCO recognises the indigenous festivity as Intangible Cultural Heritage.',
    ],
    question: 'If you built an ofrenda for someone, what one object would you put on it?',
  },
  {
    id: 'culture-untranslatable', cat: 'culture', level: 2, unlocks: 'lanterns',
    title: 'Hygge, lagom and untranslatable words',
    body: [
      'Danish hygge describes a cosy, convivial feeling: candles, blankets, good company. Swedish lagom means "just the right amount", neither too much nor too little. Portuguese saudade is a longing for something absent that may never return.',
      'Words like these are popular because they name feelings we recognise but have no single word for. Linguists caution that they get flattened into lifestyle trends, but they do show how each culture chooses what is worth naming.',
    ],
    question: 'Invent a word for a feeling you have that English doesn\'t name. What does it mean?',
  },

  // ── Philosophy ───────────────────────────────────────────────────────
  {
    id: 'phil-trolley', cat: 'philosophy', level: 1, unlocks: 'column',
    title: 'The trolley problem',
    body: [
      'Philippa Foot introduced it in 1967: a runaway trolley will kill five people unless you pull a lever to divert it onto a track where it will kill one. Most people say pull. Judith Jarvis Thomson added a variant: you could stop the trolley by pushing a large man off a bridge into its path. Most people now say no, even though the numbers are identical.',
      'The puzzle is why. Is it the difference between killing and letting die? Using a person as a means? Or just the up-close physicality of pushing?',
    ],
    question: 'Lever yes, push no? Or do you treat both the same? What is the difference for you?',
  },
  {
    id: 'phil-theseus', cat: 'philosophy', level: 1, unlocks: 'column',
    title: 'The Ship of Theseus',
    body: [
      'Plutarch described a ship kept by the Athenians whose rotting planks were replaced one by one until none of the originals remained. Is it still the same ship? Thomas Hobbes added a twist: suppose someone collected all the old planks and rebuilt the ship. Now which one is the real Ship of Theseus?',
      'The puzzle applies to bands that replace every member, companies, cities, and you: most of the atoms in your body are replaced over the years.',
    ],
    question: 'What makes you the same person you were ten years ago, if anything?',
  },
  {
    id: 'phil-rawls', cat: 'philosophy', level: 2, unlocks: 'column',
    title: "Rawls's veil of ignorance",
    body: [
      'In A Theory of Justice (1971), John Rawls proposed a thought experiment: design the rules of society without knowing who you will be in it: rich or poor, talented or not, which gender, which race. Behind this "veil of ignorance", what rules would you choose?',
      'Rawls argued that people would guarantee basic liberties for all, and permit inequalities only if they benefit the least advantaged. Critics argue people might gamble instead, or that the experiment strips away too much of who we are.',
    ],
    question: 'Behind the veil, would you play it safe or gamble on being one of the lucky ones?',
  },

  // ── Probability & statistics ─────────────────────────────────────────
  {
    id: 'stats-clt', cat: 'stats', level: 1, unlocks: 'galton',
    title: 'The central limit theorem',
    body: [
      'Drop beads through a board of pegs. At each peg a bead bounces left or right at random. Most beads end up near the middle and few at the edges, forming a bell curve. This device, the Galton board, shows the central limit theorem: add up many small independent random effects, and the total tends toward a normal distribution, almost regardless of what each individual effect looks like.',
      'It is why heights, measurement errors and averages of samples so often look bell-shaped, and why statisticians can say something useful about an average even when they know little about the underlying data.',
    ],
    question: 'Something in your life that is the sum of lots of small random effects? What is it, and does it look bell-shaped?',
  },
  {
    id: 'stats-birthday', cat: 'stats', level: 1, unlocks: 'galton',
    title: 'The birthday paradox',
    body: [
      'How many people do you need in a room for a better-than-even chance that two share a birthday? Only 23. With 70 people it is over 99.9%.',
      'It feels wrong because we imagine our own birthday matching someone\'s. But the question is about any pair, and 23 people form 253 pairs. Lots of pairs, each with a small chance, add up fast. The same logic explains why "amazing coincidences" happen all the time.',
    ],
    question: 'Tell me about a coincidence that felt spooky to you. Does this change how you see it?',
  },
  {
    id: 'stats-baserate', cat: 'stats', level: 2, unlocks: 'galton',
    title: 'Base rates and the false-positive trap',
    body: [
      'A test is 90% accurate at detecting a condition that 1 in 100 people have, and it falsely flags 9% of healthy people. You test positive. What\'s the chance you have it? Most people guess around 90%. It\'s about 9%.',
      'Picture 1,000 people: 10 have the condition and 9 test positive. Of the 990 healthy people, about 89 also test positive. So only 9 out of roughly 98 positives are real. When something is rare, false positives swamp true ones. The base rate matters.',
    ],
    question: 'Where else might a "90% accurate" signal mislead you because the thing it looks for is rare?',
  },

  // ── Science ──────────────────────────────────────────────────────────
  {
    id: 'sci-skyblue', cat: 'science', level: 1, unlocks: 'telescope',
    title: 'Why the sky is blue (and not violet)',
    body: [
      'Sunlight contains every colour. As it passes through air, molecules scatter short wavelengths much more than long ones (Rayleigh scattering is roughly inversely proportional to the fourth power of wavelength). Blue light is bounced all over the sky, so blue reaches your eyes from every direction.',
      'Violet scatters even more, so why isn\'t the sky violet? The sun emits less violet, some is absorbed high in the atmosphere, and our eyes are less sensitive to it. At sunset, light crosses much more air; most blue is scattered away, leaving reds and oranges.',
    ],
    question: 'Does knowing why make a sunset more or less magical to you?',
  },
  {
    id: 'sci-tardigrade', cat: 'science', level: 1, unlocks: 'telescope',
    title: 'Tardigrades, the toughest animals',
    body: [
      'Tardigrades, or "water bears", are eight-legged animals under a millimetre long that live in moss and puddles worldwide. When they dry out, they curl into a state called a tun and almost entirely stop their metabolism.',
      'In that state they have survived extreme cold, high radiation and, in 2007, a trip to low Earth orbit exposed to the vacuum of space. One trick: special proteins that form a glass-like gel protecting their cells as they dry.',
    ],
    question: 'If you could borrow one tardigrade-style superpower for a day, what would it be?',
  },
  {
    id: 'sci-lightpast', cat: 'science', level: 2, unlocks: 'telescope',
    title: 'Every star is a photo of the past',
    body: [
      'Light is fast but not instant. Sunlight takes about 8 minutes 20 seconds to reach Earth, so you always see the Sun as it was eight minutes ago. Light from the nearest star system, Alpha Centauri, takes over four years.',
      'Telescopes are therefore time machines. Looking at a galaxy millions of light-years away shows it as it was millions of years ago. The James Webb Space Telescope sees galaxies as they were a few hundred million years after the Big Bang.',
    ],
    question: 'If you could see one moment from Earth\'s history from far away, which would it be?',
  },

  // ── History, language & everyday life ───────────────────────────────
  {
    id: 'hist-ok', cat: 'history', level: 1, unlocks: 'library',
    title: 'Why "OK" is OK',
    body: [
      'In 1830s Boston there was a fad for jokey abbreviations of misspelled phrases. In 1839 the Boston Morning Post printed "o.k." for "oll korrect". Most of these jokes died out; OK survived thanks to the 1840 presidential campaign of Martin Van Buren, nicknamed "Old Kinderhook", whose supporters formed "OK Clubs".',
      'It is now arguably one of the most widely understood words on Earth.',
    ],
    question: 'Which modern slang word do you think will still be around in 100 years?',
  },
  {
    id: 'hist-cleopatra', cat: 'history', level: 1, unlocks: 'library',
    title: 'Cleopatra and the moon landing',
    body: [
      'The Great Pyramid of Giza was built around 2560 BC. Cleopatra died in 30 BC. The Moon landing was in 1969. So Cleopatra lived closer in time to the Moon landing than to the building of the Great Pyramid.',
      'Ancient Egypt lasted so long that it had its own ancient history. Ancient Romans visited the pyramids as tourists, and some left graffiti.',
    ],
    question: 'Which historical period do you think we lump together too much, as if it were one thing?',
  },
  {
    id: 'hist-week', cat: 'history', level: 2, unlocks: 'library',
    title: 'Why the week has seven days',
    body: [
      'Most months and years are tied to the Moon or Sun, but the seven-day week is not neatly astronomical. It spread through Babylonian traditions, the Jewish Sabbath and later Roman adoption. The names come from the seven visible "planets" of antiquity: Sun, Moon, Mars, Mercury, Jupiter, Venus, Saturn.',
      'In English several were swapped for Norse gods: Tiw (Tuesday), Woden (Wednesday), Thor (Thursday), Frigg (Friday). French kept the Roman versions: mardi (Mars), mercredi (Mercury), jeudi (Jupiter), vendredi (Venus).',
    ],
    question: 'If you could redesign the week (length, days off, names), what would you change?',
  },
];

// Dates (for the Timeline puzzle) and striking numbers (for Guess of the
// day) on the original cards. Newer cards carry these fields themselves.
const BASE_TIMELINE = {
  'fashion-lbd': ['Vogue calls it "Chanel\'s Ford"', 1926], 'fashion-newlook': ['Dior shows the New Look', 1947],
  'art-impression': ['First Impressionist show', 1874], 'art-monalisa': ['Mona Lisa stolen', 1911],
  'travel-shinkansen': ['Shinkansen opens', 1964], 'travel-silkroad': ['"Silk Road" coined', 1877], 'travel-venice': ['MOSE barriers in use', 2020],
  'food-umami': ['Ikeda names umami', 1908], 'hist-ok': ['"o.k." appears in print', 1839], 'hist-cleopatra': ['Great Pyramid built', -2560],
  'phil-rawls': ['A Theory of Justice', 1971], 'phil-trolley': ['Foot poses the trolley problem', 1967], 'film-rashomon': ['Rashomon released', 1950],
  'robo-moravec': ['Moravec\'s paradox', 1988], 'cheese-holes': ['Hay-in-milk hole study', 2015], 'news-thucydides': ['Allison names the "Trap"', 2017],
};
const BASE_ESTIMATE = {
  'stats-birthday': { q: 'How many people do you need for a better-than-even chance two share a birthday?', answer: 23, unit: 'people', min: 2, max: 100 },
  'sci-lightpast': { q: 'How many minutes does sunlight take to reach Earth?', answer: 8.3, unit: 'minutes', min: 0, max: 30 },
  'cheese-parm': { q: 'Roughly how heavy is a wheel of Parmigiano Reggiano?', answer: 40, unit: 'kg', min: 1, max: 100 },
  'news-thucydides': { q: 'Of 16 cases of a rising power challenging a ruling one, how many ended in war?', answer: 12, unit: 'cases', min: 0, max: 16 },
  'stats-baserate': { q: '1 in 100 have a condition; a test catches 90% and flags 9% of healthy people. Chance a positive is real?', answer: 9, unit: '%', min: 0, max: 100 },
  'robo-dof': { q: 'How many degrees of freedom does a human arm have, shoulder to wrist?', answer: 7, unit: 'degrees of freedom', min: 1, max: 20 },
};
for (const l of LESSONS) {
  if (BASE_TIMELINE[l.id]) l.timeline = { event: BASE_TIMELINE[l.id][0], year: BASE_TIMELINE[l.id][1] };
  if (BASE_ESTIMATE[l.id]) l.estimate = BASE_ESTIMATE[l.id];
}

// The larger card bank, one file per category in js/cards/.
import { CARD_SETS } from './cards/index.js';
export const REQUESTS = [];
for (const [cat, mod] of Object.entries(CARD_SETS)) {
  for (const c of mod.default) LESSONS.push({ ...c, cat, unlocks: undefined });
  for (const r of mod.requests || []) REQUESTS.push({ ...r, cat });
}
