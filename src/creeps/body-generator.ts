import { Roles } from "enums/creeps/roles";

export default class BodyGenerator {
  public static generate(role: Roles, room: Room, level: number) {
    let body: BodyPartConstant[] = [];
    let work: number = 0;
    let claim: number = 0;
    let carry: number = 0;
    let move: number = 0;
    let tough: number = 0;
    let attack: number = 0;
    let rangedAttack: number = 0;
    let heal: number = 0;

    switch (role) {
      case Roles.CARRY:
        carry = level * 2 + 1;
        move = level * 2 + 1;
        break;
      case Roles.UPGRADER:
        work = level < 5 ? level + 1 : 5;
        carry = 1;
        move = level;
        break;
      case Roles.MINER:
        work = level < 5 ? level + 1 : 5;
        carry = 1;
        move = level;
        break;
      default:
        work = 1;
        carry = 1;
        move = 1;
        break;
    }
    for (let i = 0; i < work; i++) body.push(WORK);
    for (let i = 0; i < carry; i++) body.push(CARRY);
    for (let i = 0; i < claim; i++) body.push(CLAIM);
    for (let i = 0; i < attack; i++) body.push(ATTACK);
    for (let i = 0; i < rangedAttack; i++) body.push(RANGED_ATTACK);
    let moveArray: BodyPartConstant[] = [];
    for (let i = 0; i < move; i++) moveArray.push(MOVE);
    let healArray: BodyPartConstant[] = [];
    for (let i = 0; i < heal; i++) healArray.push(HEAL);
    let toughArray: BodyPartConstant[] = [];
    for (let i = 0; i < tough; i++) toughArray.push(TOUGH);
    return toughArray.concat(body.sort((a, b) => Math.random() - 0.5), moveArray, healArray);
  }
}
