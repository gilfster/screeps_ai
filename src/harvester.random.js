module.exports = function(creep){
  const source = creep.pos.findClosestByPath(FIND_SOURCES, {
    filter: (source) => {
    return source.energy > 200;
}
});

  if (creep.memory.harvestTarget == null && source) {
    creep.memory.harvestTarget = source.id;
  }

  const tombstones = creep.room.find(FIND_TOMBSTONES, {
    filter: (tombstone) => {
    return tombstone.creep.my;
}
});
  if(tombstones.length && tombstones[0]) {

  }

  if(creep.memory.harvestTarget != null) {
    let target = Game.getObjectById(creep.memory.harvestTarget);
    if (target.energy < 200) {
      creep.memory.harvestTarget = null;
    }
    if (creep.harvest(target) == ERR_NOT_IN_RANGE) {
      creep.moveTo(target);
    }
  }
};