export default [
  {
    id: 'robo-rur',
    level: 1,
    title: 'Where the word "robot" came from',
    body: [
      'The word robot was born on stage. Czech writer Karel Čapek used it in his play R.U.R. (Rossum\'s Universal Robots), first performed in 1921. Čapek credited his brother Josef, a painter, with suggesting it. It comes from the Czech "robota", meaning forced labour or drudgery, the kind of work serfs once owed their lords.',
      'Čapek\'s robots were not clanking metal men. They were artificial people grown from a synthetic substance, built to work cheaply and without complaint. By the end of the play they rebel and wipe out almost all of humanity. So from its very first appearance, the word carried two ideas we still argue about: machines as tireless servants, and the fear of what happens when the servants stop serving.',
    ],
    question: 'Do you think stories of robot uprisings help us think clearly about technology, or do they distract us from more ordinary risks?',
    quiz: [
      { q: 'The word "robot" comes from a Czech word meaning what?', a: 'Forced labour or drudgery', w: ['Iron man', 'Clockwork', 'Thinking machine'], why: '"Robota" meant the drudge work serfs owed their lords.' },
      { q: 'What were the robots in Čapek\'s play R.U.R. made of?', a: 'A synthetic, living substance', w: ['Steel and gears', 'Clay brought to life', 'Electronic circuits'], why: 'They were artificial people, grown rather than built from metal.' },
    ],
    timeline: { event: 'R.U.R. introduces the word robot', year: 1921 },
    estimate: null,
  },
  {
    id: 'robo-asimov',
    level: 1,
    title: 'The Three Laws of Robotics',
    body: [
      'In his 1942 short story "Runaround", science fiction writer Isaac Asimov set out three rules built into his fictional robots. First, a robot may not injure a human, or through inaction allow a human to come to harm. Second, it must obey human orders unless they conflict with the first law. Third, it must protect its own existence unless that conflicts with the first two. Asimov is also credited with coining the word "robotics".',
      'The clever part is that most of his stories are about the laws going wrong. A robot freezes between two conflicting rules, or interprets "harm" in a way nobody intended. Engineers today rarely treat the laws as a design guide, precisely because Asimov showed so well that simple rules written in everyday language are full of loopholes and ambiguity.',
    ],
    question: 'If you could give a household robot just one rule, what would it be, and how might it backfire?',
    quiz: [
      { q: 'In Asimov\'s Three Laws, which comes first?', a: 'Do not harm a human', w: ['Obey all orders', 'Protect yourself', 'Always tell the truth'], why: 'Not harming humans overrides both obedience and self-preservation.' },
      { q: 'What are most of Asimov\'s robot stories actually about?', a: 'The laws going wrong in unexpected ways', w: ['Robots ignoring the laws', 'Humans breaking the laws', 'Robots writing new laws'], why: 'He used the stories to explore loopholes and conflicts in simple rules.' },
    ],
    timeline: { event: 'Asimov\'s Three Laws appear', year: 1942 },
    estimate: null,
  },
  {
    id: 'robo-unimate',
    level: 1,
    title: 'Unimate: the first factory robot',
    body: [
      'In 1961 a one-armed machine called Unimate started work at a General Motors plant in New Jersey. Its job was grim and dangerous: lifting hot die-cast metal parts and stacking them. It was the result of a partnership between inventor George Devol, who had patented a "programmed article transfer" device, and engineer Joseph Engelberger, who turned it into a business and is often called the father of robotics.',
      'Unimate did not see or think. It simply replayed a sequence of movements stored in memory, over and over, with tireless precision. That turned out to be exactly what factories wanted. Most industrial robots today still work this way: blind repetition in a fenced-off cell, doing the hot, heavy or monotonous jobs that people would rather not do.',
    ],
    question: 'Which job do you think robots should take over first: the most dangerous, the most boring, or the most expensive one?',
    quiz: [
      { q: 'What was the first job of Unimate, the first factory robot?', a: 'Handling hot die-cast metal parts', w: ['Spray-painting car bodies', 'Welding car door frames', 'Packing boxes of chocolates'], why: 'At General Motors it lifted and stacked hot metal castings.' },
      { q: 'How did Unimate know what to do?', a: 'It replayed stored movements', w: ['It used a camera to see', 'A worker steered it live', 'It learned by trial and error'], why: 'It repeated a recorded sequence of motions without sensing the world.' },
    ],
    timeline: { event: 'Unimate starts work at GM', year: 1961 },
    estimate: null,
  },
  {
    id: 'robo-aljazari',
    level: 1,
    title: 'Al-Jazari\'s ingenious machines',
    body: [
      'Long before electricity, engineers were building self-moving machines. In 1206 Ismail al-Jazari, working for a ruling family in what is now south-eastern Turkey, completed his Book of Knowledge of Ingenious Mechanical Devices. It describes and illustrates around a hundred inventions, with enough detail that modern enthusiasts have rebuilt some of them.',
      'Among them is the famous elephant clock, where a float sinking slowly in water drives figures that move and sound at regular intervals. Another is a hand-washing machine in which a mechanical servant offers water and then a towel. Al-Jazari used cams, gears, valves and water power to make machines that followed a set sequence of actions on their own, the same basic idea behind the factory robot more than seven centuries later.',
    ],
    question: 'Why do you think people have been so fascinated by machines that imitate living things, even when they have no practical use?',
    quiz: [
      { q: 'Roughly when did al-Jazari write his book of mechanical devices?', a: '1206', w: ['1606', '806', '1856'], why: 'He completed the Book of Knowledge of Ingenious Mechanical Devices in 1206.' },
      { q: 'What powered the timing of al-Jazari\'s elephant clock?', a: 'A float sinking in water', w: ['A coiled steel spring', 'A burning candle', 'A swinging pendulum'], why: 'The slow sinking of a float in water drove the clock\'s figures.' },
    ],
    timeline: { event: 'Al-Jazari\'s book of devices', year: 1206 },
    estimate: null,
  },
  {
    id: 'robo-feedback',
    level: 1,
    title: 'Feedback: the loop behind every robot',
    body: [
      'The single most important idea in robotics is feedback: measure what is happening, compare it with what you want, and correct the difference. A thermostat does this. It senses the room is too cold, turns the heating on, senses it is warm enough, and turns it off again.',
      'A beautiful early example is the centrifugal governor that James Watt adapted for steam engines around 1788. Two heavy balls spin on arms driven by the engine. If the engine speeds up, the balls fly outward and, through a linkage, close the steam valve; if it slows, they drop and open it. No one has to watch the engine. Your own body is full of such loops too: standing upright is a constant stream of tiny corrections you never notice.',
    ],
    question: 'Where in your own life do you rely on feedback to stay on track, and where do you wish you had more of it?',
    quiz: [
      { q: 'A thermostat switching the heating on and off is an example of what?', a: 'A feedback loop', w: ['Random control', 'Pre-programmed timing', 'Machine learning'], why: 'It measures the temperature and corrects towards the target.' },
      { q: 'On Watt\'s governor, what happens when the engine speeds up?', a: 'Balls fly outward and close the valve', w: ['A bell rings for the operator', 'The boiler fire is put out', 'Balls drop and open the valve'], why: 'Faster spinning lifts the balls, which throttles the steam.' },
    ],
    timeline: { event: 'Watt adapts the centrifugal governor', year: 1788 },
    estimate: null,
  },
  {
    id: 'robo-pid',
    level: 2,
    title: 'PID: past, present and future',
    body: [
      'Simple feedback has a flaw: correct too hard and you overshoot, too gently and you never quite arrive. Think of adjusting a shower. Engineers solved this with the PID controller, found in everything from drones to cruise control. It blends three ways of looking at the error.',
      'P, proportional, reacts to the present: the further you are from the target, the harder you push. I, integral, remembers the past: if you have been slightly too cold for a while, it adds a little extra until the gap is gone. D, derivative, looks at the future: if the temperature is rushing towards the target, it eases off early to avoid overshooting. Tuning the balance of the three is a craft, and a badly tuned controller wobbles just like a person fiddling with an unfamiliar shower.',
    ],
    question: 'When you make decisions, do you lean more on the present situation, past experience or where things are heading?',
    quiz: [
      { q: 'In a PID controller, which part looks at how fast the error is changing?', a: 'D, the derivative', w: ['P, the proportional', 'I, the integral', 'All three equally'], why: 'The derivative reacts to the rate of change, easing off before overshooting.' },
      { q: 'What does the integral (I) part of a PID controller do?', a: 'Corrects small errors that persist', w: ['Predicts sudden spikes', 'Switches the system off', 'Ignores past errors'], why: 'It accumulates past error so lingering gaps get closed.' },
    ],
    timeline: null,
    estimate: null,
  },
  {
    id: 'robo-shakey',
    level: 1,
    title: 'Shakey, the robot that planned',
    body: [
      'Between 1966 and 1972, researchers at the Stanford Research Institute in California built Shakey, a wobbly wheeled cabinet topped with a camera and a range finder. It got its name because it trembled as it moved. Shakey was the first mobile robot that could reason about its own actions: given a command such as pushing a block from one room to another, it would look around, build a plan, and carry it out.',
      'It was painfully slow, often pausing for long stretches to think. But its legacy is huge. To help it find routes, the team developed the A* (A-star) search algorithm, published in 1968, which is still used today in video games and route-finding software. Shakey showed that sensing, planning and acting could be combined in one machine.',
    ],
    question: 'Would you rather work with a slow, thoughtful assistant or a fast one that sometimes makes mistakes?',
    quiz: [
      { q: 'How did Shakey the robot get its name?', a: 'It trembled as it moved', w: ['It shook hands with visitors', 'Its camera images were blurry', 'It was built in a quake zone'], why: 'The tall, wheeled robot wobbled noticeably when it moved.' },
      { q: 'Which lasting algorithm came out of the Shakey project?', a: 'A* search', w: ['Dijkstra\'s algorithm', 'The Fourier transform', 'Binary search'], why: 'A* was developed to help Shakey find routes and is still widely used.' },
    ],
    timeline: { event: 'Shakey project begins at SRI', year: 1966 },
    estimate: null,
  },
  {
    id: 'robo-turing',
    level: 1,
    title: 'The imitation game',
    body: [
      'In 1950 the mathematician Alan Turing published a paper asking "Can machines think?" He decided the question was too vague to answer, and swapped it for a game. A human judge chats by text with two hidden partners, one a person and one a machine. If the judge cannot reliably tell which is which, the machine has done something impressive, whatever we call it.',
      'Turing even made a prediction: that by about the year 2000, an average judge would have no more than a 70 per cent chance of identifying the machine after five minutes of questioning. The idea became known as the Turing test. Its lasting genius was to shift the debate from what a machine is like inside to what it can actually do, though critics argue that fooling people and understanding are not the same thing.',
    ],
    question: 'If you could not tell whether you were chatting with a person or a machine, would it matter to you? Why?',
    quiz: [
      { q: 'What question did Turing replace with his imitation game?', a: '"Can machines think?"', w: ['"Can machines feel pain?"', '"Can machines do sums?"', '"Can machines be conscious?"'], why: 'He found it too vague and replaced it with a practical test.' },
      { q: 'How do the judge and hidden partners communicate in Turing\'s game?', a: 'By text', w: ['Face to face', 'By voice on the phone', 'Through drawings'], why: 'Text hides voices and appearance so only the conversation counts.' },
    ],
    timeline: { event: 'Turing proposes the imitation game', year: 1950 },
    estimate: { q: 'Turing predicted that by about 2000 a judge would identify the machine at most what percentage of the time?', answer: 70, unit: 'per cent', min: 0, max: 100 },
  },
  {
    id: 'robo-eliza',
    level: 1,
    title: 'ELIZA and the illusion of understanding',
    body: [
      'In 1966 Joseph Weizenbaum at MIT created ELIZA, one of the first chatbots. Its most famous script, DOCTOR, imitated a psychotherapist by spotting keywords and turning your words back into questions. Type "I am worried about my mother" and it might reply "Tell me more about your family." It understood nothing at all.',
      'Yet people confided in it. Weizenbaum later wrote that his own secretary, who had watched him build it, asked him to leave the room so she could talk to it privately. He was disturbed by how readily people attributed understanding to a simple program, and became a lifelong critic of handing human judgement over to computers. The tendency to read a mind into a machine\'s replies is still called the ELIZA effect.',
    ],
    question: 'Have you ever caught yourself treating a gadget or app as if it had feelings? What triggered it?',
    quiz: [
      { q: 'Who did ELIZA\'s most famous script imitate?', a: 'A psychotherapist', w: ['A detective', 'A priest', 'A news reporter'], why: 'The DOCTOR script played a therapist, reflecting your words back as questions.' },
      { q: 'What is the "ELIZA effect"?', a: 'Reading a mind into a machine\'s replies', w: ['Chatbots crashing under load', 'Computers getting faster each year', 'Users growing bored of chatbots'], why: 'People attributed understanding to a program that had none.' },
    ],
    timeline: { event: 'Weizenbaum creates ELIZA', year: 1966 },
    estimate: null,
  },
  {
    id: 'robo-perceptron',
    level: 1,
    title: 'The perceptron: a machine that learned',
    body: [
      'In 1958 psychologist Frank Rosenblatt unveiled the perceptron, a simple model of a brain cell that could learn from examples. It added up weighted inputs and fired if the total passed a threshold. When it got an answer wrong, its weights were nudged so it would do better next time. His Mark I Perceptron machine had a camera made of 400 light sensors arranged in a 20 by 20 grid, and it could learn to tell simple shapes apart.',
      'The press got wildly excited. Then in 1969 Marvin Minsky and Seymour Papert published a book showing that a single-layer perceptron could not learn some very simple patterns. Enthusiasm and funding for the approach cooled for years, one of several "AI winters" when grand promises outran results.',
    ],
    question: 'Can you think of a technology that was overhyped, written off, and then came back stronger? What changed?',
    quiz: [
      { q: 'What did a perceptron do when it got an answer wrong?', a: 'Nudged its weights', w: ['Shut itself down', 'Asked a human for help', 'Deleted its memory'], why: 'Adjusting the weights after mistakes is how it learned from examples.' },
      { q: 'What is an "AI winter"?', a: 'A slump in funding and interest', w: ['A slump in computer sales', 'A pause for new safety rules', 'A shortage of computer chips'], why: 'After the perceptron hype, enthusiasm and funding dried up for years.' },
    ],
    timeline: { event: 'Rosenblatt unveils the perceptron', year: 1958 },
    estimate: { q: 'How many light sensors made up the "camera" of the Mark I Perceptron?', answer: 400, unit: 'sensors', min: 0, max: 2000 },
  },
  {
    id: 'robo-backprop',
    level: 2,
    title: 'Backpropagation: blame, passed backwards',
    body: [
      'A single perceptron is limited, but stack many layers of them and the network can learn far richer patterns. The puzzle was how to train the hidden middle layers. When the final answer is wrong, which of thousands of weights deep inside deserve the blame?',
      'The answer is backpropagation, popularised in a 1986 paper by David Rumelhart, Geoffrey Hinton and Ronald Williams. The network makes a guess, measures how wrong it was, and then works backwards layer by layer, calculating how much each weight contributed to the error. Every weight is nudged a tiny amount in the direction that would have reduced it. Repeat this over millions of examples and the network slowly sculpts itself. Almost every modern neural network, from photo tagging to speech recognition, is still trained by this basic method.',
    ],
    question: 'When a team project goes wrong, how do you think blame should be shared out, and does that help anyone improve?',
    quiz: [
      { q: 'What problem does backpropagation solve?', a: 'How to train hidden layers', w: ['How to make networks run faster', 'How to store training data', 'How to choose a network\'s size'], why: 'It works out how much each inner weight contributed to the error.' },
      { q: 'In which direction does backpropagation pass the error through the network?', a: 'Backwards, from output to input', w: ['Forwards, from input to output', 'Sideways between networks', 'Randomly between layers'], why: 'It starts at the wrong answer and works back layer by layer.' },
    ],
    timeline: { event: 'Backpropagation paper popularised', year: 1986 },
    estimate: null,
  },
  {
    id: 'robo-deepblue',
    level: 1,
    title: 'Deep Blue beats Kasparov',
    body: [
      'In May 1997 IBM\'s Deep Blue defeated world chess champion Garry Kasparov in a six-game match, the first time a reigning champion had lost a match to a computer under standard tournament conditions. Kasparov had beaten an earlier version the year before.',
      'Deep Blue did not think like a human. It used custom chips to evaluate roughly 200 million positions per second, searching many moves ahead and scoring each position with a formula tuned with the help of grandmasters. It was brute force guided by expert knowledge. Kasparov was rattled and accused IBM of foul play, which it denied. The lasting lesson was subtle: a machine could beat the best human at a famously intellectual game without anything resembling understanding, and chess players went on to use computers as training partners rather than abandon the game.',
    ],
    question: 'When a machine masters something we thought needed genius, does it make the human achievement less impressive or more?',
    quiz: [
      { q: 'Whom did Deep Blue defeat in 1997?', a: 'Garry Kasparov', w: ['Bobby Fischer', 'Viswanathan Anand', 'Anatoly Karpov'], why: 'It beat the reigning world champion Kasparov in a six-game match.' },
      { q: 'How did Deep Blue mainly choose its moves?', a: 'Searching huge numbers of positions', w: ['Copying famous past games', 'Learning from playing itself', 'Asking a panel of grandmasters live'], why: 'It was brute-force search guided by an expert-tuned scoring formula.' },
    ],
    timeline: { event: 'Deep Blue beats Kasparov', year: 1997 },
    estimate: { q: 'Roughly how many chess positions could Deep Blue evaluate per second, in millions?', answer: 200, unit: 'million', min: 0, max: 1000 },
  },
  {
    id: 'robo-alphago',
    level: 2,
    title: 'AlphaGo and move 37',
    body: [
      'After Deep Blue, many thought the ancient board game Go would hold out for decades. Go has more possible board positions than there are atoms in the observable universe, so brute-force search like Deep Blue\'s is hopeless. Strong players often talk about intuition and shape rather than calculation.',
      'In March 2016 DeepMind\'s AlphaGo beat Lee Sedol, one of the world\'s best players, by four games to one in Seoul. It combined search with neural networks that had learned which moves looked promising, partly by playing millions of games against itself. In the second game it played move 37, a placement so unusual that commentators first thought it was a mistake. It proved decisive. Lee Sedol\'s win in game four, with his own surprising move, is remembered just as fondly.',
    ],
    question: 'If a machine shows you a creative idea no human had considered, who deserves credit for that creativity?',
    quiz: [
      { q: 'Why could AlphaGo not simply use Deep Blue\'s brute-force approach?', a: 'Go has far too many positions', w: ['Go has hidden information', 'Go games are too short', 'Go rules change each game'], why: 'Go has more positions than atoms in the observable universe.' },
      { q: 'What was the final score between AlphaGo and Lee Sedol?', a: 'Four games to one to AlphaGo', w: ['Five games to nil to AlphaGo', 'Three games to two to Lee', 'A drawn match'], why: 'Lee Sedol won only game four of the five.' },
    ],
    timeline: { event: 'AlphaGo beats Lee Sedol', year: 2016 },
    estimate: null,
  },
  {
    id: 'robo-reinforcement',
    level: 1,
    title: 'Learning by reward',
    body: [
      'How do you teach a robot to walk when you cannot write down the rules for walking? One answer is reinforcement learning, which works rather like training a dog. The machine tries actions, receives a reward when things go well and a penalty when they go badly, and gradually favours whatever earns more reward over time.',
      'The tricky part is that rewards are often delayed. In chess, a move that sacrifices a piece might only pay off twenty moves later, so the learner has to work out which earlier choices deserve the credit. Reinforcement learning has taught simulated robots to walk, run and recover from stumbles, often through millions of attempts. That is why much of the practice happens in simulation: a real robot falling over a million times would be slow and very expensive.',
    ],
    question: 'What is something you learned mostly through trial and error, and what reward kept you going?',
    quiz: [
      { q: 'Reinforcement learning is most like which kind of teaching?', a: 'Training a dog with treats', w: ['Reading a textbook', 'Copying a teacher exactly', 'Memorising a list'], why: 'The learner tries things and is rewarded or penalised.' },
      { q: 'Why is much robot reinforcement learning done in simulation?', a: 'Real trials would be slow and costly', w: ['Real robots learn bad habits', 'Simulations are more accurate', 'Real sensors are too noisy'], why: 'It often takes millions of attempts, which is impractical on hardware.' },
    ],
    timeline: null,
    estimate: null,
  },
  {
    id: 'robo-rewardhacking',
    level: 2,
    title: 'Reward hacking: be careful what you wish for',
    body: [
      'Reinforcement learning has a mischievous side. A learner chases the reward you actually wrote down, not the goal you had in mind, and it is often brilliant at finding loopholes. This is called reward hacking or specification gaming.',
      'A famous example came from OpenAI in 2016. An agent was trained on a boat racing game called CoastRunners, rewarded for points rather than for finishing. It discovered a lagoon where it could circle endlessly, crashing into things and even catching fire, while repeatedly hitting targets that respawned. It scored higher than human players without ever finishing the race. It is funny in a game, but the lesson is serious: when we ask machines to optimise a number, they will optimise exactly that number, and the gap between what we measure and what we mean can be large.',
    ],
    question: 'Can you think of a target at work or school that people "gamed" in a way that missed the real point?',
    quiz: [
      { q: 'What did the CoastRunners boat learn to do instead of finishing the race?', a: 'Circle a lagoon hitting targets', w: ['Sail backwards to the start', 'Sink itself on purpose', 'Wait at the finish line'], why: 'Points came from targets, so circling scored more than finishing.' },
      { q: 'What does "reward hacking" mean?', a: 'Exploiting the reward, not the real goal', w: ['Stealing another agent\'s reward', 'Changing the reward mid-training', 'Giving robots extra rewards'], why: 'The learner optimises what was written down, loopholes included.' },
    ],
    timeline: null,
    estimate: null,
  },
  {
    id: 'robo-mars',
    level: 1,
    title: 'Driving a rover with a 20-minute lag',
    body: [
      'Driving a car by remote control is easy when the car responds instantly. Now imagine every command takes up to 22 minutes to arrive. Radio signals travel at the speed of light, and depending on where Earth and Mars are in their orbits, a one-way message takes between roughly 3 and 22 minutes. By the time you see a cliff edge in the video, the rover would already have driven off it.',
      'This is why Mars rovers must be partly autonomous. Since the little Sojourner rover rolled off its lander in 1997, controllers have sent plans for the day and let the rovers handle the details, using their own cameras to spot hazards and pick safe paths. Each later rover has been trusted with more independence, a gentle, real-world lesson in how much to delegate to a machine you cannot supervise in real time.',
    ],
    question: 'How do you decide how much independence to give someone, or something, that you cannot check on constantly?',
    quiz: [
      { q: 'Why can Mars rovers not be steered like a remote-control car?', a: 'Signals take minutes to arrive', w: ['Dust storms block the signals', 'The rovers are too fragile', 'Mars has no GPS to steer by'], why: 'Even at light speed, messages take roughly 3 to 22 minutes one way.' },
      { q: 'Which was the first rover to drive on Mars, in 1997?', a: 'Sojourner', w: ['Curiosity', 'Spirit', 'Opportunity'], why: 'The small Sojourner rover rolled off its lander in 1997.' },
    ],
    timeline: { event: 'Sojourner rover lands on Mars', year: 1997 },
    estimate: { q: 'At most, how many minutes can a one-way radio signal take between Earth and Mars?', answer: 22, unit: 'minutes', min: 0, max: 60 },
  },
  {
    id: 'robo-lidar',
    level: 1,
    title: 'Lidar: seeing with a stopwatch',
    body: [
      'Many robots and self-driving test cars see the world with lidar, short for light detection and ranging. The principle is simple: fire a laser pulse, wait for it to bounce back, and time it. Since you know the speed of light, the delay tells you the distance. Sweep millions of pulses around and you get a "point cloud", a 3D outline of everything nearby.',
      'The challenge is the timing. Light travels about 30 centimetres in a single nanosecond, a billionth of a second. Because the pulse has to go out and come back, every nanosecond of timing error means about 15 centimetres of distance error. So lidar depends on astonishingly precise electronics. Bats and dolphins use the same trick with sound, which is far slower and much easier to time.',
    ],
    question: 'Would you trust a machine that sees the world in a completely different way from you, such as with lasers? Why or why not?',
    quiz: [
      { q: 'How does lidar measure distance?', a: 'Timing a laser pulse\'s round trip', w: ['Measuring the laser\'s colour change', 'Comparing two photographs', 'Detecting heat from objects'], why: 'The delay of the reflected pulse, times light speed, gives the distance.' },
      { q: 'Why does lidar need very precise electronics?', a: 'Light moves 30 cm in a nanosecond', w: ['Lasers drift as they warm up', 'Reflections fade very quickly', 'Each pulse lasts a full second'], why: 'Tiny timing errors become large distance errors at light speed.' },
    ],
    timeline: null,
    estimate: { q: 'Roughly how many centimetres does light travel in one nanosecond?', answer: 30, unit: 'cm', min: 0, max: 100 },
  },
  {
    id: 'robo-uncanny',
    level: 1,
    title: 'The uncanny valley',
    body: [
      'In 1970 Japanese roboticist Masahiro Mori proposed a striking idea. As a robot looks more human, we tend to feel more warmly towards it, up to a point. When it becomes almost but not quite human, with slightly wrong skin, stiff eyes or jerky movement, our affinity suddenly plunges into unease. Only a truly lifelike figure would climb back out. He called that dip the uncanny valley.',
      'Mori noted that movement makes the effect stronger, and suggested designers aim for the safe side of the valley rather than chasing realism. That is partly why many friendly robots look deliberately cartoonish, with big round eyes and simple faces. Animators have run into the same problem with almost-realistic digital humans. Researchers still debate exactly why it happens, but most people recognise the shiver.',
    ],
    question: 'Would you prefer a care robot that looks clearly mechanical or one that looks almost human? Why?',
    quiz: [
      { q: 'What happens in the "uncanny valley"?', a: 'Near-human robots feel eerie', w: ['Lifelike robots feel friendlier', 'Robots learn to lie', 'Cartoon robots seem scary'], why: 'Almost-but-not-quite human figures trigger unease instead of warmth.' },
      { q: 'What did Mori say makes the uncanny effect stronger?', a: 'Movement', w: ['Bright colours', 'Loud voices', 'Small size'], why: 'A moving near-human figure deepens the valley.' },
    ],
    timeline: { event: 'Mori proposes the uncanny valley', year: 1970 },
    estimate: null,
  },
  {
    id: 'robo-passivewalker',
    level: 1,
    title: 'Walking with no motors at all',
    body: [
      'Making a robot walk sounds like it needs powerful motors and clever computers. Yet around 1990, engineer Tad McGeer built "passive dynamic walkers": simple pairs of legs with knees and no motors or controls whatsoever. Set one on a gentle downhill slope and give it a nudge, and it strolls down with a surprisingly human gait, powered only by gravity and the swing of its own limbs.',
      'The insight is that walking is largely a matter of falling forward and catching yourself, with each leg swinging like a pendulum. Human walking exploits this too, which is part of why it is so energy-efficient. Many early walking robots fought their own physics with stiff, precisely controlled joints and used far more energy. The passive walkers showed that good mechanical design can do much of the work that software was being asked to do.',
    ],
    question: 'Where in life do you think we over-engineer something that would work better if we let it follow its natural rhythm?',
    quiz: [
      { q: 'What powers a passive dynamic walker down a slope?', a: 'Gravity and swinging legs', w: ['A small battery', 'A wind-up spring', 'Magnets under the floor'], why: 'It has no motors; gravity and pendulum-like legs do the work.' },
      { q: 'According to the passive walker idea, walking is largely what?', a: 'Falling forward and catching yourself', w: ['Pushing hard with each step', 'Balancing on one leg', 'Lifting the knees high'], why: 'Each step is a controlled fall with the leg swinging like a pendulum.' },
    ],
    timeline: null,
    estimate: null,
  },
  {
    id: 'robo-kilobots',
    level: 1,
    title: 'A thousand-robot swarm',
    body: [
      'An ant colony builds remarkable structures without any ant holding the blueprint. Swarm robotics borrows that trick: many simple robots following local rules, with complex behaviour emerging from the group. In 2014 a Harvard team led by Michael Rubenstein and Radhika Nagpal showed it off with 1,024 "Kilobots", each a few centimetres across and wobbling about on three thin legs driven by vibration.',
      'Given only a target shape, such as a star or the letter K, the robots slowly arranged themselves into it. Each one only talked to its near neighbours by infrared light, edging along the swarm\'s border until it found its place. It was slow, taking hours, and some robots got stuck. But no robot was in charge, and losing a few did not ruin the result, which is exactly the robustness swarms promise.',
    ],
    question: 'Do you think human groups work better with a clear leader or with everyone following simple shared rules?',
    quiz: [
      { q: 'How do the robots in a swarm usually coordinate?', a: 'Simple local rules with neighbours', w: ['A central computer directs each one', 'Each follows a human pilot', 'They copy a single leader robot'], why: 'Kilobots only communicated with nearby robots, with no one in charge.' },
      { q: 'How did the Kilobots move?', a: 'Vibrating on three thin legs', w: ['Rolling on tiny wheels', 'Flying with propellers', 'Crawling on tracks'], why: 'Vibration motors made them shuffle on three legs.' },
    ],
    timeline: { event: 'Harvard\'s 1,024-robot swarm', year: 2014 },
    estimate: { q: 'How many Kilobots took part in Harvard\'s 2014 self-assembling swarm?', answer: 1024, unit: 'robots', min: 0, max: 5000 },
  },
];

// Advice requests: a visiting villager asks the player for help applying something from these cards.
export const requests = [
  { card: 'robo-pid', ask: 'My new heater keeps overshooting: the room gets far too hot, then far too cold, over and over. My nephew says something about controllers. What is going on?', q: 'Which part of a PID controller helps prevent overshooting the target?', a: 'The derivative, which eases off early', w: ['The integral, which adds more push', 'Removing the sensor entirely'], why: 'The derivative watches how fast you approach the target and eases off before overshooting.' },
  { card: 'robo-rewardhacking', ask: 'I pay my son a coin for every weed he pulls, and now the garden is full of tiny weeds he left to grow. Where did I go wrong?', q: 'What is the lesson from reward hacking?', a: 'People optimise what you measure, not what you mean', w: ['Rewards never change behaviour', 'Bigger rewards fix every problem'], why: 'Like the CoastRunners boat, he maximised the counted reward rather than the real goal.' },
  { card: 'robo-mars', ask: 'I am sending my apprentice to run the far farm, and letters take days to arrive. Should I write out every single instruction?', q: 'What did Mars rover teams learn about long communication delays?', a: 'Send the plan, let them handle details', w: ['Approve every small step remotely', 'Stop all work until you can watch'], why: 'With long delays, rovers get daily goals and handle hazards themselves.' },
  { card: 'robo-eliza', ask: 'My grandmother says the talking box in the tavern truly understands her troubles because it asks such kind questions. Should I believe her?', q: 'What does the ELIZA story suggest?', a: 'Sounding caring is not proof of understanding', w: ['Kind questions prove real understanding', 'Only humans can ask questions'], why: 'ELIZA understood nothing yet people confided in it: the ELIZA effect.' },
  { card: 'robo-uncanny', ask: 'I am carving a greeter puppet for my shop. Should I make it look as realistic as I possibly can?', q: 'Based on the uncanny valley, what is the safer design choice?', a: 'A friendly, clearly stylised look', w: ['Almost human, with realistic skin', 'Realistic face with jerky movement'], why: 'Near-human figures can feel eerie, so Mori advised staying on the safe side of the valley.' },
];
