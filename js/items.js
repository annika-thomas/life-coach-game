// Everything the creature can build, grouped into districts.
//
// Topic items: three per curriculum category.
//   level 1  the signature item. Its plan appears after you read a card in
//            that topic; you can build it once you've recalled the topic at
//            the dock. It grows (stages 1-3) as your mastery rises.
//   level 2  unlocks at topic mastery 2
//   level 3  unlocks at topic mastery 3
// Other items: starters, real-world logs, and milestones.
//
// `slot` is the island tile [x, z] (see MAP in world.js).
export const DISTRICTS = {
  square:      { name: 'Town square',      keeper: 'fennel', cats: ['news', 'travel', 'history'] },
  arts:        { name: 'Arts corner',      keeper: 'maple',  cats: ['art', 'film', 'fashion', 'culture'] },
  market:      { name: 'Market street',    keeper: 'pepper', cats: ['food', 'wine', 'cheese'] },
  observatory: { name: 'Observatory hill', keeper: 'sage',   cats: ['science', 'stats', 'robotics', 'philosophy'] },
};

const T = (id, name, cat, level, cost, slot) => ({ id, name, cost, slot, req: { type: 'cat', cat, level }, signature: level === 1 });

export const ITEMS = [
  // Starters, so there is something to spend the very first energy on.
  { id: 'flowerbed', name: 'Flower bed',   cost: 1, slot: [8, 7],  req: { type: 'none' } },
  { id: 'appletree', name: 'Apple tree',   cost: 2, slot: [7, 5],  req: { type: 'none' } },
  { id: 'bench',     name: 'Wooden bench', cost: 2, slot: [6, 9],  req: { type: 'none' } },

  // Town square: news, travel, history
  T('kiosk',     'News kiosk',        'news',    1, 3, [9, 10]),
  T('podium',    'Town crier podium', 'news',    2, 3, [11, 10]),
  T('clocktower','Clock tower',       'news',    3, 5, [14, 5]),
  T('signpost',  'Travel signpost',   'travel',  1, 2, [6, 10]),
  T('globe',     'Globe on a stand',  'travel',  2, 3, [13, 10]),
  T('balloon',   'Hot air balloon',   'travel',  3, 5, [15, 8]),
  T('library',   'Little library',    'history', 1, 3, [6, 7]),
  T('sundial',   'Sundial',           'history', 2, 3, [12, 10]),
  T('pyramid',   'Little pyramid',    'history', 3, 4, [14, 9]),

  // Arts corner: art, film, fashion, culture
  T('easel',     'Easel',             'art',     1, 3, [-16, 8]),
  T('sculpture', 'Sculpture',         'art',     2, 3, [-15, 6]),
  T('mural',     'Mural wall',        'art',     3, 5, [-18, 6]),
  T('cinema',    'Outdoor cinema',    'film',    1, 4, [-5, 13]),
  T('dirchair',  'Director\'s chair', 'film',    2, 2, [-7, 14]),
  T('popcorn',   'Popcorn cart',      'film',    3, 3, [-3, 14]),
  T('dressform', 'Dress form',        'fashion', 1, 3, [-6, 6]),
  T('rack',      'Clothes rack',      'fashion', 2, 3, [-4, 6]),
  T('runway',    'Little runway',     'fashion', 3, 4, [-5, 8]),
  T('lanterns',  'Paper lanterns',    'culture', 1, 3, [-14, 13]),
  T('teatable',  'Tea table',         'culture', 2, 3, [-17, 13]),
  T('arch',      'Marigold arch',     'culture', 3, 4, [-15, 15]),

  // Market street: food, wine, cheese
  T('grill',     'Garden kitchen',    'food',    1, 3, [26, 7]),
  T('veggies',   'Vegetable patch',   'food',    2, 3, [24, 14]),
  T('pizzaoven', 'Pizza oven',        'food',    3, 5, [27, 13]),
  T('trellis',   'Vine trellis',      'wine',    1, 3, [37, 6]),
  T('barrels',   'Wine barrels',      'wine',    2, 3, [39, 8]),
  T('tasting',   'Tasting table',     'wine',    3, 4, [37, 9]),
  T('cheesecart','Cheese cart',       'cheese',  1, 3, [34, 13]),
  T('cow',       'Dairy cow',         'cheese',  2, 4, [36, 15]),
  T('fondue',    'Fondue table',      'cheese',  3, 4, [30, 14]),

  // Observatory hill: science, stats, robotics, philosophy
  T('telescope', 'Telescope',         'science', 1, 4, [14, -11]),
  T('labbench',  'Lab bench',         'science', 2, 3, [17, -9]),
  T('orrery',    'Orrery',            'science', 3, 5, [19, -12]),
  T('galton',    'Galton board',      'stats',   1, 4, [2, -4]),
  T('dice',      'Giant dice',        'stats',   2, 2, [3, -9]),
  T('bellhedge', 'Bell curve hedge',  'stats',   3, 4, [0, -12]),
  T('robot',     'Little robot',      'robotics',1, 4, [8, -4]),
  T('robotarm',  'Robot arm',         'robotics',2, 4, [13, -4]),
  T('rover',     'Mapping rover',     'robotics',3, 5, [11, -1]),
  T('column',    'Thinking column',   'philosophy', 1, 4, [20, -4]),
  T('chess',     'Chess table',       'philosophy', 2, 3, [21, -1]),
  T('theseus',   'Ship of Theseus',   'philosophy', 3, 5, [-1, -3]),

  // Real-world actions build real-world things (near the gym).
  { id: 'pullupbar', name: 'Pull-up bar',     cost: 3, slot: [18, 7],  req: { type: 'log', kind: 'workout', n: 3 } },
  { id: 'lamppost',  name: 'Path lamp',       cost: 2, slot: [15, 12], req: { type: 'log', kind: 'walk', n: 3 } },
  { id: 'picnic',    name: 'Picnic blanket',  cost: 3, slot: [14, 18], req: { type: 'log', kind: 'cooked', n: 2 } },
  { id: 'hammock',   name: 'Reading hammock', cost: 3, slot: [19, 13], req: { type: 'log', kind: 'read', n: 2 } },

  // Milestones.
  { id: 'peachtree', name: 'Peach tree',      cost: 3, slot: [20, 16], req: { type: 'lessons', n: 10 } },
  { id: 'fountain',  name: 'Stone fountain',  cost: 6, slot: [18, 12], req: { type: 'lessons', n: 20 } },
];

export const ITEM_BY_ID = Object.fromEntries(ITEMS.map((i) => [i.id, i]));
export const SIGNATURE = Object.fromEntries(ITEMS.filter((i) => i.signature).map((i) => [i.req.cat, i.id]));
