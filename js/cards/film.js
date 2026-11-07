export default [
  {
    id: 'film-lumiere',
    level: 1,
    title: 'The first paying audience',
    body: [
      'On 28 December 1895, in a basement room of the Grand Café in Paris, the brothers Auguste and Louis Lumière charged admission to watch moving pictures on a screen. The programme was ten short films, each lasting less than a minute: workers leaving the Lumière factory in Lyon, a baby being fed, a gardener soaked by his own hose. Their Cinématographe was camera, printer and projector in one neat wooden box.',
      'A famous legend says that when audiences later saw a train pulling into a station, they ran from their seats in terror. Historians think that story is probably exaggerated. What is not exaggerated is the shift: watching films stopped being a peep show for one person and became something strangers did together in the dark.',
    ],
    question: 'Is watching a film in a crowded cinema a better experience than watching it alone at home? What does the crowd add, or take away?',
    quiz: [
      { q: 'Which city hosted the Lumière brothers\' first paid film screening?', a: 'Paris', w: ['London', 'New York', 'Berlin'], why: 'It took place at the Grand Café in Paris in December 1895.' },
      { q: 'What did the Lumières\' Cinématographe combine in one box?', a: 'Camera, printer and projector', w: ['Camera, microphone and speaker', 'Projector, record player and screen', 'Camera, flash and colour filter'], why: 'The single device could shoot, print and project films.' },
    ],
    timeline: { event: 'Lumière brothers\' first paid screening', year: 1895 },
    estimate: { q: 'How many short films were in the Lumières\' first paid programme?', answer: 10, unit: 'films', min: 1, max: 40 },
  },
  {
    id: 'film-melies',
    level: 2,
    title: 'The magician who shot the moon',
    body: [
      'Where the Lumières pointed their camera at real life, Georges Méliès pointed his at fantasy. He was a stage magician who ran a Paris theatre, and he saw at once that film could do tricks no stage could. By his own account, his camera jammed while filming a street; when he projected the footage, a bus seemed to turn into a hearse. Stopping the camera, changing the scene and starting again became his signature "stop trick".',
      'His most famous film, A Trip to the Moon (1902), shows astronomers fired from a giant cannon, and its image of a capsule lodged in the eye of the man in the moon is still one of cinema\'s most recognisable pictures. Méliès made hundreds of films, went bankrupt, and was later rediscovered; Martin Scorsese\'s Hugo (2011) is a love letter to him.',
    ],
    question: 'Do you prefer films that feel like real life or films that are pure spectacle and invention? Why?',
    quiz: [
      { q: 'What was Georges Méliès\'s job before he made films?', a: 'Stage magician', w: ['Newspaper photographer', 'Opera singer', 'Railway engineer'], why: 'He ran a magic theatre in Paris and brought illusion to film.' },
      { q: 'Which iconic image comes from A Trip to the Moon?', a: 'A capsule stuck in the moon\'s eye', w: ['A train arriving at a station', 'A man hanging from a clock', 'A rocket landing on Mars'], why: 'The capsule in the eye of the man in the moon is the film\'s famous shot.' },
    ],
    timeline: { event: 'A Trip to the Moon released', year: 1902 },
    estimate: null,
  },
  {
    id: 'film-jazz-singer',
    level: 1,
    title: 'You ain\'t heard nothin\' yet',
    body: [
      'The Jazz Singer (1927), starring Al Jolson, is remembered as the film that ended the silent era. Oddly, it is mostly silent, with title cards for dialogue. But in a handful of scenes Jolson sings and speaks in synchronised sound, using Warner Bros\' Vitaphone system, which played the soundtrack from a large disc running alongside the projector. When Jolson ad-libs "You ain\'t heard nothin\' yet!", audiences heard a screen star talk naturally for the first time in a feature.',
      'Within a few years, almost every Hollywood film had sound, and careers built on faces rather than voices collapsed. Sound also fixed the speed of film: silent films had often been shot at slower, variable speeds, but recorded audio needed a constant rate, and 24 frames per second became the standard that cinema still largely uses.',
    ],
    question: 'Is there a modern technology that is changing an art form as suddenly as sound changed cinema? Who wins and who loses?',
    quiz: [
      { q: 'How much of The Jazz Singer had synchronised talking or singing?', a: 'Only a handful of scenes', w: ['Almost all of it', 'About half of it', 'None, it had a live orchestra'], why: 'It is mostly silent, with title cards for dialogue. Only a few scenes have synchronised sound.' },
      { q: 'How did the Vitaphone system play sound?', a: 'From a disc running alongside the projector', w: ['From a tape hidden behind the screen', 'From live actors behind the screen', 'From a radio broadcast'], why: 'Vitaphone synchronised a large audio disc with the film.' },
    ],
    timeline: { event: 'The Jazz Singer brings film sound', year: 1927 },
    estimate: { q: 'How many frames per second became the standard once films had sound?', answer: 24, unit: 'frames per second', min: 1, max: 60 },
  },
  {
    id: 'film-kane',
    level: 1,
    title: 'Citizen Kane and the boy genius',
    body: [
      'Orson Welles was 25 when Citizen Kane (1941) came out, and he had directed, co-written and starred in it. The story of a newspaper tycoon, loosely inspired by the real press baron William Randolph Hearst, is told through reporters chasing the meaning of his dying word, "Rosebud".',
      'With cinematographer Gregg Toland, Welles used deep focus, keeping faces in the foreground and action far behind them sharp at the same time, so viewers choose where to look. He shot from low angles and built sets with ceilings, which most films then hid. Hearst\'s newspapers tried to bury the film and it lost money, yet it topped Sight and Sound\'s critics\' poll of the greatest films every decade from 1962 to 2002. "Citizen Kane of..." is now shorthand for the defining masterpiece of anything.',
    ],
    question: 'What would you call the "Citizen Kane" of video games, music albums or TV? Make your case.',
    quiz: [
      { q: 'What is the famous dying word in Citizen Kane?', a: 'Rosebud', w: ['Xanadu', 'Mother', 'Charlie'], why: 'Reporters spend the film chasing the meaning of "Rosebud".' },
      { q: 'What is deep focus?', a: 'Keeping near and far objects sharp at once', w: ['Filming in extreme close-up', 'Blurring the background on purpose', 'Using slow motion for drama'], why: 'Welles and Toland kept foreground and background sharp together.' },
    ],
    timeline: { event: 'Citizen Kane released', year: 1941 },
    estimate: { q: 'How old was Orson Welles when Citizen Kane came out?', answer: 25, unit: 'years old', min: 15, max: 60 },
  },
  {
    id: 'film-continuity',
    level: 1,
    title: 'The invisible cut',
    body: [
      'Most films are built from hundreds of shots, yet you rarely notice the joins. That is the goal of continuity editing, a set of conventions Hollywood refined in the 1910s and 1920s. A "match on action" cuts in the middle of a movement, so a door opened in a wide shot finishes opening in a close-up. An "eyeline match" shows a character look off screen, then cuts to what they are looking at.',
      'The best known rule is the 180-degree rule. Imagine a line running between two people in conversation. Keep the camera on one side of it, and one character always faces right while the other faces left. Cross the line and they seem to swap places, which jolts the viewer. Directors do break it on purpose, to signal confusion or a shift in power, but only because the rule usually holds.',
    ],
    question: 'Next time you watch something, could you spot the cuts? Is "invisible" editing a virtue, or would you rather feel the filmmaker\'s hand?',
    quiz: [
      { q: 'What does continuity editing try to make you do?', a: 'Not notice the cuts', w: ['Count every cut', 'Notice the camera', 'Feel deliberately confused'], why: 'Its conventions hide the joins between shots.' },
      { q: 'What happens if a director crosses the 180-degree line?', a: 'Characters seem to swap sides of the screen', w: ['The film switches to slow motion', 'The sound goes out of sync', 'The lighting seems to change'], why: 'Crossing the line flips who faces left and right.' },
    ],
    timeline: null,
    estimate: null,
  },
  {
    id: 'film-new-wave',
    level: 2,
    title: 'Breathless and the jump cut',
    body: [
      'In the late 1950s a group of young French critics at the magazine Cahiers du cinéma stopped writing about films and started making them. François Truffaut\'s The 400 Blows (1959) won him Best Director at Cannes; Jean-Luc Godard\'s Breathless (1960) went further. Shooting cheaply with handheld cameras on real Paris streets, Godard used jump cuts: snipping out pieces of a continuous shot so time visibly skips forward.',
      'To a Hollywood editor this was a mistake, a direct violation of the smooth continuity rules. To audiences it felt restless, modern and alive, as if the film itself were impatient. The French New Wave made the director an author with a personal style, an idea that inspired filmmakers from Martin Scorsese to Quentin Tarantino. Today jump cuts are everywhere, not least in YouTube videos, where they trim the pauses out of people talking to camera.',
    ],
    question: 'Rules or rule-breaking: which do you think produces better art? Can you break a rule well without first mastering it?',
    quiz: [
      { q: 'Before directing, what did the French New Wave directors mostly do?', a: 'Write film criticism', w: ['Act in theatre', 'Make advertisements', 'Work as camera operators'], why: 'Truffaut and Godard were critics at Cahiers du cinéma.' },
      { q: 'What is a jump cut?', a: 'A cut that makes time visibly skip within a shot', w: ['A cut between two cameras at a sports match', 'A cut timed to a drumbeat', 'A cut from colour to black and white'], why: 'Pieces of a continuous shot are removed, so action leaps forward.' },
    ],
    timeline: { event: 'Godard\'s Breathless released', year: 1960 },
    estimate: null,
  },
  {
    id: 'film-oner',
    level: 1,
    title: 'The oner: no cuts allowed',
    body: [
      'Filmmakers call a long, unbroken shot a "oner", and it is a showpiece of nerve. Alfred Hitchcock\'s Rope (1948) was staged to look like one continuous take, though a film reel then held only about ten minutes, so he hid most cuts by moving the camera into an actor\'s dark jacket. Sam Mendes\'s 1917 (2019) used a similar trick of hidden joins to follow two soldiers almost without a break.',
      'Russian Ark (2002) needed no tricks. Alexander Sokurov filmed it in a single 96-minute Steadicam shot gliding through the Hermitage Museum in St Petersburg, with hundreds of actors in costume and only one day available to film. Long takes trap the viewer in real time: no cut to escape to, no editor to rescue a fluffed line. That is why a great oner can feel like holding your breath.',
    ],
    question: 'Does knowing a scene was filmed in one take make you enjoy it more, or is that just admiring the effort rather than the art?',
    quiz: [
      { q: 'What do filmmakers call a long, unbroken shot?', a: 'A oner', w: ['A jump cut', 'A montage', 'A cutaway'], why: 'A "oner" is a scene filmed in one continuous take.' },
      { q: 'Where was Russian Ark filmed?', a: 'The Hermitage Museum, St Petersburg', w: ['The Kremlin, Moscow', 'The Louvre, Paris', 'A film studio in Berlin'], why: 'The single shot glides through the Hermitage.' },
    ],
    timeline: { event: 'Russian Ark, one single shot', year: 2002 },
    estimate: { q: 'How long is the single unbroken shot that makes up Russian Ark?', answer: 96, unit: 'minutes', min: 10, max: 200 },
  },
  {
    id: 'film-neorealism',
    level: 1,
    title: 'Bicycle Thieves and the street as studio',
    body: [
      'After the Second World War, Italian studios were damaged and money was scarce, so directors took their cameras into the ruined streets. Italian neorealism told stories of ordinary people, often using non-professional actors. In Vittorio De Sica\'s Bicycle Thieves (1948), a poor man in Rome needs his bicycle for a new job, and the bicycle is stolen. The lead, Lamberto Maggiorani, was a factory worker, not an actor.',
      'The style was simple: real locations, natural light, everyday problems treated as drama. Its influence spread worldwide. In India, Satyajit Ray said that seeing Bicycle Thieves in London inspired him to make Pather Panchali (1955), shot on location in rural Bengal with a largely untrained cast. Every documentary-flavoured drama with a handheld camera and unknown actors owes something to those post-war streets.',
    ],
    question: 'Can a story about a small, ordinary problem be as gripping as one about saving the world? Which have moved you more?',
    quiz: [
      { q: 'Who played the lead in Bicycle Thieves?', a: 'A factory worker', w: ['A famous stage actor', 'The director himself', 'A Hollywood star'], why: 'Neorealism often cast non-professionals; Maggiorani was a factory worker.' },
      { q: 'Which Indian director was inspired by Bicycle Thieves?', a: 'Satyajit Ray', w: ['Raj Kapoor', 'Mani Ratnam', 'Guru Dutt'], why: 'Ray credited the film with inspiring Pather Panchali.' },
    ],
    timeline: { event: 'Bicycle Thieves released', year: 1948 },
    estimate: null,
  },
  {
    id: 'film-india',
    level: 1,
    title: 'More than Bollywood',
    body: [
      'India makes more feature films than any other country, regularly well over 1,500 a year, in more than a dozen languages. Its first feature, Dadasaheb Phalke\'s Raja Harishchandra (1913), was a silent retelling of a story from Hindu tradition. Phalke reportedly struggled to find a woman willing to act, so a male performer played the queen.',
      '"Bollywood", a blend of Bombay and Hollywood, means only the Hindi-language industry based in Mumbai. Telugu, Tamil, Malayalam, Bengali and other industries are huge in their own right; the Telugu epic RRR (2022) became a global hit and its song "Naatu Naatu" won an Oscar. Song and dance numbers are a hallmark of popular Indian cinema, not an interruption of the story but part of how it tells emotion. Saying "Bollywood" for all Indian film is a bit like calling every European film French.',
    ],
    question: 'Musical numbers in the middle of a drama: do they pull you out of a story or pull you deeper in?',
    quiz: [
      { q: 'Which country makes the most feature films each year?', a: 'India', w: ['United States', 'China', 'France'], why: 'India regularly produces well over 1,500 films a year.' },
      { q: 'What does "Bollywood" strictly refer to?', a: 'Hindi cinema made in Mumbai', w: ['All cinema made in India', 'Tamil cinema made in Chennai', 'Indian television dramas'], why: 'Other languages have their own large industries.' },
    ],
    timeline: { event: 'First Indian feature film', year: 1913 },
    estimate: null,
  },
  {
    id: 'film-ozu',
    level: 1,
    title: 'Ozu and the camera at tatami height',
    body: [
      'Yasujirō Ozu made quiet films about families: parents ageing, children marrying, small disappointments at the dinner table. His style is so distinctive you can recognise it in seconds. The camera sits low, roughly at the eye level of someone kneeling on a tatami mat, and in his later films it barely moves at all. Between scenes he cuts to still images of empty rooms, washing lines or a train passing, which critics nicknamed "pillow shots".',
      'Tokyo Story (1953) follows an elderly couple visiting their grown children, who are too busy to make much time for them. Nothing dramatic happens, and that is the point: it feels like life. In 2012, film directors voting in Sight and Sound\'s poll named it the greatest film ever made. Ozu shows that stillness can hit as hard as any explosion.',
    ],
    question: 'Ozu\'s films are slow on purpose. Do you have patience for slow films, and has one ever rewarded it?',
    quiz: [
      { q: 'Where did Ozu typically place his camera?', a: 'Low, at kneeling height', w: ['High, looking down', 'On a moving crane', 'Handheld, up close'], why: 'His camera sat roughly at tatami-mat eye level.' },
      { q: 'What are Ozu\'s "pillow shots"?', a: 'Still images of places between scenes', w: ['Close-ups of sleeping characters', 'Soft-focus romantic shots', 'Dream sequences'], why: 'He cut to empty rooms, landscapes or passing trains between scenes.' },
    ],
    timeline: { event: 'Ozu\'s Tokyo Story released', year: 1953 },
    estimate: null,
  },
  {
    id: 'film-macguffin',
    level: 1,
    title: 'The MacGuffin',
    body: [
      'A MacGuffin is the thing everyone in a story is chasing that, for the audience, hardly matters in itself. Alfred Hitchcock popularised the term: secret plans, a stolen necklace, a mysterious formula. What counts is that the characters care desperately, because their pursuit drives the plot.',
      'The jewelled bird in The Maltese Falcon (1941) is a classic example. So is the glowing briefcase in Pulp Fiction (1994), whose contents are never revealed, and nobody leaves the cinema feeling cheated. The idea is useful beyond film. When a story leans too hard on explaining its MacGuffin, it usually drags; when it focuses on people wanting something badly, it flies. Calling something "just a MacGuffin" is a neat way to say a plot device is an excuse, not the point.',
    ],
    question: 'Think of a favourite film or series. What is its MacGuffin, and would the story change if it were something else entirely?',
    quiz: [
      { q: 'What is a MacGuffin?', a: 'An object that drives the plot but barely matters', w: ['A twist that reframes everything before it', 'A side character who exists for comic relief', 'A short scene hidden after the credits'], why: 'Characters chase it; the audience cares about the chase.' },
      { q: 'Which film features a briefcase whose contents are never revealed?', a: 'Pulp Fiction', w: ['The Godfather', 'Casablanca', 'Jaws'], why: 'The glowing briefcase in Pulp Fiction is a famous MacGuffin.' },
    ],
    timeline: null,
    estimate: null,
  },
  {
    id: 'film-jaws',
    level: 1,
    title: 'Jaws and the summer blockbuster',
    body: [
      'Steven Spielberg was in his twenties when he made Jaws (1975), and the shoot was a mess. The mechanical shark, nicknamed Bruce by the crew, kept breaking down in salt water. Forced to show it less, Spielberg suggested it instead: a yellow barrel bobbing on the surface, a swimmer\'s point of view from below, and John Williams\'s simple two-note music announcing danger. Audiences were terrified by what they could not see.',
      'Jaws also changed how films were sold. Instead of opening in a few cities and spreading slowly, it opened across hundreds of cinemas at once, backed by television advertising. It became the highest-grossing film ever until Star Wars two years later. Together they created the summer blockbuster: big, high-concept films launched everywhere at once, the model Hollywood still follows.',
    ],
    question: 'Is what you imagine scarier than what you see? Think of a film that frightened you most by holding back.',
    quiz: [
      { q: 'Why does the shark appear so rarely in Jaws?', a: 'The mechanical shark kept breaking', w: ['The budget ran out before filming', 'Real sharks were too dangerous', 'Censors cut most shark scenes'], why: 'Malfunctions forced Spielberg to suggest the shark instead.' },
      { q: 'Which film overtook Jaws as the highest-grossing film?', a: 'Star Wars', w: ['Superman', 'E.T.', 'The Godfather'], why: 'Star Wars took the record two years later.' },
    ],
    timeline: { event: 'Jaws invents the summer blockbuster', year: 1975 },
    estimate: null,
  },
  {
    id: 'film-dolly-zoom',
    level: 2,
    title: 'The dolly zoom: when the world lurches',
    body: [
      'Remember the moment in Jaws when Chief Brody, sitting on the beach, realises a shark attack is happening? His face stays the same size but the background seems to rush towards him. That is a dolly zoom: the camera physically moves away from the subject while the lens zooms in, or the reverse, so the subject holds still while perspective warps around them.',
      'The effect was first made famous in Alfred Hitchcock\'s Vertigo (1958) to show a detective\'s terror of heights as he looks down a bell-tower stairwell, which is why it is also called the "Vertigo effect". It has since become shorthand for a sudden, sickening realisation. Vertigo itself had a strange second life: a disappointment on release, it displaced Citizen Kane at the top of Sight and Sound\'s critics\' poll in 2012.',
    ],
    question: 'Visual tricks like the dolly zoom tell you how a character feels. Which do you remember more from films: the dialogue or the images?',
    quiz: [
      { q: 'In a dolly zoom, what happens to the background?', a: 'It seems to stretch or rush', w: ['It slowly fades out', 'It freezes in place', 'It spins around'], why: 'Moving the camera while zooming the opposite way warps perspective.' },
      { q: 'Which Hitchcock film made the dolly zoom famous?', a: 'Vertigo', w: ['Psycho', 'Rear Window', 'The Birds'], why: 'It is often called the "Vertigo effect".' },
    ],
    timeline: { event: 'Vertigo popularises the dolly zoom', year: 1958 },
    estimate: null,
  },
  {
    id: 'film-caligari',
    level: 1,
    title: 'Painted shadows: German Expressionism',
    body: [
      'In The Cabinet of Dr. Caligari (1920), directed by Robert Wiene, the town is a nightmare: crooked houses, slanted doorways, streets that zigzag, and even the shadows painted straight onto the sets. Nothing looks real, because the film shows the world as a disturbed mind feels it. This was German Expressionism, where design and lighting express emotion rather than reality.',
      'It produced a run of landmarks in Weimar Germany. F. W. Murnau\'s Nosferatu (1922) gave cinema its creeping vampire shadow on a staircase wall; Fritz Lang\'s Metropolis (1927) imagined a vast futuristic city of towers and workers. Their strong contrasts of light and dark, odd angles and looming shapes became a toolkit for horror and science fiction. Every time a film villain is lit from below or a city looks menacing, the 1920s are whispering.',
    ],
    question: 'Should films look like the real world, or like the way the world feels? Name one that made a place feel like an emotion.',
    quiz: [
      { q: 'What unusual thing was painted onto the sets of Caligari?', a: 'The shadows', w: ['The actors\' costumes', 'The subtitles', 'The sky in colour'], why: 'Light and shadow were literally painted onto the sets.' },
      { q: 'Which 1922 film is famous for a vampire\'s shadow on a staircase?', a: 'Nosferatu', w: ['Metropolis', 'Dracula', 'Frankenstein'], why: 'Murnau\'s Nosferatu gave cinema that creeping shadow.' },
    ],
    timeline: { event: 'The Cabinet of Dr. Caligari released', year: 1920 },
    estimate: null,
  },
  {
    id: 'film-noir',
    level: 2,
    title: 'Film noir: venetian blinds and bad decisions',
    body: [
      'When the Nazis took power in 1933, many German-speaking filmmakers fled, and a number ended up in Hollywood, including Fritz Lang and Billy Wilder. They brought Expressionist habits with them: hard shadows, odd angles, cities that feel like traps. In the 1940s these merged with hard-boiled American crime fiction.',
      'After the war, French critics who had been cut off from American films suddenly saw a backlog of them and noticed how dark they were. In 1946 they began calling them "film noir", black film. Wilder\'s Double Indemnity (1944) is a model: an insurance salesman, a scheming wife, a murder plan, told in weary voiceover. Typical ingredients include night streets, rain, cigarette smoke, the femme fatale, and stripes of light falling through venetian blinds. Noir heroes rarely win; mostly they discover how badly things can go.',
    ],
    question: 'Why do you think stories about ordinary people making one terrible choice are so gripping?',
    quiz: [
      { q: 'What does "film noir" literally mean?', a: 'Black film', w: ['Night cinema', 'Crime story', 'New film'], why: 'French critics coined the term, meaning "black film".' },
      { q: 'Which earlier movement shaped the look of film noir?', a: 'German Expressionism', w: ['Italian neorealism', 'The French New Wave', 'Soviet montage'], why: 'Émigré filmmakers brought Expressionist shadows and angles to Hollywood.' },
    ],
    timeline: { event: 'French critics coin "film noir"', year: 1946 },
    estimate: null,
  },
  {
    id: 'film-lucy',
    level: 1,
    title: 'I Love Lucy and the invention of reruns',
    body: [
      'When I Love Lucy premiered on CBS in 1951, most American television was broadcast live, and what was preserved survived only as fuzzy recordings filmed off a monitor. Lucille Ball and her husband Desi Arnaz insisted on making their sitcom in Hollywood, so it was shot on film, using three cameras at once in front of a live studio audience.',
      'To light it, Arnaz hired Karl Freund, the cinematographer behind Metropolis. The three-camera method let the cast perform scenes straight through, with laughs from real people, while the editors cut between angles afterwards. Because each episode existed as a crisp film print, it could be shown again and again, and reruns became a business. The format of the studio sitcom, from Cheers to Friends, still follows that template.',
    ],
    question: 'Live audience laughter or no laugh track at all: which kind of comedy do you prefer, and why?',
    quiz: [
      { q: 'How was I Love Lucy unusual for 1951 television?', a: 'It was shot on film, not broadcast live', w: ['It was the first show in colour', 'It had no audience at all', 'It was filmed in a single take'], why: 'Shooting on film made clean copies that could be rerun.' },
      { q: 'How many cameras did I Love Lucy film with at once?', a: 'Three', w: ['One', 'Two', 'Six'], why: 'Its three-camera method became the sitcom standard.' },
    ],
    timeline: { event: 'I Love Lucy premieres', year: 1951 },
    estimate: null,
  },
  {
    id: 'film-prestige-tv',
    level: 2,
    title: 'The Sopranos and prestige TV',
    body: [
      'Classic sitcoms like I Love Lucy were built to be watched in any order: whatever went wrong, things were back to normal by the end of the episode. That suited reruns. The Sopranos, which premiered on HBO in 1999, worked the other way. David Chase\'s story of a New Jersey mob boss in therapy built long arcs across seasons, let characters change and suffer consequences, and trusted viewers to keep up.',
      'Being on subscription cable, free of advertisers, it could be violent, slow and morally murky. Its success opened the door to The Wire (2002), Mad Men (2007) and Breaking Bad (2008), and the idea that television could rival cinema as a storyteller\'s medium. Critics call it the start of a golden age of "prestige TV". Its abrupt final cut to black in 2007 is still argued about.',
    ],
    question: 'Has television overtaken film as the place for the best stories? Make the case for one side.',
    quiz: [
      { q: 'Which channel first broadcast The Sopranos?', a: 'HBO', w: ['NBC', 'BBC', 'Netflix'], why: 'It premiered on HBO, a subscription cable channel, in 1999.' },
      { q: 'How did The Sopranos differ from classic sitcoms?', a: 'Stories built across many episodes', w: ['Each episode reset to normal', 'It had a live studio audience', 'It was entirely improvised'], why: 'It used long arcs where actions had lasting consequences.' },
    ],
    timeline: { event: 'The Sopranos premieres on HBO', year: 1999 },
    estimate: null,
  },
  {
    id: 'film-ghibli',
    level: 1,
    title: 'Studio Ghibli\'s hand-drawn worlds',
    body: [
      'Studio Ghibli was founded in Japan in 1985 by directors Hayao Miyazaki and Isao Takahata with producer Toshio Suzuki. Its films are known for painstaking hand-drawn animation, strong young heroines, flying machines, forest spirits, and an unusual patience: characters stop to eat, watch rain or look at the sea. The big fluffy creature from My Neighbour Totoro (1988) became the studio\'s logo.',
      'Miyazaki\'s Spirited Away (2001), about a girl trapped in a bathhouse for spirits, became the highest-grossing film in Japanese history, holding the record for nearly two decades. It won the Golden Bear in Berlin and the Oscar for Best Animated Feature. Ghibli helped convince the world that animation is a medium for every age, not a genre for children, and its food scenes alone have inspired countless home cooks.',
    ],
    question: 'Is animation taken seriously enough as art? What animated film would you defend as a masterpiece?',
    quiz: [
      { q: 'Which creature is Studio Ghibli\'s logo?', a: 'Totoro', w: ['Pikachu', 'A white dragon', 'A flying pig'], why: 'The forest spirit from My Neighbour Totoro is the studio\'s emblem.' },
      { q: 'Which Ghibli film won the Oscar for Best Animated Feature?', a: 'Spirited Away', w: ['Princess Mononoke', 'Kiki\'s Delivery Service', 'Ponyo'], why: 'Spirited Away won the Oscar as well as Berlin\'s Golden Bear.' },
    ],
    timeline: { event: 'Spirited Away released', year: 2001 },
    estimate: null,
  },
  {
    id: 'film-bechdel',
    level: 1,
    title: 'The Bechdel test',
    body: [
      'In 1985 the cartoonist Alison Bechdel published a strip in her comic Dykes to Watch Out For in which a character explains her rule for choosing a film. She only goes if it has at least two women in it, who talk to each other, about something besides a man. Bechdel credited the idea to her friend Liz Wallace.',
      'The joke became a famous yardstick. A surprising number of well-loved films fail it, often because female characters exist mainly in relation to the male hero. The test says nothing about whether a film is good or even feminist: a great film can fail and a weak one can pass. Its value is in spotting patterns across hundreds of films, not judging any single one. Similar quick tests have since been proposed for other kinds of representation.',
    ],
    question: 'Are simple tests like the Bechdel test useful, or do they flatten what makes a story good? Try it on the last film you watched.',
    quiz: [
      { q: 'Where did the Bechdel test first appear?', a: 'In a comic strip', w: ['In a university study', 'In a Hollywood union rulebook', 'In a newspaper film review'], why: 'It came from Alison Bechdel\'s comic in 1985.' },
      { q: 'What does passing the Bechdel test tell you about a film?', a: 'Nothing about its quality', w: ['That it is a feminist film', 'That women have big roles', 'That it treats women fairly'], why: 'It measures patterns across films, not the merit of one.' },
    ],
    timeline: { event: 'Bechdel test appears in a comic', year: 1985 },
    estimate: null,
  },
  {
    id: 'film-first-oscars',
    level: 1,
    title: 'The 15-minute Oscars',
    body: [
      'Today the Academy Awards ceremony can run well over three hours. The first one, on 16 May 1929 at the Hollywood Roosevelt Hotel, took about 15 minutes. There was no suspense at all: the winners had been announced months before, and the evening was mostly a private dinner for a few hundred guests.',
      'The top prize went to Wings, a First World War flying drama full of dogfights. It remained the only silent film to win the top award until The Artist did so more than 80 years later. The first Best Actor, the German star Emil Jannings, collected his statuette early because he was returning to Europe. The famous sealed envelopes came later, partly to stop newspapers leaking the results, and "the envelope, please" became the most suspenseful line in show business.',
    ],
    question: 'Do awards like the Oscars help good films find audiences, or do they mostly reward campaigns and hype?',
    quiz: [
      { q: 'At the first Oscars, when were the winners announced?', a: 'Months before the ceremony', w: ['Live on stage in sealed envelopes', 'The next morning in newspapers', 'By telegram during dinner'], why: 'There was no suspense: results were public in advance.' },
      { q: 'Which film won the top award at the first Oscars?', a: 'Wings', w: ['The Jazz Singer', 'Metropolis', 'Sunrise'], why: 'Wings, a silent war drama, won the top prize.' },
    ],
    timeline: { event: 'First Academy Awards ceremony', year: 1929 },
    estimate: { q: 'Roughly how long did the first Academy Awards ceremony last?', answer: 15, unit: 'minutes', min: 1, max: 120 },
  },
];

// Advice requests: a visiting villager asks the player for help applying something from these cards.
export const requests = [
  { card: 'film-jaws', ask: 'I\'m making a little horror short for the village fair, but my rubber monster looks silly on camera. Any ideas?', q: 'What would the making of Jaws suggest?', a: 'Show the monster less and hint at it instead', w: ['Show it in bright light so people see detail', 'Add more monsters to distract from the flaws'], why: 'When the shark kept breaking, Spielberg suggested it, and the unseen proved scarier.' },
  { card: 'film-continuity', ask: 'I filmed two friends chatting, but when I edited it they seem to jump to opposite sides of the screen. What went wrong?', q: 'What is the likely cause?', a: 'The camera crossed the 180-degree line', w: ['The shots were too long', 'The microphone was too far away'], why: 'Crossing the line between two people flips who faces left and right.' },
  { card: 'film-macguffin', ask: 'My story is about a heist, and I\'ve spent weeks explaining exactly how the stolen gem works. My readers are bored. Help!', q: 'What would you suggest?', a: 'Treat the gem as a MacGuffin; focus on the chase', w: ['Add even more detail about the gem', 'Remove the characters and describe the gem only'], why: 'A MacGuffin drives the plot; the audience cares about the chase, not the object.' },
  { card: 'film-india', ask: 'A friend from Chennai says he loves Tamil films, so I told him I\'m a big Bollywood fan too. He looked puzzled. Why?', q: 'What did the visitor get wrong?', a: 'Bollywood means Hindi films from Mumbai, not Tamil films', w: ['Bollywood only makes silent films', 'Tamil films are mostly made in Hollywood'], why: 'Bollywood is only the Hindi-language industry; Tamil cinema is its own industry.' },
  { card: 'film-new-wave', ask: 'My vlog footage has long awkward pauses while I think. I want it to feel snappy without reshooting. What can I do?', q: 'Which editing technique fits?', a: 'Use jump cuts to trim out the pauses', w: ['Use a dolly zoom on every sentence', 'Keep it as one long unbroken take'], why: 'Jump cuts snip pieces from a continuous shot, the trick popularised by Breathless.' },
];
