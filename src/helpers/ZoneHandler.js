export default class ZoneHandler {
  constructor(scene) {
    this.renderZone = (x, y) => {
      let ZONE_WIDTH = 640;
      let ZONE_HEIGHT = 420;
      // add zone but doesn't show outline
      let dropZone = scene.add
        .zone(x, y, ZONE_WIDTH, ZONE_HEIGHT)
        .setRectangleDropZone(ZONE_WIDTH, ZONE_HEIGHT);
      // set info on zone
      dropZone.setData({
        dominoes: 0,
      });
      return dropZone;
    };

    this.renderOutline = (dropZone) => {
      let dropZoneOutline = scene.add.graphics();
      dropZoneOutline.lineStyle(4, 0xff69b4);
      dropZoneOutline.strokeRect(
        dropZone.x - dropZone.input.hitArea.width / 2,
        dropZone.y - dropZone.input.hitArea.height / 2,
        dropZone.input.hitArea.width,
        dropZone.input.hitArea.height
      );
    };
  }
}
