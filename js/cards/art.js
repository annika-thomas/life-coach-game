export default [
  {
    id: 'art-lascaux',
    level: 1,
    title: 'The cave the teenagers found',
    body: [
      'In September 1940, four teenagers exploring a hole in the hillside near Montignac in south-west France squeezed into a cave and found its walls covered in animals: horses, deer, bulls and bison, some painted larger than life. According to the popular story, a dog led them to the entrance. This was Lascaux.',
      'The paintings are roughly 17,000 years old, made with mineral pigments such as ochres and charcoal, sometimes blown onto the rock. The artists used bulges in the stone to give the animals volume. Lascaux opened to the public after the war, but the breath, heat and lighting of crowds encouraged mould and damage, and it was closed in 1963. Visitors today see a detailed replica nearby. The originals remind us that people were making powerful, skilful images long before writing existed.',
    ],
    question: 'Why do you think people painted animals deep inside caves, where few could see them?',
    quiz: [
      { q: 'Who found the Lascaux cave paintings in 1940?', a: 'Four teenagers', w: ['A team of archaeologists', 'A farmer ploughing', 'Soldiers digging trenches'], why: 'Four teenagers squeezed into the cave in September 1940.' },
      { q: 'Why was Lascaux closed to the public in 1963?', a: 'Crowds were causing mould and damage', w: ['The roof collapsed', 'The paintings were stolen', 'It flooded permanently'], why: 'Breath, heat and lighting from visitors harmed the paintings.' },
    ],
    timeline: { event: 'Lascaux cave discovered', year: 1940 },
    estimate: { q: 'Roughly how many years old are the Lascaux cave paintings?', answer: 17000, unit: 'years', min: 1000, max: 50000 },
  },
  {
    id: 'art-how-to-look',
    level: 1,
    title: 'Slow down in front of a painting',
    body: [
      'One well-known study at the Metropolitan Museum of Art in New York found that visitors spent an average of only about 27 seconds looking at each work, including time reading the label. Most of us glance, nod and move on.',
      'Try a simple routine instead. First, just look for a full minute without reading anything. Notice where your eye lands first, and where it travels next. Ask where the light is coming from, and what it picks out. Look at the edges and corners, not only the centre. Then ask what is happening, and what makes you say so. Only after that read the label, and look again to see what it changes. You will find that a single painting, given five quiet minutes, gives back far more than twenty paintings given a glance.',
    ],
    question: 'Think of a painting or photograph you love. What did you notice only after looking at it for a long time?',
    quiz: [
      { q: 'In one Met study, roughly how long did visitors look at each artwork?', a: 'About half a minute', w: ['About five minutes', 'About two seconds', 'About ten minutes'], why: 'The average was about 27 seconds, including reading the label.' },
      { q: 'In the slow-looking routine, when should you read the label?', a: 'After looking for a while', w: ['Before looking at all', 'Never', 'Only if you dislike the work'], why: 'Look first, then read the label and look again.' },
    ],
    timeline: null,
    estimate: { q: 'In one well-known Met study, how many seconds on average did visitors spend looking at each artwork?', answer: 27, unit: 'seconds', min: 0, max: 180 },
  },
  {
    id: 'art-raft-medusa',
    level: 2,
    title: 'How a painting moves your eye',
    body: [
      "When you slow down and notice where your eye travels, you start to see composition: the artist's plan for guiding you. Théodore Géricault's huge painting The Raft of the Medusa, finished in 1819 and now in the Louvre, is a masterclass.",
      'It shows survivors of the French navy ship Méduse, wrecked off West Africa in 1816, adrift on a makeshift raft. Géricault arranged the bodies into two great triangles. One is formed by the mast and its ropes. The other rises from the dead and dying at the bottom left, through figures straining upward, to a man at the top waving a cloth at a tiny ship on the horizon. Your eye climbs that pyramid from despair to hope, just as the survivors do. Look for triangles, diagonals and lines of gaze in any painting, and you will start to see the scaffolding underneath.',
    ],
    question: 'Should art about real disasters aim to be beautiful? Where is the line between moving and exploiting?',
    quiz: [
      { q: 'What real event does The Raft of the Medusa depict?', a: 'Survivors of a shipwreck', w: ['A naval battle', 'A royal coronation', 'A volcanic eruption'], why: 'It shows survivors of the wrecked French ship Méduse.' },
      { q: 'What shape guides your eye upward in the painting?', a: 'A pyramid or triangle', w: ['A circle', 'A spiral', 'A straight horizontal line'], why: 'Bodies rise in a triangle to the man waving at the distant ship.' },
    ],
    timeline: null,
    estimate: null,
  },
  {
    id: 'art-fresco',
    level: 1,
    title: 'Painting into wet plaster',
    body: [
      'True fresco, or buon fresco, means painting with water-based pigment onto fresh, wet lime plaster. As the plaster dries, the pigment becomes locked into the wall itself, which is why good frescoes can last for centuries. The catch is speed: the painter can only work on plaster laid that same day, so walls were done in patches called giornate, Italian for "days\' work", and mistakes are very hard to fix.',
      'The most famous example is Michelangelo\'s Sistine Chapel ceiling in Rome, painted between 1508 and 1512. Despite the legend, he did not paint it lying on his back: he stood on a scaffold he designed himself, craning his head upward. If you look closely at frescoes, you can sometimes spot the faint seams where one day\'s patch meets the next.',
    ],
    question: 'Do you work better with no chance to undo mistakes, or with endless chances to revise? Why?',
    quiz: [
      { q: 'What surface is a true fresco painted on?', a: 'Wet lime plaster', w: ['Dry wooden panel', 'Stretched canvas', 'Polished marble'], why: 'Pigment is applied to fresh plaster and bonds as it dries.' },
      { q: 'How did Michelangelo paint the Sistine Chapel ceiling?', a: 'Standing on a scaffold', w: ['Lying on his back', 'From a hanging basket', 'On canvas, later glued up'], why: 'He stood on a scaffold of his own design, despite the legend.' },
    ],
    timeline: null,
    estimate: null,
  },
  {
    id: 'art-perspective',
    level: 1,
    title: 'The trick of the vanishing point',
    body: [
      'Linear perspective is the system that makes a flat picture look deep. Parallel lines, like the edges of a road, are drawn so that they meet at a single vanishing point on the horizon, and things shrink as they recede. In Florence, around 1415, the architect Filippo Brunelleschi is said to have demonstrated it with a painted panel of the Baptistery and a mirror, and the idea spread quickly.',
      'One of the first great paintings to use it fully is Masaccio\'s Holy Trinity, painted in about 1427 in the church of Santa Maria Novella. Its painted barrel vault seems to punch a real chapel into the wall, and the vanishing point sits at about the eye level of a standing viewer. To find the vanishing point in any picture, trace the lines of floors, ceilings or tables and see where they converge.',
    ],
    question: 'Perspective is a convention, not the only "true" way to show space. Do you prefer realistic depth or flatter, more patterned pictures?',
    quiz: [
      { q: 'In linear perspective, where do parallel lines meet?', a: 'At a vanishing point', w: ['At the picture frame', 'At the brightest colour', 'Nowhere, they stay parallel'], why: 'Receding parallel lines converge on a vanishing point.' },
      { q: 'Which painting is an early masterpiece of linear perspective?', a: "Masaccio's Holy Trinity", w: ["Hokusai's Great Wave", "Picasso's Guernica", 'The Lascaux bulls'], why: 'Masaccio painted it in about 1427 in Santa Maria Novella, Florence.' },
    ],
    timeline: null,
    estimate: null,
  },
  {
    id: 'art-last-supper',
    level: 2,
    title: 'All lines lead to Christ',
    body: [
      "Leonardo da Vinci's Last Supper, painted between about 1495 and 1498 on the wall of a monastery dining hall in Milan, uses linear perspective with dramatic purpose. Trace the lines of the ceiling and the walls and they converge on a single vanishing point right at Christ's head. Wherever you look, the room pulls you back to him.",
      'The painting has had a hard life. Leonardo did not use true fresco, which would have forced him to work fast on wet plaster. Instead he painted onto the dry wall so he could work slowly and revise, and the paint soon began to flake. Over the centuries it suffered damp, clumsy repairs and wartime bombing. The most recent restoration took 21 years, from 1978 to 1999, removing old overpaint to reveal what survives of Leonardo\'s own work.',
    ],
    question: "Leonardo traded durability for the freedom to take his time. Was it worth it? Would you have made the same choice?",
    quiz: [
      { q: "Where is the vanishing point in Leonardo's Last Supper?", a: "At Christ's head", w: ["At Judas's hand", 'Outside the window', 'At the bottom of the table'], why: 'All the lines of the room converge on Christ.' },
      { q: 'Why did the Last Supper start flaking so soon?', a: 'It was painted on a dry wall, not true fresco', w: ['Leonardo used watercolour on paper', 'It was left outdoors', 'The wall was made of wood'], why: 'Painting on dry plaster let Leonardo work slowly but the paint did not bond.' },
    ],
    timeline: null,
    estimate: { q: 'How many years did the most recent restoration of the Last Supper take?', answer: 21, unit: 'years', min: 1, max: 60 },
  },
  {
    id: 'art-van-eyck',
    level: 1,
    title: '"Jan van Eyck was here"',
    body: [
      "Jan van Eyck's Arnolfini Portrait, painted in Bruges in 1434 and now in the National Gallery, London, shows a richly dressed couple in a room full of tiny, glowing details: an orange on the windowsill, a brass chandelier, a little dog. On the back wall hangs a convex mirror that reflects the scene from behind, including two figures in the doorway. Above it, the artist wrote in Latin: Jan van Eyck was here, 1434.",
      'Van Eyck is often wrongly said to have invented oil paint; oils were known earlier. What he did was master them. By building up thin, translucent layers called glazes, he could make light seem to pass into the paint and bounce back out, giving fur, metal and glass an almost magical realism that tempera, the egg-based paint of the time, could not match.',
    ],
    question: "Van Eyck signed himself into the picture like graffiti. If you could leave a note in something you made, what would it say?",
    quiz: [
      { q: 'What did Van Eyck write above the mirror in the Arnolfini Portrait?', a: 'Jan van Eyck was here, 1434', w: ['The couple\'s wedding vows', 'A price for the painting', 'A prayer for good harvest'], why: 'The Latin inscription reads "Jan van Eyck was here, 1434".' },
      { q: 'What technique gives Van Eyck\'s oil paintings their glow?', a: 'Thin translucent layers called glazes', w: ['Thick paint applied with a knife', 'Gold leaf on every surface', 'Painting on wet plaster'], why: 'Layered glazes let light pass into the paint and reflect back.' },
    ],
    timeline: { event: 'Arnolfini Portrait painted', year: 1434 },
    estimate: null,
  },
  {
    id: 'art-caravaggio',
    level: 1,
    title: 'Caravaggio turns on a spotlight',
    body: [
      'Around 1600, Caravaggio shocked Rome with paintings that looked like scenes lit by a single harsh lamp: figures blaze out of deep darkness. The style is called tenebrism, from the Italian for darkness. In The Calling of Saint Matthew, painted around 1599 to 1600 for the church of San Luigi dei Francesi, a beam of light slices across the wall alongside Christ\'s pointing hand, landing on a group of tax collectors counting money at a table.',
      'Caravaggio also used ordinary people from the streets as models, with dirty feet and worn faces, for holy figures, which some churchmen found disrespectful. His life was as dramatic as his lighting. In 1606 he killed a man in a brawl and fled Rome, spending his last years on the run. He died in 1610, but his style spread across Europe through his many followers.',
    ],
    question: 'Would holy or heroic figures feel more powerful to you if they looked like ordinary people? Why?',
    quiz: [
      { q: 'What is tenebrism?', a: 'Figures lit sharply against deep darkness', w: ['Painting only in pale pastels', 'Dots of pure colour', 'Gold backgrounds with no shadows'], why: 'Caravaggio\'s figures blaze out of darkness, as if under a spotlight.' },
      { q: 'Why did Caravaggio flee Rome in 1606?', a: 'He killed a man in a brawl', w: ['He refused a papal commission', 'Plague broke out', 'He was exiled for debts'], why: 'After the killing he spent his last years on the run.' },
    ],
    timeline: null,
    estimate: null,
  },
  {
    id: 'art-artemisia',
    level: 2,
    title: 'Artemisia Gentileschi',
    body: [
      "Among Caravaggio's followers was Orazio Gentileschi, and his daughter Artemisia, born in Rome in 1593, became the more celebrated painter. She took Caravaggio's spotlight drama and pushed it further. In her Judith Slaying Holofernes (the best-known version is in the Uffizi in Florence), two women hold down a general and behead him with startling physical force and plenty of blood.",
      'As a young woman Artemisia endured a public trial in 1612 after accusing the painter Agostino Tassi of rape, and many viewers read her violent biblical heroines in that light, though she painted many other subjects too. She built a successful career across Florence, Rome, Venice, Naples and London. In 1616 she became the first woman admitted to Florence\'s Accademia delle Arti del Disegno, the city\'s prestigious academy of artists.',
    ],
    question: 'Should we interpret an artist\'s work through their life story, or let the work stand on its own?',
    quiz: [
      { q: 'What honour did Artemisia Gentileschi achieve in Florence in 1616?', a: 'First woman in its art academy', w: ['Court painter to the Pope', 'First woman to sell a painting', 'Head of the Uffizi'], why: 'She was the first woman admitted to the Accademia delle Arti del Disegno.' },
      { q: "Whose dramatic lighting did Artemisia's style build on?", a: "Caravaggio's", w: ["Vermeer's", "Monet's", "Hokusai's"], why: 'Her father Orazio was a follower of Caravaggio.' },
    ],
    timeline: null,
    estimate: null,
  },
  {
    id: 'art-vermeer',
    level: 1,
    title: 'The girl who is not a portrait',
    body: [
      "Johannes Vermeer's Girl with a Pearl Earring, painted in Delft around 1665 and now in the Mauritshuis in The Hague, is not a portrait of a known person. It is a tronie, a Dutch type of study of a face, often in an exotic costume, here a blue and yellow turban. Nobody knows who the model was.",
      'Vermeer is a painter of quiet light: women reading letters, pouring milk or playing music beside a window. He worked slowly, and only about 35 paintings are accepted as his today. He died in 1675 leaving his family in debt, and was largely forgotten until critics rediscovered him in the 19th century. Look at the earring itself: it is just a couple of strokes, a bright highlight and a soft reflection of the collar below, yet your brain reads it as a gleaming pearl.',
    ],
    question: 'Why do you think a painting of an unknown girl became one of the most loved images in the world?',
    quiz: [
      { q: 'Who was the model for Girl with a Pearl Earring?', a: 'Nobody knows', w: ["Vermeer's wife", 'A Dutch princess', 'A famous actress'], why: 'It is a tronie, a study of a face, and the model is unknown.' },
      { q: 'How is the famous pearl actually painted?', a: 'With just a couple of strokes', w: ['With real crushed pearl', 'With gold leaf', 'With hundreds of tiny dots'], why: 'A bright highlight and a soft reflection are enough to suggest the pearl.' },
    ],
    timeline: null,
    estimate: null,
  },
  {
    id: 'art-ultramarine',
    level: 2,
    title: 'The blue worth more than gold',
    body: [
      "The deep blue of the turban in Vermeer's Girl with a Pearl Earring is natural ultramarine, and for centuries it was the most precious colour a painter could buy. It was made by grinding lapis lazuli, a stone mined mainly in the mountains of Badakhshan in what is now Afghanistan. The name means \"from beyond the sea\".",
      'At times it cost more than gold. Renaissance contracts sometimes specified exactly how much ultramarine a painter had to use, and it was often reserved for the robe of the Virgin Mary. Vermeer used it lavishly, even mixing it into shadows, which may have contributed to his debts. A cheap synthetic version was finally developed in France in the late 1820s. In 1960 the French artist Yves Klein registered the formula for his own intense ultramarine, International Klein Blue.',
    ],
    question: 'Does knowing a material was rare and costly change how you see a painting? Should it?',
    quiz: [
      { q: 'What stone was natural ultramarine made from?', a: 'Lapis lazuli', w: ['Turquoise', 'Sapphire', 'Blue glass'], why: 'Ultramarine was ground from lapis lazuli, mostly from Afghanistan.' },
      { q: 'Which figure was ultramarine often reserved for in Renaissance art?', a: 'The Virgin Mary', w: ['The devil', 'The painter himself', 'Roman emperors'], why: 'Its cost made it a mark of honour for the Virgin\'s robe.' },
    ],
    timeline: null,
    estimate: null,
  },
  {
    id: 'art-great-wave',
    level: 1,
    title: 'The Great Wave is a print',
    body: [
      "Katsushika Hokusai's Under the Wave off Kanagawa, better known as The Great Wave, was made around 1831 as part of his series Thirty-six Views of Mount Fuji. Hokusai was around 70 at the time. Look closely and the drama becomes clear: a huge clawed wave towers over three fishing boats, while Mount Fuji, Japan's sacred mountain, sits tiny and calm in the distance, framed by the trough of the wave.",
      'It is not a unique painting but a woodblock print, a popular art form called ukiyo-e. Carvers cut a separate block for each colour, and printers pressed them onto paper one after another, so thousands of impressions could be sold cheaply. It also makes bold use of Prussian blue, a synthetic pigment then newly fashionable in Japan. Surviving copies now hang in museums around the world.',
    ],
    question: 'Does a work of art lose something if thousands of copies exist? Or does it gain something?',
    quiz: [
      { q: 'What kind of artwork is The Great Wave?', a: 'A woodblock print', w: ['An oil painting', 'A silk tapestry', 'A fresco'], why: 'It is an ukiyo-e print, made with a separate carved block for each colour.' },
      { q: 'Which mountain appears small in the background of The Great Wave?', a: 'Mount Fuji', w: ['Mount Everest', 'Mount Kailash', 'Mount Kilimanjaro'], why: 'It belongs to the series Thirty-six Views of Mount Fuji.' },
    ],
    timeline: { event: "Hokusai's Great Wave", year: 1831 },
    estimate: { q: 'Roughly how old was Hokusai when he made The Great Wave?', answer: 70, unit: 'years old', min: 20, max: 100 },
  },
  {
    id: 'art-van-gogh-japan',
    level: 2,
    title: 'Van Gogh copied Japanese prints',
    body: [
      'Cheap Japanese woodblock prints like Hokusai\'s flooded into Europe in the second half of the 19th century, and artists fell in love with their flat colour, bold outlines, cropped views and high horizons. The craze was called Japonisme.',
      'Vincent van Gogh collected hundreds of these prints in Paris. In 1887 he made careful painted copies of two prints by Hiroshige from the series One Hundred Famous Views of Edo: a flowering plum orchard and a bridge in a sudden rainstorm. He even painted borders with Japanese characters copied from other prints, without being able to read them. The lessons stuck. His later work in the south of France, with its strong outlines, flat areas of bright colour and steep viewpoints, owes a real debt to the Japanese printmakers he admired.',
    ],
    question: 'Copying was how Van Gogh learned. Is copying a good way to learn a craft, or does it hold you back?',
    quiz: [
      { q: 'Whose prints did Van Gogh copy in paint in 1887?', a: 'Hiroshige', w: ['Rembrandt', 'Monet', 'Caravaggio'], why: 'He copied two prints from Hiroshige\'s One Hundred Famous Views of Edo.' },
      { q: 'What was the European craze for Japanese art called?', a: 'Japonisme', w: ['Orientalism', 'Ukiyo-e', 'Art Nouveau'], why: 'Japonisme swept European art in the late 19th century.' },
    ],
    timeline: null,
    estimate: null,
  },
  {
    id: 'art-fan-kuan',
    level: 1,
    title: 'Mountains and water',
    body: [
      'In China, landscape painting is called shan shui, "mountains and water", and for centuries it was considered the highest form of painting. One of its towering masterpieces is Travellers among Mountains and Streams by Fan Kuan, painted in ink on silk around 1000 during the Northern Song dynasty and now in the National Palace Museum in Taipei.',
      'A colossal cliff fills most of the tall scroll, with a thin waterfall dropping down one side. You have to search to find the people: a tiny mule train at the bottom, dwarfed by nature. The painter\'s own signature was so well hidden among the foliage that it was only spotted in 1958. Many Chinese paintings also carry red seals added by later owners and admirers, so a scroll records its own history of collectors, including emperors.',
    ],
    question: 'In Fan Kuan\'s painting, humans are tiny and nature is vast. Do you find that comforting or unsettling?',
    quiz: [
      { q: 'What does the Chinese term "shan shui" mean?', a: 'Mountains and water', w: ['Ink and brush', 'Sky and earth', 'Emperor\'s garden'], why: 'Shan shui, mountains and water, is the Chinese term for landscape painting.' },
      { q: 'What are the red stamps often seen on Chinese paintings?', a: 'Seals added by owners and admirers', w: ['Damage from old fires', 'Price marks from shops', 'Censors\' warnings'], why: 'Collectors, including emperors, added their seals over time.' },
    ],
    timeline: null,
    estimate: null,
  },
  {
    id: 'art-benin-bronzes',
    level: 1,
    title: 'The Benin Bronzes',
    body: [
      'The Kingdom of Benin, in what is now southern Nigeria (not the modern country of Benin), had a guild of royal casters who for centuries made brass and bronze heads, figures and relief plaques for the Oba, the king. Many plaques once decorated the royal palace, recording court life, ceremonies and visiting Portuguese traders.',
      'They were made by the lost-wax method: the artist models the design in wax over a clay core, covers it in clay, heats it so the wax melts out, and pours molten metal into the empty space. In 1897 a British military expedition attacked Benin City and looted thousands of objects, which were sold and scattered across museums in Europe and America. Calls for their return have grown, and in 2022 Germany transferred ownership of more than a thousand Benin objects to Nigeria.',
    ],
    question: 'Should museums return objects taken by force long ago, even if they have cared for them well? What should decide it?',
    quiz: [
      { q: 'How were the Benin Bronzes cast?', a: 'By the lost-wax method', w: ['By hammering cold sheets', 'By carving solid metal', 'By pouring into sand moulds only'], why: 'A wax model is melted out and replaced by molten metal.' },
      { q: 'What happened to many Benin Bronzes in 1897?', a: 'British forces looted them', w: ['They were buried for safety', 'They were melted down for coins', 'They were sold by the Oba'], why: 'A British expedition sacked Benin City and took thousands of objects.' },
    ],
    timeline: { event: 'British loot Benin City', year: 1897 },
    estimate: null,
  },
  {
    id: 'art-kahlo',
    level: 1,
    title: 'Frida Kahlo paints herself',
    body: [
      'In 1925, when she was 18, Frida Kahlo was badly injured when the bus she was riding in Mexico City collided with a streetcar. During her long months of recovery in bed, she began to paint, using a mirror fixed above her so she could study her own face.',
      'Self-portraits became her great subject: about 55 of her paintings are of herself. She painted her pain, her Mexican identity and her stormy marriage to the muralist Diego Rivera with startling frankness, often in the flat, bright style of Mexican folk art. In The Two Fridas, painted in 1939 around the time of their divorce, two versions of Kahlo sit hand in hand, one in a European dress and one in Tehuana dress, their exposed hearts joined by a single artery. Long overshadowed by Rivera in her lifetime, she is now one of the most recognised artists in the world.',
    ],
    question: 'If you painted a self-portrait that showed how you feel rather than how you look, what would be in it?',
    quiz: [
      { q: 'How did Frida Kahlo begin painting?', a: 'In bed, recovering from a bus accident', w: ['As a student in Paris', 'Painting murals with her father', 'Copying old masters in a museum'], why: 'She began painting during her recovery, with a mirror above her bed.' },
      { q: 'What did The Two Fridas show?', a: 'Two versions of Kahlo joined by an artery', w: ['Kahlo and her sister at a market', 'Kahlo and Rivera dancing', 'Two parrots in a jungle'], why: 'Two Fridas sit hand in hand, their exposed hearts connected.' },
    ],
    timeline: { event: 'Kahlo paints The Two Fridas', year: 1939 },
    estimate: { q: 'Roughly how many of Frida Kahlo\'s paintings are self-portraits?', answer: 55, unit: 'paintings', min: 0, max: 200 },
  },
  {
    id: 'art-af-klint',
    level: 1,
    title: 'Abstract before abstraction',
    body: [
      'Textbooks long named Wassily Kandinsky, around 1910, as a pioneer of abstract painting. But in Stockholm, the Swedish artist Hilma af Klint had begun her Paintings for the Temple in 1906: huge canvases of spirals, circles, petals and symbols in pinks, oranges and blues, guided by her interest in spiritualism.',
      'She showed these works to very few people, and stipulated that they should not be exhibited until 20 years after her death. She died in 1944, and the paintings stayed largely unseen for decades. When the Guggenheim Museum in New York gave her a major exhibition in 2018 to 2019, it became the most visited show in the museum\'s history. Her case is a reminder that the story of art history depends on who was looking, and whose work was kept out of sight.',
    ],
    question: 'Would you make your best work if you knew no one would see it until after you died? Why might af Klint have chosen this?',
    quiz: [
      { q: 'What did Hilma af Klint ask about her abstract paintings?', a: 'Not to show them until 20 years after her death', w: ['To burn them after her death', 'To sell them to raise money', 'To show them only in churches'], why: 'She stipulated a 20-year wait after her death.' },
      { q: 'From which country was Hilma af Klint?', a: 'Sweden', w: ['Norway', 'Germany', 'Russia'], why: 'She worked in Stockholm and died in 1944.' },
    ],
    timeline: { event: 'Af Klint begins temple paintings', year: 1906 },
    estimate: null,
  },
  {
    id: 'art-guernica',
    level: 1,
    title: 'Guernica in black and white',
    body: [
      'On 26 April 1937, during the Spanish Civil War, German and Italian aircraft supporting Franco bombed the Basque town of Guernica, killing many civilians. Pablo Picasso had already been commissioned by the Spanish Republican government to make a mural for its pavilion at the Paris International Exposition that year. He made Guernica his subject and painted it in a matter of weeks.',
      'The canvas is nearly 8 metres wide, painted only in black, white and greys, like a newspaper photograph. There are no planes and no town, just a screaming horse, a bull, a mother holding her dead child, a fallen soldier and a harsh light bulb. Picasso did not want it to go to Spain until democracy returned, so it spent decades at the Museum of Modern Art in New York. It finally arrived in Madrid in 1981.',
    ],
    question: 'Can a painting change anything about war, or does it only help us remember? Which matters more?',
    quiz: [
      { q: 'Which colours did Picasso use for Guernica?', a: 'Only black, white and grey', w: ['Bright reds and yellows', 'Mostly blues', 'Gold and silver'], why: 'The limited palette makes it feel like a newspaper photograph.' },
      { q: 'Why was Guernica kept out of Spain for decades?', a: 'Picasso wanted democracy restored first', w: ['It was too large to move', 'Spain refused to pay for it', 'It was lost during the war'], why: 'It stayed in New York until it arrived in Madrid in 1981.' },
    ],
    timeline: { event: 'Bombing of Guernica', year: 1937 },
    estimate: null,
  },
  {
    id: 'art-duchamp-fountain',
    level: 1,
    title: 'A urinal changed art',
    body: [
      'In 1917 Marcel Duchamp bought an ordinary porcelain urinal, turned it on its back, signed it "R. Mutt 1917" and submitted it, titled Fountain, to an exhibition of the Society of Independent Artists in New York. The show claimed it would accept work from any artist who paid the fee, yet Fountain was not displayed. It was photographed by Alfred Stieglitz, and the original was soon lost.',
      'Duchamp called such works "readymades": everyday objects chosen by the artist and declared art. His point was that art might lie in the idea and the choice, not in the craft of the hand. That provocation opened the door to conceptual art. In 2004 a survey of 500 art world experts voted Fountain the most influential modern artwork of all, ahead of works by Picasso.',
    ],
    question: 'Is something art just because an artist says it is? Where would you draw the line?',
    quiz: [
      { q: 'What object did Duchamp present as Fountain in 1917?', a: 'A urinal', w: ['A bathtub', 'A garden hose', 'A teacup'], why: 'He signed an ordinary urinal "R. Mutt 1917".' },
      { q: 'What did Duchamp call everyday objects declared art?', a: 'Readymades', w: ['Found frescoes', 'Still lifes', 'Assemblages'], why: 'Readymades put the idea and choice above handcraft.' },
    ],
    timeline: { event: "Duchamp's Fountain", year: 1917 },
    estimate: null,
  },
  {
    id: 'art-warhol-soup',
    level: 1,
    title: 'Thirty-two cans of soup',
    body: [
      'In July 1962 Andy Warhol, then a successful commercial illustrator, showed 32 paintings at the Ferus Gallery in Los Angeles. Each canvas showed a single can of Campbell\'s soup, one for every variety the company then sold, from tomato to clam chowder. At the gallery they were lined up on a narrow shelf, like goods in a supermarket.',
      'Many viewers were baffled or amused, and a nearby gallery reportedly mocked the show by stacking real soup cans in its window. But Warhol had found his subject: the mass-produced images that everyone shared, from soup and Coca-Cola to celebrity faces. Pop Art treated advertising and consumer goods as worthy of art, and blurred the line between art and commerce. The 32 canvases are now together in the Museum of Modern Art in New York.',
    ],
    question: 'Which everyday object from today would you put in a gallery to sum up our time? Why?',
    quiz: [
      { q: 'How many soup can paintings did Warhol show in 1962?', a: '32', w: ['12', '50', '100'], why: 'There was one canvas for each of the 32 varieties then sold.' },
      { q: 'What did Pop Art treat as worthy subjects for art?', a: 'Advertising and consumer goods', w: ['Only religious scenes', 'Classical myths', 'Untouched wilderness'], why: 'Pop Art drew on mass-produced images everyone shared.' },
    ],
    timeline: { event: "Warhol's Soup Cans shown", year: 1962 },
    estimate: null,
  },
];

// Advice requests: a visiting villager asks the player for help applying something from these cards.
export const requests = [
  { card: 'art-how-to-look', ask: "I'm off to a big museum tomorrow, but last time I raced through and remembered nothing. How should I do it this time?", q: 'What is the best approach?', a: 'Look slowly at a few works before reading labels', w: ['See as many works as possible quickly', 'Read every label before looking'], why: 'Slow looking, with labels after, gives far more than a glance at many works.' },
  { card: 'art-perspective', ask: "I'm painting a street scene but the buildings look flat and wonky. Any tips from the old masters?", q: 'What should the receding parallel lines do?', a: 'Converge on a single vanishing point', w: ['Stay perfectly parallel', 'Fan out towards the viewer\'s edges'], why: 'In linear perspective, receding parallel lines meet at a vanishing point.' },
  { card: 'art-fresco', ask: "I want to paint a mural that lasts for centuries, like the old Italian ones. What's the secret?", q: 'What surface does true fresco use?', a: 'Fresh, wet lime plaster', w: ['A fully dried wall', 'Canvas glued to the wall'], why: 'Pigment on wet plaster locks into the wall as it dries, which is why frescoes last.' },
  { card: 'art-caravaggio', ask: "I'm taking a portrait photo and want it to look dramatic, like an old Italian painting. How should I light it?", q: 'Which approach copies Caravaggio?', a: 'One strong light against deep shadow', w: ['Soft, even light from all sides', 'Bright flash straight on'], why: 'Tenebrism lights figures sharply against darkness, like a single spotlight.' },
  { card: 'art-great-wave', ask: "A friend says my Great Wave isn't 'real' because it's not the original painting. Is that fair?", q: 'What is true about The Great Wave?', a: 'It was always a print made in many copies', w: ['There is one original oil painting', 'It is a fresco in a Tokyo temple'], why: 'It is a woodblock print, so thousands of impressions were made from the start.' },
];
