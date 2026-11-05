// Recall questions per lesson card. Item 0 is the quick guess shown before
// reading; at the dock they rotate starting from item 1, so the first
// fishing question is never the one you just guessed.
// [question, correct answer, [wrong answers], short explanation]
const Q = (q, a, w, why) => ({ q, a, w, why });

export const QUIZ = {
  'news-unsc-veto': [
    Q('How many permanent members does the UN Security Council have?', '5', ['3', '10', '15'], 'The US, UK, France, Russia and China. Each can veto.'),
    Q('Are UN General Assembly resolutions legally binding?', 'No, they are recommendations', ['Yes, on every member', 'Only with a two-thirds majority', 'Only for permanent members'], 'Every country votes in the Assembly, but its resolutions are not binding law.'),
  ],
  'news-central-banks': [
    Q('Roughly what inflation rate do most big central banks aim for?', 'About 2%', ['0%', 'About 5%', 'About 10%'], 'Around 2% is the common target.'),
    Q('What is "forward guidance"?', 'Hints about future policy', ['A surprise rate cut', 'A new currency design', 'A bond purchase'], 'Markets read the wording for what comes next.'),
  ],
  'news-thucydides': [
    Q('In Allison\'s 16 cases of a rising power challenging a ruling one, how many ended in war?', '12', ['4', '8', '16'], 'Twelve of sixteen, though critics question the case selection.'),
    Q('Thucydides was describing which war?', 'The Peloponnesian War', ['The Trojan War', 'The Punic Wars', 'The Persian Wars'], 'Athens rising, Sparta afraid.'),
  ],
  'robo-dof': [
    Q('How many degrees of freedom does a human arm have, shoulder to wrist?', '7', ['3', '6', '10'], 'Three at the shoulder, one at the elbow, three at the wrist.'),
    Q('Why do classic factory arms have six joints?', 'Six is enough to position and orient a hand in 3D', ['Six is cheaper than four', 'Seven joints are illegal', 'It copies the human hand'], 'Three for position, three for orientation.'),
  ],
  'robo-moravec': [
    Q('Moravec\'s paradox: which is relatively easy for computers?', 'Chess and test-taking', ['Walking on rough ground', 'Picking up a cup', 'Folding laundry'], 'Abstract reasoning is easy; perception and movement are hard.'),
    Q('Moravec\'s explanation for the paradox was...', 'Evolution: perception and movement are ancient and complex', ['Computer chips are too slow', 'Programmers ignore movement', 'Sensors are too expensive'], 'Skills refined for millions of years only feel effortless.'),
  ],
  'robo-slam': [
    Q('What does SLAM stand for?', 'Simultaneous Localisation And Mapping', ['Sensor Linked Autonomous Motion', 'Systematic Laser Area Measurement', 'Self Learning Adaptive Machine'], 'It estimates the map and the robot\'s position together.'),
    Q('In SLAM, "loop closure" is when the robot...', 'Recognises a place it has seen before', ['Returns to its charger', 'Shuts down to save power', 'Drives in a circle'], 'Recognising a place lets it snap the whole map back into line.'),
  ],
  'fashion-lbd': [
    Q('In 1926, Vogue compared Chanel\'s little black dress to...', 'The Ford Model T', ['The Eiffel Tower', 'A nun\'s habit', 'The telephone'], 'Simple enough to become a uniform for everyone.'),
    Q('Who wore Givenchy\'s black sheath in Breakfast at Tiffany\'s?', 'Audrey Hepburn', ['Grace Kelly', 'Marilyn Monroe', 'Coco Chanel'], '1961, and the little black dress was cemented.'),
  ],
  'fashion-couture': [
    Q('In France, "haute couture" is...', 'A protected term with official criteria', ['A marketing phrase anyone can use', 'A type of silk', 'A street in Paris'], 'Houses must be approved by the Fédération.'),
    Q('What mostly pays the bills for couture houses?', 'Perfume, handbags and ready-to-wear', ['Couture gowns', 'Fashion show tickets', 'Magazine deals'], 'Very few people buy couture itself.'),
  ],
  'fashion-newlook': [
    Q('In what year did Dior show the "New Look"?', '1947', ['1926', '1939', '1961'], 'February 1947, his first collection.'),
    Q('What was the New Look silhouette?', 'Cinched waist and a full skirt', ['Boxy and straight', 'Short hems and a dropped waist', 'Big shoulder pads'], 'A return to luxury after wartime rationing.'),
  ],
  'wine-burgundy': [
    Q('What is the main red grape of Burgundy?', 'Pinot Noir', ['Cabernet Sauvignon', 'Merlot', 'Syrah'], 'Pinot Noir for reds, Chardonnay for whites.'),
    Q('What sits at the top of the Burgundy hierarchy?', 'Grand cru', ['Premier cru', 'Village', 'Regional'], 'Grand cru is only a percent or two of production.'),
  ],
  'wine-structure': [
    Q('What does tannin feel like?', 'Drying, like strong black tea', ['It makes your mouth water', 'Sweet', 'Fizzy'], 'Tannin comes from skins, seeds and oak.'),
    Q('A wine\'s body is mostly driven by...', 'Alcohol', ['Acidity', 'Colour', 'Bottle age'], 'Think skimmed milk versus whole milk.'),
  ],
  'wine-champagne': [
    Q('Where do Champagne\'s bubbles come from?', 'A second fermentation in the bottle', ['Carbon dioxide pumped in', 'Shaking the barrels', 'Naturally fizzy grapes'], 'Yeast and sugar are sealed in, and the CO2 dissolves.'),
    Q('What is "non-vintage" Champagne?', 'A blend of several years', ['Wine under one year old', 'Bubbles made outside Champagne', 'Wine made without yeast'], 'Blending keeps a house style the same every year.'),
  ],
  'cheese-holes': [
    Q('What makes the holes in Emmental?', 'Bacteria releasing carbon dioxide', ['Air pumped into the curd', 'Hand drilling', 'Escaping water'], 'Propionibacteria eat lactic acid and make CO2.'),
    Q('Why were Swiss cheeses getting fewer holes?', 'Very clean milk had lost tiny hay particles', ['Cows ate less grass', 'Warmer cellars', 'A new kind of rennet'], 'The hay specks act as starting points for bubbles.'),
  ],
  'cheese-washed': [
    Q('Washed-rind cheeses are washed with...', 'Brine, beer or spirits', ['Fresh milk', 'Olive oil', 'Plain water only'], 'The washing encourages the orange, sticky rind.'),
    Q('Brevibacterium linens is related to microbes found...', 'On human skin', ['In soil', 'In seawater', 'On grape skins'], 'Hence the "feet" smell.'),
  ],
  'cheese-parm': [
    Q('What is the minimum ageing for Parmigiano Reggiano?', '12 months', ['3 months', '6 months', '36 months'], 'Many are sold at 24 or 36 months.'),
    Q('The crunchy white specks in aged parmesan are...', 'Tyrosine crystals', ['Salt', 'Sugar', 'Bits of rind'], 'A sign of long ageing as proteins break down.'),
  ],
  'film-kuleshov': [
    Q('In the Kuleshov experiment, the actor\'s face...', 'Never changed', ['Changed in every shot', 'Was hidden by a mask', 'Was played by different actors'], 'Viewers read emotion from what it was cut next to.'),
    Q('The Kuleshov effect shows that meaning in film comes from...', 'The cut, what a shot sits next to', ['The soundtrack', 'The lighting', 'The script'], 'Editors use it constantly.'),
  ],
  'film-bomb': [
    Q('For Hitchcock, suspense comes from...', 'The audience knowing something the characters don\'t', ['Loud surprises', 'Very fast editing', 'Dark lighting'], 'Show the bomb first.'),
    Q('Showing the bomb first turns fifteen seconds of surprise into...', 'Fifteen minutes of suspense', ['A comedy', 'Boredom', 'A plot twist'], 'The dull chat becomes agony.'),
  ],
  'film-rashomon': [
    Q('Who directed Rashomon (1950)?', 'Akira Kurosawa', ['Yasujirō Ozu', 'Hayao Miyazaki', 'Kenji Mizoguchi'], 'It won the Golden Lion at Venice.'),
    Q('The "Rashomon effect" describes...', 'Sincere witnesses giving contradictory accounts', ['A twist that reveals the truth', 'A story told backwards', 'A film within a film'], 'The film never says which version is true.'),
  ],
  'food-maillard': [
    Q('The Maillard reaction happens between...', 'Amino acids and sugars', ['Fat and salt', 'Water and starch', 'Sugar on its own'], 'Sugar alone breaking down is caramelisation.'),
    Q('Why won\'t wet meat brown?', 'Surface water keeps it near 100°C', ['Water washes the flavour off', 'The salt dissolves', 'The pan stops heating'], 'Pat it dry and don\'t crowd the pan.'),
  ],
  'food-umami': [
    Q('Kikunae Ikeda discovered umami while studying...', 'Kombu seaweed broth', ['Soy sauce', 'Parmesan', 'Green tea'], 'He isolated glutamate in 1908.'),
    Q('Which compound gives umami its taste?', 'Glutamate', ['Sucrose', 'Capsaicin', 'Caffeine'], 'Found in tomatoes, parmesan, mushrooms, miso.'),
  ],
  'food-mother-sauces': [
    Q('Who organised French cooking around five mother sauces?', 'Auguste Escoffier', ['Julia Child', 'Paul Bocuse', 'Jacques Pépin'], 'Around 1900.'),
    Q('Béchamel is...', 'Milk thickened with roux', ['Butter emulsified into egg yolk', 'Brown stock with roux', 'Tomato cooked down'], 'Add cheese and it becomes Mornay.'),
  ],
  'travel-venice': [
    Q('What is MOSE in Venice?', 'Mobile flood barriers', ['A water taxi line', 'A tourist tax', 'The main canal'], 'They rise from the seabed during exceptional tides.'),
    Q('What did Venice start trialling in 2024?', 'An entry fee for day-trippers', ['A ban on gondolas', 'Closing St Mark\'s Square', 'A limit on hotels'], 'The first city to try it.'),
  ],
  'travel-silkroad': [
    Q('Who coined the term "Silk Road"?', 'Ferdinand von Richthofen', ['Marco Polo', 'Genghis Khan', 'Alexander von Humboldt'], 'A German geographer, in 1877.'),
    Q('The Silk Road was really...', 'A shifting web of routes', ['One long paved road', 'A sea route only', 'A single yearly caravan'], 'Goods passed hand to hand through oasis cities.'),
  ],
  'travel-shinkansen': [
    Q('When did the Tōkaidō Shinkansen open?', '1964', ['1945', '1980', '1998'], 'Just before the Tokyo Olympics.'),
    Q('Japanese rail staff "point and call" because it...', 'Reduces errors', ['Sells more tickets', 'Greets passengers', 'Makes trains faster'], 'Saying the signal aloud keeps attention on it.'),
  ],
  'art-rothko': [
    Q('Rothko\'s mature paintings are mostly...', 'Soft-edged rectangles of colour', ['Paint drips and splatters', 'Portraits', 'Hard geometric grids'], 'Built up in thin, glowing layers.'),
    Q('In which city is the Rothko Chapel?', 'Houston', ['New York', 'Paris', 'Chicago'], 'A quiet room of dark canvases.'),
  ],
  'art-impression': [
    Q('Impressionism was named after a Monet painting called...', 'Impression, Sunrise', ['Water Lilies', 'Haystacks', 'The Starry Night'], 'A hazy harbour, 1874.'),
    Q('The word "Impressionists" was first used...', 'As a critic\'s insult', ['In the artists\' manifesto', 'By the Louvre', 'By Monet himself'], 'Louis Leroy mocked them, and they kept the name.'),
  ],
  'art-monalisa': [
    Q('In what year was the Mona Lisa stolen from the Louvre?', '1911', ['1850', '1939', '1968'], 'It was recovered in Florence in 1913.'),
    Q('What is sfumato?', 'Smoky blending of tones', ['Gold leaf', 'Very thick paint', 'Painting on wet plaster'], 'It makes her smile seem to shift.'),
  ],
  'culture-ichigo': [
    Q('Ichi-go ichi-e means roughly...', 'One time, one meeting', ['Tea before talking', 'One cup for each guest', 'Slow is smooth'], 'Each gathering happens only once.'),
    Q('Ichi-go ichi-e is associated with...', 'The tea ceremony', ['Sumo', 'Calligraphy', 'Flower arranging'], 'A shared moment of presence between host and guest.'),
  ],
  'culture-muertos': [
    Q('When is Día de Muertos mainly celebrated?', '1 and 2 November', ['31 October', '25 December', '5 May'], 'The dead are welcomed home for a visit.'),
    Q('Which flower is said to guide spirits home?', 'Marigold (cempasúchil)', ['Rose', 'Lily', 'Sunflower'], 'Bright orange, with a strong scent.'),
  ],
  'culture-untranslatable': [
    Q('The Swedish word "lagom" means...', 'Just the right amount', ['Cosy and warm', 'Longing', 'Joy of food'], 'Neither too much nor too little.'),
    Q('Portuguese "saudade" is...', 'Longing for something absent', ['Cosy togetherness', 'A morning ritual', 'Quiet pride'], 'Something that may never return.'),
  ],
  'phil-trolley': [
    Q('Who introduced the trolley problem in 1967?', 'Philippa Foot', ['Judith Jarvis Thomson', 'Peter Singer', 'John Rawls'], 'Thomson later added the footbridge version.'),
    Q('In the footbridge version, most people...', 'Refuse to push, though the numbers are the same', ['Push without hesitating', 'Split evenly', 'Say it\'s identical to the lever'], 'Why the difference is the puzzle.'),
  ],
  'phil-theseus': [
    Q('Who added the twist of rebuilding the ship from its old planks?', 'Thomas Hobbes', ['Plutarch', 'Plato', 'René Descartes'], 'Now which one is the real ship?'),
    Q('Who first described the Ship of Theseus?', 'Plutarch', ['Homer', 'Aristotle', 'Thomas Hobbes'], 'The Athenians kept replacing its planks.'),
  ],
  'phil-rawls': [
    Q('The "veil of ignorance" comes from which book?', 'A Theory of Justice', ['The Republic', 'Leviathan', 'Being and Time'], 'John Rawls, 1971.'),
    Q('Rawls argued inequalities are acceptable only if they...', 'Benefit the least advantaged', ['Are voted for', 'Are earned', 'Are temporary'], 'Chosen without knowing who you\'ll be.'),
  ],
  'stats-clt': [
    Q('Add up many small, independent random effects and the total tends toward...', 'A bell curve', ['A flat line', 'Zero', 'Exponential growth'], 'The central limit theorem.'),
    Q('Which device shows the central limit theorem with falling beads?', 'A Galton board', ['An abacus', 'A slide rule', 'A pendulum'], 'Most beads land near the middle.'),
  ],
  'stats-birthday': [
    Q('How many people do you need for a better-than-even chance that two share a birthday?', '23', ['57', '183', '365'], 'It\'s about pairs, not your own birthday.'),
    Q('How many pairs do 23 people make?', '253', ['23', '46', '529'], 'Lots of pairs, each with a small chance.'),
  ],
  'stats-baserate': [
    Q('Rare condition, test 90% accurate, 9% false positives. You test positive. Chance you have it?', 'About 9%', ['About 90%', 'About 50%', 'About 1%'], 'Of ~98 positives in 1,000 people, only 9 are real.'),
    Q('Why is a positive result so unreliable when a condition is rare?', 'False positives swamp the true ones', ['The test is broken', 'People misreport symptoms', 'Labs mix up samples'], 'The base rate matters.'),
  ],
  'sci-skyblue': [
    Q('Why is the sky blue?', 'Air scatters short wavelengths more (Rayleigh scattering)', ['It reflects the ocean', 'Ozone is blue', 'The sun is mostly blue'], 'Blue reaches you from every direction.'),
    Q('Why isn\'t the sky violet, if violet scatters even more?', 'Less violet sunlight, some absorbed, and our eyes are less sensitive to it', ['Violet doesn\'t scatter', 'Clouds filter it out', 'Violet light is too long'], 'All three together.'),
  ],
  'sci-tardigrade': [
    Q('What is a dried-out tardigrade\'s survival state called?', 'A tun', ['A cyst', 'A pupa', 'A spore'], 'Metabolism almost stops.'),
    Q('In 2007, tardigrades survived...', 'Exposure to space in low Earth orbit', ['Being dropped into lava', 'A year at the bottom of the sea', 'Being frozen for 1,000 years'], 'Vacuum and radiation included.'),
  ],
  'sci-lightpast': [
    Q('How long does sunlight take to reach Earth?', 'About 8 minutes 20 seconds', ['No time at all', 'About 1 second', 'About 4 years'], 'You see the Sun as it was eight minutes ago.'),
    Q('Light from the nearest star system, Alpha Centauri, takes...', 'Over four years', ['About 8 minutes', 'About a month', 'About 100 years'], 'Every star is a photo of the past.'),
  ],
  'hist-ok': [
    Q('"OK" started as a joke abbreviation for...', '"oll korrect"', ['"only kidding"', '"old kitchen"', '"on key"'], 'An 1830s Boston fad for misspelled abbreviations.'),
    Q('Which campaign helped "OK" spread?', 'Martin Van Buren\'s, "Old Kinderhook"', ['Abraham Lincoln\'s', 'Andrew Jackson\'s', 'George Washington\'s'], 'His supporters formed OK Clubs in 1840.'),
  ],
  'hist-cleopatra': [
    Q('Cleopatra lived closer in time to which event?', 'The Moon landing', ['The building of the Great Pyramid'], 'The pyramid is about 2560 BC; she died in 30 BC.'),
    Q('Roughly when was the Great Pyramid of Giza built?', 'Around 2560 BC', ['Around 1200 BC', 'Around 30 BC', 'Around AD 100'], 'Even the Romans visited it as tourists.'),
  ],
  'hist-week': [
    Q('The names of the weekdays come from...', 'The seven visible "planets" of antiquity', ['Seven Roman emperors', 'The seven hills of Rome', 'The phases of the Moon'], 'Sun, Moon, Mars, Mercury, Jupiter, Venus, Saturn.'),
    Q('Thursday is named after which god?', 'Thor', ['Tiw', 'Woden', 'Frigg'], 'French kept Jupiter instead: jeudi.'),
  ],
};
