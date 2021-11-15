import Domino from './dominoes/Domino';
import DominoMap from './dominoes/DominoMap';
export default class DominoHandler {
  constructor(scene) {
    this.createAllDominoes = () => {
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
      let x = 200;
      let y = 200;

      // const finalDominoes = [];
      dominoes.forEach((domino, idx) => {
        if (idx % 7 === 0) {
          // x += 50;
          // y = 200;
          y += 30;
          x = 200;
        }

        domino.render(x, y, !idx ? 'blanks' : 'player');
        x += 50;
      });
    };
    this.layoutDominoes = (x, y) => {
      let deltaY = y;

      // groups should work for opponents and teammates
      for (let i = 1; i <= 4; i++) {
        scene.add.group({
          key: 'blanks',
          frame: 0,
          repeat: 7,
          setXY: { x, y: deltaY, stepX: 40 },
        });
        deltaY += 50;
      }
    };
  }
}
