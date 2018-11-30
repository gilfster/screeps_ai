var roleUpgrader = {

  /** @param {Creep} creep **/
  run: function(creep) {

    if(!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) {
      creep.memory.upgrading = true;
    }

    if(creep.memory.upgrading && creep.carry.energy != 0) {
      if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
        creep.moveTo(creep.room.controller);
      }
    } else {
      const structures = creep.pos.findClosestByPath(FIND_STRUCTURES, {
        filter: (structure) => {
        return structure.structureType == STRUCTURE_CONTAINER;
    }
    });

      if(structures){
        if(creep.withdraw(structures, RESOURCE_ENERGY, creep.carryCapacity) == ERR_NOT_IN_RANGE) {
          creep.moveTo(structures);
        }
      }
    }
  }
};

module.exports = roleUpgrader;