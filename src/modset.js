const bigInt = require('big-integer')
const crypto = require('crypto')

class ModSet {
  constructor(p) {
    this.p = p
  }
  random() {
    return bigInt.fromArray([...crypto.randomBytes(64)])
  }
  mod(n) {
    return bigInt(n).mod(this.p).plus(this.p).mod(this.p)
  }
  add(a, b) {
    return this.mod(a.add(b))
  }
  subtract(a, b) {
    return this.mod(a.subtract(b))
  }
  multiply(a, b)  {
    return this.mod(a.multiply(b))
  }
  divide(c, a) {
    const ap = this.power(a, this.p.minus('2'))
    return this.mod(c.multiply(ap))
  }
  power(a, b) {
    return bigInt(a).modPow(b, this.p)
  }
}

module.exports = ModSet