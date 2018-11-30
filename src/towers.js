module.exports = function(){
  for(let structureName in Game.structures) {
    const structure = Game.structures[structureName];
    if(structure.structureType == STRUCTURE_TOWER) {
      const tower = structure;
      const closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
      if(closestHostile) {
        tower.attack(closestHostile);
      }

      if(tower.energy > tower.energyCapacity * 0.5) {
        const closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
          filter: (structure) => structure.hits < structure.hitsMax
      });
        if(closestDamagedStructure) {
          tower.repair(closestDamagedStructure);
        }
      }

    }
  }
};