// Sample lessons for the public prototype. The full set is kept in the private content repository.
var LESSONS = [
  {
    "id": "italiana",
    "name": "Partita Italiana",
    "kidName": "L’attacco dell’alfiere",
    "level": "Principiante",
    "side": "bianco",
    "kids": true,
    "intro": "Benvenuto. Oggi studiamo la Partita Italiana, una delle aperture più antiche e logiche: centro, sviluppo rapido e un occhio puntato sul punto debole f7.",
    "kidIntro": "Ciao! Oggi impariamo una mossa da veri campioni: l’attacco dell’alfiere. Pronto? Si parte!",
    "steps": [
      {
        "san": "e4",
        "t": "Il bianco apre con il pedone di re di due case. Occupa il centro e libera la strada ad alfiere e donna.",
        "k": "Il pedone fa due passi avanti e si mette al centro. Il centro è il posto più importante!"
      },
      {
        "san": "e5",
        "t": "Il nero risponde allo stesso modo e contende il centro. Nessuno dei due cede spazio.",
        "k": "Il nero copia! Anche il suo pedone vuole il centro."
      },
      {
        "san": "Nf3",
        "t": "Il cavallo esce verso il centro e attacca subito il pedone in e5. Sviluppo con minaccia: il modo più efficiente di giocare.",
        "k": "Salta fuori il cavallo! E guarda: minaccia di mangiare il pedone nero."
      },
      {
        "san": "Nc6",
        "t": "Il nero difende e5 sviluppando a sua volta un cavallo. Ogni mossa fa due cose: difende e sviluppa.",
        "k": "Il nero protegge il suo pedone con un cavallo. Bravo nero!"
      },
      {
        "san": "Bc4",
        "t": "Ecco la mossa che dà il nome all’apertura. L’alfiere punta f7, la casa più debole del nero perché difesa solo dal re.",
        "k": "L’alfiere corre in diagonale e guarda la casa f7, vicino al re nero. Occhio, re!"
      },
      {
        "san": "Bc5",
        "t": "Il nero sceglie la simmetria: anche il suo alfiere guarda f2. Siamo nel Giuoco Piano.",
        "k": "Il nero fa lo stesso trucco con il suo alfiere."
      },
      {
        "san": "c3",
        "t": "Mossa tranquilla ma profonda: il bianco prepara d4 per costruire un centro di due pedoni.",
        "k": "Un pedone piccolo piccolo prepara una sorpresa per dopo."
      },
      {
        "san": "Nf6",
        "t": "Il nero sviluppa l’altro cavallo e attacca il pedone e4. Il gioco si scalda.",
        "k": "Un altro cavallo nero salta fuori e guarda il pedone bianco."
      },
      {
        "san": "d4",
        "t": "Il bianco colpisce il centro. Se il nero cattura, il bianco riprende con il pedone e avrà due pedoni centrali.",
        "k": "Bum! Il pedone bianco attacca al centro."
      },
      {
        "san": "exd4",
        "t": "Il nero cattura: lasciare la tensione sarebbe pericoloso.",
        "k": "Il nero mangia il pedone. Gnam!"
      },
      {
        "san": "cxd4",
        "t": "Ora il bianco ha un centro forte con e4 e d4. Il piano: arroccare, completare lo sviluppo, poi spingere. Ricorda le tre idee: centro, sviluppo, sicurezza del re.",
        "k": "Il bianco riprende e ha due pedoni al centro, come due guardie. Le regole d’oro: centro, fuori i pezzi, re al sicuro!"
      }
    ]
  },
  {
    "id": "siciliana",
    "name": "Difesa Siciliana",
    "kidName": "La Siciliana",
    "level": "Intermedio",
    "side": "nero",
    "kids": false,
    "intro": "La Difesa Siciliana è la risposta più combattiva a e4. Il nero rinuncia alla simmetria per creare una posizione sbilanciata e giocare per vincere.",
    "kidIntro": "La Siciliana è la difesa dei coraggiosi!",
    "steps": [
      {
        "san": "e4",
        "t": "Il bianco apre con e4, occupando il centro.",
        "k": "Pedone al centro!"
      },
      {
        "san": "c5",
        "t": "Il nero non copia: con c5 controlla la casa d4 dal lato. Il centro si contende in modo asimmetrico.",
        "k": "Il nero usa un pedone di lato."
      },
      {
        "san": "Nf3",
        "t": "Il bianco sviluppa e prepara d4.",
        "k": "Fuori il cavallo."
      },
      {
        "san": "d6",
        "t": "Il nero controlla e5 e libera l’alfiere di c8. Una struttura solida ed elastica.",
        "k": "Un pedone fa un passo."
      },
      {
        "san": "d4",
        "t": "Il bianco apre il centro, come vuole la teoria.",
        "k": "Attacco al centro!"
      },
      {
        "san": "cxd4",
        "t": "Il nero cambia un pedone laterale con uno centrale: è lo scambio chiave della Siciliana. Ora il nero ha più pedoni al centro.",
        "k": "Il nero mangia."
      },
      {
        "san": "Nxd4",
        "t": "Il bianco riprende con il cavallo, che si piazza al centro. In cambio del pedone centrale ha sviluppo più rapido.",
        "k": "Il cavallo riprende."
      },
      {
        "san": "Nf6",
        "t": "Il nero sviluppa con tempo attaccando e4.",
        "k": "Un cavallo attacca."
      },
      {
        "san": "Nc3",
        "t": "Il bianco difende e4 sviluppando.",
        "k": "Il bianco difende."
      },
      {
        "san": "a6",
        "t": "Questa è la Najdorf, la variante preferita da Fischer e Kasparov. a6 toglie la casa b5 ai pezzi bianchi e prepara b5 per giocare sul lato di donna. Il bianco attaccherà sul lato di re, il nero sul lato di donna: partite molto vive.",
        "k": "Un piccolo pedone fa una mossa furba."
      }
    ]
  }
];
if (typeof module !== 'undefined') module.exports = LESSONS;
