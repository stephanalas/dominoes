export default class ZoneHandler {
  constructor(scene) {
    this.renderZone = (x, y, zoneType) => {
      const zoneTypes = ['game', 'player', 'teammate', 'opponent'];
      if (!zoneType || !zoneTypes.includes(zoneType)) {
        throw new Error('incorrect or missing zoneType');
      }
      let ZONE_WIDTH, ZONE_HEIGHT;
      if (zoneType === 'game') {
        ZONE_WIDTH = 640;
        ZONE_HEIGHT = 420;
      } else if (zoneType === 'player') {
        ZONE_WIDTH = 500;
        ZONE_HEIGHT = 80;
      } else if (zoneType === 'teammate') {
        ZONE_WIDTH = 400;
        ZONE_HEIGHT = 64;
      } else if (zoneType === 'opponent') {
        ZONE_WIDTH = 64;
        ZONE_HEIGHT = 350;
      }
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
