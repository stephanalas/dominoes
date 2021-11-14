import ZoneHandler from './ZoneHandler';
export default class UIHandler {
  constructor(scene) {
    // handles zone creation for dominoes
    this.zoneHandler = new ZoneHandler(scene);

    this.buildZones = () => {
      //parameters are for position not width/height
      scene.gameZone = this.zoneHandler.renderGameZone(400, 275);
      this.zoneHandler.renderOutline(scene.gameZone);
      scene.player1Zone = this.zoneHandler.renderPlayer1Zone(400, 550);
      this.zoneHandler.renderOutline(scene.player1Zone);
    };

    this.buildGameText = () => {
      scene.gameTitle = scene.add
        .text(660, 500, 'Curvy Dominoes')
        .setFontSize(14)
        .setFontFamily('Trebuchet MS');
    };
    this.buildUI = () => {
      this.buildZones();
      this.buildGameText();
    };
  }
}
