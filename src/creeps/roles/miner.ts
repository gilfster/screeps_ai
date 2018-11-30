export default class Miner {
  // TODO: add tasks-based working system
  public static work (creep: Creep) {
    if (!creep.memory.targetStructureId) {
      let targets = creep.room.find(FIND_SOURCES, {
        filter: (source: Source) => source.energy > 0
      });

      if(targets.length > 0) {
        creep.memory.targetStructureId = targets[0].id;
      }
    }

    if(creep.memory.working && creep.carry.energy == creep.carryCapacity) {
      creep.memory.working = false;
      try{
        creep.drop(RESOURCE_ENERGY, creep.carry.energy);
      } catch (e) {
        console.log('Miner drop err:', e);
      }
      creep.say('drop');
    }

    if(!creep.memory.working && creep.carry.energy == 0) {
      creep.memory.working = true;

      creep.say('mine');
    }

    if(creep.memory.working) {
      const mine: Source|null = Game.getObjectById(creep.memory.targetStructureId);
      if(mine && creep.harvest(mine) == ERR_NOT_IN_RANGE) {
        creep.moveTo(mine);
      } else {
        delete creep.memory.targetStructureId;
      }
    }
  }
}
