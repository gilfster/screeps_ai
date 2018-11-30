/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('creep.death');
 * mod.thing == 'a thing'; // true
 */

module.exports = {
  isNeedRenew: function (creep) {
    if(creep.ticksToLive < 200 && (creep.room.energyAvailable > 300 || creep.carry.energy > 0)) {
      creep.memory.needRenew = true;
    }
    if(creep.ticksToLive > 600 || (creep.room.energyAvailable < 300 && creep.carry.energy == 0)) {
      creep.memory.needRenew = false;
    }
    if(creep.memory.needRenew) {
      creep.say('RE');
      let spawn = creep.pos.findClosestByPath(FIND_MY_SPAWNS, {
        filter: (spawn) => {
        return spawn.energy > 0;
    }
    });
      creep.moveTo(spawn);
      creep.transfer(spawn, RESOURCE_ENERGY);
    }
    if(creep.ticksToLive < 10) {
      creep.say('time to die');
    }

    return creep.memory.needRenew;
  }
};