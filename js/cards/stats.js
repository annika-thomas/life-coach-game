export default [
  {
    id: "stats-monty-hall",
    level: 1,
    title: "Stick or switch?",
    body: [
      "You are on a game show facing three doors. Behind one is a car; behind the other two, goats. You pick door 1. The host, who knows where the car is, always opens a different door with a goat behind it, say door 3, and offers you the chance to switch to door 2. Should you?",
      "Yes. Switching wins two times in three. Your first pick had a 1 in 3 chance of being right, and the host's reveal does not change that. The remaining 2 in 3 chance now sits entirely on the one door he left closed. Picture 100 doors: you pick one, the host opens 98 goats and leaves one shut. Would you stick? When Marilyn vos Savant gave the right answer in her Parade magazine column in 1990, she received thousands of letters insisting she was wrong, many from people with PhDs.",
    ],
    question: "Why do you think our gut so stubbornly says the two remaining doors are fifty-fifty?",
    quiz: [
      { q: "In the Monty Hall problem, should you stick with your first door or switch?", a: "Switch", w: ["Stick", "It makes no difference", "Toss a coin to decide"], why: "Switching wins two times in three." },
      { q: "What is the chance your first pick is right, out of three doors?", a: "1 in 3", w: ["1 in 2", "2 in 3", "1 in 4"], why: "The host's reveal does not change your original 1 in 3." },
    ],
    timeline: { event: "Monty Hall row in Parade magazine", year: 1990 },
    estimate: { q: "With three doors, how often does switching win the car?", answer: 67, unit: "%", min: 0, max: 100 },
  },
  {
    id: "stats-gamblers-fallacy",
    level: 1,
    title: "The night black came up 26 times",
    body: [
      "On 18 August 1913, at the casino in Monte Carlo, the roulette ball landed on black again, and again, and again. As the streak grew, gamblers piled their money onto red, convinced that red was 'due'. Black came up 26 times in a row, and they lost a fortune.",
      "Their mistake is called the gambler's fallacy: believing that past results of an independent random process change future odds. The wheel has no memory. After 25 blacks, the chance of black on the next spin is exactly what it always is. A fair coin that has landed heads five times running is still fifty-fifty on the sixth flip. Streaks feel meaningful because we expect randomness to look evenly mixed in the short run. Over thousands of spins the proportions even out, not because the wheel corrects itself, but because new spins swamp the old ones.",
    ],
    question: "Where in your own life have you caught yourself thinking something was 'due'?",
    quiz: [
      { q: "After a fair coin lands heads five times in a row, what is the chance of heads next?", a: "Fifty-fifty", w: ["A bit less than half", "A bit more than half", "Much less than half"], why: "The coin has no memory; each flip is independent." },
      { q: "In the 1913 Monte Carlo streak, what did gamblers bet on?", a: "Red, as it seemed due", w: ["Black, as it was hot", "Zero, as it was overdue", "Odd numbers, to hedge"], why: "They piled onto red and lost a fortune." },
    ],
    timeline: { event: "Black comes up 26 times at Monte Carlo", year: 1913 },
    estimate: { q: "How many times in a row did black come up at Monte Carlo in 1913?", answer: 26, unit: "spins", min: 5, max: 60 },
  },
  {
    id: "stats-clark",
    level: 2,
    title: "When multiplying goes wrong",
    body: [
      "The roulette wheel truly has no memory, so you may multiply the chances of independent spins. The danger comes when we multiply chances that are not independent. In 1999 the English solicitor Sally Clark was convicted of murdering her two baby sons. An expert witness told the jury that the chance of a family like hers suffering one cot death was about 1 in 8,543, so the chance of two was 1 in 8,543 times 8,543: about 1 in 73 million.",
      "That calculation assumed the two deaths were independent, like coin flips. But genetic or environmental factors may make a second cot death in the same family far more likely. The figure was also misread as the chance she was innocent, ignoring that double murder is itself extremely rare. The Royal Statistical Society publicly criticised the evidence, and her conviction was overturned on appeal in 2003.",
    ],
    question: "Should courts require statistical evidence to be checked by statisticians before juries hear it?",
    quiz: [
      { q: "What faulty assumption produced the '1 in 73 million' figure?", a: "That the two deaths were independent", w: ["That cot deaths run in families", "That both babies had the same illness", "That the post-mortems were accurate"], why: "Shared genetic or environmental factors make a second death more likely." },
      { q: "What happened to Sally Clark's conviction?", a: "It was overturned on appeal", w: ["It was upheld", "It was never challenged", "It was reduced to a fine"], why: "Her conviction was overturned in 2003." },
    ],
    timeline: { event: "Sally Clark convicted", year: 1999 },
    estimate: null,
  },
  {
    id: "stats-regression",
    level: 1,
    title: "Why praise seems to backfire",
    body: [
      "Daniel Kahneman once told Israeli Air Force flight instructors that rewarding good performance works better than punishing mistakes. One instructor objected: whenever he praised a cadet for a superb landing, the next one was usually worse, and when he shouted at a cadet for a terrible one, the next was usually better.",
      "Kahneman realised the instructor was seeing regression to the mean. Any performance is part skill, part luck. An unusually good landing probably involved good luck, so the next one is likely to be closer to average whatever the instructor says, and the same goes for an unusually bad one. Francis Galton first noticed the pattern in the 19th century: very tall parents tend to have children who are tall, but less extreme. It explains the 'Sports Illustrated cover jinx' too: athletes reach the cover after an exceptional run, and exceptional runs rarely last.",
    ],
    question: "Can you think of a time you credited (or blamed) something for a change that was probably just regression to the mean?",
    quiz: [
      { q: "After an unusually brilliant performance, what usually happens next time?", a: "It is closer to average", w: ["It is even better", "It is exactly the same", "It is well below average"], why: "Extreme results involve luck, which rarely repeats." },
      { q: "Who first noticed regression in the heights of parents and children?", a: "Francis Galton", w: ["Daniel Kahneman", "Isaac Newton", "Florence Nightingale"], why: "Galton saw that tall parents have tall, but less extreme, children." },
    ],
    timeline: null,
    estimate: null,
  },
  {
    id: "stats-simpson",
    level: 1,
    title: "Better in every group, worse overall",
    body: [
      "A 1986 study compared two treatments for kidney stones. Overall, treatment B looked better: it worked in 83% of cases (289 of 350), against 78% for treatment A (273 of 350). But split the patients by stone size and A wins both times. For small stones, A succeeded 93% of the time against 87% for B. For large stones, A succeeded 73% of the time against 69% for B.",
      "How can A be better in each group yet worse overall? Doctors tended to give A to the harder cases, large stones, which have lower success rates whatever the treatment. B got mostly easy small stones, which flattered its total. This reversal is Simpson's paradox, named after Edward Simpson, who described it in 1951. The lesson is not that one number is always right, but that you must ask what is hiding in the mix before trusting an overall average.",
    ],
    question: "Can you think of a league table (schools, hospitals, cities) that might be fooled by Simpson's paradox?",
    quiz: [
      { q: "In the kidney stone study, which treatment did better for both small and large stones?", a: "Treatment A", w: ["Treatment B", "Neither, they were equal", "A for small, B for large"], why: "A won in each group despite losing overall." },
      { q: "Why did treatment B look better overall?", a: "It was given mostly to easier, small stones", w: ["It was a newer, better drug", "Its patients were mostly younger", "It had far fewer side effects"], why: "A got the harder large-stone cases." },
    ],
    timeline: null,
    estimate: null,
  },
  {
    id: "stats-correlation",
    level: 1,
    title: "Ice cream does not cause drowning",
    body: [
      "Across a year, ice cream sales and drownings rise and fall together. Does ice cream make people drown? Of course not. Both are driven by a third factor, hot weather, which sends people both to the ice cream van and into the sea. Statisticians call this hidden third factor a confounder.",
      "Correlation means two things move together; causation means one makes the other happen. Correlation can arise from a confounder, from causation running the opposite way (towns with more firefighters have more fires, because big fires bring more firefighters), or from pure coincidence. Search enough data and you will find absurd matches, such as cheese consumption tracking deaths from tangled bedsheets. To show causation, the gold standard is a randomised controlled trial: assign the treatment by chance, so that confounders are spread evenly across both groups.",
    ],
    question: "What is a popular health or money claim you have heard that might be correlation dressed up as causation?",
    quiz: [
      { q: "What links ice cream sales and drownings?", a: "Hot weather drives both", w: ["Ice cream causes cramps", "Sugar makes swimmers reckless", "Nothing, the link is invented"], why: "A confounder, hot weather, raises both." },
      { q: "What is the gold standard for showing causation?", a: "A randomised controlled trial", w: ["A very large survey", "A strong correlation", "Expert opinion"], why: "Random assignment spreads confounders evenly." },
    ],
    timeline: null,
    estimate: null,
  },
  {
    id: "stats-survivorship",
    level: 1,
    title: "Armour where the holes are not",
    body: [
      "During the Second World War, the statistician Abraham Wald, working with the Statistical Research Group at Columbia University, studied how to protect bombers. A natural idea was to look at planes returning from missions and add armour wherever the bullet holes clustered. Wald's insight, as the story is usually told, was the reverse: armour the places with no holes.",
      "The planes being studied were the survivors. Hits to the areas that came back riddled were clearly survivable. Hits to the engines were missing from the sample because planes hit there did not come back. This is survivorship bias: drawing conclusions only from what made it through a filter. It is why 'they don't make them like they used to' is misleading (the shoddy old things are long gone), and why studying only successful dropouts who became billionaires tells you little about dropping out.",
    ],
    question: "Whose success story have you been inspired by that might be a case of survivorship bias?",
    quiz: [
      { q: "Where did Wald suggest adding armour to bombers?", a: "Where returning planes had no holes", w: ["Where the holes clustered", "Only on the wings", "Nowhere, armour adds weight"], why: "Planes hit in those places did not come back." },
      { q: "What is survivorship bias?", a: "Judging only by what passed a filter", w: ["Preferring older things", "Fear of taking risks", "Overrating new technology"], why: "The failures are missing from the sample." },
    ],
    timeline: null,
    estimate: null,
  },
  {
    id: "stats-large-numbers",
    level: 1,
    title: "Ten thousand coin tosses",
    body: [
      "When Germany invaded Denmark in 1940, the mathematician John Kerrich was visiting Copenhagen and spent the rest of the war interned. He used the time to test probability by hand: he tossed a coin 10,000 times and recorded every result. He got 5,067 heads.",
      "That is the law of large numbers at work: as the number of trials grows, the proportion of heads settles ever closer to the true probability of one half. After 10 tosses, 7 heads (70%) is unremarkable. After 10,000 tosses, Kerrich's proportion was 50.67%. Notice what does not happen, though: the raw gap between heads and tails need not shrink, and here it was 134. The proportion converges because the total grows, not because the coin compensates for earlier runs. This law is what lets casinos and insurers sleep soundly: individual outcomes are unpredictable, but averages over many are remarkably stable.",
    ],
    question: "Where in your life do you rely on the law of large numbers, perhaps without realising?",
    quiz: [
      { q: "As you toss a fair coin more and more times, what happens to the proportion of heads?", a: "It settles closer to one half", w: ["It swings more wildly", "It drifts towards heads", "It stays exactly at one half"], why: "The law of large numbers pulls proportions towards the true probability." },
      { q: "Where did John Kerrich carry out his coin tosses?", a: "In an internment camp in Denmark", w: ["In a casino in Monte Carlo", "In a Cambridge laboratory", "On a ship at sea"], why: "He was interned in Denmark during the Second World War." },
    ],
    timeline: null,
    estimate: { q: "Out of Kerrich's 10,000 coin tosses, how many came up heads?", answer: 5067, unit: "heads", min: 4000, max: 6000 },
  },
  {
    id: "stats-small-samples",
    level: 2,
    title: "The trouble with small towns",
    body: [
      "The law of large numbers has a flip side: small samples swing wildly. Daniel Kahneman and Amos Tversky asked people about two hospitals. In the larger, about 45 babies are born each day; in the smaller, about 15. Over a year, which records more days on which over 60% of babies born are boys? Most people said about the same. The answer is the small hospital, because small groups stray from 50% far more easily, just as 7 heads in 10 tosses is common while 7,000 in 10,000 is virtually impossible.",
      "This catches out experts too. Studies of kidney cancer in the United States found the lowest rates in small, rural counties, and it was tempting to credit clean country living. But the highest rates were also in small, rural counties. Small populations produce extreme results in both directions, purely by chance.",
    ],
    question: "When you see a 'best' or 'worst' ranking, do you check how big the groups were?",
    quiz: [
      { q: "Hospital A has 45 births a day, hospital B 15. Which has more days with over 60% boys?", a: "The smaller hospital", w: ["The larger hospital", "About the same", "It depends on the season"], why: "Small samples stray from the average more easily." },
      { q: "In the US kidney cancer data, where were the highest rates found?", a: "Small, rural counties", w: ["Big cities", "Coastal suburbs", "Industrial towns"], why: "Small populations give extreme results both ways, so the lowest rates were there too." },
    ],
    timeline: null,
    estimate: null,
  },
  {
    id: "stats-expected-value",
    level: 1,
    title: "The house always wins",
    body: [
      "Expected value is the average result of a bet if you could play it over and over: multiply each outcome by its probability and add them up. Take European roulette, which has 37 pockets: 1 to 36, plus a single zero. Bet £1 on one number and you are paid 35 to 1 if it comes up.",
      "On average, out of 37 spins you win once (collecting £35 profit) and lose £1 on the other 36. Net result: you are down £1 over 37 spins, about 2.7 pence per pound bet. That small edge, the zero, is the casino's business model. Each spin is a gamble for you, but across millions of spins it is a near certainty for them, thanks to the law of large numbers. Expected value is also how insurers price policies and how you can compare a raffle ticket, a pension choice or an extended warranty.",
    ],
    question: "Is it ever sensible to take a bet with negative expected value? When, and why?",
    quiz: [
      { q: "On a European roulette wheel, what gives the casino its edge?", a: "The single zero pocket", w: ["Heavier red pockets", "The croupier's skill", "A tilted wheel"], why: "With 37 pockets but 35 to 1 payouts, the zero tips the odds." },
      { q: "How is expected value calculated?", a: "Each outcome times its probability, summed", w: ["The largest possible prize", "The most likely outcome", "The average of best and worst cases"], why: "It is the long-run average result per play." },
    ],
    timeline: null,
    estimate: { q: "On a £1 single-number bet in European roulette, how many pence do you lose on average?", answer: 2.7, unit: "p", min: 0, max: 20 },
  },
  {
    id: "stats-st-petersburg",
    level: 2,
    title: "The infinitely valuable game nobody wants",
    body: [
      "Here is a game. A fair coin is tossed until it lands heads. If heads appears on the first toss you win £2; on the second, £4; on the third, £8, doubling each time. How much would you pay to play?",
      "Work out the expected value. Half the time you win £2, worth £1 on average. A quarter of the time you win £4, again worth £1. An eighth of the time £8, again £1. The terms go on forever, each adding £1, so the expected value is infinite. Yet most people would not pay more than a few pounds. This is the St Petersburg paradox, named after the city where Daniel Bernoulli published his answer in 1738. Bernoulli argued that money has diminishing value: an extra £1,000 means far more to a pauper than to a millionaire, so we should weigh outcomes by their usefulness, not their size. Others note that no real casino could pay out the enormous prizes.",
    ],
    question: "How much would you actually pay to play this game? What stops you paying more?",
    quiz: [
      { q: "What is the expected value of the St Petersburg game?", a: "Infinite", w: ["£2", "£4", "Zero"], why: "Every possible outcome adds £1 to the average, forever." },
      { q: "How did Daniel Bernoulli explain why people pay little?", a: "Extra money matters less the more you have", w: ["People fear the casino will cheat", "The game takes too long to play", "Coins are rarely fair"], why: "Money has diminishing value to its owner." },
    ],
    timeline: { event: "Bernoulli on the St Petersburg game", year: 1738 },
    estimate: null,
  },
  {
    id: "stats-points",
    level: 1,
    title: "The letters that founded probability",
    body: [
      "In 1654 Blaise Pascal and Pierre de Fermat exchanged letters about a gambling puzzle called the problem of points. Two players stake equal money on a game of chance: the first to win a set number of rounds takes the pot. If the game is interrupted early, how should the pot be split fairly?",
      "Their answer: do not divide by the rounds already won; look at what could still happen. Suppose the target is 3 wins, each round is fifty-fifty, and the score is 2 to 1. The trailing player can only win the pot by taking the next two rounds in a row, a 1 in 4 chance. So the leader should get three quarters of the pot and the trailer one quarter. Reasoning about all possible futures, weighted by their chances, was the seed of modern probability theory, and of expected value.",
    ],
    question: "When a project or game is cut short, do you think rewards should follow what was done, or what was likely to happen?",
    quiz: [
      { q: "Which two mathematicians founded probability theory in their 1654 letters?", a: "Pascal and Fermat", w: ["Newton and Leibniz", "Euler and Gauss", "Galileo and Kepler"], why: "Their letters on the problem of points began the subject." },
      { q: "In a first-to-3 game at 2 to 1, what chance has the trailing player of winning?", a: "1 in 4", w: ["1 in 3", "1 in 2", "1 in 8"], why: "They need to win the next two fifty-fifty rounds in a row." },
    ],
    timeline: { event: "Pascal and Fermat letters on chance", year: 1654 },
    estimate: { q: "First to 3 wins, score 2 to 1, coin-flip rounds: what share of the pot should the leader get?", answer: 75, unit: "%", min: 0, max: 100 },
  },
  {
    id: "stats-mean-median",
    level: 1,
    title: "A billionaire walks into a pub",
    body: [
      "Fifty people are in a pub, each with savings of around £20,000. A billionaire walks in. Suddenly the average (mean) wealth in the room is roughly £20 million per person. Nobody else is a penny richer, but the statistic says the typical drinker is a multimillionaire.",
      "The median, the value of the middle person when everyone is lined up from poorest to richest, barely moves. That is why incomes, house prices and wealth are usually reported as medians: a few huge values drag the mean upwards, so most people earn less than the 'average' income. The mode, the most common value, is a third option. None is the 'true' average; each answers a different question. When someone quotes an average, especially in an argument, it is worth asking which one, and whether a few extremes are pulling it.",
    ],
    question: "When a politician or advert quotes an 'average', which kind do you suspect they chose, and why?",
    quiz: [
      { q: "When a billionaire enters a room, which average barely changes?", a: "The median", w: ["The mean", "Both change equally", "Neither changes"], why: "The middle person's wealth stays the same." },
      { q: "Why do most people earn less than the mean income?", a: "A few huge incomes pull the mean up", w: ["The mean is always lower than the median", "Part-time workers drag the median down", "Taxes are subtracted first"], why: "Extreme values drag the mean upwards." },
    ],
    timeline: null,
    estimate: null,
  },
  {
    id: "stats-relative-risk",
    level: 1,
    title: "Doubled risk, tiny risk",
    body: [
      "In October 1995, British health authorities warned that newer contraceptive pills doubled the risk of dangerous blood clots compared with older ones. A '100% increase' sounded terrifying, and many women stopped taking the pill.",
      "What the headline left out was the absolute risk. As the psychologist Gerd Gigerenzer has described, the risk went from about 1 in 7,000 women to about 2 in 7,000. One extra case per 7,000 women is real but small, and pregnancy itself carries a higher clot risk than the pill. In the following year, England and Wales saw an estimated 13,000 additional abortions. A relative risk tells you how much a risk changes in proportion; an absolute risk tells you how many people are actually affected. A headline that gives only the first can make a tiny risk sound enormous, or a small benefit sound miraculous.",
    ],
    question: "Next time you read that something 'doubles your risk', what will you want to know before worrying?",
    quiz: [
      { q: "If a risk rises from 1 in 7,000 to 2 in 7,000, what is the relative increase?", a: "100%", w: ["1%", "50%", "7,000%"], why: "The risk doubled, a 100% relative increase." },
      { q: "In that example, how many extra cases per 7,000 people is that?", a: "One", w: ["Two", "Seven", "Seven hundred"], why: "The absolute increase was just one case per 7,000." },
    ],
    timeline: { event: "UK contraceptive pill scare", year: 1995 },
    estimate: null,
  },
  {
    id: "stats-tea",
    level: 1,
    title: "The lady tasting tea",
    body: [
      "At Rothamsted, an agricultural research station in England, the statistician Ronald Fisher offered a cup of tea to his colleague Muriel Bristol. She declined, explaining she preferred tea with the milk poured in first, and claimed she could taste the difference. Fisher, who wrote the story up in his book The Design of Experiments (1935), wondered how you could test her claim fairly.",
      "His design: prepare eight cups, four milk-first and four tea-first, in random order, and tell her there are four of each. If she is just guessing, how likely is she to sort them all correctly? There are 70 ways to choose which four cups are milk-first, so a pure guesser gets it perfect only 1 time in 70, about 1.4%. If she succeeds, luck is an unlikely explanation. This is the logic of the significance test: how surprising would this result be if nothing were going on?",
    ],
    question: "What everyday claim (a lucky charm, a gut feeling, a 'secret' recipe) would you love to test the way Fisher did?",
    quiz: [
      { q: "What did Muriel Bristol claim she could detect?", a: "Whether milk or tea went in first", w: ["The origin of the tea leaves", "The water temperature", "Sugar in the cup"], why: "She preferred milk first and said she could taste it." },
      { q: "With 8 cups, 4 of each kind, what is the chance a guesser sorts all correctly?", a: "1 in 70", w: ["1 in 2", "1 in 8", "1 in 16"], why: "There are 70 ways to choose which four are milk-first." },
    ],
    timeline: { event: "Fisher's The Design of Experiments", year: 1935 },
    estimate: { q: "If she were just guessing, what is the chance she sorts all eight cups correctly?", answer: 1.4, unit: "%", min: 0, max: 20 },
  },
  {
    id: "stats-many-tests",
    level: 2,
    title: "Test enough jelly beans",
    body: [
      "Fisher's test asks how surprising a result would be if nothing were going on. Researchers often call a result significant if it would happen less than 5% of the time by chance alone, a level Fisher himself popularised. But that 5% is a chance of being fooled, and it applies to every test you run.",
      "Suppose you test whether each of 20 colours of jelly bean causes spots, and in truth none does. Each test has a 95% chance of correctly finding nothing. The chance all 20 come up clean is 0.95 multiplied by itself 20 times, about 36%. So there is about a 64% chance that at least one colour looks 'significant' purely by luck. Publish only that one, and you have a headline. This problem of multiple comparisons, and its cousin p-hacking (trying analyses until something works), helps explain why some published findings fail to replicate.",
    ],
    question: "If a study found that one food out of dozens tested affects your health, how much would you trust it?",
    quiz: [
      { q: "If you run 20 tests on effects that do not exist, how likely is at least one false 'hit' at the 5% level?", a: "About 64%", w: ["Exactly 5%", "About 20%", "100%"], why: "1 minus 0.95 to the power 20 is about 0.64." },
      { q: "What is p-hacking?", a: "Trying analyses until something looks significant", w: ["Faking the data in a study", "Rounding p-values up", "Using very large samples"], why: "Run enough analyses and chance will hand you a 'result'." },
    ],
    timeline: null,
    estimate: { q: "Testing 20 effects that do not exist, what is the chance at least one looks significant at the 5% level?", answer: 64, unit: "%", min: 0, max: 100 },
  },
  {
    id: "stats-benford",
    level: 1,
    title: "Why so many numbers start with 1",
    body: [
      "In 1881 the astronomer Simon Newcomb noticed that the early pages of books of logarithm tables were far more worn than the later ones: people looked up numbers starting with 1 much more often than numbers starting with 9. The physicist Frank Benford tested the pattern in 1938 across thousands of numbers, from river areas to street addresses, and it now bears his name.",
      "Benford's law says that in many real-world collections of numbers spanning several orders of magnitude, the leading digit is 1 about 30% of the time, while 9 leads less than 5% of the time. Intuitively, a quantity growing steadily spends longer with a leading 1 (going from 100 to 200 means doubling) than with a leading 9 (from 900 to 1,000 is a small step). Because people inventing figures tend to spread first digits evenly, auditors use Benford's law to flag possible fraud in accounts.",
    ],
    question: "Does it surprise you that something as random-seeming as the first digit of a number follows a rule?",
    quiz: [
      { q: "What did Simon Newcomb notice in books of logarithm tables?", a: "Early pages were far more worn", w: ["Many misprints on page 9", "Missing pages at the end", "All pages equally worn"], why: "People looked up numbers starting with 1 most often." },
      { q: "Why do auditors use Benford's law?", a: "Invented figures often break the pattern", w: ["It predicts share prices", "It flags rounding errors", "It speeds up arithmetic"], why: "Fakers tend to spread first digits too evenly." },
    ],
    timeline: { event: "Benford tests the first-digit law", year: 1938 },
    estimate: { q: "Under Benford's law, how often is 1 the leading digit?", answer: 30, unit: "%", min: 0, max: 100 },
  },
  {
    id: "stats-literary-digest",
    level: 1,
    title: "The biggest poll that got it wrong",
    body: [
      "In 1936 the American magazine The Literary Digest ran one of the largest opinion polls ever. It mailed out around 10 million ballots and received about 2.4 million replies, which predicted a comfortable win for the Republican Alf Landon over President Franklin Roosevelt. Roosevelt won in a landslide, carrying 46 of the 48 states.",
      "The problem was not the size of the sample but who was in it. The mailing lists drew heavily on telephone directories and car registrations, which in the Depression skewed towards wealthier voters, and those who bothered to reply were not typical either. Meanwhile George Gallup, using a far smaller but more representative sample, called the winner correctly. The lesson still applies to online polls and social media sentiment: a biased sample does not get better by getting bigger. It just becomes confidently wrong.",
    ],
    question: "Which online poll, review score or 'everyone is saying' trend might be a modern Literary Digest?",
    quiz: [
      { q: "In 1936, how did the Literary Digest's huge poll fare?", a: "It wrongly tipped Roosevelt to lose", w: ["It rightly tipped Roosevelt to win", "It called the exact vote share", "It was scrapped before the vote"], why: "Roosevelt won in a landslide despite the poll." },
      { q: "What was the main flaw in the Literary Digest poll?", a: "Its sample was unrepresentative", w: ["Its sample was too small", "Its sums were wrong", "It was run too early"], why: "Phone and car owners skewed wealthy; size could not fix that." },
    ],
    timeline: { event: "Literary Digest poll fiasco", year: 1936 },
    estimate: null,
  },
  {
    id: "stats-hot-hand",
    level: 2,
    title: "The hot hand, revisited",
    body: [
      "If a coin has no memory, does a basketball player? Fans believe in the 'hot hand': a player who has hit several shots is more likely to hit the next. In 1985 Thomas Gilovich, Robert Vallone and Amos Tversky studied shooting records and found no such effect. Belief in the hot hand became a textbook example of seeing patterns in randomness, the gambler's fallacy in reverse.",
      "Then in 2018 Joshua Miller and Adam Sanjurjo found a subtle flaw. Take a fair coin, flip it 4 times, and look at the flips that come straight after a heads. On average across many such sequences, the proportion of heads among those flips is about 40%, not 50%. Selecting 'what came after a streak' within a short sequence builds in a bias against streaks. Correcting for it, the original data showed evidence of a modest hot hand after all. Sometimes the sceptics need checking too.",
    ],
    question: "Have you ever felt 'in the zone'? Do you think it was real, or just a lucky run?",
    quiz: [
      { q: "What did the 1985 study of basketball shooting conclude?", a: "No evidence of a hot hand", w: ["A strong hot hand", "Players get colder after hits", "Shots alternate hit and miss"], why: "Gilovich, Vallone and Tversky found no effect." },
      { q: "Flip a fair coin 4 times; on average, what share of flips right after a heads are heads?", a: "About 40%", w: ["Exactly 50%", "About 60%", "About 25%"], why: "Miller and Sanjurjo showed this hidden bias against streaks." },
    ],
    timeline: null,
    estimate: null,
  },
  {
    id: "stats-clusters",
    level: 1,
    title: "Randomness comes in clumps",
    body: [
      "During the Second World War, Londoners noticed that V-1 flying bombs seemed to fall in clusters, and some suspected the Germans could aim at particular districts. In 1946 the actuary R. D. Clarke tested this. He divided an area of south London into 576 small squares of equal size and counted the 537 bomb strikes in each. The counts matched almost exactly what pure chance would produce, a pattern described by the Poisson distribution. The bombs were not aimed that precisely; random scatter simply looks clumpy.",
      "We expect randomness to look evenly spread, but true randomness produces gaps and clusters. Ask people to fake a sequence of 100 coin flips and they rarely include long runs, while real sequences usually contain a run of six or more. Clusters of illness in a neighbourhood or a streak of bad luck can be real signals, but they are often just chance doing what chance does.",
    ],
    question: "Have you ever seen meaning in a cluster of events that might have been pure chance?",
    quiz: [
      { q: "What did Clarke's analysis show about V-1 bomb strikes on London?", a: "They matched pure chance", w: ["They targeted rich districts", "They fell in perfect lines", "They avoided the river"], why: "The counts per square fitted the Poisson distribution." },
      { q: "When people fake a random sequence of coin flips, what do they usually leave out?", a: "Long runs of the same result", w: ["Any heads at all", "Alternating results", "The first flip"], why: "Real random sequences usually contain long runs." },
    ],
    timeline: { event: "Clarke analyses V-1 strikes", year: 1946 },
    estimate: null,
  },
];

// Advice requests: a visiting villager asks the player for help applying something from these cards.
export const requests = [
  { card: "stats-monty-hall", ask: "At the fair there is a three-cup game. I picked a cup, then the stallholder, who knows where the pea is, lifted an empty one and asked if I want to swap. Should I?", q: "If the stallholder always reveals an empty cup, what should you do?", a: "Swap: it wins two times in three", w: ["Stay: it is fifty-fifty now", "It makes no difference either way"], why: "Like Monty Hall, your first pick stays at 1 in 3; the other cup holds 2 in 3." },
  { card: "stats-gamblers-fallacy", ask: "The wheel of fortune at the fete has landed on blue eight times running! Surely red is due, so I am putting all my tokens on red. Good plan?", q: "On a fair wheel, how do eight blues affect the next spin?", a: "Not at all: the wheel has no memory", w: ["Red is now much more likely", "Blue is now much more likely"], why: "Independent spins are unaffected by past results." },
  { card: "stats-small-samples", ask: "Our tiny hamlet of 30 people had the highest rate of gout in the county this year. The cooper says it must be the well water. What do you make of it?", q: "What is the most likely explanation to check first?", a: "Small populations swing to extremes by chance", w: ["The well water is clearly to blame", "Gout is contagious in small places"], why: "Small groups produce extreme rates in both directions." },
  { card: "stats-expected-value", ask: "The raffle sells 100 tickets at £1 each, and the single prize is £50. My friend says it is a bargain. Is it, on average?", q: "What is the expected value of one £1 ticket?", a: "50p back, so a 50p average loss", w: ["£50 back, a great bargain", "£1 back, exactly fair"], why: "A 1 in 100 chance of £50 is worth 50p on average." },
  { card: "stats-relative-risk", ask: "I read that eating smoked eel doubles the risk of a rare tummy bug, from 1 in 10,000 to 2 in 10,000. Should I give up eel forever?", q: "What is the absolute increase in risk?", a: "One extra case per 10,000 people", w: ["A 100 in 10,000 increase", "Half of all eel eaters fall ill"], why: "A doubled tiny risk is still tiny; check the absolute numbers." },
];
