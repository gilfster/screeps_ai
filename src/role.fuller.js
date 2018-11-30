const utils = require('utils');
const randomHarvest = require('harvester.random');

var roleBuilder = {

  /** @param {Creep} creep **/
  run: function(creep) {

    if(creep.memory.working && creep.carry.energy == 0) {
      creep.memory.working = false;
      creep.say('wait');
    }
    if(!creep.memory.working && creep.carry.energy > 0) {
      creep.memory.working = true;
      creep.say('fill');
    }

    if(creep.memory.working) {
      creep.memory.harvestTarget = null;
      let targets = creep.room.find(FIND_STRUCTURES, {
          filter: (structure) => {
          return (
        (
          (structure.structureType == STRUCTURE_TOWER && structure.energy < structure.energyCapacity/3*2) ||
          structure.structureType == STRUCTURE_EXTENSION ||
          structure.structureType == STRUCTURE_SPAWN
        ) &&
        (structure.energy < structure.energyCapacity || (structure.store && structure.store[RESOURCE_ENERGY] < structure.storeCapacity))
      );
    }
    });

      utils.sortByPriority(targets, 'structureType', [
        STRUCTURE_SPAWN,
        STRUCTURE_TOWER,
        STRUCTURE_EXTENSION
      ]);

      if(targets.length > 0) {
        if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
          creep.moveTo(targets[0]);
        }
      }
    } else {
      const structures = creep.pos.findClosestByPath(FIND_STRUCTURES, {
        filter: (structure) => {
        return structure.structureType == STRUCTURE_CONTAINER && structure.store && structure.store[RESOURCE_ENERGY] > creep.carryCapacity;
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

module.exports = roleBuilder;