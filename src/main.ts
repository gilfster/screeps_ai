import { ErrorMapper } from "utils/ErrorMapper";
import Spawning from "modules/spawning";
import Miner from "creeps/roles/miner";
import { Roles } from "enums/creeps/roles";

const tasks: any = {
  [Roles.MINER]: Miner.work
};

// When compiling TS to JS and bundling with rollup, the line numbers and file names in error messages change
// This utility uses source maps to get the line numbers and file names of the original, TS source code
export const loop = ErrorMapper.wrapLoop(() => {
  // Automatically delete memory of missing creeps
  for (const name in Memory.creeps) {
    if (!(name in Game.creeps)) {
      delete Memory.creeps[name];
    }
  }

  Spawning.precessQueue();

  for(let name in Game.creeps) {
    const creep: Creep = Game.creeps[name];

    tasks[creep.memory.role](creep);
  }
});
