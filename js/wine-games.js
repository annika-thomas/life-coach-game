// Data for Pepper's wine games: regions on a map, and typical style profiles.
// Coordinates are real (lat, lon) so dots land in the right place.

export const REGIONS = [
  // France
  { id: 'bordeaux',   name: 'Bordeaux',          map: 'europe', lat: 44.84, lon: -0.58, country: 'France',   known: 'Red blends of Cabernet Sauvignon and Merlot, plus sweet Sauternes.', words: ['bordeaux', 'médoc', 'sauternes', 'saint-émilion'] },
  { id: 'burgundy',   name: 'Burgundy',          map: 'europe', lat: 47.05, lon: 4.83,  country: 'France',   known: 'Pinot Noir and Chardonnay, ranked down to the single vineyard.', words: ['burgundy', 'chablis', 'beaune'] },
  { id: 'champagne',  name: 'Champagne',         map: 'europe', lat: 49.05, lon: 4.02,  country: 'France',   known: 'Sparkling wine from Chardonnay, Pinot Noir and Pinot Meunier.', words: ['champagne'] },
  { id: 'loire',      name: 'Loire Valley',      map: 'europe', lat: 47.3,  lon: 1.2,   country: 'France',   known: 'Sauvignon Blanc (Sancerre) and Chenin Blanc (Vouvray).', words: ['loire', 'sancerre', 'vouvray'] },
  { id: 'alsace',     name: 'Alsace',            map: 'europe', lat: 48.1,  lon: 7.35,  country: 'France',   known: 'Riesling and Gewürztraminer, in tall flute bottles.', words: ['alsace'] },
  { id: 'rhone',      name: 'Rhône Valley',      map: 'europe', lat: 44.9,  lon: 4.85,  country: 'France',   known: 'Syrah in the north; Grenache blends like Châteauneuf-du-Pape in the south.', words: ['rhône', 'rhone', 'châteauneuf'] },
  { id: 'provence',   name: 'Provence',          map: 'europe', lat: 43.45, lon: 6.2,   country: 'France',   known: 'Pale, dry rosé.', words: ['provence'] },
  // Spain and Portugal
  { id: 'rioja',      name: 'Rioja',             map: 'europe', lat: 42.45, lon: -2.5,  country: 'Spain',    known: 'Tempranillo, often aged in oak (Crianza, Reserva, Gran Reserva).', words: ['rioja'] },
  { id: 'ribera',     name: 'Ribera del Duero',  map: 'europe', lat: 41.65, lon: -3.9,  country: 'Spain',    known: 'Powerful Tempranillo reds.', words: ['ribera'] },
  { id: 'priorat',    name: 'Priorat',           map: 'europe', lat: 41.2,  lon: 0.8,   country: 'Spain',    known: 'Dense Garnacha and Cariñena from steep slate slopes.', words: ['priorat'] },
  { id: 'jerez',      name: 'Jerez',             map: 'europe', lat: 36.68, lon: -6.13, country: 'Spain',    known: 'Sherry, mostly from the Palomino grape.', words: ['jerez', 'sherry'] },
  { id: 'douro',      name: 'Douro Valley',      map: 'europe', lat: 41.16, lon: -7.6,  country: 'Portugal', known: 'Port, and more and more dry red wine.', words: ['douro', 'port'] },
  // Italy
  { id: 'piedmont',   name: 'Piedmont',          map: 'europe', lat: 44.65, lon: 8.0,   country: 'Italy',    known: 'Nebbiolo: Barolo and Barbaresco.', words: ['piedmont', 'barolo', 'barbaresco', 'nebbiolo'] },
  { id: 'tuscany',    name: 'Tuscany',           map: 'europe', lat: 43.5,  lon: 11.25, country: 'Italy',    known: 'Sangiovese: Chianti and Brunello di Montalcino.', words: ['tuscany', 'chianti', 'brunello', 'sangiovese'] },
  { id: 'veneto',     name: 'Veneto',            map: 'europe', lat: 45.55, lon: 11.6,  country: 'Italy',    known: 'Prosecco, Valpolicella and Amarone.', words: ['veneto', 'prosecco', 'amarone', 'valpolicella'] },
  { id: 'sicily',     name: 'Sicily',            map: 'europe', lat: 37.55, lon: 14.1,  country: 'Italy',    known: 'Nero d\'Avola, and wines from the slopes of Etna.', words: ['sicily', 'etna'] },
  // Germany
  { id: 'mosel',      name: 'Mosel',             map: 'europe', lat: 49.95, lon: 6.95,  country: 'Germany',  known: 'Riesling from steep slate slopes, often light and off-dry.', words: ['mosel'] },
  { id: 'rheingau',   name: 'Rheingau',          map: 'europe', lat: 50.0,  lon: 8.05,  country: 'Germany',  known: 'Riesling along the Rhine.', words: ['rheingau'] },
  // New World
  { id: 'napa',       name: 'Napa Valley',       map: 'world',  lat: 38.4,  lon: -122.35, country: 'USA',          known: 'Rich Cabernet Sauvignon.', words: ['napa', 'california'] },
  { id: 'willamette', name: 'Willamette Valley', map: 'world',  lat: 45.1,  lon: -123.0,  country: 'USA',          known: 'Pinot Noir.', words: ['willamette', 'oregon'] },
  { id: 'mendoza',    name: 'Mendoza',           map: 'world',  lat: -33.0, lon: -68.8,   country: 'Argentina',    known: 'Malbec, grown at high altitude.', words: ['mendoza', 'malbec', 'argentina'] },
  { id: 'marlborough',name: 'Marlborough',       map: 'world',  lat: -41.5, lon: 173.9,   country: 'New Zealand',  known: 'Zesty Sauvignon Blanc.', words: ['marlborough', 'new zealand'] },
  { id: 'barossa',    name: 'Barossa Valley',    map: 'world',  lat: -34.5, lon: 138.95,  country: 'Australia',    known: 'Ripe, full-bodied Shiraz.', words: ['barossa', 'shiraz', 'australia'] },
  { id: 'stellenbosch', name: 'Stellenbosch',    map: 'world',  lat: -33.93, lon: 18.86,  country: 'South Africa', known: 'Chenin Blanc and Pinotage.', words: ['stellenbosch', 'south africa', 'pinotage'] },
];

// Typical profiles on a 1-5 scale. These are the textbook middle of each
// style; individual bottles vary, so within 1 step counts as right.
export const STYLES = [
  { name: 'Marlborough Sauvignon Blanc', grape: 'Sauvignon Blanc', colour: 'white', sweet: 1, acid: 5, tannin: 1, body: 2, note: 'Bone dry and zesty: high acid, light body, no tannin (it is a white).' },
  { name: 'Chablis',                     grape: 'Chardonnay, unoaked', colour: 'white', sweet: 1, acid: 4, tannin: 1, body: 2, note: 'Cool-climate Chardonnay: crisp, lean and dry.' },
  { name: 'Oaked California Chardonnay', grape: 'Chardonnay', colour: 'white', sweet: 1, acid: 3, tannin: 1, body: 4, note: 'Warm climate and oak make it rich and round with moderate acid.' },
  { name: 'Mosel Riesling Kabinett',     grape: 'Riesling', colour: 'white', sweet: 3, acid: 5, tannin: 1, body: 1, note: 'Often off-dry, with very high acid that balances the sugar, and very light.' },
  { name: 'Alsace Gewürztraminer',       grape: 'Gewürztraminer', colour: 'white', sweet: 2, acid: 2, tannin: 1, body: 4, note: 'Low acid, full body, often a touch of sweetness and lychee perfume.' },
  { name: 'Sauternes',                   grape: 'Sémillon and Sauvignon Blanc', colour: 'sweet white', sweet: 5, acid: 4, tannin: 1, body: 5, note: 'Lusciously sweet, with enough acid to stay fresh.' },
  { name: 'Champagne Brut',              grape: 'Chardonnay, Pinot Noir, Pinot Meunier', colour: 'sparkling', sweet: 1, acid: 5, tannin: 1, body: 2, note: 'Brut means dry. Very high acid, light body.' },
  { name: 'Provence rosé',               grape: 'Grenache and Cinsault, mostly', colour: 'rosé', sweet: 1, acid: 4, tannin: 1, body: 2, note: 'Pale, dry and crisp.' },
  { name: 'Red Burgundy',                grape: 'Pinot Noir', colour: 'red', sweet: 1, acid: 4, tannin: 2, body: 2, note: 'Light-bodied red with high acid and soft tannin.' },
  { name: 'Beaujolais',                  grape: 'Gamay', colour: 'red', sweet: 1, acid: 4, tannin: 2, body: 2, note: 'Juicy and light, low tannin. Often served slightly cool.' },
  { name: 'Barolo',                      grape: 'Nebbiolo', colour: 'red', sweet: 1, acid: 5, tannin: 5, body: 4, note: 'Pale-looking but fierce: high acid and very high tannin.' },
  { name: 'Chianti Classico',            grape: 'Sangiovese', colour: 'red', sweet: 1, acid: 4, tannin: 4, body: 3, note: 'Savoury, high acid, firm tannin, medium body. Made for food.' },
  { name: 'Rioja Reserva',               grape: 'Tempranillo', colour: 'red', sweet: 1, acid: 3, tannin: 3, body: 3, note: 'Medium all round, softened by oak ageing.' },
  { name: 'Mendoza Malbec',              grape: 'Malbec', colour: 'red', sweet: 1, acid: 3, tannin: 4, body: 4, note: 'Plush and dark, with ripe tannin and full body.' },
  { name: 'Napa Cabernet Sauvignon',     grape: 'Cabernet Sauvignon', colour: 'red', sweet: 1, acid: 3, tannin: 5, body: 5, note: 'Big, ripe and structured: high tannin, full body.' },
  { name: 'Barossa Shiraz',              grape: 'Shiraz (Syrah)', colour: 'red', sweet: 1, acid: 3, tannin: 4, body: 5, note: 'Warm-climate Shiraz: full-bodied and ripe.' },
  { name: 'Amarone',                     grape: 'Corvina, with dried grapes', colour: 'red', sweet: 2, acid: 3, tannin: 4, body: 5, note: 'Made from dried grapes: very full and rich, usually dry but can feel slightly sweet.' },
  { name: 'Ruby Port',                   grape: 'Touriga Nacional and others', colour: 'fortified red', sweet: 5, acid: 3, tannin: 4, body: 5, note: 'Fortified, sweet, full-bodied, with real tannin.' },
];
export const TRAITS = [
  { key: 'sweet', label: 'Sweetness', lo: 'Bone dry', hi: 'Sweet' },
  { key: 'acid', label: 'Acidity', lo: 'Soft', hi: 'Zingy' },
  { key: 'tannin', label: 'Tannin', lo: 'Smooth', hi: 'Grippy' },
  { key: 'body', label: 'Body', lo: 'Light', hi: 'Full' },
];

// Cheeses and where they come from (the town or area they're made in).
export const CHEESES = [
  { id: 'roquefort',  name: 'Roquefort',          map: 'europe', lat: 43.97, lon: 2.99,  country: 'France',   known: 'Sheep\'s milk blue, ripened in the natural caves of Mont Combalou.', words: ['roquefort'] },
  { id: 'comte',      name: 'Comté',              map: 'europe', lat: 46.84, lon: 5.71,  country: 'France',   known: 'Cow\'s milk from the Jura mountains: big, nutty wheels aged for months.', words: ['comté', 'comte'] },
  { id: 'camembert',  name: 'Camembert',          map: 'europe', lat: 48.89, lon: 0.18,  country: 'France',   known: 'Soft, bloomy-rind cow\'s milk cheese from Normandy.', words: ['camembert'] },
  { id: 'brie',       name: 'Brie de Meaux',      map: 'europe', lat: 48.96, lon: 2.88,  country: 'France',   known: 'A broad, flat bloomy-rind wheel from east of Paris.', words: ['brie'] },
  { id: 'reblochon',  name: 'Reblochon',          map: 'europe', lat: 45.88, lon: 6.32,  country: 'France',   known: 'Soft washed-rind cow\'s cheese from the Savoie Alps, the heart of tartiflette.', words: ['reblochon'] },
  { id: 'epoisses',   name: 'Époisses',           map: 'europe', lat: 47.51, lon: 4.17,  country: 'France',   known: 'Pungent washed rind, rinsed with marc de Bourgogne brandy.', words: ['époisses', 'epoisses'] },
  { id: 'crottin',    name: 'Crottin de Chavignol', map: 'europe', lat: 47.33, lon: 2.83, country: 'France',  known: 'A small goat\'s cheese from the Loire, classic with Sancerre.', words: ['crottin', 'chavignol'] },
  { id: 'munster',    name: 'Munster',            map: 'europe', lat: 48.04, lon: 7.13,  country: 'France',   known: 'Washed-rind cow\'s cheese from the Alsace side of the Vosges.', words: ['munster'] },
  { id: 'parmigiano', name: 'Parmigiano Reggiano', map: 'europe', lat: 44.75, lon: 10.45, country: 'Italy',   known: 'Hard cow\'s milk cheese from around Parma and Reggio Emilia, aged at least 12 months.', words: ['parmigiano', 'parmesan'] },
  { id: 'gorgonzola', name: 'Gorgonzola',         map: 'europe', lat: 45.53, lon: 9.4,   country: 'Italy',    known: 'Cow\'s milk blue from Lombardy and Piedmont: creamy dolce or firmer piccante.', words: ['gorgonzola'] },
  { id: 'taleggio',   name: 'Taleggio',           map: 'europe', lat: 45.89, lon: 9.56,  country: 'Italy',    known: 'Square, washed-rind cow\'s cheese from Lombardy\'s Val Taleggio.', words: ['taleggio'] },
  { id: 'pecorino',   name: 'Pecorino Romano',    map: 'europe', lat: 41.9,  lon: 12.5,  country: 'Italy',    known: 'Salty, hard sheep\'s cheese named for Rome, though most is now made in Sardinia.', words: ['pecorino'] },
  { id: 'mozzarella', name: 'Mozzarella di Bufala', map: 'europe', lat: 41.07, lon: 14.33, country: 'Italy',  known: 'Fresh stretched-curd cheese from water buffalo milk, from Campania.', words: ['mozzarella', 'bufala'] },
  { id: 'manchego',   name: 'Manchego',           map: 'europe', lat: 39.2,  lon: -3.0,  country: 'Spain',    known: 'Sheep\'s milk cheese from La Mancha, with a zigzag pattern on the rind.', words: ['manchego'] },
  { id: 'idiazabal',  name: 'Idiazabal',          map: 'europe', lat: 42.95, lon: -2.3,  country: 'Spain',    known: 'Basque sheep\'s milk cheese, often lightly smoked.', words: ['idiazabal'] },
  { id: 'estrela',    name: 'Serra da Estrela',   map: 'europe', lat: 40.4,  lon: -7.6,  country: 'Portugal', known: 'Soft sheep\'s cheese, curdled with thistle flowers instead of animal rennet.', words: ['serra da estrela'] },
  { id: 'gruyere',    name: 'Gruyère',            map: 'europe', lat: 46.58, lon: 7.08,  country: 'Switzerland', known: 'Firm, nutty cow\'s cheese from western Switzerland, a fondue staple.', words: ['gruyère', 'gruyere'] },
  { id: 'emmental',   name: 'Emmental',           map: 'europe', lat: 46.95, lon: 7.75,  country: 'Switzerland', known: 'Swiss cow\'s cheese famous for its holes.', words: ['emmental', 'swiss cheese'] },
  { id: 'gouda',      name: 'Gouda',              map: 'europe', lat: 52.01, lon: 4.71,  country: 'Netherlands', known: 'Dutch cow\'s cheese named after the town where it was traded.', words: ['gouda'] },
  { id: 'edam',       name: 'Edam',               map: 'europe', lat: 52.51, lon: 5.05,  country: 'Netherlands', known: 'A mild Dutch ball, coated in red wax for export.', words: ['edam'] },
  { id: 'cheddar',    name: 'Cheddar',            map: 'europe', lat: 51.28, lon: -2.78, country: 'England',  known: 'Named after a Somerset village. "Cheddaring" means stacking and turning the curd.', words: ['cheddar'] },
  { id: 'stilton',    name: 'Stilton',            map: 'europe', lat: 52.77, lon: -0.89, country: 'England',  known: 'English blue made in three counties around Melton Mowbray, and not in the village of Stilton itself.', words: ['stilton'] },
  { id: 'feta',       name: 'Feta',               map: 'europe', lat: 39.5,  lon: 21.5,  country: 'Greece',   known: 'Brined sheep\'s milk cheese (up to 30% goat), protected to Greece.', words: ['feta'] },
];
