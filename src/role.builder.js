const utils = require('utils');
const randomHarvest = require('harvester.random');

var roleBuilder = {

  /** @param {Creep} creep **/
  run: function(creep) {

    if(creep.memory.building && creep.carry.energy == 0) {
      creep.memory.building = false;
      creep.say('🔄 harvest');
    }
    if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
      creep.memory.building = true;
      creep.say('🚧 build');
    }

    if(creep.memory.building) {
      creep.memory.harvestTarget = null;

      let targets = creep.room.find(FIND_CONSTRUCTION_SITES);
      if(targets.length) {
        if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
          creep.moveTo(targets[0]);
        }
      } else {
        let targets = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
            return (
          (
            (structure.structureType == STRUCTURE_TOWER && structure.energy < structure.energyCapacity/3*2) ||
            structure.structureType == STRUCTURE_EXTENSION ||
            (structure.structureType == STRUCTURE_CONTAINER && structure.store[RESOURCE_ENERGY] < structure.storeCapacity/5*3) ||
            structure.structureType == STRUCTURE_SPAWN
          ) &&
          (structure.energy < structure.energyCapacity || (structure.store && structure.store[RESOURCE_ENERGY] < structure.storeCapacity))
        );
      }
      });

        utils.sortByPriority(targets, 'structureType', [
          STRUCTURE_CONTAINER,
          STRUCTURE_SPAWN,
          STRUCTURE_TOWER,
          STRUCTURE_EXTENSION
        ]);

        if(targets.length > 0) {
          if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(targets[0]);
          }
        }
      }
    }
    else {
      randomHarvest(creep);
    }
  }
};

module.exports = roleBuilder;