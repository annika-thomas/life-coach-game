export default [
  {
    id: 'sci-icefloats',
    level: 1,
    title: 'Why ice floats (and why it matters)',
    body: [
      'Almost every substance is denser as a solid than as a liquid, so solid chunks sink in their own melt. Water is a striking exception. As it freezes, its molecules lock into an open, hexagonal lattice held together by hydrogen bonds, taking up about 9 per cent more space. That is why ice floats, why ice cubes bob in your drink, and why a forgotten bottle in the freezer can burst.',
      'Even stranger, liquid water is densest at about 4°C. In winter, a lake\'s surface water cools, sinks, and is replaced until the whole lake is near 4°C. After that, colder water stays on top and freezes into a lid of ice that insulates the water below. Fish survive the winter underneath. If ice sank, lakes could freeze solid from the bottom up.',
    ],
    question: 'Which everyday thing do you take for granted that would change your life most if it worked the opposite way?',
    quiz: [
      { q: 'Why does ice float on water?', a: 'Ice is less dense than liquid water', w: ['Ice is full of tiny air bubbles', 'Ice is lighter because it is cold', 'Water pushes cold things up'], why: 'Freezing water forms an open lattice that takes up more space.' },
      { q: 'At roughly what temperature is liquid water densest?', a: '4°C', w: ['0°C', '-4°C', '10°C'], why: 'Water is densest near 4°C, which is why lakes freeze from the top.' },
    ],
    timeline: null,
    estimate: { q: 'By roughly what percentage does water expand when it freezes?', answer: 9, unit: 'per cent', min: 0, max: 50 },
  },
  {
    id: 'sci-leidenfrost',
    level: 1,
    title: 'Water that dances on a hot pan',
    body: [
      'Flick a drop of water onto a warm pan and it fizzles away. Flick it onto a very hot pan and something odd happens: the drop skitters around like a tiny hovercraft and lasts surprisingly long. This is the Leidenfrost effect, named after the German doctor Johann Gottlob Leidenfrost, who described it in 1756.',
      'Above roughly 200°C for water, the bottom of the drop boils so fast that it creates a thin cushion of vapour. The drop floats on this layer, which insulates it from the scorching metal and lets it glide almost without friction. Cooks use it as a test: when a drop beads and dances, a stainless steel pan is hot enough. The same effect is why liquid nitrogen spilled on a floor skates about in little beads rather than spreading out.',
    ],
    question: 'Can you think of a situation where being "too hot" or too intense actually protects something, the way the vapour layer protects the drop?',
    quiz: [
      { q: 'On which pan will a water drop last longer?', a: 'A very hot pan', w: ['A warm pan', 'A cold pan', 'They last the same time'], why: 'On a very hot pan, a vapour cushion insulates the drop.' },
      { q: 'What does a Leidenfrost drop float on?', a: 'A thin layer of its own vapour', w: ['A film of cooking oil', 'Tiny bumps in the metal', 'Static electricity'], why: 'The underside boils instantly, forming an insulating vapour cushion.' },
    ],
    timeline: { event: 'Leidenfrost describes dancing drops', year: 1756 },
    estimate: null,
  },
  {
    id: 'sci-mendeleev',
    level: 1,
    title: 'The table that predicted the future',
    body: [
      'In 1869 the Russian chemist Dmitri Mendeleev arranged the known elements by atomic weight and noticed that their properties repeated in a regular rhythm. Others had spotted patterns too, but Mendeleev made a bold move: where the pattern demanded an element that nobody had found, he left a gap and predicted what it would be like.',
      'He described an unknown "eka-aluminium" and "eka-silicon", forecasting properties such as their density. Within a couple of decades, chemists discovered gallium (in 1875) and germanium (in 1886), and they matched his predictions remarkably well. That turned his table from a tidy filing system into a genuine scientific theory, one that made risky predictions and passed the test. Every periodic table on a classroom wall descends from his.',
    ],
    question: 'What makes you trust an idea more: that it explains what we already know, or that it correctly predicts something new?',
    quiz: [
      { q: 'What bold move did Mendeleev make in his periodic table?', a: 'Left gaps for undiscovered elements', w: ['Sorted elements by date of discovery', 'Arranged elements in a spiral', 'Split metals and gases into two tables'], why: 'He left gaps and predicted the missing elements\' properties.' },
      { q: 'Which element filled Mendeleev\'s predicted "eka-silicon" gap?', a: 'Germanium', w: ['Gallium', 'Scandium', 'Tin'], why: 'Germanium, discovered in 1886, matched his eka-silicon prediction.' },
    ],
    timeline: { event: 'Mendeleev\'s periodic table', year: 1869 },
    estimate: null,
  },
  {
    id: 'sci-carbondating',
    level: 1,
    title: 'Carbon dating: a clock in every living thing',
    body: [
      'High in the atmosphere, cosmic rays constantly create a rare radioactive form of carbon called carbon-14. It mixes into the air as carbon dioxide, plants absorb it, and animals eat the plants, so every living thing carries a small, steady proportion of it.',
      'When an organism dies, it stops taking in new carbon, and the carbon-14 it holds slowly decays. Its half-life is about 5,730 years: after that long, half is gone; after another 5,730, half of what remained. By measuring how much is left in a bone, a seed or a scrap of linen, scientists can estimate when it died. Willard Libby developed the method in the late 1940s and won a Nobel Prize for it. It works back to roughly 50,000 years, after which too little carbon-14 remains to measure.',
    ],
    question: 'If you could carbon date one object from history to settle an argument, what would you choose?',
    quiz: [
      { q: 'When does the carbon-14 "clock" in an organism start ticking down?', a: 'When it dies', w: ['When it is born', 'When it is buried', 'When it is first eaten'], why: 'After death it stops taking in new carbon, so carbon-14 just decays.' },
      { q: 'Roughly how far back can carbon dating reliably reach?', a: 'About 50,000 years', w: ['About 500 years', 'About 5 million years', 'About 4.5 billion years'], why: 'Beyond that, too little carbon-14 remains to measure.' },
    ],
    timeline: null,
    estimate: { q: 'What is the half-life of carbon-14, in years?', answer: 5730, unit: 'years', min: 0, max: 20000 },
  },
  {
    id: 'sci-penicillin',
    level: 1,
    title: 'The mould that changed medicine',
    body: [
      'In 1928 the Scottish scientist Alexander Fleming returned to his London laboratory after a holiday and noticed something odd on a dish of Staphylococcus bacteria. A blob of Penicillium mould had grown on it, and around the mould the bacteria had died, leaving a clear ring.',
      'Fleming named the substance penicillin, but he struggled to purify it in useful amounts. It took a team at Oxford led by Howard Florey and Ernst Chain, around 1940, to turn it into a working medicine, and mass production during the Second World War saved huge numbers of wounded soldiers. The three men shared the Nobel Prize in 1945. Before antibiotics, a scratch that became infected or a bout of pneumonia could easily kill you; penicillin changed what it meant to get sick.',
    ],
    question: 'Fleming\'s discovery came from a messy lab and a lucky accident. Do you think there is a skill to noticing lucky accidents?',
    quiz: [
      { q: 'What did Fleming notice on his contaminated dish in 1928?', a: 'Bacteria dying around a mould', w: ['Mould dying around bacteria', 'Bacteria growing faster near a mould', 'A virus killing the mould'], why: 'A clear ring formed where Penicillium had killed the bacteria.' },
      { q: 'Who turned penicillin into a usable medicine around 1940?', a: 'Florey and Chain at Oxford', w: ['Fleming alone in London', 'Watson and Crick at Cambridge', 'Salk and Sabin in America'], why: 'Fleming could not purify it; the Oxford team did.' },
    ],
    timeline: { event: 'Fleming discovers penicillin', year: 1928 },
    estimate: null,
  },
  {
    id: 'sci-resistance',
    level: 2,
    title: 'Antibiotic resistance: evolution in fast forward',
    body: [
      'Penicillin seemed like a miracle, but bacteria fight back, not by planning but through natural selection. In any large population of bacteria, a few may carry a random mutation, or a borrowed gene, that lets them survive a drug. Treat the infection and the vulnerable ones die, leaving the tough survivors to multiply. Because bacteria can divide as often as every twenty minutes or so in good conditions, evolution that takes animals millennia can happen in bacteria within months or years.',
      'Fleming himself warned in his 1945 Nobel lecture that using too little penicillin could breed resistant microbes. That is why doctors urge people to take antibiotics only when needed and to follow the prescribed course. Each unnecessary dose is a little training session for the bacteria that survive it.',
    ],
    question: 'Should people be able to buy antibiotics freely, or is it right that doctors act as gatekeepers?',
    quiz: [
      { q: 'How do bacteria become resistant to antibiotics?', a: 'Survivors with useful genes multiply', w: ['They learn from the drug', 'The drug weakens over time', 'Patients become immune to it'], why: 'Natural selection leaves resistant survivors to multiply.' },
      { q: 'Why can resistance evolve so quickly in bacteria?', a: 'They can divide very often', w: ['They can sense the drug coming', 'They live longer than we do', 'They hide inside our cells'], why: 'Rapid generations mean selection acts in months or years.' },
    ],
    timeline: null,
    estimate: null,
  },
  {
    id: 'sci-microbiome',
    level: 1,
    title: 'Are you more microbe than human?',
    body: [
      'You may have heard that bacteria in your body outnumber your own cells ten to one. That figure was a rough guess from the 1970s that got repeated for decades. In 2016 a team of researchers in Israel and Canada recounted carefully and estimated about 38 trillion bacteria in a typical adult, against roughly 30 trillion human cells. The ratio is closer to one to one.',
      'Most of those microbes live in your large intestine, where they help digest fibre your own enzymes cannot break down, make some vitamins, and train your immune system. Interestingly, the researchers noted that the balance can tip with each trip to the toilet, since a bowel movement expels a sizeable share of them. So depending on the moment, you are roughly half microbe, give or take.',
    ],
    question: 'Does it change how you think about "yourself" to know you are roughly half microbe by cell count?',
    quiz: [
      { q: 'Roughly what is the ratio of bacterial cells to human cells in your body?', a: 'About one to one', w: ['Ten to one', 'One hundred to one', 'One to a thousand'], why: 'A 2016 recount found about 38 trillion bacteria to 30 trillion human cells.' },
      { q: 'Where do most of your body\'s microbes live?', a: 'The large intestine', w: ['The skin', 'The lungs', 'The bloodstream'], why: 'The large intestine hosts most of them, digesting fibre and more.' },
    ],
    timeline: null,
    estimate: { q: 'A 2016 study estimated how many trillion bacteria live in a typical adult?', answer: 38, unit: 'trillion', min: 0, max: 200 },
  },
  {
    id: 'sci-mitochondria',
    level: 1,
    title: 'The bacteria living inside your cells',
    body: [
      'Almost every one of your cells contains hundreds or thousands of mitochondria, tiny structures that use oxygen to turn food into usable energy. They are often called the powerhouses of the cell. What is remarkable is where they came from.',
      'Mitochondria have their own small loop of DNA, separate from the DNA in the cell\'s nucleus, and they divide by splitting in two, much as bacteria do. The widely accepted explanation, championed by biologist Lynn Margulis from the 1960s, is that they were once free-living bacteria that were engulfed by another cell well over a billion years ago and, instead of being digested, stayed on as partners. Another quirk: you inherit your mitochondria almost entirely from your mother, which lets scientists trace maternal family lines far back in time.',
    ],
    question: 'Mitochondria began as a partnership that became permanent. What partnerships in your life have become so close you cannot imagine them apart?',
    quiz: [
      { q: 'What were mitochondria most likely, long ago?', a: 'Free-living bacteria', w: ['Viruses', 'Tiny worms', 'Fragments of the nucleus'], why: 'They were engulfed bacteria that stayed on as partners.' },
      { q: 'From whom do you inherit your mitochondria?', a: 'Almost entirely from your mother', w: ['Almost entirely from your father', 'Equally from both parents', 'From neither: they form fresh'], why: 'Mitochondria pass down almost exclusively through the mother.' },
    ],
    timeline: null,
    estimate: null,
  },
  {
    id: 'sci-bones',
    level: 1,
    title: 'Born with about 300 bones',
    body: [
      'An adult human skeleton has 206 bones. A newborn baby has around 300 bony pieces, many of them still partly cartilage. As children grow, many of these gradually fuse together. The skull is a good example: at birth it is made of separate plates with soft gaps between them, which let the head squeeze through the birth canal and leave room for a fast-growing brain.',
      'Bone is also far more alive than the dry skeletons in museums suggest. It is constantly being broken down and rebuilt, remodelling itself in response to the loads you put on it, which is why weight-bearing exercise strengthens bones and long spells in space weaken them. More than half of your bones are in your hands and feet, which is part of what makes them so wonderfully nimble.',
    ],
    question: 'Bones grow stronger with the stresses placed on them. Is that also true of people?',
    quiz: [
      { q: 'Does a newborn baby have more or fewer bones than an adult?', a: 'More, around 300', w: ['Fewer, around 100', 'Exactly the same, 206', 'Fewer, around 150'], why: 'Many of a baby\'s bony pieces fuse together during growth.' },
      { q: 'Why do astronauts\' bones weaken on long missions?', a: 'Bones are not carrying weight', w: ['Astronaut food lacks calcium', 'Space radiation damages them', 'Low air pressure thins them'], why: 'Bone remodels in response to load, so less load means weaker bone.' },
    ],
    timeline: null,
    estimate: { q: 'How many bones are in a typical adult human skeleton?', answer: 206, unit: 'bones', min: 100, max: 400 },
  },
  {
    id: 'sci-bloodfactory',
    level: 2,
    title: 'Your bones are a blood factory',
    body: [
      'Bones are not just scaffolding. Inside many of them is soft red marrow, and it is one of the busiest factories in your body. It produces your red blood cells at a rate of millions every second, along with white blood cells and platelets.',
      'Red blood cells are strange little things. In mammals they throw out their nucleus as they mature, leaving more room for haemoglobin, the iron-rich protein that carries oxygen and makes blood red. Their dimpled disc shape lets them bend and squeeze through capillaries narrower than they are. Without a nucleus they cannot repair themselves, so each one lasts only about 120 days before worn-out cells are broken down, mainly in the spleen and liver, and their iron is recycled. When you give blood, your marrow simply steps up production to replace it over the following weeks.',
    ],
    question: 'Knowing your body replaces millions of cells every second, does it feel like you are the same person you were ten years ago?',
    quiz: [
      { q: 'Where are your red blood cells made?', a: 'In the bone marrow', w: ['In the heart', 'In the lungs', 'In the stomach'], why: 'Red marrow inside bones produces millions of red blood cells every second.' },
      { q: 'What unusual thing do mammalian red blood cells lack?', a: 'A nucleus', w: ['A cell membrane', 'Haemoglobin', 'Iron'], why: 'They eject their nucleus, making room for oxygen-carrying haemoglobin.' },
    ],
    timeline: null,
    estimate: { q: 'Roughly how many days does a red blood cell last?', answer: 120, unit: 'days', min: 0, max: 365 },
  },
  {
    id: 'sci-nerves',
    level: 1,
    title: 'Why stubbing your toe hurts twice',
    body: [
      'Stub your toe and you may notice two waves: a sharp, immediate jolt, then a beat later a deep, throbbing ache. That gap reveals something about your wiring. Nerve signals are not instant; they travel at different speeds depending on the type of fibre.',
      'The fastest nerve fibres are thick and wrapped in a fatty insulating sheath called myelin, which lets the signal leap along. They can carry messages at up to about 120 metres per second, roughly 430 km/h. Fibres that carry dull, aching pain are thin and unwrapped, and signals crawl along them at around a metre per second, about walking pace. From your foot to your brain is over a metre, so the slow ache genuinely arrives later. It is also why rubbing a bump helps: the fast touch signals partly crowd out the slow pain at the spinal cord.',
    ],
    question: 'Pain is your body\'s warning system. If you could switch pain off completely, would you? What might go wrong?',
    quiz: [
      { q: 'Why does a stubbed toe often hurt in two waves?', a: 'Fast and slow nerves carry the signal', w: ['The brain replays the signal later', 'Swelling sets off a second signal', 'Blood rushing in triggers more pain'], why: 'Fast fibres carry the jolt; slow fibres bring the ache later.' },
      { q: 'What does the fatty myelin sheath around a nerve fibre do?', a: 'Speeds up the signal', w: ['Stores energy for the nerve', 'Blocks all pain', 'Slows down the signal'], why: 'Myelinated fibres carry signals up to about 120 metres per second.' },
    ],
    timeline: null,
    estimate: { q: 'The fastest nerve signals travel at up to about how many metres per second?', answer: 120, unit: 'm/s', min: 0, max: 500 },
  },
  {
    id: 'sci-octopus',
    level: 1,
    title: 'Three hearts and blue blood',
    body: [
      'An octopus is about as alien as life on Earth gets. It has three hearts: two pump blood through the gills, and a third sends it around the body. Its blood is blue, because instead of iron-based haemoglobin it uses a copper-based protein called haemocyanin to carry oxygen, which works well in cold, low-oxygen water.',
      'Its nervous system is just as odd. An octopus has around 500 million neurons, comparable to some dogs, but roughly two-thirds of them are in its arms rather than its central brain. Each arm can taste what its suckers touch and handle much of its own movement, so the brain can give a general instruction like "grab that crab" and leave the details to the arm. Octopuses open jars, squeeze through gaps barely bigger than their beak, and change colour and skin texture in a fraction of a second.',
    ],
    question: 'If intelligence can be spread across a body rather than packed in a head, how might that change what we count as "smart"?',
    quiz: [
      { q: 'How many hearts does an octopus have?', a: 'Three', w: ['One', 'Two', 'Eight'], why: 'Two pump blood through the gills and one around the body.' },
      { q: 'Why is octopus blood blue?', a: 'It uses copper to carry oxygen', w: ['It uses a different form of iron', 'It is full of dissolved sea salt', 'It carries very little oxygen'], why: 'Copper-based haemocyanin turns blue, unlike iron-based haemoglobin.' },
    ],
    timeline: null,
    estimate: null,
  },
  {
    id: 'sci-oxygen',
    level: 1,
    title: 'The great pollution that gave us air',
    body: [
      'For roughly the first half of Earth\'s history, the atmosphere had almost no free oxygen. That changed because of cyanobacteria, tiny organisms that had learned photosynthesis: using sunlight to split water and release oxygen as waste.',
      'Around 2.4 billion years ago, oxygen began to build up in the atmosphere in what geologists call the Great Oxidation Event. For many microbes that had evolved without it, oxygen was a toxic gas, and it probably drove many of them into airless refuges such as deep mud. One clue is the vast banded iron formations found in ancient rocks, where iron dissolved in the oceans reacted with oxygen and settled out as rust-coloured layers. But oxygen also opened the door to energy-hungry life. Every breath you take depends on a planet-changing waste product released by bacteria.',
    ],
    question: 'One creature\'s pollution became the foundation for everything after. Can you think of a "waste" in your own life that turned out to be valuable?',
    quiz: [
      { q: 'Which organisms first filled Earth\'s atmosphere with oxygen?', a: 'Cyanobacteria', w: ['Early land plants', 'Giant ferns', 'Early seaweeds'], why: 'Photosynthetic cyanobacteria released oxygen as a waste product.' },
      { q: 'What are banded iron formations evidence of?', a: 'Oxygen rusting iron in the oceans', w: ['Iron-rich meteorite strikes', 'Undersea volcanic eruptions', 'Rivers washing iron from rocks'], why: 'Dissolved iron met oxygen and settled out as rusty layers.' },
    ],
    timeline: null,
    estimate: null,
  },
  {
    id: 'sci-wegener',
    level: 1,
    title: 'The continents that drift',
    body: [
      'Look at a world map and the bulge of South America seems to slot into the curve of Africa. In 1912 German meteorologist Alfred Wegener proposed that this was no coincidence: the continents had once been joined in a single supercontinent and had slowly drifted apart. He pointed to matching rock layers and identical fossils on opposite sides of the Atlantic.',
      'Most geologists dismissed him, largely because he could not explain what force could shove continents around. Wegener died on an expedition in Greenland in 1930, long before he was vindicated. In the 1950s and 1960s, maps of the ocean floor revealed long volcanic ridges where new seafloor is created and spreads apart. Plate tectonics became the foundation of modern geology. The plates move a few centimetres a year, about as fast as your fingernails grow.',
    ],
    question: 'Wegener was right but could not explain why. Should an idea be taken seriously before anyone understands how it works?',
    quiz: [
      { q: 'Roughly how fast do tectonic plates move?', a: 'About as fast as fingernails grow', w: ['About as fast as a snail crawls', 'A few metres a year', 'Too slowly to ever measure'], why: 'Plates move a few centimetres a year, like fingernail growth.' },
      { q: 'Why did most geologists reject Wegener\'s idea at first?', a: 'He had no mechanism to move continents', w: ['His maps were inaccurate', 'He had no fossil evidence', 'He was not a scientist'], why: 'He could not explain what force could move continents.' },
    ],
    timeline: { event: 'Wegener proposes continental drift', year: 1912 },
    estimate: null,
  },
  {
    id: 'sci-tides',
    level: 1,
    title: 'Why there are two tides a day',
    body: [
      'Most coasts get two high tides roughly every day, not one, which puzzles many people. If the Moon pulls the sea towards it, why is there also a bulge on the opposite side of the Earth?',
      'The key is that gravity weakens with distance. The Moon pulls hardest on the ocean facing it, a bit less on the Earth\'s centre, and least on the far ocean. So the near water is pulled ahead of the Earth, and the Earth is pulled away from the far water. The result is two bulges, one on each side. As the planet turns beneath them, a given coast passes through both, so high tides arrive about every 12 hours and 25 minutes. The Sun adds its own smaller effect: when Sun and Moon line up, at new and full moon, we get the extra-large spring tides.',
    ],
    question: 'Tides are invisible forces with very visible effects. What invisible pressure shapes your daily routine the most?',
    quiz: [
      { q: 'How many high tides do most coasts get in about a day?', a: 'Two', w: ['One', 'Three', 'Four'], why: 'There are two tidal bulges, and Earth rotates through both.' },
      { q: 'When do the extra-large "spring tides" happen?', a: 'When the Sun and Moon line up', w: ['Only in the springtime', 'When the Moon is farthest away', 'When Earth is closest to the Sun'], why: 'Their pulls combine at new and full moon.' },
    ],
    timeline: null,
    estimate: null,
  },
  {
    id: 'sci-moondrift',
    level: 2,
    title: 'The Moon is slowly leaving',
    body: [
      'The tides do not just move water; they act as a brake. The tidal bulges are dragged slightly ahead of the Moon by Earth\'s spin, and their gravity tugs the Moon forward in its orbit. As a result, Earth\'s rotation slows very gradually, making days a tiny bit longer, while the Moon gains energy and spirals outward.',
      'We know how fast thanks to Apollo 11. In 1969 astronauts left a panel of reflectors on the lunar surface, and later missions added more. Observatories on Earth fire lasers at them and time the faint reflections that return. These measurements show the Moon is moving away by about 3.8 centimetres every year. In the distant past it was closer, and the day was shorter; studies of ancient rocks and fossil corals suggest that hundreds of millions of years ago a day lasted noticeably less than 24 hours.',
    ],
    question: 'Some changes are too slow for any one lifetime to notice. Which slow change do you think humanity is worst at paying attention to?',
    quiz: [
      { q: 'What is happening to the distance between Earth and the Moon?', a: 'It is slowly increasing', w: ['It is slowly decreasing', 'It never changes', 'It grows and shrinks with the seasons'], why: 'Tidal interactions push the Moon gradually outward.' },
      { q: 'How do we measure the Moon\'s distance so precisely?', a: 'Lasers bounced off Apollo reflectors', w: ['Measuring its shadow', 'Radio signals from satellites', 'Measuring its size in the sky'], why: 'Reflectors left from 1969 onwards return laser pulses for timing.' },
    ],
    timeline: { event: 'Apollo 11 leaves laser reflectors', year: 1969 },
    estimate: { q: 'By about how many centimetres does the Moon move away from Earth each year?', answer: 3.8, unit: 'cm', min: 0, max: 20 },
  },
  {
    id: 'sci-paleblue',
    level: 1,
    title: 'The pale blue dot',
    body: [
      'On 14 February 1990, the Voyager 1 spacecraft, by then about 6 billion kilometres from home and heading out of the solar system, turned its camera back and took a series of pictures of the planets. The astronomer Carl Sagan had pushed for the idea. In one frame, Earth is a tiny speck, smaller than a single pixel, caught in a scattered beam of sunlight.',
      'Scientifically, the image showed little. Its power was emotional. Sagan reflected on it in his book Pale Blue Dot, describing every person who ever lived as living on that mote of dust, and arguing that it should make us kinder to one another and more careful with the only home we know. Voyager 1 is still travelling outward today, and is the most distant human-made object.',
    ],
    question: 'Does picturing Earth as a single speck make your everyday worries feel smaller, or does it make them feel more precious?',
    quiz: [
      { q: 'How big does Earth appear in the Pale Blue Dot photo?', a: 'Smaller than a single pixel', w: ['Filling half the frame', 'About the size of the Moon', 'A small but clear blue disc'], why: 'From about 6 billion km, Earth is a tiny speck.' },
      { q: 'Which spacecraft took the Pale Blue Dot photograph?', a: 'Voyager 1', w: ['Voyager 2', 'Pioneer 10', 'New Horizons'], why: 'Voyager 1 turned its camera back toward home in 1990.' },
    ],
    timeline: { event: 'Voyager 1 takes Pale Blue Dot', year: 1990 },
    estimate: null,
  },
  {
    id: 'sci-blackhole',
    level: 1,
    title: 'The first picture of a black hole',
    body: [
      'A black hole is a region where matter is so tightly packed that nothing, not even light, can escape once it crosses a boundary called the event horizon. That makes photographing one sound impossible. But the gas swirling around a black hole is heated to extreme temperatures and glows brightly, so the black hole should appear as a dark shadow against that glow.',
      'In April 2019 the Event Horizon Telescope team released the first such image: a fuzzy orange ring around a dark centre, at the heart of the galaxy M87, about 55 million light-years away. That black hole weighs billions of times as much as our Sun. To see something so small in the sky, astronomers linked radio telescopes across the globe so that, together, they acted almost like a single dish the size of Earth.',
    ],
    question: 'What is something you can only understand indirectly, by the effect it has on everything around it?',
    quiz: [
      { q: 'If no light escapes a black hole, what did the 2019 image actually show?', a: 'Its shadow against glowing gas', w: ['Light escaping from inside', 'A computer drawing only', 'The black hole\'s surface'], why: 'Hot gas around it glows, and the black hole appears as a dark shadow.' },
      { q: 'How did astronomers get a telescope big enough?', a: 'Linking radio dishes across the globe', w: ['Building one giant mirror', 'Sending a telescope to the Moon', 'Using the Hubble Space Telescope'], why: 'Linked telescopes acted like one Earth-sized dish.' },
    ],
    timeline: { event: 'First image of a black hole', year: 2019 },
    estimate: null,
  },
  {
    id: 'sci-gravwaves',
    level: 2,
    title: 'Hearing black holes collide',
    body: [
      'Einstein\'s general theory of relativity predicted in 1916 that violent cosmic events would send ripples through space-time itself, stretching and squeezing everything they pass through. He doubted they could ever be detected, because by the time they reach us they are unimaginably faint.',
      'On 14 September 2015, the LIGO observatories in the United States caught one. Each detector has two arms 4 kilometres long at right angles, with lasers measuring their lengths. The passing wave changed those lengths by far less than the width of a proton. The signal came from two black holes, each tens of times the mass of the Sun, spiralling together and merging about 1.3 billion light-years away. Turned into sound, the signal rises in a quick "chirp". Three of the project\'s leading scientists shared the Nobel Prize in Physics in 2017.',
    ],
    question: 'Einstein doubted his prediction could ever be tested, yet it was, a century later. Is there an idea you hold that you expect will only be proven long after you?',
    quiz: [
      { q: 'What did LIGO first detect in 2015?', a: 'Ripples from two merging black holes', w: ['Light left over from the Big Bang', 'Flashes from an exploding star', 'Signals from a distant pulsar'], why: 'The gravitational wave came from two black holes merging.' },
      { q: 'How much did the passing wave change LIGO\'s arm lengths?', a: 'Far less than a proton\'s width', w: ['About a centimetre', 'About a metre', 'About the width of a hair'], why: 'Gravitational waves are incredibly faint by the time they reach us.' },
    ],
    timeline: { event: 'LIGO detects gravitational waves', year: 2015 },
    estimate: { q: 'How many kilometres long is each arm of a LIGO detector?', answer: 4, unit: 'km', min: 0, max: 20 },
  },
  {
    id: 'sci-pistolshrimp',
    level: 1,
    title: 'The shrimp that snaps a bubble',
    body: [
      'The pistol shrimp, only a few centimetres long, has one oversized claw that it can snap shut so fast it shoots out a jet of water. That jet creates a low-pressure bubble, a process called cavitation. When the bubble collapses, it releases a loud crack and a shock wave strong enough to stun or kill small prey.',
      'The collapse is astonishingly violent. Researchers have found that, for an instant, the inside of the bubble reaches temperatures of thousands of degrees and even gives off a tiny flash of light. Colonies of snapping shrimp are so loud that their crackling can interfere with submarine sonar and underwater listening equipment. It is a striking reminder that some of the most extreme physics on Earth happens in shallow seas, triggered by a creature you could hold in your palm.',
    ],
    question: 'Which do you find more impressive in nature: the huge and powerful, or the tiny creatures that punch far above their size?',
    quiz: [
      { q: 'How does a pistol shrimp stun its prey?', a: 'A collapsing bubble from its claw', w: ['A venomous sting', 'An electric shock', 'Squirting ink'], why: 'Its snapping claw creates a cavitation bubble whose collapse makes a shock wave.' },
      { q: 'Why are colonies of snapping shrimp a problem for submarines?', a: 'Their noise interferes with sonar', w: ['They damage the hull', 'They block the propellers', 'They glow and give away positions'], why: 'Their constant crackling clutters underwater listening equipment.' },
    ],
    timeline: null,
    estimate: null,
  },
];

// Advice requests: a visiting villager asks the player for help applying something from these cards.
export const requests = [
  { card: 'sci-resistance', ask: 'The healer gave me pills for my chest, and I feel better after two days. Can I stop and save the rest for next winter?', q: 'What does the science of antibiotic resistance suggest?', a: 'Finish the course as prescribed', w: ['Stop as soon as you feel better', 'Save them and share with friends'], why: 'Underdosing leaves tougher bacteria alive to multiply, as Fleming warned.' },
  { card: 'sci-icefloats', ask: 'I left a full glass bottle of water outside on a freezing night and it cracked. Was it a faulty bottle?', q: 'Why did the bottle crack?', a: 'Water expands by about 9% when it freezes', w: ['Cold glass shrinks to nothing', 'Ice is denser than water'], why: 'Freezing water forms an open lattice that takes up more space.' },
  { card: 'sci-leidenfrost', ask: 'I am frying fish in my new steel pan, and someone said to test it with a drop of water. What am I looking for?', q: 'What sign shows the pan is hot enough?', a: 'The drop beads up and dances around', w: ['The drop sinks into the metal', 'The drop spreads out flat'], why: 'On a very hot pan, a vapour cushion makes the drop skitter: the Leidenfrost effect.' },
  { card: 'sci-bones', ask: 'My grandfather wants to stay strong, but he thinks walking is pointless at his age because bones are just dead stuff. What should I tell him?', q: 'What does the card say about bones?', a: 'Bones rebuild and strengthen with load', w: ['Bones never change after childhood', 'Exercise weakens old bones'], why: 'Bone constantly remodels in response to load, so weight-bearing exercise helps.' },
  { card: 'sci-tides', ask: 'I want to dig for cockles at low tide tomorrow, and it was low tide this morning at seven. Roughly when will the next low tides be?', q: 'Roughly how often does a given coast get a low tide?', a: 'About every 12 hours and 25 minutes', w: ['Exactly once every 24 hours', 'Only once a week'], why: 'Earth turns through two tidal bulges, so the cycle repeats about every 12 hours 25 minutes.' },
];
