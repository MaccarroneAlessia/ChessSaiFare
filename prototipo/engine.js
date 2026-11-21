// Motore minimale: valutazione materiale + tabelle posizionali, negamax alpha-beta.
var Engine = (function () {
  var VAL = { p: 100, n: 320, b: 330, r: 500, q: 900, k: 0 };
  // Tabelle dal punto di vista del bianco, riga 0 = ottava traversa
  var PST = {
    p: [0,0,0,0,0,0,0,0, 50,50,50,50,50,50,50,50, 10,10,20,30,30,20,10,10, 5,5,10,25,25,10,5,5, 0,0,0,20,20,0,0,0, 5,-5,-10,0,0,-10,-5,5, 5,10,10,-20,-20,10,10,5, 0,0,0,0,0,0,0,0],
    n: [-50,-40,-30,-30,-30,-30,-40,-50, -40,-20,0,0,0,0,-20,-40, -30,0,10,15,15,10,0,-30, -30,5,15,20,20,15,5,-30, -30,0,15,20,20,15,0,-30, -30,5,10,15,15,10,5,-30, -40,-20,0,5,5,0,-20,-40, -50,-40,-30,-30,-30,-30,-40,-50],
    b: [-20,-10,-10,-10,-10,-10,-10,-20, -10,0,0,0,0,0,0,-10, -10,0,5,10,10,5,0,-10, -10,5,5,10,10,5,5,-10, -10,0,10,10,10,10,0,-10, -10,10,10,10,10,10,10,-10, -10,5,0,0,0,0,5,-10, -20,-10,-10,-10,-10,-10,-10,-20],
    r: [0,0,0,0,0,0,0,0, 5,10,10,10,10,10,10,5, -5,0,0,0,0,0,0,-5, -5,0,0,0,0,0,0,-5, -5,0,0,0,0,0,0,-5, -5,0,0,0,0,0,0,-5, -5,0,0,0,0,0,0,-5, 0,0,0,5,5,0,0,0],
    q: [-20,-10,-10,-5,-5,-10,-10,-20, -10,0,0,0,0,0,0,-10, -10,0,5,5,5,5,0,-10, -5,0,5,5,5,5,0,-5, 0,0,5,5,5,5,0,-5, -10,5,5,5,5,5,0,-10, -10,0,5,0,0,0,0,-10, -20,-10,-10,-5,-5,-10,-10,-20],
    k: [-30,-40,-40,-50,-50,-40,-40,-30, -30,-40,-40,-50,-50,-40,-40,-30, -30,-40,-40,-50,-50,-40,-40,-30, -30,-40,-40,-50,-50,-40,-40,-30, -20,-30,-30,-40,-40,-30,-30,-20, -10,-20,-20,-20,-20,-20,-20,-10, 20,20,0,0,0,0,20,20, 20,30,10,0,0,10,30,20]
  };
  var MATE = 100000;

  // Valutazione dal punto di vista del bianco (centipedoni)
  function evaluate(game, fast) {
    if (!fast) {
      if (game.in_checkmate()) return game.turn() === 'w' ? -MATE : MATE;
      if (game.in_draw() || game.in_stalemate()) return 0;
    }
    var b = game.board(), s = 0;
    for (var r = 0; r < 8; r++) for (var c = 0; c < 8; c++) {
      var p = b[r][c]; if (!p) continue;
      var idx = p.color === 'w' ? r * 8 + c : (7 - r) * 8 + c;
      var v = VAL[p.type] + PST[p.type][idx];
      s += p.color === 'w' ? v : -v;
    }
    return s;
  }

  function ordered(game) {
    var ms = game.moves({ verbose: true });
    ms.sort(function (a, b) {
      return (b.captured ? VAL[b.captured] * 10 - VAL[b.piece] : 0) + (b.promotion ? 800 : 0)
           - ((a.captured ? VAL[a.captured] * 10 - VAL[a.piece] : 0) + (a.promotion ? 800 : 0));
    });
    return ms;
  }

  var nodes = 0;
  function negamax(game, depth, alpha, beta, ply) {
    nodes++;
    var ms = ordered(game);
    if (!ms.length) return game.in_check() ? -MATE + ply : 0;
    if (depth === 0) return quiesce(game, alpha, beta, 0);
    var best = -Infinity;
    for (var i = 0; i < ms.length; i++) {
      game.move(ms[i]);
      var sc = -negamax(game, depth - 1, -beta, -alpha, ply + 1);
      game.undo();
      if (sc > best) best = sc;
      if (sc > alpha) alpha = sc;
      if (alpha >= beta) break;
    }
    return best;
  }
  // Ricerca delle sole catture per evitare l'effetto orizzonte (limitata)
  function quiesce(game, alpha, beta, d) {
    nodes++;
    var stand = (game.turn() === 'w' ? 1 : -1) * evaluate(game, true);
    if (d >= 2) return stand;
    if (stand >= beta) return stand;
    if (stand > alpha) alpha = stand;
    var ms = ordered(game).filter(function (m) { return m.captured; });
    for (var i = 0; i < ms.length; i++) {
      game.move(ms[i]);
      var sc = -quiesce(game, -beta, -alpha, d + 1);
      game.undo();
      if (sc >= beta) return sc;
      if (sc > alpha) alpha = sc;
    }
    return alpha;
  }

  // Restituisce {move, score} con score dal punto di vista di chi muove
  function best(game, depth, randomness) {
    nodes = 0;
    var ms = ordered(game), scored = [];
    var alpha = -Infinity;
    for (var i = 0; i < ms.length; i++) {
      game.move(ms[i]);
      var sc = -negamax(game, depth - 1, -Infinity, -alpha + (randomness || 0), 1);
      game.undo();
      scored.push({ move: ms[i], score: sc });
      if (sc > alpha) alpha = sc;
    }
    if (!scored.length) return null;
    scored.sort(function (a, b) { return b.score - a.score; });
    if (randomness) {
      var pool = scored.filter(function (s) { return s.score >= scored[0].score - randomness; });
      return pool[Math.floor(Math.random() * pool.length)];
    }
    return scored[0];
  }

  // Valutazione di una posizione dal punto di vista del bianco, con ricerca
  function evalWhite(game, depth) {
    if (game.game_over()) return evaluate(game);
    var r = best(game, depth, 0);
    var s = r ? r.score : 0;
    return game.turn() === 'w' ? s : -s;
  }

  // Tutte le mosse legali con il loro punteggio (punto di vista di chi muove), dalla migliore
  function all(game, depth) {
    nodes = 0;
    var ms = ordered(game), out = [];
    for (var i = 0; i < ms.length; i++) {
      game.move(ms[i]);
      var sc = -negamax(game, depth - 1, -Infinity, Infinity, 1);
      game.undo();
      out.push({ san: ms[i].san, from: ms[i].from, to: ms[i].to, score: sc, captured: ms[i].captured || null, check: /[+#]/.test(ms[i].san) });
    }
    out.sort(function (a, b) { return b.score - a.score; });
    return out;
  }
  // Il percorso: la mossa scelta e poi le risposte migliori di entrambi
  function line(game, san, len, depth) {
    var played = [], m = game.move(san);
    if (!m) return { line: [], score: 0 };
    played.push(m.san);
    for (var i = 1; i < len && !game.game_over(); i++) {
      var r = best(game, depth, 0); if (!r) break;
      game.move(r.move); played.push(r.move.san);
    }
    var sc = game.game_over() ? evaluate(game) : evalWhite(game, 1);
    for (var j = 0; j < played.length; j++) game.undo();
    return { line: played, white: sc };
  }

  return { evaluate: evaluate, best: best, evalWhite: evalWhite, all: all, line: line, MATE: MATE, nodes: function () { return nodes; } };
})();
if (typeof module !== 'undefined') module.exports = Engine;
