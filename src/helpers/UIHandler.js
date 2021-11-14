import ZoneHandler from './ZoneHandler';
export default class UIHandler {
  constructor(scene) {
    // handles zone creation for dominoes
    this.zoneHandler = new ZoneHandler(scene);

    this.buildZones = () => {
      //parameters are for position not width/height
      const {
        renderGameZone,
        renderOutline,
        renderPlayer1Zone,
        renderTeammateZone,
        renderOpponentZone,
      } = this.zoneHandler;
      scene.gameZone = renderGameZone(400, 290);
      scene.player1Zone = renderPlayer1Zone(400, 550);
      scene.teammateZone = renderTeammateZone(400, 40);
      scene.opponent1Zone = renderOpponentZone(40, 290);
      renderOutline(scene.opponent1Zone);
      scene.opponent2Zone = renderOpponentZone(760, 290);
      renderOutline(scene.opponent2Zone);
      renderOutline(scene.gameZone);
      renderOutline(scene.player1Zone);
      renderOutline(scene.teammateZone);
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
