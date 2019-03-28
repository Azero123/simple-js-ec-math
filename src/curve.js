const bigInt = require('big-integer')
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
    b = new ModPoint(b.x, this.modSet.multiply(b.y, '-1'))
    const c = this.add(a, b)
    return c
  }
  double(p) {
    // s = (3 * Px ^ 2 +a ) / (2 * Py)
    // RX = S ^ 2 - 2 * PX
    // RY = -1 * (PY + S * ( RX - PX))

    const sn = bigInt(p.x).pow('2').multiply('3').add(this.a)
    const sd = bigInt('2').multiply(p.y)
    const s = this.modSet.divide(sn,sd)
    const x3 = this.modSet.mod(bigInt(s).pow('2').minus(bigInt(p.x).multiply('2')))
    const y3 = this.modSet.mod(bigInt(s).multiply(bigInt(p.x).minus(x3)).minus(p.y))
    const p3 = new ModPoint(x3, y3)
    return p3
  }
  multiply(p, s)  {
    let p_ = p

    if (s.toString() === '1') {
      return p_
    }

    const binaryS = s.toString(2)
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
      n = (postProcessings[n] || (postProcessings[n.toString()] = this.double(n)))
    }

    p_ = addings[0]
    addings.shift()
    while (addings[0]) {
      p_ = this.add(p_, addings[0])
      addings.shift()
    }

    return p_
  }
  verify(point) {
    const verificationPoint = this.modSet.subtract(
      this.modSet.add(this.modSet.power(point.x, 3), this.b),
      this.modSet.power(point.y, 2)
    )
    return bigInt(verificationPoint).equals(0)
  }
}
module.exports = ModCurve