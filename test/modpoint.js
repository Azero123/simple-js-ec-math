try {
    const bigInt = require('big-integer')
    const elliptic = require('../src/index.js')
    const secp256k1 = require('simple-js-secp256k1')
    const ModPoint = elliptic.ModPoint  

    let g = new ModPoint(
        bigInt('79be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798', 16),
        bigInt('483ada7726a3c4655da4fbfc0e1108a8fd17b448a68554199c47d08ffb10d4b8', 16)
    )
    if (g.toString() !== '{"x":"79be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798","y":"483ada7726a3c4655da4fbfc0e1108a8fd17b448a68554199c47d08ffb10d4b8"}') {
        throw 'mod point toString() failed'
    }
    if (g.sec1Compressed !== '0279be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798') {
        throw 'invalid sec1 (compressed)'
    }
    if (g.sec1Uncompressed !== '0479be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798483ada7726a3c4655da4fbfc0e1108a8fd17b448a68554199c47d08ffb10d4b8') {
        throw 'invalid sec1 (uncompressed)'
    }

    const g_2 = ModPoint.fromString(g.toString())

    if (g_2.toString() !== g.toString()) {
        throw `can't recover point from string`
    }

    const g_3 = ModPoint.fromJSON(g.toJSON())

    if (g_2.toString() !== g_3.toString()) {
        throw `can't recover point from json`
    }

    const sec1Compressed = g_3.sec1Compressed

    const g_4 = ModPoint.fromSec1(sec1Compressed, secp256k1)

    if (g_4.toString() !== g_3.toString()) {
        throw `can't recover point from sec1 (compressed) format`
    }

    const sec1Uncompressed = g.sec1Uncompressed

    const g_5 = ModPoint.fromSec1(sec1Uncompressed)

    if (g.toString() !== g_5.toString()) {
        throw `can't recover point from sec1 (uncompressed) format`
    }

    console.log('✅ mod point tests passed')
}
catch (error) {
    console.log('⚠️ failed to test mod points', error)
    throw error
} 