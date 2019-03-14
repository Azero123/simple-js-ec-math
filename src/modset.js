const bigInt = require('big-integer')
const crypto = require('crypto')

class ModSet {
  constructor(p) {
    this.p = bigInt(p.toString())
  }
  random() {
    return bigInt.fromArray([...crypto.randomBytes(64)]).toString(16)
  }
  mod(n) {
    if (typeof this.p === 'number') {
      return (n%this.p+this.p)%this.p
    }
    return bigInt(n).mod(this.p).plus(this.p).mod(this.p).toString()
  }
  add(a, b) {
    if (typeof this.p === 'number') {
      return this.mod(+a+b)
    }
    a = bigInt(a.toString())
    b = bigInt(b.toString())
    return this.mod(a.add(b))
  }
  subtract(a, b) {
    if (typeof this.p === 'number') {
      return this.mod(+a-b)
    }
    a = bigInt(a.toString())
    b = bigInt(b.toString())
    return this.mod(a.subtract(b))
  }
  multiply(a, b)  {
    if (typeof this.p === 'number') {
      return this.mod(+a*+b)
    }
    a = bigInt(a.toString())
    b = bigInt(b.toString())
    return this.mod(a.multiply(b))
  }
  divide(c, a) {
    if (typeof this.p === 'number') {
      return this.mod(c * Math.pow(a, this.p-2))
    }
    c = bigInt(c.toString())
    a = bigInt(a.toString())
    
    const ap = this.power(a, this.p.minus('2'))
    return this.mod(c.multiply(ap))
  }
  power(a, b) {
    if (typeof this.p === 'number') {
      return Math.pow(a, b) % this.p
    }
    
    return bigInt(a).modPow(b, this.p)
  }
}

module.exports = ModSet