const roleHarvester = require('role.harvester');
const roleControllerUpgrader = require('role.controllerUpgrader');
const roleUpgrader = require('role.upgrader');
const roleFuller = require('role.fuller');
const roleBuilder = require('role.builder');
const spawn = require('spawn');
const towers = require('towers');
const roadsBuilder = require('roads');
const healthCheck = require('creep.death');
const debug = require('debug.info');

module.exports.loop = function () {
  // debug();
  Memory.rolesCount = {
    harvester: 0,
    controllerUpgrader: 0,
    upgrader: 0,
    builder: 0,
    fuller: 0
  };

  for(let name in Game.creeps) {
    let creep = Game.creeps[name];

    Memory.rolesCount[creep.memory.role] += 1;

    if(!healthCheck.isNeedRenew(creep)){
      if(creep.memory.role == 'harvester') {
        roleHarvester.run(creep);
      } else if(creep.memory.role == 'upgrader') {
        roleUpgrader.run(creep);
      } else if(creep.memory.role == 'fuller') {
        roleFuller.run(creep);
      } else if(creep.memory.role == 'builder') {
        roleBuilder.run(creep);
      } else if(creep.memory.role == 'controllerUpgrader') {
        roleControllerUpgrader.run(creep);
      } else {
        roleHarvester.run(creep);
      }
    }
  }

  spawn();
  towers();
  roadsBuilder();

  // console.log(Memory.rolesCount);
};