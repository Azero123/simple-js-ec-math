const bigInt = require('big-integer')

class ModPoint {
  constructor(x, y) {
    this.x = x
    this.y = y
  }
  static fromJSON(object) {
    return new ModPoint(bigInt(object.x, 16), bigInt(object.y, 16))
  }
  toJSON() {
    return { x: bigInt(this.x).toString(16), y: bigInt(this.y).toString(16) }
  }
  toString() {
    return JSON.stringify(this.toJSON())
  }
}
module.exports = ModPoint