import Domino from './dominoes/Domino';

export default class DominoHandler {
  constructor(scene) {
    this.createAllDominoes = () => {
      const min = 0;
      const max = 6;
      const dominoes = [];

      let k = 0;
      for (let i = min; i <= max; i++) {
        // min = 0 || i = 0
        for (let j = k; j <= max; j++) {
          // j = 0
          dominoes.push(new Domino(scene, [i, j]));
          // domino double blank
        }
        k++;
      }
      let x = 200;
      let y = 200;
      dominoes.map((domino, idx) => {
        if (idx % 9 === 0) {
          // x += 50;
          // y = 200;
          y += 30;
          x = 200;
        }
        // every 6 elements after the first two elements are twin dominoes
        // 0 != 0, 0
        if (idx === 0) {
          console.log('made it through');
          domino.render(x, y, 'blanks', 2);
        } else {
          // if ()
          // decide if current element and next element are the same
          // if they are the same then we
          // we are going to save element frame as default frame and the next element as inverseFrame
          domino.render(x, y, 'player', idx - 1);
        }
        x += 50;
      });
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
        // for (let i = 0; i < 4; i++) {
        //   scene.add.group({
        //     key: 'blanks',
        //     frame: 0,
        //     repeat: 7,
        //     setXY: { x: 300, deltaY, stepX: 40 },
        //   });
        //   deltaY *= i + 1;
        // }
        // create dominoes 28 dominoes
        // assign each dominoes data
        // maybe use a loop to add k, v pairs to an object to check for repeats
        // console.log('scene from Domino handler', scene);
        // const dominoes = scene.add.group();
        // dominoes.createMultiple(28, 'blanks', [0], true);
        // return dominoes;
        // const domino = new Domino(scene, [0, 0]);

        // domino.render(x, y, 0, 0);
      };
    };
  }
}
