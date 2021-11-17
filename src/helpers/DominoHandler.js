import Domino from './dominoes/Domino';
import DominoMap from './dominoes/DominoMap';
export default class DominoHandler {
  constructor(scene) {
    this.dominoes = [];
    this.createDominoes = () => {
      const min = 0;
      const max = 6;
      const dominoes = [];

      let k = 0;
      let dominoMapCounter = 0;
      for (let i = min; i <= max; i++) {
        // min = 0 || i = 0
        for (let j = k; j <= max; j++) {
          // j = 0
          dominoes.push(new Domino(scene, DominoMap[dominoMapCounter]));
          dominoMapCounter++;
          // domino double blank
        }
        k++;
      }
      this.dominoes = dominoes;
    };
    this.layoutDominoes = (x, y) => {
      // const finalDominoes = [];
      if (!this.dominoes.length) {
        throw Error('You must create dominoes');
      } else {
        this.dominoes.forEach((domino, idx) => {
          if (idx % 7 === 0) {
            // x += 50;
            // y = 200;
            y += 30;
            x = 200;
          }

          domino.render(x, y, !idx ? 'blanks' : 'player');
          x += 50;
        });
      }
    };
    this.shuffleDominoes = () => {
      function shuffle(array) {
        var m = array.length,
          t,
          i;

        // While there remain elements to shuffle…
        while (m) {
          // Pick a remaining element…
          i = Math.floor(Math.random() * m--);

          // And swap it with the current element.
          t = array[m];
          array[m] = array[i];
          array[i] = t;
        }

        return array;
      }
      this.dominoes = shuffle(this.dominoes);
    };
  }
}
