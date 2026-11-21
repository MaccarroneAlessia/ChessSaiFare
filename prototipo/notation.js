// Sample notation lessons for the public prototype. The full set is kept in the private content repository.
var NOTATION = [
  {
    "id": "coord",
    "kids": true,
    "title": "Le coordinate",
    "kid": "Il nome delle case",
    "text": "<p>La scacchiera è una griglia 8×8. Le <strong>colonne</strong> sono le file verticali e si chiamano con le lettere <strong>a, b, c, d, e, f, g, h</strong>, da sinistra a destra visto dal bianco. Le <strong>traverse</strong> sono le file orizzontali e si numerano da <strong>1 a 8</strong>, partendo dal lato del bianco.</p><p>Ogni casa ha un nome solo: prima la lettera della colonna, poi il numero della traversa. Il re bianco parte da <strong>e1</strong>, quello nero da <strong>e8</strong>. La casa in basso a sinistra (a1) è sempre scura.</p>",
    "kidText": "<p>Ogni casa della scacchiera ha un nome, come una via con il numero civico!</p><p>Prima la <strong>lettera</strong> (da a ad h, da sinistra a destra), poi il <strong>numero</strong> (da 1 a 8, dal basso in alto). Il re bianco abita in <strong>e1</strong>!</p>",
    "examples": [
      {
        "moves": [],
        "mark": "e4",
        "note": "Colonna e, traversa 4: la casa si chiama e4."
      },
      {
        "moves": [],
        "mark": "g8",
        "note": "Il cavallo nero parte da g8: colonna g, traversa 8."
      }
    ]
  },
  {
    "id": "pieces",
    "kids": true,
    "title": "Le lettere dei pezzi",
    "kid": "Le iniziali dei pezzi",
    "text": "<p>Ogni pezzo si indica con una lettera maiuscola. In italiano: <strong>R</strong> re, <strong>D</strong> donna, <strong>T</strong> torre, <strong>A</strong> alfiere, <strong>C</strong> cavallo. Il <strong>pedone non ha lettera</strong>.</p><p>Nei libri internazionali e nei siti si usano le iniziali inglesi: <strong>K</strong> king, <strong>Q</strong> queen, <strong>R</strong> rook, <strong>B</strong> bishop, <strong>N</strong> knight. Attenzione: R in italiano è il re, in inglese è la torre.</p>",
    "kidText": "<p>Ogni pezzo ha la sua iniziale: <strong>R</strong> re, <strong>D</strong> donna (la regina), <strong>T</strong> torre, <strong>A</strong> alfiere, <strong>C</strong> cavallo.</p><p>Il pedone è così piccolo che non ha nemmeno la lettera!</p>",
    "examples": [
      {
        "moves": [],
        "play": "Nf3",
        "note": "Il cavallo va in f3: si scrive C (cavallo) + f3."
      },
      {
        "moves": [
          "e4",
          "e5"
        ],
        "play": "Bc4",
        "note": "L’alfiere va in c4: A + c4."
      }
    ]
  }
];

// Inglese → italiano: solo le lettere maiuscole dei pezzi (le colonne sono minuscole)
var PIECE_IT = { K: 'R', Q: 'D', R: 'T', B: 'A', N: 'C' };
var PIECE_EN = { R: 'K', D: 'Q', T: 'R', A: 'B', C: 'N' };
var PIECE_NAME = { K: 're', Q: 'donna', R: 'torre', B: 'alfiere', N: 'cavallo' };
function sanIt(san) { return String(san).replace(/[KQRBN]/g, function (c) { return PIECE_IT[c]; }); }
function sanFromIt(s) { return String(s).replace(/[RDTAC]/g, function (c) { return PIECE_EN[c]; }); }
// Scompone una mossa in parti spiegate
function sanParts(san) {
  if (/^O-O-O/.test(san)) return [{ s: 'O-O-O', d: 'arrocco lungo' }].concat(/[+#]$/.test(san) ? [{ s: san.slice(-1), d: san.slice(-1) === '#' ? 'scacco matto' : 'scacco' }] : []);
  if (/^O-O/.test(san)) return [{ s: 'O-O', d: 'arrocco corto' }].concat(/[+#]$/.test(san) ? [{ s: san.slice(-1), d: san.slice(-1) === '#' ? 'scacco matto' : 'scacco' }] : []);
  var m = san.match(/^([KQRBN])?([a-h])?([1-8])?(x)?([a-h][1-8])(=([QRBN]))?([+#])?$/);
  if (!m) return [{ s: san, d: '' }];
  var out = [];
  if (m[1]) out.push({ s: m[1], d: PIECE_NAME[m[1]] });
  else out.push({ s: '', d: 'pedone (nessuna lettera)' });
  if (m[2] || m[3]) out.push({ s: (m[2] || '') + (m[3] || ''), d: m[1] ? 'parte da ' + (m[2] ? 'colonna ' + m[2] : 'traversa ' + m[3]) : 'colonna di partenza del pedone' });
  if (m[4]) out.push({ s: 'x', d: 'cattura' });
  out.push({ s: m[5], d: 'casa di arrivo' });
  if (m[6]) out.push({ s: '=' + m[7], d: 'promozione a ' + PIECE_NAME[m[7]] });
  if (m[8]) out.push({ s: m[8], d: m[8] === '#' ? 'scacco matto' : 'scacco' });
  return out;
}
if (typeof module !== 'undefined') module.exports = { NOTATION: NOTATION, sanIt: sanIt, sanFromIt: sanFromIt, sanParts: sanParts };
