// example declaration file - remove these and add your own custom typings

// memory extension samples
interface CreepMemory {
  role: string;
  room: string;
  working: boolean;
  targetStructureId?: string;
  sourceStructureId?: string;
}

interface RoomMemory {
  [key: string]: any;
  sources?: {[key: string]: {
      miner: string;
      carry: string[];
      container: string;
    }
  };
  structures?: {
    controllerContainer: string;
    hatcheryContainer: string;
    mineContainers: {[key: string]: string};
  }
}

interface Memory {
  uuid: number;
  log: any;
  sources?: {[key: string]: {
      miner?: string;
      carry?: string[];
      container?: string;
    }
  };
}

// `global` extension samples
declare namespace NodeJS {
  interface Global {
    log: any;
  }
}

interface Source {
  memory: any;
}
