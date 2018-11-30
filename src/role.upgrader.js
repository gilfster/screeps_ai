const randomHarvest = require('harvester.random');

var roleUpgrader = {

  /** @param {Creep} creep **/
  run: function(creep) {

    if(creep.memory.upgrading && creep.carry.energy == 0) {
      creep.memory.upgrading = false;
      creep.say('🔄 harvest');
    }
    if(!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) {
      creep.memory.upgrading = true;
      creep.say('⚡ upgrade');
    }

    if(creep.memory.upgrading) {
      creep.memory.harvestTarget = null;

      if(Memory.rolesCount.controllerUpgrader > 0) {
        creep.memory.role = 'harvester';
        console.log('main');
        const controller = creep.room.controller;
        const containerNearToMainUpgrader = controller.pos.findClosestByPath(FIND_STRUCTURES, {
          filter: (structure) => {
          return structure.structureType == STRUCTURE_CONTAINER && (structure.store && structure.store[RESOURCE_ENERGY] < structure.storeCapacity);
      }
      });

        if (containerNearToMainUpgrader) {
          console.log('cont');
          if(creep.transfer(containerNearToMainUpgrader, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(containerNearToMainUpgrader);
          }
        } else {
          console.log('no cont');
          if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
            creep.moveTo(creep.room.controller);
          }
        }
      } else {
        if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
          creep.moveTo(creep.room.controller);
        }
      }
    } else {
      randomHarvest(creep);
    }
  }
};

module.exports = roleUpgrader;