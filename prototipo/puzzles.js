// Sample puzzles for the public prototype. The full set is kept in the private content repository.
var PUZZLES = [
  {
    "id": "m1",
    "theme": "matto",
    "title": "Matto sulla traversa",
    "kid": "Il re chiuso in casa",
    "fen": "6k1/5ppp/8/8/8/8/8/4R1K1 w - - 0 1",
    "sol": [
      "Re8#"
    ],
    "t": "I pedoni f7, g7 e h7 chiudono il loro stesso re: la torre in e8 dà scacco su tutta l’ottava traversa e il re non ha case libere. È il matto “del corridoio”: lascia sempre una via di fuga al tuo re.",
    "k": "Il re nero è chiuso dai suoi pedoni come in una stanza senza porte! La torre arriva in fondo e… scacco matto!"
  },
  {
    "id": "m2",
    "theme": "matto",
    "title": "Il matto del barbiere",
    "kid": "La regina colpisce f7",
    "moves": [
      "e4",
      "e5",
      "Bc4",
      "Nc6",
      "Qh5",
      "Nf6"
    ],
    "sol": [
      "Qxf7#"
    ],
    "t": "La donna cattura in f7 protetta dall’alfiere c4: il re non può riprendere e non ha case di fuga. Il nero doveva difendere f7 con g6 o De7.",
    "k": "La regina mangia il pedone f7 e il suo amico alfiere la protegge. Il re nero non può scappare!"
  }
];
var THEMES = [
  {
    "id": "matto",
    "name": "Scacco matto",
    "kid": "Il gran finale",
    "desc": "Schemi di matto da riconoscere a colpo d’occhio."
  },
  {
    "id": "forchetta",
    "name": "Forchetta",
    "kid": "Doppio attacco",
    "desc": "Un pezzo attacca due bersagli insieme."
  },
  {
    "id": "inchiodatura",
    "name": "Inchiodatura",
    "kid": "Pezzo incollato",
    "desc": "Un pezzo non può muoversi senza scoprire qualcosa di più prezioso."
  },
  {
    "id": "infilata",
    "name": "Infilata",
    "kid": "Attacco a spiedino",
    "desc": "Si attacca il pezzo davanti per prendere quello dietro."
  },
  {
    "id": "scoperta",
    "name": "Attacco di scoperta",
    "kid": "Il pezzo nascosto",
    "desc": "Un pezzo si sposta e libera l’attacco di un altro."
  },
  {
    "id": "aperture",
    "name": "Aperture",
    "kid": "Le prime mosse",
    "desc": "Le mosse giuste nei primi momenti della partita."
  },
  {
    "id": "finali",
    "name": "Finali",
    "kid": "Arrivare in fondo",
    "desc": "Promozione e matti con pochi pezzi."
  }
];
if (typeof module !== 'undefined') module.exports = { PUZZLES: PUZZLES, THEMES: THEMES };
