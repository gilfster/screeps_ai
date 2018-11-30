const utils = require('utils');
const randomHarvest = require('harvester.random');

var roleHarvester = {

  /** @param {Creep} creep **/
  run: function(creep) {
    if(creep.memory.harvesting && creep.carry.energy == creep.carryCapacity) {
      creep.memory.harvesting = false;
      creep.say('fill');
    }
    if(!creep.memory.harvesting && creep.carry.energy == 0) {
      creep.memory.harvesting = true;
      creep.say('harvest');
    }
    if(creep.memory.harvesting) {
      randomHarvest(creep);
    } else {
      creep.memory.harvestTarget = null;

      let targets = creep.room.find(FIND_STRUCTURES, {
          filter: (structure) => {
          return (
        (
          (structure.structureType == STRUCTURE_TOWER && structure.energy < structure.energyCapacity * 0.65) ||
          structure.structureType == STRUCTURE_EXTENSION ||
          (structure.structureType == STRUCTURE_CONTAINER && structure.store[RESOURCE_ENERGY] < structure.storeCapacity * 0.6) ||
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
        let target = creep.room.energyAvailable > 300 ? targets[0] : creep.pos.findClosestByPath(FIND_MY_SPAWNS, {
          filter: (spawn) => {
          return spawn.energy > 0;
      }
      });
        if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
          creep.moveTo(targets[0]);
        }
      }
    }
  }
};

module.exports = roleHarvester;