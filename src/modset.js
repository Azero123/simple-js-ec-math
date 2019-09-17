const crypto = require('crypto')

class ModSet {
  constructor(p) {
    this.p = p
  }
  random() {
    return this.mod(BigInt('0x'+crypto.randomBytes(64).toString('hex')))
  }
  mod(n) {
    return (n % this.p + this.p) % this.p
  }
  add(a, b) {
    return this.mod(a + b)
  }
  subtract(a, b) {
    return this.mod(a - b)
  }
  multiply(a, b)  {
    return this.mod(a * b) 
  }
  divide(c, a) {
    const ap = this.power(a, this.p - 2n)
    return this.mod(this.multiply(c, ap))
  }
  squareRoots(k) {
    this.p1 = this.p1 || (this.p - 1n) / 2n
    if (this.power(k, this.p1) !== 1n) {
      throw 'no integer square root'
    }
    this.p2 = this.p2 || (this.p + 1n) / 4n
    const root = this.power(k, this.p2)
    const negativeRoot = this.p - root

    return [root, negativeRoot]
  }
  power(a, b) {
    return this.mod(a ** b)
  }
}

module.exports = ModSet