export default class Miner {
  // TODO: add tasks-based working system
  public static work (creep: Creep) {
    if (!creep.memory.targetStructureId) {
      let target: Source|null = creep.pos.findClosestByPath(FIND_SOURCES, {
        filter: (source: Source) => {
          console.log('source', source.id, JSON.stringify(Memory.sources[source.id]), source.energy > 0 &&
            (!Memory.sources[source.id] || (Memory.sources[source.id] && !Memory.sources[source.id].miner)));

          return source.energy > 0 &&
            (!Memory.sources[source.id] || (Memory.sources[source.id] && !Memory.sources[source.id].miner));
        }
      });

      if (target) {
        creep.memory.targetStructureId = target.id;
        if (Memory.sources[target.id]) {
          Memory.sources[target.id].miner = creep.name;
        } else {
          Memory.sources[target.id] = { "miner": String(creep.name) };
        }
      }
    }

    if(creep.memory.working && creep.carry.energy == creep.carryCapacity) {
      creep.memory.working = false;
    }

    if(!creep.memory.working && creep.carry.energy == 0) {
      creep.memory.working = true;
    }

    if(creep.memory.working) {
      creep.say('mine');
      const mine: Source|null = Game.getObjectById(creep.memory.targetStructureId);
      if(mine && creep.harvest(mine) == ERR_NOT_IN_RANGE) {
        creep.moveTo(mine);
      }
    } else {
      if (Object.keys(Game.creeps).length > 1) {
        creep.say('drop');
        creep.drop(RESOURCE_ENERGY, creep.carry.energy);
      } else {
        creep.say('fill');
        let targets = creep.room.find(FIND_STRUCTURES, {
          filter: (structure) => {
            return structure.structureType == STRUCTURE_SPAWN;
          }
        });
        if(targets.length > 0) {
          if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(targets[0]);
          }
        }
      }
    }
  }
}
