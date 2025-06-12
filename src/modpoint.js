class ModPoint {
  constructor(x, y) {
    this.x = x
    this.y = y
  }
  static fromJSON(object) {
    return new ModPoint(BigInt('0x'+object.x), BigInt('0x'+object.y))
  }
  static fromString(string) {
    return ModPoint.fromJSON(JSON.parse(string))
  }
  static fromSec1(sec1, curve) {
    const mode = sec1.substr(0, 2)
    const x = BigInt('0x'+sec1.substr(2, 64))
    let y = BigInt('0x'+(sec1.substr(66, 130) || 0))
    
    const compressed = (mode === '03' || mode === '02')
    if (compressed) {
      if (!curve) {
        throw 'no curve provided to recover y point with'
      }
      y = curve.xToY(x, mode === '03')
    }
    
    const point = new ModPoint(x, y)
    if (
      (mode === '04' && sec1.length !== 130) ||
      (compressed && sec1.length !== 66) ||
      (mode !== '04' && mode !== '03' && mode !== '02')
    ) {
      throw 'invalid address' + (mode === '03' || mode === '02') ? ' compressed addresses not yet supported' : ''
    }
    return point
  }
  get sec1Compressed() {
    return this._sec1Compressed || (this._sec1Compressed = 
      `${
        this.y % 2n === 1n ? '03' : '02'
      }${
        this.x.toString(16).padStart(64, '0')
      }`
    )
  }
  get sec1Uncompressed() {
    return this._sec1Uncompressed || (this._sec1Uncompressed = 
      `04${
        this.x.toString(16).padStart(64, '0')
      }${
        this.y.toString(16).padStart(64, '0')
      }`
    )
  }
  toJSON() {
    return { x: this.x.toString(16), y: this.y.toString(16) }
  }
  toString() {
    return JSON.stringify(this.toJSON())
  }
}
module.exports = ModPoint