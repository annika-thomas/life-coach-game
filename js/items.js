// Everything the creature can build. `slot` is the island tile [x, z] it is
// placed on (see MAP in world.js). `req` decides when it unlocks:
//   { type: 'none' }                         always available
//   { type: 'cat', cat, n }                  n answered lessons in a category
//   { type: 'lessons', n }                   n answered lessons in total
//   { type: 'log', kind, n }                 n logged real-world actions of a kind
export const ITEMS = [
  // Starters — so there is something to spend the very first energy on.
  { id: 'flowerbed', name: 'Flower bed',  emoji: '🌷', cost: 1, slot: [8, 6],  req: { type: 'none' } },
  { id: 'appletree', name: 'Apple tree',  emoji: '🍎', cost: 2, slot: [3, 9],  req: { type: 'none' } },
  { id: 'bench',     name: 'Wooden bench', emoji: '🪑', cost: 2, slot: [8, 9], req: { type: 'none' } },

  // One per curriculum category — the world reflects what you learned.
  { id: 'kiosk',      name: 'News kiosk',          emoji: '🗞️', cost: 3, slot: [13, 9],  req: { type: 'cat', cat: 'news', n: 1 } },
  { id: 'robot',      name: 'Little robot helper', emoji: '🤖', cost: 4, slot: [12, 14], req: { type: 'cat', cat: 'robotics', n: 1 } },
  { id: 'dressform',  name: 'Dress form',          emoji: '👗', cost: 3, slot: [8, 4],   req: { type: 'cat', cat: 'fashion', n: 1 } },
  { id: 'trellis',    name: 'Vine trellis',        emoji: '🍇', cost: 3, slot: [2, 1],   req: { type: 'cat', cat: 'wine', n: 1 } },
  { id: 'cheesecart', name: 'Cheese cart',         emoji: '🧀', cost: 3, slot: [11, 9],  req: { type: 'cat', cat: 'cheese', n: 1 } },
  { id: 'cinema',     name: 'Outdoor cinema',      emoji: '🎬', cost: 4, slot: [1, 15],  req: { type: 'cat', cat: 'film', n: 1 } },
  { id: 'grill',      name: 'Garden kitchen',      emoji: '🍳', cost: 3, slot: [9, 12],  req: { type: 'cat', cat: 'food', n: 1 } },
  { id: 'signpost',   name: 'Travel signpost',     emoji: '🧭', cost: 2, slot: [11, 16], req: { type: 'cat', cat: 'travel', n: 1 } },
  { id: 'easel',      name: 'Easel with a colour-field canvas', emoji: '🎨', cost: 3, slot: [4, 12], req: { type: 'cat', cat: 'art', n: 1 } },
  { id: 'lanterns',   name: 'Paper lanterns',      emoji: '🏮', cost: 3, slot: [5, 9],   req: { type: 'cat', cat: 'culture', n: 1 } },
  { id: 'column',     name: 'Thinking column',     emoji: '🏛️', cost: 4, slot: [8, 1],   req: { type: 'cat', cat: 'philosophy', n: 1 } },
  { id: 'galton',     name: 'Galton board',        emoji: '🎲', cost: 4, slot: [7, 13],  req: { type: 'cat', cat: 'stats', n: 1 } },
  { id: 'telescope',  name: 'Telescope',           emoji: '🔭', cost: 4, slot: [14, 2],  req: { type: 'cat', cat: 'science', n: 1 } },
  { id: 'library',    name: 'Little library',      emoji: '📚', cost: 3, slot: [5, 1],   req: { type: 'cat', cat: 'history', n: 1 } },

  // Real-world actions build real-world things.
  { id: 'pullupbar', name: 'Pull-up bar',     emoji: '🏋️', cost: 3, slot: [13, 4],  req: { type: 'log', kind: 'workout', n: 3 } },
  { id: 'lamppost',  name: 'Path lamp',       emoji: '🏮', cost: 2, slot: [11, 7],  req: { type: 'log', kind: 'walk', n: 3 } },
  { id: 'picnic',    name: 'Picnic blanket',  emoji: '🧺', cost: 3, slot: [1, 11],  req: { type: 'log', kind: 'cooked', n: 2 } },
  { id: 'hammock',   name: 'Reading hammock', emoji: '📖', cost: 3, slot: [14, 15], req: { type: 'log', kind: 'read', n: 2 } },

  // Bigger milestones.
  { id: 'peachtree', name: 'Peach tree',      emoji: '🍑', cost: 3, slot: [12, 11], req: { type: 'lessons', n: 10 } },
  { id: 'fountain',  name: 'Stone fountain',  emoji: '⛲', cost: 6, slot: [8, 15],  req: { type: 'lessons', n: 20 } },
];

export const ITEM_BY_ID = Object.fromEntries(ITEMS.map((i) => [i.id, i]));
