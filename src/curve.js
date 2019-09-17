const ModSet = require('./modset.js')
const ModPoint = require('./modpoint.js')

class ModCurve {
  constructor(a, b, n, p, g, preprocessing = {}) {
    this.a = a
    this.b = b
    this.n = n
    this.p = p
    this.g = g
    this.modSet = new ModSet(p)
    this.postProcessings = preprocessing
  }
 
  add(p1, p2) {
    if (p1 === p2) {
      return this.double(p1)
    }
    const ys = this.modSet.subtract(p2.y, p1.y)
    const xs = this.modSet.subtract(p2.x, p1.x)
    const s = this.modSet.divide(ys, xs)
    const x3 = this.modSet.subtract(this.modSet.subtract(this.modSet.multiply(s,s),p1.x),p2.x)
    const y3 = this.modSet.subtract(this.modSet.multiply(s, this.modSet.subtract(p1.x, x3)),p1.y)
    const p3 = new ModPoint(this.modSet.mod(x3), this.modSet.mod(y3))
    return p3
  }
  subtract(a, b) {
    b = new ModPoint(b.x, this.modSet.multiply(b.y, -1n))
    const c = this.add(a, b)
    return c
  }
  double(p) {
    const sn = p.x ** 2n * 3n + this.a
    const sd = 2n * p.y
    const s = this.modSet.divide(sn,sd)
    const x3 = this.modSet.mod((s ** 2n - p.x * 2n))
    const y3 = this.modSet.mod(s * (p.x - x3) - p.y)
    const p3 = new ModPoint(x3, y3)
    return p3
  }
  multiply(p, s)  {
    let p_ = p

    if (s === 1n) {
      return p_
    }

    let binaryS = s.toString(2)
    const binarySLength = binaryS.length - 1

    this.postProcessings[p] = this.postProcessings[p] || {}
    const postProcessings = this.postProcessings[p]
    const addings = []
    let n = p
    for (var i = binarySLength; i >= 0; i --) {
      const char = binaryS[i]
      if (char === '1') {
        addings.push(n)
      }
      const nStr = n.x.toString()
      n = (postProcessings[nStr] || (postProcessings[nStr] = this.double(n)))
    }

    p_ = addings[0]
    addings.shift()
    while (addings[0]) {
      p_ = this.add(p_, addings[0])
      addings.shift()
    }

    return p_
  }
  xToY(x, parity) {
    const y2 = this.modSet.add(this.modSet.power(x, 3n), this.b)
    const y = this.modSet.squareRoots(y2)
    if (parity === true) {
      return y[1]
    }
    else if (parity === false) {
      return y[0]
    }
    return y
  }
  verify(point) {
    const verificationPoint = this.modSet.subtract(
      this.modSet.add(this.modSet.power(point.x, 3n), this.b),
      this.modSet.power(point.y, 2n)
    )
    return verificationPoint === 0n
  }
  // inverse(p) {
  //   // a^p^n−2
  //   return this.multiply(this.multiply(p, this.p), this.n.minus(2))
  // }
}
module.exports = ModCurve