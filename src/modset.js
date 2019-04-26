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
  squareRoots(k) {
    if (!k.modPow(this.p.minus('1').divide('2'), this.p).equals('1')) {
      throw 'no integer square root'
    }
    const root = k.modPow(this.divide(this.p.add('1'), 4), this.p)
    const negativeRoot = this.p.minus(root)

    return [root, negativeRoot]
  }
  power(a, b) {
    return bigInt(a).modPow(b, this.p)
  }
}

module.exports = ModSet