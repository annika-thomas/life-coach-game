// Everything the creature can build. `slot` is the island tile [x, z] it is
// placed on (see MAP in world.js). Learning things sit near the library,
// workout things near the gym, food along the south path. `req` decides when it unlocks:
//   { type: 'none' }                         always available
//   { type: 'cat', cat, n }                  n answered lessons in a category
//   { type: 'lessons', n }                   n answered lessons in total
//   { type: 'log', kind, n }                 n logged real-world actions of a kind
export const ITEMS = [
  // Starters, so there is something to spend the very first energy on.
  { id: 'flowerbed', name: 'Flower bed',  cost: 1, slot: [7, 6],  req: { type: 'none' } },
  { id: 'appletree', name: 'Apple tree',  cost: 2, slot: [5, 12],  req: { type: 'none' } },
  { id: 'bench',     name: 'Wooden bench', cost: 2, slot: [6, 8], req: { type: 'none' } },

  // One per curriculum category: the world reflects what you learned.
  { id: 'kiosk',      name: 'News kiosk',          cost: 3, slot: [11, 11],  req: { type: 'cat', cat: 'news', n: 1 } },
  { id: 'robot',      name: 'Little robot helper', cost: 4, slot: [15, 7], req: { type: 'cat', cat: 'robotics', n: 1 } },
  { id: 'dressform',  name: 'Dress form',          cost: 3, slot: [6, 5],   req: { type: 'cat', cat: 'fashion', n: 1 } },
  { id: 'trellis',    name: 'Vine trellis',        cost: 3, slot: [2, 2],   req: { type: 'cat', cat: 'wine', n: 1 } },
  { id: 'cheesecart', name: 'Cheese cart',         cost: 3, slot: [7, 11],  req: { type: 'cat', cat: 'cheese', n: 1 } },
  { id: 'cinema',     name: 'Outdoor cinema',      cost: 4, slot: [2, 14],  req: { type: 'cat', cat: 'film', n: 1 } },
  { id: 'grill',      name: 'Garden kitchen',      cost: 3, slot: [9, 11],  req: { type: 'cat', cat: 'food', n: 1 } },
  { id: 'signpost',   name: 'Travel signpost',     cost: 2, slot: [9, 15], req: { type: 'cat', cat: 'travel', n: 1 } },
  { id: 'easel',      name: 'Easel with a colour-field canvas', cost: 3, slot: [1, 11], req: { type: 'cat', cat: 'art', n: 1 } },
  { id: 'lanterns',   name: 'Paper lanterns',      cost: 3, slot: [4, 11],   req: { type: 'cat', cat: 'culture', n: 1 } },
  { id: 'column',     name: 'Thinking column',     cost: 4, slot: [6, 2],   req: { type: 'cat', cat: 'philosophy', n: 1 } },
  { id: 'galton',     name: 'Galton board',        cost: 4, slot: [1, 8],  req: { type: 'cat', cat: 'stats', n: 1 } },
  { id: 'telescope',  name: 'Telescope',           cost: 4, slot: [12, 2],  req: { type: 'cat', cat: 'science', n: 1 } },
  { id: 'library',    name: 'Little library',      cost: 3, slot: [5, 8],   req: { type: 'cat', cat: 'history', n: 1 } },

  // Real-world actions build real-world things.
  { id: 'pullupbar', name: 'Pull-up bar',     cost: 3, slot: [15, 8],  req: { type: 'log', kind: 'workout', n: 3 } },
  { id: 'lamppost',  name: 'Path lamp',       cost: 2, slot: [13, 11],  req: { type: 'log', kind: 'walk', n: 3 } },
  { id: 'picnic',    name: 'Picnic blanket',  cost: 3, slot: [11, 14],  req: { type: 'log', kind: 'cooked', n: 2 } },
  { id: 'hammock',   name: 'Reading hammock', cost: 3, slot: [16, 11], req: { type: 'log', kind: 'read', n: 2 } },

  // Bigger milestones.
  { id: 'peachtree', name: 'Peach tree',      cost: 3, slot: [16, 15], req: { type: 'lessons', n: 10 } },
  { id: 'fountain',  name: 'Stone fountain',  cost: 6, slot: [11, 13],  req: { type: 'lessons', n: 20 } },
];

export const ITEM_BY_ID = Object.fromEntries(ITEMS.map((i) => [i.id, i]));
