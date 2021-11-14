import ZoneHandler from './ZoneHandler';
export default class UIHandler {
  constructor(scene) {
    // handles zone creation for dominoes
    this.zoneHandler = new ZoneHandler(scene);

    this.buildZones = () => {
      //parameters are for position not width/height
      const { renderZone, renderOutline } = this.zoneHandler;
      scene.gameZone = renderZone(400, 290, 'game');
      scene.player1Zone = renderZone(400, 550, 'player');
      scene.teammateZone = renderZone(400, 40, 'teammate');
      scene.opponent1Zone = renderZone(40, 290, 'opponent');
      scene.opponent2Zone = renderZone(760, 290, 'opponent');
      renderOutline(scene.opponent1Zone);
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
