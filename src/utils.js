/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('utils');
 * mod.thing == 'a thing'; // true
 */

module.exports = {
  sortByPriority: function(arr, key, prioArr){
    if(Array.isArray(arr) && Array.isArray(prioArr)){
      return arr.sort((a,b) => {
        return prioArr.indexOf(a[key]) > prioArr.indexOf(b[key]) ? 1 : prioArr.indexOf(a[key]) < prioArr.indexOf(b[key]) ? -1 : 0;
    });
    }
  }
};