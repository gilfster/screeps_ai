import { Roles } from 'enums/creeps/roles';

export default class PopulationControl {


  public static getTotalCreepsCount (): number {
    return Object.keys(Game.creeps).length;
  }

  public static getRoomCreepsCount (room: Room): number {
    return Object
      .keys(Game.creeps)
      .map(creepName => Game.creeps[creepName].room.name)
      .filter(roomName => roomName === room.name)
      .length;
  }

  public static getRoleCount (role: Roles): number {
    return Object
      .keys(Game.creeps)
      .map(creepName => Game.creeps[creepName].memory.role)
      .filter(creepRole => creepRole === role)
      .length;
  }

  public static checkRoomNeedSpawn (room: Room) {
    let creepsCount = PopulationControl.getRoomCreepsCount(room);
    if (creepsCount < 1) return Roles.UPGRADER;

  }
}
