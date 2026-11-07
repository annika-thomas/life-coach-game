export default [
  {
    id: 'travel-greenwich',
    level: 1,
    title: "Why the world's clocks start in London",
    body: [
      "Lines of longitude have no natural starting point, unlike the equator, so for centuries countries measured from their own capitals. That was chaos for sailors and, later, for railways and telegraphs. In 1884, delegates at the International Meridian Conference in Washington, D.C. voted to make the line through the Royal Observatory at Greenwich, in south-east London, the world's prime meridian. Much of the world's shipping already used British charts based on it, which helped it win. France abstained and kept using Paris time for years afterwards.",
      "Visitors to Greenwich queue to stand with a foot in each hemisphere on the brass line. The quirk: modern satellite navigation uses a reference line about 100 metres to the east, so phones show the line in a slightly different place. Both are, in a sense, zero.",
    ],
    question: "Would the world be better off with one single time for everyone, ignoring the sun?",
    quiz: [
      { q: "Which place became the world's prime meridian in 1884?", a: "Greenwich", w: ["Paris", "Washington, D.C.", "Rome"], why: "The 1884 conference chose the line through the Royal Observatory, Greenwich." },
      { q: "Which country abstained and kept its own capital's time for years?", a: "France", w: ["Spain", "Germany", "Italy"], why: "France abstained and kept using Paris time." },
    ],
    timeline: { event: "Greenwich chosen as prime meridian", year: 1884 },
    estimate: null,
  },
  {
    id: 'travel-china-time',
    level: 2,
    title: "One country, one clock",
    body: [
      "If time zones followed the sun, as the Greenwich system was designed to allow, China would span roughly five of them. Instead the whole country runs on a single official time, set by Beijing, a practice in place since the founding of the People's Republic. On the east coast this works well. In the far west, it means the clock and the sky disagree wildly: in Kashgar in Xinjiang, winter sunrise can come around 10am, and summer sunsets arrive well after 10pm.",
      "Daily life adapts. Many people in Xinjiang, especially Uyghurs, keep an unofficial local time two hours behind Beijing, so travellers there should always check which time an appointment or bus departure means. China is not unique: India, which is also wide, uses one time zone, set half an hour off the usual hourly pattern at five and a half hours ahead of Greenwich.",
    ],
    question: "Would you rather your country shared one time for unity, or followed the sun for daylight?",
    quiz: [
      { q: "How many official time zones does China use?", a: "One", w: ["Three", "Five", "Seven"], why: "The whole country runs on Beijing time." },
      { q: "What should a traveller in Xinjiang double-check?", a: "Whether a time means Beijing or local time", w: ["Whether daylight saving is in force", "Whether clocks use 12 or 24 hours", "Whether a date uses the lunar calendar"], why: "Many locals use an unofficial time two hours behind Beijing." },
    ],
    timeline: null,
    estimate: { q: "Roughly how many geographic time zones does China span?", answer: 5, unit: 'time zones', min: 1, max: 12 },
  },
  {
    id: 'travel-spain-time',
    level: 2,
    title: "Why Spain dines so late",
    body: [
      "Look at a map and Madrid sits west of Greenwich, roughly in line with London, yet Spain's clocks match Berlin's, an hour ahead of the UK. The change dates from 1940, when Franco moved Spain onto Central European Time, in line with Nazi Germany. It never switched back. Neighbouring Portugal, at a similar longitude, keeps the same time as London.",
      "The result is that the Spanish sun rises and sets late by the clock, especially in the west of the country and in summer. Many people argue this helps explain the famously late timetable: lunch often around 2pm and dinner commonly at 9pm or 10pm. Historians point to other causes too, so treat it as one factor rather than the whole story. For travellers the lesson is practical: a restaurant that is empty at 7.30pm is not a bad sign, you are simply very early.",
    ],
    question: "Would you enjoy living on a late timetable like Spain's, or are you a firm early-dinner person?",
    quiz: [
      { q: "Whose time zone did Spain adopt in 1940?", a: "Germany's", w: ["Britain's", "Portugal's", "Morocco's"], why: "Franco moved Spain onto Central European Time in line with Germany." },
      { q: "A Madrid restaurant is empty at 7.30pm. What does that probably mean?", a: "You have arrived very early", w: ["It is closing down", "It is a tourist trap", "It is a public holiday"], why: "Dinner in Spain is commonly at 9pm or 10pm." },
    ],
    timeline: { event: "Spain moves to Central European Time", year: 1940 },
    estimate: null,
  },
  {
    id: 'travel-jet-lag',
    level: 1,
    title: "Why flying east feels worse",
    body: [
      "Jet lag happens because your body clock, which governs sleep, hunger and alertness, cannot jump time zones the way a plane can. It adjusts gradually, very roughly an hour or so per day. Most people find flying east harder than flying west. The usual explanation is that the natural human body clock runs slightly longer than 24 hours, so stretching your day (as you do heading west) comes more easily than shortening it.",
      "Light is the strongest signal your clock responds to, so use it. After flying east, seek out bright morning light and avoid very bright light late in the evening. After flying west, get light in the late afternoon and evening. Try to eat and sleep on local time from the start, keep any daytime nap short, and go easy on alcohol, which worsens sleep. Some travellers also start shifting their bedtime a little in the days before they leave.",
    ],
    question: "Do you push through jet lag or give in and nap? Which works better for you?",
    quiz: [
      { q: "Which direction of travel do most people find harder for jet lag?", a: "Flying east", w: ["Flying west", "Flying north", "Flying south"], why: "Shortening your day is harder than stretching it." },
      { q: "What is the strongest signal for resetting your body clock?", a: "Light", w: ["Caffeine", "Meal size", "Temperature"], why: "The body clock responds most strongly to light." },
    ],
    timeline: null,
    estimate: null,
  },
  {
    id: 'travel-dead-sea',
    level: 1,
    title: "The lowest place on dry land",
    body: [
      "The shores of the Dead Sea, between Jordan, Israel and the West Bank, are the lowest land on Earth: roughly 430 metres below sea level, and getting lower. The lake has no outlet, so water escapes only by evaporating in the desert heat, leaving its salts behind. The water is around ten times saltier than the ocean, so dense that you bob on the surface like a cork and can sit back and read a newspaper, the classic holiday photo.",
      "The lake is also shrinking. Much of the water from the River Jordan that once fed it is now taken for farms and towns, and the surface drops by around a metre a year, opening sinkholes along the shore. Practical advice for a visit: do not shave beforehand, as the salt stings any cut, never put your head under, and wear sandals, because the salt crystals underfoot are sharp.",
    ],
    question: "Would you rather visit a natural wonder now, while it is changing, or wait and risk missing it?",
    quiz: [
      { q: "Why do swimmers float so easily in the Dead Sea?", a: "It is extremely salty", w: ["It is very warm", "It is very shallow", "Springs push water upward"], why: "It is around ten times saltier than the ocean, which makes it dense." },
      { q: "Why is the Dead Sea's level falling?", a: "Its river water is taken for use", w: ["Underground faults are draining it", "A canal now drains it to the sea", "Its hot springs have dried up"], why: "Water from the River Jordan goes to farms and towns, and evaporation continues." },
    ],
    timeline: null,
    estimate: { q: "Roughly how many metres below sea level is the Dead Sea's shore?", answer: 430, unit: 'm below sea level', min: 0, max: 1000 },
  },
  {
    id: 'travel-everest',
    level: 1,
    title: "The roof of the world keeps growing",
    body: [
      "Mount Everest, on the border between Nepal and China, was measured jointly by the two countries in 2020 at 8,849 metres above sea level. It is still rising very slowly, because the Indian plate continues to push northward into Asia, crumpling up the Himalaya. Locally it has older names: Sagarmatha in Nepal and Chomolungma in Tibet. The English name honours George Everest, a British surveyor who never actually saw it.",
      "Edmund Hillary of New Zealand and Tenzing Norgay, a Sherpa mountaineer, made the first confirmed ascent in 1953. Today hundreds of people may reach the top in a good season, sometimes queuing on the final ridge. Above about 8,000 metres lies the so-called death zone, where there is too little oxygen for the human body to survive for long, which is why most climbers there use bottled oxygen.",
    ],
    question: "Is climbing Everest still a great achievement now that so many people do it?",
    quiz: [
      { q: "Who made the first confirmed ascent of Everest?", a: "Edmund Hillary and Tenzing Norgay", w: ["George Mallory and Andrew Irvine", "Reinhold Messner and Peter Habeler", "Tenzing Norgay and Raymond Lambert"], why: "Hillary and Tenzing reached the summit in 1953." },
      { q: "Why is Everest still growing slowly?", a: "The Indian plate is pushing into Asia", w: ["Snow keeps piling up", "A volcano lies beneath it", "Sea levels are falling"], why: "The collision of tectonic plates keeps lifting the Himalaya." },
    ],
    timeline: { event: "First ascent of Everest", year: 1953 },
    estimate: { q: "How tall is Mount Everest, in metres?", answer: 8849, unit: 'm', min: 5000, max: 12000 },
  },
  {
    id: 'travel-altitude',
    level: 2,
    title: "Why fitness won't save you at altitude",
    body: [
      "You do not need to be on Everest to feel the thin air. Altitude sickness can strike from around 2,500 metres, and plenty of popular places are higher. La Paz, Bolivia's seat of government, sits at roughly 3,600 metres, and Cusco in Peru at about 3,400. Headaches, breathlessness, poor sleep and nausea are common in the first days as the body adjusts to less oxygen.",
      "Being fit does not protect you; marathon runners get it too. What helps is going up gradually. A common guideline is that above 3,000 metres you should not raise the height where you sleep by more than about 500 metres a day, with a rest day every few days. Climb high, sleep low is the mountaineer's rule. Drink enough water, go easy on alcohol, and take the first day slowly. Symptoms that get worse rather than better mean one thing: go down.",
    ],
    question: "Would you rather adapt slowly to a place or dive straight in and cope with the consequences?",
    quiz: [
      { q: "What protects you best from altitude sickness?", a: "Going up gradually", w: ["Being very fit", "Drinking plenty of coffee", "Running before the trip"], why: "Fitness is not protection, marathon runners get it too; gradual ascent is." },
      { q: "What should you do if altitude symptoms get worse?", a: "Go down to a lower height", w: ["Push on to adapt faster", "Drink a strong coffee", "Take a painkiller and carry on"], why: "Worsening symptoms mean descending is the key treatment." },
    ],
    timeline: null,
    estimate: null,
  },
  {
    id: 'travel-machu-picchu',
    level: 2,
    title: "The city the Spanish never found",
    body: [
      "Machu Picchu, on a ridge high above Peru's Urubamba river, was built in the fifteenth century, probably as a royal estate for the Inca ruler Pachacuti. It was abandoned around the time of the Spanish conquest, and the conquistadors appear never to have found it, which is one reason its fine stonework survives so well. Inca builders cut stones to fit so tightly that, famously, a knife blade cannot slip between them.",
      "In 1911 the American explorer Hiram Bingham brought it to international fame, though local farmers knew it well and guided him there. Practical tip, building on the altitude card: Machu Picchu itself sits at around 2,400 metres, lower than Cusco, the usual gateway city at about 3,400. Many travellers acclimatise in the lower Sacred Valley first instead of starting in Cusco, and daily visitor numbers are limited, so tickets need booking ahead.",
    ],
    question: "Should famous sites limit visitor numbers even if it means some people never get to go?",
    quiz: [
      { q: "Who probably built Machu Picchu as a royal estate?", a: "Inca ruler Pachacuti", w: ["Spanish missionaries", "Aztec emperor Moctezuma", "Explorer Hiram Bingham"], why: "It was built in the fifteenth century, probably for Pachacuti." },
      { q: "Which is higher: Machu Picchu or Cusco?", a: "Cusco", w: ["Machu Picchu", "They are the same height", "Neither is above 2,000 m"], why: "Cusco is about 3,400 m; Machu Picchu about 2,400 m." },
    ],
    timeline: { event: "Bingham publicises Machu Picchu", year: 1911 },
    estimate: null,
  },
  {
    id: 'travel-panama-canal',
    level: 1,
    title: "Lifting ships over a continent",
    body: [
      "The Panama Canal, opened in 1914, lets ships pass between the Atlantic and Pacific without the long, stormy voyage around the tip of South America. A French effort in the 1880s failed, defeated by landslides and by diseases such as malaria and yellow fever, which killed thousands of workers. The United States finished the job, helped by new mosquito control.",
      "The clever part is that ships do not cut through at sea level. Locks raise them about 26 metres to Gatún Lake, a huge artificial reservoir, and then lower them again on the far side. The lake's fresh water fills the locks, so the canal depends on rainfall, and droughts have forced limits on shipping. One surprise for map lovers: because of the way the isthmus curves, a ship going from the Atlantic to the Pacific actually travels from north-west to south-east.",
    ],
    question: "Which engineering marvel would you most like to see in person?",
    quiz: [
      { q: "How do ships cross the Panama Canal?", a: "Locks lift them over a lake", w: ["They sail at sea level", "They ride on rail cars", "They pass through a tunnel"], why: "Locks raise ships to Gatún Lake and lower them on the other side." },
      { q: "Why can drought limit traffic on the Panama Canal?", a: "Its locks use rain-fed lake water", w: ["Low tides strand ships at each end", "Dust storms close the channel", "Heat warps the steel lock gates"], why: "Each passage uses fresh water from Gatún Lake, which depends on rain." },
    ],
    timeline: { event: "Panama Canal opens", year: 1914 },
    estimate: { q: "How many metres do the locks lift ships up to Gatún Lake?", answer: 26, unit: 'm', min: 0, max: 100 },
  },
  {
    id: 'travel-schengen',
    level: 1,
    title: "The border-free zone named after a village",
    body: [
      "You can drive from Portugal to Poland without showing a passport because of the Schengen Agreement, signed in 1985 near Schengen, a small wine village in Luxembourg close to where Luxembourg, France and Germany meet. What began with five countries has grown into a zone of most European countries without routine checks at their shared borders.",
      "The Schengen Area and the European Union are not the same club. Norway, Iceland, Switzerland and Liechtenstein are in Schengen but not the EU, while Ireland is in the EU but outside Schengen, keeping its own arrangement with the UK. For many visitors from outside Europe, the key rule is that time is counted across the whole area: up to 90 days in any 180-day period, not 90 days per country. Hopping from France to Italy to Greece does not reset the clock.",
    ],
    question: "Are open borders worth the trade-offs? What would you weigh on each side?",
    quiz: [
      { q: "The Schengen Agreement is named after a village in which country?", a: "Luxembourg", w: ["Belgium", "Switzerland", "Austria"], why: "Schengen is a village in Luxembourg near the French and German borders." },
      { q: "Which country is in Schengen but not in the EU?", a: "Norway", w: ["Ireland", "Portugal", "Poland"], why: "Norway, Iceland, Switzerland and Liechtenstein are in Schengen but not the EU." },
    ],
    timeline: { event: "Schengen Agreement signed", year: 1985 },
    estimate: null,
  },
  {
    id: 'travel-vatican',
    level: 1,
    title: "A country smaller than a golf course",
    body: [
      "Vatican City, entirely inside Rome, is the smallest independent country in the world, at about 44 hectares (0.44 square kilometres). You could stroll around its walls in under an hour. It became a sovereign state in 1929 through the Lateran Treaty with Italy, which settled decades of dispute after the Papal States had been absorbed into a unified Italy.",
      "Tiny as it is, it has its own post office, stamps, radio station and a flag, and it is guarded by the Swiss Guard, who have served the popes since the early sixteenth century in their striking striped uniforms. Most of its residents are clergy, guards and officials, and citizenship is generally tied to working there rather than birth. For visitors, St Peter's Square and Basilica are free to enter, while the Vatican Museums with the Sistine Chapel are ticketed and can involve very long queues, so booking ahead is wise.",
    ],
    question: "If you could visit only one of the world's micro-states, which would you pick and why?",
    quiz: [
      { q: "What is the smallest independent country in the world?", a: "Vatican City", w: ["Monaco", "San Marino", "Liechtenstein"], why: "Vatican City covers about 44 hectares." },
      { q: "Which treaty made Vatican City a sovereign state in 1929?", a: "The Lateran Treaty", w: ["The Treaty of Rome", "The Treaty of Versailles", "The Peace of Westphalia"], why: "The Lateran Treaty with Italy created it." },
    ],
    timeline: { event: "Lateran Treaty creates Vatican City", year: 1929 },
    estimate: { q: "Roughly how many hectares does Vatican City cover?", answer: 44, unit: 'hectares', min: 0, max: 500 },
  },
  {
    id: 'travel-enclaves',
    level: 2,
    title: "Countries inside countries",
    body: [
      "Vatican City is one of only three countries entirely surrounded by a single other country. The second is San Marino, also inside Italy, a hilltop republic that claims to be one of the oldest in the world. The third is Lesotho, a mountain kingdom completely encircled by South Africa. Lesotho is so high that its lowest point is around 1,400 metres above sea level, the highest lowest point of any country.",
      "Borders can get stranger still. In Baarle-Hertog, a Belgian town, dozens of small patches of Belgium sit inside the Netherlands, and some contain Dutch patches of their own. The border runs through streets, shops and even houses, marked by crosses on the pavement, and a house's nationality has traditionally been decided by where its front door lies. Places like these make wonderful day trips for anyone who loves maps.",
    ],
    question: "What is the strangest border or place you have ever crossed or visited?",
    quiz: [
      { q: "Which country is completely surrounded by South Africa?", a: "Lesotho", w: ["Eswatini", "Botswana", "Namibia"], why: "Lesotho is entirely encircled by South Africa." },
      { q: "In Baarle-Hertog, what traditionally decides a house's nationality?", a: "Where its front door lies", w: ["Its owner's passport", "Its postcode", "A yearly vote"], why: "The border runs through buildings, so the front door decides." },
    ],
    timeline: null,
    estimate: null,
  },
  {
    id: 'travel-istanbul',
    level: 1,
    title: "The city on two continents",
    body: [
      "Istanbul straddles the Bosphorus, the narrow strait joining the Black Sea to the Sea of Marmara, so its districts sit in both Europe and Asia. Commuters cross between continents every day by bridge, tunnel and ferry, and a cheap public ferry is one of the best sightseeing trips in the city. With well over 15 million people, it is Turkey's largest city by far, though not its capital: that has been Ankara since 1923.",
      "Its names trace its history. Greek settlers founded Byzantium; the Roman emperor Constantine rebuilt it as Constantinople in the fourth century, and it served as the capital of the Eastern Roman (Byzantine) Empire for over a thousand years. In 1453 the Ottoman sultan Mehmed II conquered it, and it became the Ottoman capital. The Hagia Sophia, completed in the sixth century as a church, later became a mosque, then a museum, and is a mosque again today.",
    ],
    question: "Which city do you think has the richest layering of history, and why?",
    quiz: [
      { q: "Which strait divides Istanbul between Europe and Asia?", a: "The Bosphorus", w: ["The Dardanelles", "The Strait of Gibraltar", "The Suez Canal"], why: "The Bosphorus links the Black Sea and the Sea of Marmara." },
      { q: "What is the capital of Turkey?", a: "Ankara", w: ["Istanbul", "Izmir", "Antalya"], why: "Ankara has been the capital since 1923." },
    ],
    timeline: { event: "Ottomans conquer Constantinople", year: 1453 },
    estimate: null,
  },
  {
    id: 'travel-amazon',
    level: 1,
    title: "The great river with no bridges",
    body: [
      "Whether the Amazon or the Nile is longer is still argued over, depending on where you decide each river begins. But by volume there is no contest. The Amazon carries more water than any other river on Earth, roughly a fifth of all the river water that flows into the world's oceans. In places, during the rainy season, it can be many kilometres wide, and its fresh water pushes far out into the Atlantic.",
      "Here is the striking fact: not a single bridge crosses the main stem of the Amazon. Much of its course runs through rainforest with few roads to connect, and its banks are soft and shift as the river floods each year. Boats are the highways instead. Travellers heading to the jungle often reach Manaus, a sizeable Brazilian city in the middle of the forest, and then continue by river, slowly, swinging in hammocks on the deck.",
    ],
    question: "Would you enjoy a slow journey by boat, or would days on the water drive you mad?",
    quiz: [
      { q: "How many bridges cross the main stem of the Amazon?", a: "None", w: ["One", "Twelve", "Over a hundred"], why: "Few roads, soft shifting banks and seasonal floods mean none." },
      { q: "In what way is the Amazon clearly the world's biggest river?", a: "By volume of water", w: ["By length", "By depth of its channel", "By number of countries crossed"], why: "Its length is debated, but its flow is unmatched." },
    ],
    timeline: null,
    estimate: { q: "Roughly what percentage of all river water reaching the oceans comes from the Amazon?", answer: 20, unit: '%', min: 0, max: 60 },
  },
  {
    id: 'travel-angkor-wat',
    level: 1,
    title: "The temple on a nation's flag",
    body: [
      "Angkor Wat, in Cambodia near the town of Siem Reap, is generally described as the largest religious monument in the world. It was built in the first half of the twelfth century by the Khmer king Suryavarman II and dedicated to the Hindu god Vishnu, then gradually became a Buddhist temple, which it remains. Its towers represent Mount Meru, the home of the gods, and its moat the oceans around it. The temple is so central to Cambodian identity that it appears on the national flag.",
      "It was only one part of Angkor, the capital of the Khmer Empire, a vast city with reservoirs and canals spread over a huge area. Unusually, Angkor Wat faces west, so the classic sunrise view has the sun coming up behind its silhouetted towers. Visitors usually buy a multi-day pass, since the wider site includes famous temples like Bayon and the tree-wrapped Ta Prohm.",
    ],
    question: "Sunrise crowd at a famous view, or a quieter, lesser-known spot: which would you choose?",
    quiz: [
      { q: "Which god was Angkor Wat originally dedicated to?", a: "Vishnu", w: ["The Buddha", "Shiva", "Brahma"], why: "It was built as a Hindu temple to Vishnu before becoming Buddhist." },
      { q: "Why does the sun rise behind Angkor Wat's towers?", a: "The temple faces west", w: ["It is built on a hill", "It faces north", "It sits in a valley"], why: "Its unusual westward orientation creates the classic sunrise view." },
    ],
    timeline: null,
    estimate: null,
  },
  {
    id: 'travel-fjords',
    level: 1,
    title: "Valleys carved by ice and flooded by the sea",
    body: [
      "A fjord is a valley carved by a glacier and then flooded by the sea once the ice melted. Glaciers grind out deep U-shaped troughs with steep walls, which is why fjords have those sheer cliffs and waterfalls dropping straight into the water. Many are deeper inland than at their mouths, where a ridge of rock and debris left by the glacier forms a shallow threshold.",
      "Norway is the classic fjord country. Its longest, the Sognefjord, runs about 205 kilometres inland and plunges to roughly 1,300 metres deep. But fjords appear wherever big glaciers once met the coast: Chile, Greenland, Iceland, Alaska, Canada and New Zealand, where Milford Sound is, despite its name, actually a fjord. Ferries and coastal boats are the best way to see them, and in Norway many roads still rely on car ferries to cross them.",
    ],
    question: "Mountains or coast: which landscape restores you more?",
    quiz: [
      { q: "What carved the valleys that became fjords?", a: "Glaciers", w: ["Rivers", "Earthquakes", "Ocean waves"], why: "Glaciers ground out deep U-shaped valleys later flooded by the sea." },
      { q: "Milford Sound in New Zealand is actually what?", a: "A fjord", w: ["A river delta", "A volcanic crater", "A coral lagoon"], why: "Despite its name, it was carved by a glacier." },
    ],
    timeline: null,
    estimate: { q: "Roughly how many kilometres inland does Norway's Sognefjord run?", answer: 205, unit: 'km', min: 0, max: 600 },
  },
  {
    id: 'travel-arctic-circle',
    level: 1,
    title: "Where the sun refuses to set",
    body: [
      "The Arctic Circle, at about 66.5 degrees north, marks a simple rule. North of it, there is at least one day around the June solstice when the sun never sets, and at least one day around the December solstice when it never rises. The circle's position comes from the tilt of the Earth's axis, about 23.4 degrees, so the line sits that far from the North Pole. The Antarctic Circle mirrors it in the south.",
      "The further north you go, the longer the effect lasts. In Tromsø in northern Norway, the midnight sun shines roughly from late May to late July, while in midwinter the sun stays below the horizon for weeks, though there is still a bluish twilight at midday. For travellers, summer means hiking at midnight (pack an eye mask), while the dark winter months are the season for northern lights.",
    ],
    question: "Could you live with weeks of midnight sun, or weeks of winter darkness? Which would be harder?",
    quiz: [
      { q: "What happens north of the Arctic Circle around the June solstice?", a: "The sun stays up all night", w: ["The sun never rises", "Northern lights shine all night", "Day and night are equal"], why: "At least one day of midnight sun is the definition of the Arctic Circle." },
      { q: "What sets the latitude of the Arctic Circle?", a: "The tilt of the Earth's axis", w: ["The edge of the sea ice", "The northern tree line", "An international treaty"], why: "It sits about 23.4 degrees from the pole, matching Earth's tilt." },
    ],
    timeline: null,
    estimate: null,
  },
  {
    id: 'travel-left-side',
    level: 1,
    title: "The day Sweden switched sides of the road",
    body: [
      "Roughly a third of the world's people live in places that drive on the left. Most are former parts of the British Empire, such as India, Australia, South Africa and the UK itself, but Japan, never a British colony, drives on the left too. Most of continental Europe and the Americas drive on the right.",
      "Countries can switch. Sweden drove on the left until 3 September 1967, a day known as Dagen H. Traffic stopped early that morning, cars carefully changed sides, and the country carried on driving on the right, to match its neighbours. For travellers the danger is less behind the wheel than on foot: your instincts tell you to look the wrong way when crossing the road. In London, the words 'look right' are painted at many crossings for exactly this reason. If you hire a car, the first roundabouts deserve your full attention.",
    ],
    question: "Should the whole world agree on one side of the road? Would it be worth the cost of switching?",
    quiz: [
      { q: "Which of these countries drives on the left?", a: "Japan", w: ["France", "Brazil", "Sweden"], why: "Japan drives on the left despite never being a British colony." },
      { q: "What was Dagen H in Sweden?", a: "The switch to driving on the right", w: ["A national hiking holiday", "The first motorway opening", "The ban on horse-drawn carts"], why: "On 3 September 1967 Sweden moved from left to right." },
    ],
    timeline: { event: "Sweden switches to driving on the right", year: 1967 },
    estimate: null,
  },
  {
    id: 'travel-tipping',
    level: 1,
    title: "When a tip is an insult",
    body: [
      "Tipping is one of the easiest ways to get a foreign country wrong, because the same gesture means different things. In the United States, tips are a big part of how restaurant staff are paid, and leaving roughly 15 to 20 percent at a sit-down meal is widely expected. Leaving nothing sends a strong message.",
      "In Japan, the opposite is true. Good service is considered part of the job, and tipping is not customary; staff may even chase you down the street to return money you left on the table. In much of Europe, a service charge may already be included in the bill, and locals often just round up or leave a small amount for good service. When unsure, look at the bill for a service line, watch what locals do, or simply ask your hotel how things work there. Customs shift over time, so recent local advice beats a guidebook.",
    ],
    question: "Do you think tipping is a good system, or should service just be included in the price?",
    quiz: [
      { q: "In which country might staff chase you to return a tip?", a: "Japan", w: ["The United States", "Canada", "Mexico"], why: "Tipping is not customary in Japan." },
      { q: "In much of Europe, what should you check before tipping?", a: "Whether service is on the bill", w: ["Whether you paid by card", "Whether the owner served you", "Whether you sat outside"], why: "A service charge is often already included." },
    ],
    timeline: null,
    estimate: null,
  },
  {
    id: 'travel-street-food',
    level: 1,
    title: "How to eat street food without regret",
    body: [
      "Some of the best meals in the world come from street stalls: pad thai in Bangkok, tacos al pastor in Mexico City, laksa in Singapore's hawker centres. Avoiding them out of fear means missing a lot. A few simple habits tip the odds strongly in your favour.",
      "Pick the busy stall, especially one crowded with locals. High turnover means food has not been sitting around, and locals know who is good. Favour food that is cooked hot in front of you and served straight away, over things kept lukewarm for hours. Fruit you peel yourself is safer than pre-cut fruit. In places where tap water is not safe to drink, be wary of ice and raw salads washed in it. The old travellers' rule sums it up: boil it, cook it, peel it, or forget it. Wash or sanitise your hands before eating, too, since many stomach bugs come from your own fingers.",
    ],
    question: "What is the best thing you have ever eaten from a street stall or market?",
    quiz: [
      { q: "Which street food stall is usually the safest choice?", a: "The busy one full of locals", w: ["The quiet one with no queue", "The one with pre-cooked trays", "The one by the big hotels"], why: "High turnover means fresher food." },
      { q: "Complete the travellers' rule: boil it, cook it, peel it, or...", a: "Forget it", w: ["Freeze it", "Salt it", "Share it"], why: "If you cannot boil, cook or peel it, skip it." },
    ],
    timeline: null,
    estimate: null,
  },
];

// Advice requests: a visiting villager asks the player for help applying something from these cards.
export const requests = [
  { card: 'travel-altitude', ask: "I'm flying straight into La Paz for a week of hiking. I'm really fit, so the altitude won't bother me, right?", q: "What is the best advice?", a: "Fitness won't protect you: take the first days slowly", w: ["Fit people are immune, so hike hard on day one", "Drink plenty of alcohol to help sleep"], why: "Altitude sickness strikes fit people too; gradual ascent and rest help." },
  { card: 'travel-schengen', ask: "I'm planning 60 days in France, then 60 days in Italy on a visitor's allowance. That's fine because they're separate countries, isn't it?", q: "What is the problem with this plan?", a: "Schengen counts 90 days across the whole area", w: ["France and Italy need separate visas", "There is no limit inside the EU for anyone"], why: "Visitors get up to 90 days in any 180 across all Schengen countries combined." },
  { card: 'travel-jet-lag', ask: "I've just flown from New York to Paris and I'm exhausted. How do I get onto local time fast?", q: "What helps most after flying east?", a: "Get bright morning light and live on local time", w: ["Sleep all afternoon in a dark room", "Stay up late under bright lights"], why: "Morning light helps shift the body clock earlier after flying east." },
  { card: 'travel-street-food', ask: "I'm off to Bangkok and dying to try the street food, but I'm nervous about getting ill. How do I choose?", q: "Which stall should they pick?", a: "A busy stall cooking food hot to order", w: ["A quiet stall with food on display all day", "Any stall selling pre-cut fruit"], why: "High turnover and food cooked hot in front of you lower the risk." },
  { card: 'travel-machu-picchu', ask: "I'm going to Peru to see Machu Picchu. Should I spend my first nights up in Cusco to get used to the altitude?", q: "What is a gentler plan?", a: "Acclimatise first in the lower Sacred Valley", w: ["Go straight to the highest town nearby", "Skip booking and buy tickets at the gate"], why: "The Sacred Valley is lower than Cusco, and Machu Picchu is lower than Cusco too." },
];
