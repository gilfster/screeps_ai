Object.defineProperty(Source.prototype, 'memory', {
  get: function () {
    return this.room.memory.sources[this.id];
  },
  set: function (value) {
    this.room.memory.sources[this.id] = value;
  },
  configurable: true,
  enumerable: true
});
