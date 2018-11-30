/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('debug.info');
 * mod.thing == 'a thing'; // true
 */

module.exports = function(){
  console.log('CPU:');
  console.log('used', Game.cpu.getUsed());
  console.log('linit', Game.cpu.limit);
  console.log('tickLimit', Game.cpu.tickLimit);
  console.log('bucket', Game.cpu.bucket);
};