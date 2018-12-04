export default class Cache {
  public static init() {
    // console.log('mrs', JSON.stringify(Memory.rooms));


    if(!Memory.sources){
      Memory.sources = {};
    }
    // for(let roomName in Game.rooms){
    //   let room: Room = Game.rooms[roomName];
    //   // console.log('mr', JSON.stringify(room.memory));
    //   if (!Memory.rooms[roomName] || !Object.keys(Memory.rooms[roomName]).length) {
    //     Memory.rooms[roomName] = {};
    //     // let sources: Source[] = room.find(FIND_SOURCES);
    //     // // console.log(sources.map(s => JSON.stringify(s.memory)));
    //     // room.memory.sources = _.zipObject(sources.map((s: Source) => s.id), (new Array(sources.length)).fill({
    //     //   miner: null,
    //     //   carry: [],
    //     //   container: null
    //     // })) as any;
    //     // room.memory.structures = {
    //     //   controllerContainer: null,
    //     //   hatcheryContainer: null,
    //     //   mineContainers: {}
    //     // };
    //   }
    // }

    // for(let roomName in Game.rooms){//Loop through all rooms your creeps/structures are in
    //   let room = Game.rooms[roomName];
    //   let sources: Source[] = room.find(FIND_SOURCES);//Find all sources in the current room
    //
    //   if(room.memory.sources && typeof room.memory.sources === 'object'){//If this room has no sources memory yet
    //     sources.forEach((source: Source) => {
    //       source.memory = room.memory.sources[source.id]; //Set the shortcut
    //     });
    //   } else { //The memory already exists so lets add a shortcut to the sources its memory
    //     room.memory.sources = {}; //Add it
    //     sources.forEach((source: Source) => {
    //       source.memory = room.memory.sources[source.id] = {}; //Create a new empty memory object for this source
    //     });
    //   }
    // }

    // console.log(RawMemory.get());
  }
}
