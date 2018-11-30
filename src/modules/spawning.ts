import BodyGenerator from "creeps/body-generator";
import { Roles } from "enums/creeps/roles";

export default class Spawning {
  queue = [];

  public static precessQueue(){
    const getRole = (): Roles => {
      return Roles.MINER;
    };

    try {
      for(let spawnName in Game.spawns) {
        const spawn = Game.spawns[spawnName];

        if (!spawn.spawning) {
          const level: number = 1;
          const role: Roles = getRole();
          const body: BodyPartConstant[] = BodyGenerator.generate(role, spawn.room, level);
          const name: string = role + '_' + (new Date()).getTime() + '_' + spawn.room.name;
          const memory: CreepMemory = {
            role: role,
            room: spawn.room.name,
            working: false,
          };

          spawn.spawnCreep(body, name, { memory });
        }
      }
    } catch(e) {
      console.log('Spawning Error:', e);
    }
  }
}
