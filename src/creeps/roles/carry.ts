export default class Miner {
  // TODO: add tasks-based working system
  public static work (creep: Creep) {
    if (!creep.memory.targetStructureId) {
      let target: Structure|null = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
        filter: (structure: Structure) => {
          return (
            structure.structureType === STRUCTURE_SPAWN// && !Memory.rooms[creep.room.name].structures.hatcheryContainer
          ) || (
            structure.structureType === STRUCTURE_CONTAINER// && Memory.rooms[creep.room.name].structures.hatcheryContainer === structure.id
          );
        }
      });

      if (target) {
        creep.memory.targetStructureId = target.id;
      }
    }

    if(creep.memory.working && creep.carry.energy == 0) {
      creep.memory.working = false;
    }

    if(!creep.memory.working && creep.carry.energy == creep.carryCapacity) {
      creep.memory.working = true;
    }

    if(creep.memory.working) {
      creep.say('fill');
      const target: Structure|null = Game.getObjectById(creep.memory.targetStructureId);
      if(target && creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        creep.moveTo(target);
      }
    } else {
      creep.say('find drops');
      let dropped: Resource|null = creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES, {
        filter: (resource: Resource) => resource.resourceType === RESOURCE_ENERGY
      });
      if(dropped) {
        if(creep.pickup(dropped) == ERR_NOT_IN_RANGE) {
          creep.moveTo(dropped);
        }
      } else {
        creep.say('find cont');
        let mineContainer: Structure|null = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
          filter: (structure: Structure) => structure.structureType === STRUCTURE_CONTAINER &&
              Object.keys(Memory.rooms[creep.room.name].structures.mineContainers).indexOf(structure.id) !== -1
        });
        if(mineContainer) {
          if(creep.withdraw(mineContainer, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(mineContainer);
          }
        }
      }
    }
  }
}
