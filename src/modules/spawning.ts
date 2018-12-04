import BodyGenerator from "creeps/body-generator";
import { Roles } from "enums/creeps/roles";
import PopulationControl from './population-control';

export default class Spawning {
  public static precessQueue(){
    const getRole = (): Roles => {
      let role: Roles;
      switch (true) {
        case PopulationControl.getTotalCreepsCount() < 1:
          role = Roles.MINER;
          break;
        case PopulationControl.getTotalCreepsCount() === 1:
          role = Roles.CARRY;
          break;
        default:
          role = Roles.CARRY;
          break;
      }

      return role;
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
