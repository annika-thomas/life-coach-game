// The card bank: 20+ cards per category, each with recall questions, an
// optional date (Timeline puzzle) and number (Guess of the day), plus
// advice requests for visitors.
import * as news from './news.js';
import * as robotics from './robotics.js';
import * as fashion from './fashion.js';
import * as wine from './wine.js';
import * as cheese from './cheese.js';
import * as film from './film.js';
import * as food from './food.js';
import * as travel from './travel.js';
import * as philosophy from './philosophy.js';
import * as stats from './stats.js';
import * as science from './science.js';
import * as history from './history.js';

export const CARD_SETS = { news, robotics, fashion, wine, cheese, film, food, travel, philosophy, stats, science, history };
