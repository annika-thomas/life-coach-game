// World news & opinions cards. See js/cards/README note in the main brief.
export default [
  {
    id: 'news-inflation',
    level: 1,
    title: 'What inflation actually measures',
    body: [
      'When the news says "inflation is 3 per cent", it means a typical basket of goods and services costs about 3 per cent more than it did a year earlier. Statisticians track the prices of hundreds of items, from bread and rent to haircuts and phone contracts, and weight each one by how much households actually spend on it. That index is usually called the Consumer Price Index, or CPI.',
      'Many central banks aim for roughly 2 per cent a year, an idea New Zealand pioneered in 1990. Why not zero? A little inflation gives a cushion against falling prices, which can freeze an economy as people delay buying. The danger is at the other extreme: in Hungary in 1946, prices reportedly doubled about every fifteen hours. Your own "personal inflation" can differ a lot from the headline figure, depending on what you buy.',
    ],
    question: 'Does the official inflation figure match how prices feel in your own life? What would you put in your personal basket?',
    quiz: [
      { q: 'Roughly what yearly inflation rate do many central banks aim for?', a: 'About 2 per cent', w: ['Exactly 0 per cent', 'About 10 per cent', 'About 5 per cent'], why: 'A small positive rate gives a cushion against falling prices.' },
      { q: 'How is each item in the CPI basket weighted?', a: 'By how much households spend on it', w: ['Equally, item by item', 'By how often its price changes', 'By the weight of the product'], why: 'Bigger spending items, like rent, count for more in the index.' },
    ],
    timeline: null,
    estimate: null,
  },
  {
    id: 'news-rule-of-70',
    level: 2,
    title: 'The rule of 70',
    body: [
      'Here is a mental shortcut economists love. To find how many years it takes for something growing steadily to double, divide 70 by the yearly growth rate. At 7 per cent, an economy doubles in about 10 years. At 1 per cent, it takes about 70.',
      'It works for inflation too. At the 2 per cent target many central banks aim for, prices double in about 35 years, which means a pound or a dollar saved under the mattress loses half its buying power over a working life. At 10 per cent, prices double in roughly seven years. That is why small-sounding differences in growth or inflation rates matter so much: compounding turns them into huge gaps over a generation. It also explains why economists get excited about an extra half a per cent of growth.',
    ],
    question: 'Knowing that even 2 per cent inflation halves the value of cash in about 35 years, would you change how you save?',
    quiz: [
      { q: 'At 7 per cent growth a year, roughly how long does something take to double?', a: 'About 10 years', w: ['About 7 years', 'About 20 years', 'About 50 years'], why: '70 divided by 7 gives 10.' },
      { q: 'What do you divide 70 by to estimate doubling time?', a: 'The yearly growth rate', w: ['The number of years', 'The starting amount', 'The inflation target squared'], why: 'Doubling time is roughly 70 over the percentage growth rate.' },
    ],
    timeline: null,
    estimate: { q: 'At 2 per cent inflation a year, roughly how many years until prices double?', answer: 35, unit: 'years', min: 5, max: 100 },
  },
  {
    id: 'news-gdp',
    level: 1,
    title: 'What GDP counts, and what it misses',
    body: [
      'Gross Domestic Product is the market value of everything produced in a country over a period. It adds up what households spend, what businesses invest, what government spends, and exports minus imports. The modern version owes a lot to the economist Simon Kuznets, who built national accounts for the US Congress in the 1930s and himself warned that they were not a measure of a nation\'s welfare.',
      'The blind spots are real. Unpaid work, like caring for children or a sick parent, is invisible. Cleaning up after a flood adds to GDP, while a quiet afternoon in the park adds nothing. Pollution only shows up if someone pays to fix it. Yet GDP remains the headline number because it is consistent, comparable and closely linked to jobs and tax revenue. The smart move is to read it as a measure of economic activity, not of happiness.',
    ],
    question: 'If you could add one thing to the official measure of how well a country is doing, what would it be?',
    quiz: [
      { q: 'Which of these is NOT counted in GDP?', a: 'Unpaid care for a family member', w: ['Government spending on roads', 'Business investment in machines', 'Exports sold abroad'], why: 'GDP only counts activity that passes through the market or government.' },
      { q: 'Whose 1930s work for the US Congress shaped modern national accounts?', a: 'Simon Kuznets', w: ['John Maynard Keynes', 'Adam Smith', 'Milton Friedman'], why: 'Kuznets built the accounts and warned they did not measure welfare.' },
    ],
    timeline: null,
    estimate: null,
  },
  {
    id: 'news-big-mac',
    level: 2,
    title: 'The Big Mac Index',
    body: [
      'Comparing GDP between countries hides a trap: a salary that looks tiny in dollars can buy a lot locally, because haircuts, rent and meals are cheaper. Economists fix this with purchasing power parity, or PPP, which adjusts figures for what money actually buys in each place.',
      'In 1986 The Economist magazine offered a playful version: the Big Mac Index. The burger is nearly identical worldwide, so its price in different currencies hints at whether a currency is over or undervalued. If a Big Mac costs more in dollar terms in Switzerland than in the US, the Swiss franc looks "expensive". It was meant as a light-hearted lesson, but it caught on because it makes an abstract idea edible. On a PPP basis, poorer economies look considerably bigger than they do at market exchange rates, which changes rankings of the world\'s largest economies.',
    ],
    question: 'If you were comparing the cost of living between two cities, which single item would you use instead of a burger?',
    quiz: [
      { q: 'Which magazine launched the Big Mac Index?', a: 'The Economist', w: ['Time', 'Forbes', 'National Geographic'], why: 'The Economist created it in 1986 as a light-hearted guide.' },
      { q: 'What does purchasing power parity adjust for?', a: 'What money actually buys in each country', w: ['Population size', 'Interest rates', 'Hours worked per week'], why: 'PPP corrects for price differences between countries.' },
    ],
    timeline: { event: 'Big Mac Index launched', year: 1986 },
    estimate: null,
  },
  {
    id: 'news-westphalia',
    level: 1,
    title: 'Why sovereignty starts in 1648',
    body: [
      'In 1648 a set of treaties signed in the German towns of Münster and Osnabrück ended the Thirty Years\' War, one of the most destructive conflicts in European history. Together they are called the Peace of Westphalia, and political scientists often treat them as the birth certificate of the modern state system.',
      'The idea associated with Westphalia is sovereignty: each state controls its own territory, and outsiders should not interfere in its internal affairs, including, crucially at the time, its choice of religion. When diplomats today argue about "non-interference" or "territorial integrity", they are speaking Westphalian. Historians add a caveat: the treaties did not neatly invent all this, and the tidy "Westphalian system" is partly a later story we tell. Still, the tension it frames is very current: when, if ever, should the world step inside another country\'s borders?',
    ],
    question: 'When, if ever, do you think outside countries are justified in intervening inside another country\'s borders?',
    quiz: [
      { q: 'Which war did the Peace of Westphalia end?', a: 'The Thirty Years\' War', w: ['The Hundred Years\' War', 'The Napoleonic Wars', 'The Seven Years\' War'], why: 'The 1648 treaties ended the Thirty Years\' War.' },
      { q: 'Which principle is most associated with Westphalia?', a: 'State sovereignty and non-interference', w: ['Free trade between empires', 'Universal voting rights', 'A single European currency'], why: 'Each state controls its own territory and internal affairs.' },
    ],
    timeline: { event: 'Peace of Westphalia', year: 1648 },
    estimate: null,
  },
  {
    id: 'news-nato-article5',
    level: 1,
    title: 'Article 5: one for all',
    body: [
      'NATO was founded in Washington in 1949 by 12 countries, including the US, Canada, the UK and France, and has since grown to more than 30. Its heart is Article 5 of the treaty: an armed attack against one member is considered an attack against them all.',
      'The wording is subtler than the slogan. Each ally agrees to take "such action as it deems necessary", which could mean troops but could also mean much less. The power of the clause lies mainly in deterrence: an attacker has to assume the whole alliance will respond. Surprisingly, Article 5 has been invoked only once, and not for Europe. It was triggered after the attacks on the United States on 11 September 2001, when allies came to the aid of the most powerful member of all.',
    ],
    question: 'Do you think a promise of mutual defence makes war less likely, or risks dragging more countries into one?',
    quiz: [
      { q: 'How many times has NATO\'s Article 5 been invoked?', a: 'Once', w: ['Never', 'Four times', 'More than ten times'], why: 'It was invoked once, after the 11 September 2001 attacks.' },
      { q: 'What does Article 5 commit each ally to do?', a: 'Take such action as it deems necessary', w: ['Automatically send troops', 'Impose trade sanctions only', 'Hold a referendum'], why: 'The wording leaves each ally to decide the form of its response.' },
    ],
    timeline: { event: 'NATO founded', year: 1949 },
    estimate: { q: 'How many countries founded NATO in 1949?', answer: 12, unit: 'countries', min: 2, max: 40 },
  },
  {
    id: 'news-comparative-advantage',
    level: 1,
    title: 'Comparative advantage',
    body: [
      'In 1817 the economist David Ricardo published an example that still anchors arguments about trade. Imagine Portugal is better than England at making both wine and cloth. Should Portugal make everything itself? Ricardo showed that both countries can end up richer if each specialises in what it is relatively best at and trades for the rest.',
      'The key word is relatively. A top lawyer might also be the fastest typist in the office, but her time is worth more on legal work, so she hires someone else to type. Countries are similar. The theory is one of the few ideas nearly all economists agree on, yet it comes with fine print: the gains are shared across a whole country, while the losses land on particular towns and industries. Much of the political fight over trade is really a fight about that fine print.',
    ],
    question: 'Should a country protect an industry that cannot compete with imports, if a whole town depends on it?',
    quiz: [
      { q: 'In Ricardo\'s example, which two goods did England and Portugal trade?', a: 'Wine and cloth', w: ['Tea and silk', 'Coal and wool', 'Gold and spices'], why: 'Ricardo used wine and cloth to show the gains from specialising.' },
      { q: 'What does comparative advantage depend on?', a: 'What you are relatively best at', w: ['What you are absolutely best at', 'Having the largest army', 'Having the most people'], why: 'Even a country better at everything gains by specialising relatively.' },
    ],
    timeline: { event: 'Ricardo explains comparative advantage', year: 1817 },
    estimate: null,
  },
  {
    id: 'news-bonds',
    level: 1,
    title: 'Why bond prices and yields move opposite ways',
    body: [
      'A government bond is an IOU. You lend, say, £100, and the government pays you a fixed £5 a year and returns the £100 at the end. That is a 5 per cent yield. But bonds are traded after they are issued, and their prices change.',
      'Suppose investors get nervous and the price of that bond falls to £50. It still pays £5 a year, so a new buyer now earns 10 per cent on their money. That is the seesaw: when bond prices fall, yields rise, and vice versa. It is why headlines about "soaring yields" are usually bad news for a government. Higher yields mean it must pay more to borrow, and mortgage and business loan rates often follow. When investors flock to safety, they buy government bonds, prices rise, and yields drop.',
    ],
    question: 'Would you rather lend money to a government or to a big company? What would make you trust one more than the other?',
    quiz: [
      { q: 'If a bond\'s price falls, what happens to its yield?', a: 'It rises', w: ['It falls', 'It stays the same', 'It becomes zero'], why: 'The same fixed payment is now earned on a smaller price.' },
      { q: 'A bond pays £5 a year and now costs £50. What is its yield?', a: '10 per cent', w: ['5 per cent', '50 per cent', '2.5 per cent'], why: '£5 divided by £50 is 10 per cent.' },
    ],
    timeline: null,
    estimate: null,
  },
  {
    id: 'news-yield-curve',
    level: 2,
    title: 'The inverted yield curve',
    body: [
      'Normally, lending for longer pays more. A ten-year government bond usually yields more than a two-year one, because tying up money for a decade carries more risk. Plot yields against how long the loan lasts and you get an upward-sloping line called the yield curve.',
      'Occasionally it flips, and short-term yields rise above long-term ones. This "inverted yield curve" is one of the most watched signals in finance, because in the US it has come before most recessions of the past half-century, often by a year or more. The logic: investors expect trouble ahead, so they expect interest rates to be cut later, and they lock in long-term bonds while they can, pushing long-term yields down. It is a signal, not a law. It has given false alarms, and the timing is vague.',
    ],
    question: 'How much weight would you give a warning sign that is often right but sometimes wrong, if acting on it was costly?',
    quiz: [
      { q: 'What is an inverted yield curve?', a: 'Short-term yields above long-term ones', w: ['Long-term yields above short-term ones', 'All yields at zero', 'Bond prices rising every day'], why: 'Normally longer loans pay more; inversion flips that.' },
      { q: 'What has an inverted yield curve often come before in the US?', a: 'A recession', w: ['A stock market boom', 'A new currency', 'An election'], why: 'It has preceded most US recessions of the past half-century.' },
    ],
    timeline: null,
    estimate: null,
  },
  {
    id: 'news-bretton-woods',
    level: 1,
    title: 'Bretton Woods: the hotel that rebuilt money',
    body: [
      'In July 1944, with the Second World War still raging, delegates from 44 Allied nations met at a hotel in Bretton Woods, New Hampshire. Led by Britain\'s John Maynard Keynes and America\'s Harry Dexter White, they designed the post-war money system. Currencies would be pegged to the US dollar, and the dollar could be exchanged for gold at $35 an ounce.',
      'The conference also created two institutions still in the news: the International Monetary Fund, which lends to countries in crisis, and what became the World Bank. The gold link did not last. In 1971 President Nixon suspended the dollar\'s convertibility into gold, and currencies have floated ever since. Yet the dollar kept its central role, which is why so much world trade is still priced in dollars and why US sanctions can bite so hard.',
    ],
    question: 'Should one country\'s currency be at the centre of the world economy, or would you prefer a shared global alternative?',
    quiz: [
      { q: 'Which two institutions came out of Bretton Woods?', a: 'The IMF and the World Bank', w: ['The UN and NATO', 'The EU and the WTO', 'The G7 and OPEC'], why: 'The 1944 conference created the IMF and what became the World Bank.' },
      { q: 'Under Bretton Woods, what could dollars be exchanged for at $35 an ounce?', a: 'Gold', w: ['Silver', 'Oil', 'Platinum'], why: 'The dollar was convertible into gold until 1971.' },
    ],
    timeline: { event: 'Bretton Woods conference', year: 1944 },
    estimate: { q: 'How many Allied nations sent delegates to Bretton Woods in 1944?', answer: 44, unit: 'nations', min: 5, max: 120 },
  },
  {
    id: 'news-three-councils',
    level: 1,
    title: 'Three councils, easily confused',
    body: [
      'European politics has a naming problem. The European Council is the summit of the EU\'s presidents and prime ministers, who set the big direction. The Council of the European Union is different: ministers from each member country meet by topic (farming ministers on farming, finance ministers on finance) and, together with the European Parliament, pass EU laws.',
      'Then there is the Council of Europe, which is not part of the EU at all. Founded in 1949 and based in Strasbourg, it is a wider club of European countries focused on human rights, and it runs the European Court of Human Rights. That is why leaving the EU did not take Britain out of that court. A handy rule: if a headline mixes them up, the journalist probably did too. Similarly, Eurovision has nothing to do with the EU, which is why non-EU countries take part.',
    ],
    question: 'Do you think complicated institutions make people trust them less? How would you make them easier to understand?',
    quiz: [
      { q: 'Which body runs the European Court of Human Rights?', a: 'The Council of Europe', w: ['The European Council', 'The Council of the EU', 'The European Commission'], why: 'The Council of Europe is a separate, non-EU human rights body.' },
      { q: 'Who meets in the Council of the European Union?', a: 'National ministers, by topic', w: ['Heads of government only', 'Elected MEPs', 'Judges from each country'], why: 'Ministers meet by subject and pass laws with the Parliament.' },
    ],
    timeline: null,
    estimate: null,
  },
  {
    id: 'news-fptp',
    level: 1,
    title: 'First past the post',
    body: [
      'In a "first past the post" system, used in the UK, the US, Canada and India, the country is cut into districts and whoever gets the most votes in each one wins it. You do not need a majority, just more than anyone else.',
      'This has striking side effects. In the 1983 UK general election, the Liberal-SDP Alliance won about a quarter of the vote but only 23 seats out of 650, because its support was spread thinly everywhere. Labour, with only slightly more votes, won over 200 seats. Political scientists call the tendency of such systems to squeeze into two big parties "Duverger\'s law". Supporters say it gives clear winners and a local MP everyone can name. Critics say many votes are wasted and people vote tactically rather than for what they truly want.',
    ],
    question: 'Would you rather have a voting system that gives clear winners, or one where seats closely match votes?',
    quiz: [
      { q: 'What do you need to win a seat under first past the post?', a: 'More votes than anyone else', w: ['Over half the votes', 'Two-thirds of the votes', 'The support of a party leader'], why: 'A plurality is enough; a majority is not required.' },
      { q: 'What is the tendency of such systems towards two big parties called?', a: 'Duverger\'s law', w: ['Gresham\'s law', 'Moore\'s law', 'Parkinson\'s law'], why: 'Duverger\'s law describes the squeeze towards two parties.' },
    ],
    timeline: null,
    estimate: { q: 'In 1983, with about a quarter of the UK vote, how many seats out of 650 did the Liberal-SDP Alliance win?', answer: 23, unit: 'seats', min: 0, max: 200 },
  },
  {
    id: 'news-coalitions',
    level: 2,
    title: 'Coalitions and the 541-day wait',
    body: [
      'Proportional representation, used in much of Europe, gives parties seats roughly in line with their share of the vote. That fixes the distortions of first past the post, but it means a single party rarely wins a majority. Instead, after the election comes a second contest: negotiating a coalition.',
      'Those talks can be long. Germany and the Netherlands often take months to agree detailed coalition deals. The famous record belongs to Belgium, which after its 2010 election went 541 days without a newly formed government, while caretaker ministers kept the country running. Fans of coalitions say they force compromise and represent more voters. Critics say voters lose control: the final programme is hammered out behind closed doors, and a small party can become kingmaker. It is the same trade-off seen from the other side.',
    ],
    question: 'Would you prefer one party with a clear plan, or a coalition that has to compromise? Why?',
    quiz: [
      { q: 'Which country went 541 days without a newly formed government after 2010?', a: 'Belgium', w: ['Italy', 'Germany', 'Spain'], why: 'Belgium holds the famous record for coalition talks.' },
      { q: 'Why does proportional representation often lead to coalitions?', a: 'One party rarely wins a majority', w: ['It bans large parties', 'It requires two leaders', 'It only counts rural votes'], why: 'Seats follow vote share, so majorities are rare.' },
    ],
    timeline: null,
    estimate: { q: 'After its 2010 election, how many days did Belgium go without a newly formed government?', answer: 541, unit: 'days', min: 50, max: 1000 },
  },
  {
    id: 'news-g7-g20',
    level: 1,
    title: 'From G6 to G20',
    body: [
      'The "G" groups began informally. In 1975, after an oil shock and currency turmoil, leaders of France, West Germany, Italy, Japan, the UK and the US met at a château in Rambouillet, France. Canada joined the next year, making the G7, a club of big rich democracies. Russia was later added to make the G8, and was suspended in 2014.',
      'The G20, which adds major emerging economies such as China, India, Brazil and Saudi Arabia, started as a meeting of finance ministers in 1999 after the Asian financial crisis. It became a leaders\' summit in 2008, when the global financial crisis made it obvious that the rich few could not steady the world economy alone. Neither group can pass laws or enforce anything. Their power is in coordination and in the photo: who is in the room says a lot about who matters.',
    ],
    question: 'Do clubs like the G7 and G20 help the world cooperate, or are they mostly talking shops?',
    quiz: [
      { q: 'When did the G20 hold its first leaders\' summit?', a: '2008', w: ['1975', '1999', '2014'], why: 'The financial crisis of 2008 turned it into a leaders\' summit.' },
      { q: 'Which country joined in 1976 to turn the G6 into the G7?', a: 'Canada', w: ['Russia', 'China', 'Australia'], why: 'Canada joined the year after the 1975 Rambouillet meeting.' },
    ],
    timeline: { event: 'First G20 leaders\' summit', year: 2008 },
    estimate: null,
  },
  {
    id: 'news-brics',
    level: 1,
    title: 'BRICS: a banker\'s acronym that became a club',
    body: [
      'In 2001 Jim O\'Neill, an economist at the investment bank Goldman Sachs, wrote a paper grouping Brazil, Russia, India and China as the BRICs: large emerging economies he expected to grow in global weight. It was meant as an investment idea, not a political project.',
      'Then something unusual happened. The four countries started meeting for real, holding their first leaders\' summit in 2009, and South Africa joined soon after, adding the capital S. The group set up its own development bank and became a symbol of a world where Western institutions are not the only option. Critics point out that the members have very different political systems and interests, and some are rivals. Still, it is a rare case of a label invented to sell investments turning into a diplomatic forum.',
    ],
    question: 'Can a group of countries with very different values work together effectively? What would hold them together?',
    quiz: [
      { q: 'Where was the term BRIC first coined?', a: 'In a Goldman Sachs paper', w: ['At a UN summit', 'In a Chinese newspaper', 'By the World Bank'], why: 'Jim O\'Neill of Goldman Sachs coined it in 2001.' },
      { q: 'Which country\'s joining added the capital S to BRICS?', a: 'South Africa', w: ['Saudi Arabia', 'Singapore', 'Spain'], why: 'South Africa joined soon after the first 2009 summit.' },
    ],
    timeline: { event: 'BRIC acronym coined', year: 2001 },
    estimate: null,
  },
  {
    id: 'news-opec',
    level: 1,
    title: 'OPEC and the price of oil',
    body: [
      'The Organization of the Petroleum Exporting Countries was founded in Baghdad in 1960 by five countries: Iran, Iraq, Kuwait, Saudi Arabia and Venezuela. At the time, a handful of Western oil companies largely set prices. OPEC\'s aim was to give producing countries more control over their own resource.',
      'Its power became unmistakable in 1973, when Arab oil producers cut supplies to countries backing Israel in the Yom Kippur War, and the price of oil roughly quadrupled. Petrol queues and economic slowdowns followed across the West. OPEC works as a cartel: members agree production quotas, and since oil is hard to substitute in the short term, small cuts can move prices a lot. Its grip is not absolute, though. Members sometimes cheat on quotas, and big producers outside the group, notably the US, limit how far it can push.',
    ],
    question: 'Should countries be allowed to coordinate prices for a resource they own, when companies doing the same would be illegal?',
    quiz: [
      { q: 'In which city was OPEC founded in 1960?', a: 'Baghdad', w: ['Riyadh', 'Vienna', 'Caracas'], why: 'OPEC was founded in Baghdad by five countries.' },
      { q: 'Roughly what happened to the oil price after the 1973 cuts?', a: 'It roughly quadrupled', w: ['It halved', 'It stayed flat', 'It rose by 10 per cent'], why: 'The supply cuts sent prices up about fourfold.' },
    ],
    timeline: { event: 'OPEC founded in Baghdad', year: 1960 },
    estimate: { q: 'How many countries founded OPEC in 1960?', answer: 5, unit: 'countries', min: 1, max: 20 },
  },
  {
    id: 'news-chokepoints',
    level: 1,
    title: 'Chokepoints: the narrow seas that run the world',
    body: [
      'Most global trade travels by sea, and much of it squeezes through a few narrow passages. The Strait of Hormuz, between Iran and Oman, carries about a fifth (roughly 20 per cent) of the world\'s oil consumption. The Strait of Malacca links the Indian Ocean to East Asia, and the Suez and Panama canals save ships weeks of sailing.',
      'Because so much depends on so little water, any disruption ripples worldwide. In 2021 the giant container ship Ever Given wedged itself across the Suez Canal for six days, and hundreds of ships queued at each end while supply chains groaned. This is why strategists talk about chokepoints constantly: whoever can threaten or protect them gains leverage. When you read about naval deployments or tensions near a strait, the real story is often about keeping these arteries open.',
    ],
    question: 'Should the world rely on a few narrow routes for trade, or pay more to build alternatives?',
    quiz: [
      { q: 'Which ship blocked the Suez Canal for six days in 2021?', a: 'The Ever Given', w: ['The Titanic', 'The Exxon Valdez', 'The Queen Mary 2'], why: 'The container ship Ever Given wedged across the canal.' },
      { q: 'Which two countries border the Strait of Hormuz?', a: 'Iran and Oman', w: ['Egypt and Sudan', 'Malaysia and Indonesia', 'Turkey and Greece'], why: 'The strait lies between Iran and Oman.' },
    ],
    timeline: { event: 'Ever Given blocks Suez Canal', year: 2021 },
    estimate: { q: 'Roughly what percentage of world oil consumption passes through the Strait of Hormuz?', answer: 20, unit: 'per cent', min: 1, max: 60 },
  },
  {
    id: 'news-deficit-debt',
    level: 1,
    title: 'Deficit versus debt',
    body: [
      'These two words get swapped constantly, but they mean different things. The deficit is a flow: how much more a government spends than it collects in taxes in a single year. The debt is a stock: the total pile of borrowing built up over all the years so far. Think of a bathtub. The deficit is the tap running; the debt is the water in the tub.',
      'So a politician can truthfully boast that the deficit is falling while the debt keeps rising, because the tub is still filling, just more slowly. Economists usually compare debt with GDP, since a big economy can carry more. Japan\'s government debt is well over 200 per cent of GDP, yet it borrows cheaply, partly because most of that debt is owed to its own citizens and institutions. How much debt is too much is one of the great unsettled arguments in economics.',
    ],
    question: 'Should governments borrow to invest in the future, or aim to balance the books every year like a household?',
    quiz: [
      { q: 'In the bathtub analogy, what is the deficit?', a: 'The tap running', w: ['The water in the tub', 'The plug', 'The size of the bath'], why: 'The deficit is the yearly flow; the debt is the accumulated stock.' },
      { q: 'Can debt rise while the deficit falls?', a: 'Yes, if there is still a deficit', w: ['No, never', 'Only during a war', 'Only if taxes rise'], why: 'Any deficit still adds to the total debt, just more slowly.' },
    ],
    timeline: null,
    estimate: null,
  },
  {
    id: 'news-commons',
    level: 1,
    title: 'The tragedy of the commons',
    body: [
      'In 1968 the ecologist Garrett Hardin published an essay with a gloomy image. Picture a pasture open to all. Each herder gains the full benefit of adding one more cow, while the cost of overgrazing is shared by everyone. So every herder keeps adding cows, and the pasture is ruined. He called this "the tragedy of the commons".',
      'The idea fits overfishing, traffic jams and, above all, climate change, where each country gains from burning fuel while the damage is spread worldwide. But the political economist Elinor Ostrom challenged the gloom. Studying real fisheries, forests and irrigation systems, she showed that communities often manage shared resources well through their own rules, monitoring and penalties, without either privatisation or a heavy-handed state. In 2009 she became the first woman to win the Nobel prize in economics.',
    ],
    question: 'Think of a shared space you use, like a kitchen or a park. What rules actually keep it from being ruined?',
    quiz: [
      { q: 'Who wrote the 1968 essay "The Tragedy of the Commons"?', a: 'Garrett Hardin', w: ['Elinor Ostrom', 'Adam Smith', 'Rachel Carson'], why: 'Hardin, an ecologist, published it in 1968.' },
      { q: 'What did Elinor Ostrom show about shared resources?', a: 'Communities often manage them with their own rules', w: ['They must always be privatised', 'Only governments can protect them', 'They are always ruined'], why: 'Her field studies found many successful local arrangements.' },
    ],
    timeline: { event: 'Hardin\'s commons essay', year: 1968 },
    estimate: null,
  },
  {
    id: 'news-montreal-protocol',
    level: 2,
    title: 'The treaty that fixed the sky',
    body: [
      'The tragedy of the commons can be beaten, and the best evidence is above our heads. In the 1980s scientists confirmed that chemicals called CFCs, used in fridges and aerosol sprays, were destroying the ozone layer that shields the Earth from ultraviolet light. A huge "ozone hole" was appearing over Antarctica each spring.',
      'In 1987 countries agreed the Montreal Protocol to phase these chemicals out. It went on to become the first UN treaty ratified by every member state, and CFC use has collapsed. Scientists expect the ozone layer to recover to 1980 levels around the middle of this century. Why did it work when climate deals struggle? Substitutes for CFCs were available, a few companies made most of them, and the treaty helped poorer countries pay to switch. It is a hopeful case study, and a reminder that the details of a deal matter.',
    ],
    question: 'What lessons from the ozone success do you think could, or could not, apply to climate change?',
    quiz: [
      { q: 'Which chemicals did the Montreal Protocol phase out?', a: 'CFCs', w: ['Carbon dioxide', 'Lead in petrol', 'Plastic microbeads'], why: 'CFCs from fridges and sprays were destroying the ozone layer.' },
      { q: 'What was special about the Montreal Protocol\'s ratification?', a: 'Every UN member state ratified it', w: ['Only Europe signed it', 'It was never ratified', 'It was signed by companies, not states'], why: 'It became the first UN treaty with universal ratification.' },
    ],
    timeline: { event: 'Montreal Protocol agreed', year: 1987 },
    estimate: null,
  },
];

// Advice requests: a visiting villager asks the player for help applying something from these cards.
export const requests = [
  { card: 'news-rule-of-70', ask: 'My savings account pays 7 per cent a year, which sounds lovely. I keep wondering how long until my money doubles, if I just leave it be?', q: 'Roughly how many years will it take to double at 7 per cent?', a: 'About 10 years', w: ['About 7 years', 'About 30 years'], why: 'By the rule of 70, 70 divided by 7 is about 10 years.' },
  { card: 'news-bonds', ask: 'The radio says government bond prices fell sharply today. My neighbour says that means borrowing just got cheaper for the government. Is she right?', q: 'What happens to bond yields when bond prices fall?', a: 'Yields rise, so borrowing gets dearer', w: ['Yields fall, so borrowing gets cheaper', 'Yields are unaffected'], why: 'Prices and yields move like a seesaw, in opposite directions.' },
  { card: 'news-deficit-debt', ask: 'The mayor boasts the deficit fell this year, so surely our town owes less money now? I want to put it in the village newsletter.', q: 'What can you safely say about the town\'s total debt?', a: 'It can still be rising, just more slowly', w: ['It must have fallen too', 'It has been paid off'], why: 'A smaller deficit still adds to the debt, like a tap running more slowly.' },
  { card: 'news-three-councils', ask: 'I am writing a quiz for the pub. Is the European Court of Human Rights run by the European Union?', q: 'Which body actually runs that court?', a: 'The Council of Europe, a non-EU body', w: ['The European Council of EU leaders', 'The European Parliament'], why: 'The Council of Europe, founded in 1949, is separate from the EU.' },
  { card: 'news-commons', ask: 'Everyone in our street overfills the shared recycling bins and they are always overflowing. A friend says it is hopeless unless the council takes over. What do you think?', q: 'What did Elinor Ostrom\'s research suggest?', a: 'Neighbours can agree their own rules and checks', w: ['Only privatising the bins can work', 'Shared resources are always ruined'], why: 'Ostrom found communities often manage commons with local rules and monitoring.' },
];
