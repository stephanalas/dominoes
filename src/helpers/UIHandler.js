import ZoneHandler from './ZoneHandler';
export default class UIHandler {
  constructor(scene) {
    // handles zone creation for dominoes
    this.zoneHandler = new ZoneHandler(scene);

    this.buildZones = () => {
      //parameters are for position not width/height
      const { renderZone, renderOutline } = this.zoneHandler;
      scene.gameZone = renderZone(400, 290);
      renderOutline(scene.gameZone);
    };
    this.buildPlayerAreas = () => {
      scene.playerDominoArea = scene.add.rectangle(400, 550, 500, 80);
      scene.playerDominoArea.setStrokeStyle(4, 0xff69b4);
      scene.teammateArea = scene.add.rectangle(400, 40, 400, 64);
      scene.teammateArea.setStrokeStyle(4, 0xff69b4);
      scene.opponent1Area = scene.add.rectangle(40, 290, 64, 350);
      scene.opponent1Area.setStrokeStyle(4, 0xff69b4);
      scene.opponent2Area = scene.add.rectangle(760, 290, 64, 350);
      scene.opponent2Area.setStrokeStyle(4, 0xff69b4);
    };

    this.build1v1 = () => {
      scene.playerDominoArea = scene.add.rectangle(400, 550, 500, 80);
      scene.playerDominoArea.setStrokeStyle(4, 0xff69b4);
      scene.opponentArea = scene.add.rectangle(400, 40, 400, 64);
      scene.opponentArea.setStrokeStyle(4, 0xff69b4);

      scene.spareDominoesArea = scene.add.rectangle(40, 300, 64, 300);
      scene.spareDominoesArea.setStrokeStyle(4, 0xff69b4);
    };
    this.buildGameText = () => {
      scene.gameTitle = scene.add
        .text(660, 500, 'Curvy Dominoes')
        .setFontSize(20)
        .setFontFamily('Trebuchet MS');
    };
    this.build1v1GameText = () => {
      scene.gameTitle = scene.add
        .text(660, 500, 'Curvy Dominoes')
        .setFontSize(14)
        .setFontFamily('Trebuchet MS');
      scene.dominoPile = scene.add
        .text(40, 100, 'pile')
        .setFontSize(14)
        .setFontFamily('Trebuchet MS');
      scene.playerPointsSubTitle = scene.add
        .text(40, 510, 'Your Points')
        .setFontSize(14)
        .setFontFamily('Trebuchet MS');

      scene.opponentPointsSubTitle = scene.add
        .text(650, 10, 'Opponent Points')
        .setFontSize(14)
        .setFontFamily('Trebuchet MS');
    };
    this.buildUI = () => {
      this.buildZones();
      this.buildPlayerAreas();
      this.buildGameText();
    };
    this.buildSinglePlayerUI = () => {
      this.build1v1();
      this.buildZones();
      this.build1v1GameText();
    };
  }
}
