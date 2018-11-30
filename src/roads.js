/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('roads');
 * mod.thing == 'a thing'; // true
 */

module.exports = function() {
  for(let name in Game.rooms) {
    const room = Game.rooms[name];

    const terrain = new Room.Terrain(name);
    const matrix = Boolean(Memory.roadsInit) ? PathFinder.CostMatrix.deserialize(Memory.savedMatrix) : new PathFinder.CostMatrix;
    const visuals = new RoomVisual(name);

    // Fill CostMatrix with default terrain costs for future analysis:
    if (!Memory.roadsInit) {
      for(let y = 0; y < 50; y++) {
        for(let x = 0; x < 50; x++) {
          const tile = terrain.get(x, y);

          const weight =
            tile === TERRAIN_MASK_WALL  ? 255 : // wall  => unwalkable
              tile === TERRAIN_MASK_SWAMP ? 100 : // swamp => weight:  100
                200 ; // plain => weight:  200

          console.log('set xy', x, y, tile, weight);
          matrix.set(x, y, weight);

          console.log('get', matrix.get(x, y));
        }
      }
    }

    for(let creepName in Game.creeps) {
      let creep = Game.creeps[creepName];
      let position = creep.pos;

      let cost = matrix.get(position.x, position.y);
      if(cost > 0){
        matrix.set(position.x, position.y, cost - 1);
        // console.log('seted', position.x, position.y, matrix.get(position.x, position.y));
      } else {
        let structures = room.find(FIND_STRUCTURES, {
          filter: (structure) => {
          return structure.pos.x == position.x && structure.pos.y == position.y;
      }
      });

        let sites = room.find(FIND_CONSTRUCTION_SITES, {
          filter: (site) => {
          return site.pos.x == position.x && site.pos.y == position.y;
      }
      });

        if (structures.length === 0 && sites.length === 0) {
          position.createConstructionSite(STRUCTURE_ROAD);
          visuals.text('R', position.x, position.y);
        }
      }
    }

    Memory.roadsInit = true;
    Memory.savedMatrix = matrix.serialize();
  }
};