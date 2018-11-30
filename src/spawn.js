module.exports = function(){
  function getBody(energy){
    function getCost (body) {
      return body.reduce(function(accumulator, part){
        return accumulator + BODYPART_COST[part];
      }, 0);
    }

    let priority = [
      MOVE,
      CARRY,
      MOVE,
      MOVE,
      WORK,
      WORK,
      MOVE,
      CARRY,
      WORK,
      MOVE,
      MOVE,
      WORK,
      WORK,
      MOVE,
      WORK,
      WORK,
      MOVE,
      WORK,
      WORK,
      MOVE,
      ATTACK,
      TOUGH,
      TOUGH,
      TOUGH,
      MOVE,
      TOUGH,
      TOUGH,
      ATTACK,
      MOVE,
      TOUGH,
      ATTACK,
      TOUGH,
      HEAL,
      TOUGH,
      ATTACK,
      TOUGH,
      ATTACK,
      TOUGH,
      ATTACK,
      TOUGH,
      ATTACK,
      TOUGH,
      ATTACK,
      TOUGH,
      ATTACK,
      TOUGH,
      ATTACK,
      TOUGH,
      ATTACK
    ];

    function getMaxArr () {
      let a = [];
      do {
        a.push(priority[a.length]);
      } while(getCost(a) <= energy);
      return a.slice(0, -1);
    }

    let body = getMaxArr();
    console.log(body, getCost(body), energy);
    return body;
  }

  function getRole() {
    let creepsCount = _.sum(Object.values(Memory.rolesCount));
    if(Memory.rolesCount.harvester < 2) {
      return 'harvester';
    }
    if(Memory.rolesCount.fuller < 1) {
      return 'fuller';
    }
    if(Memory.rolesCount.upgrader < 1 && Memory.rolesCount.controllerUpgrader < 1) {
      return 'upgrader';
    }
    if(Memory.rolesCount.controllerUpgrader < 1 ||
      (Memory.rolesCount.controllerUpgrader < 2 && creepsCount > 15) ||
      (Memory.rolesCount.controllerUpgrader < 3 && creepsCount > 20) ||
      (Memory.rolesCount.controllerUpgrader < 5 && creepsCount > 30)
    ) {
      return 'controllerUpgrader';
    }
    if(Memory.rolesCount.builder < 1) {
      return 'builder';
    }

    const roles = ['harvester', 'upgrader', 'builder'];
    let role = roles[Math.floor(Math.random() * roles.length * 0.9)];

    return role;
  }

  function getExtensions (spawn) {
    return spawn.room.find(FIND_STRUCTURES, {
      filter: (structure) => {
      return structure.structureType == STRUCTURE_EXTENSION;
  }
  });
  }

  function getAvailableEnergy (spawn, extensions) {
    return extensions.map(extension => extension.energy).reduce((acc, curr) => { return acc + (curr || 0); }, 0) + spawn.energy;
  }

  function getTotalEnergy (spawn, extensions) {
    return extensions.map(extension => extension.energyCapacity).reduce((acc, curr) => { return acc + (curr || 0); }, 0) + spawn.energyCapacity;
  }

  try {
    for(var spawnName in Game.spawns) {
      let spawn = Game.spawns[spawnName];

      let extensions = getExtensions(spawn);
      let availableEnergy = getAvailableEnergy(spawn, extensions);
      let totalEnergy = getTotalEnergy(spawn, extensions);

      if (!spawn.spawning) {
        if (availableEnergy >= 300 &&
          (_.sum(Object.values(Memory.rolesCount)) > 4 ? availableEnergy == totalEnergy : true)
        ) {
          let role = getRole();
          let body = [];
          if (role == 'controllerUpgrader'){
            body = [MOVE,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY];
          } else if (role == 'fuller'){
            body = [MOVE,CARRY];// [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY];
          } else {
            body = getBody(availableEnergy);
          }

          console.log(body, role);

          Game.spawns[spawnName].spawnCreep(body, 'unit' + (new Date()).getTime(), {
            memory: {
              role: role
            }
          });
        } else {
          let nearestCreep = spawn.pos.findClosestByRange(FIND_CREEPS, {
            filter: (creep) => {
            return creep.memory.needRenew || creep.ticksToLive < 700;
        }
        });
          if (nearestCreep) {
            spawn.renewCreep(nearestCreep);
          }
        }
      }
    }
  } catch(e) {
    console.log('Err', e);
  }
};