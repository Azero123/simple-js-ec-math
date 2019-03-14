const bigInt = require('big-integer')

class ModPoint {
  constructor(x, y) {
    this.x = x
    this.y = y
  }
  toString() {
    return JSON.stringify({ x: bigInt(this.x).toString(16), y: bigInt(this.y).toString(16) })
  }
}
module.exports = ModPoint