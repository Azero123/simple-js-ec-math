try {
    const bigInt = require('big-integer')
    const elliptic = require('../src/index.js')
    const secp256k1 = require('simple-js-secp256k1')
    const ModPoint = elliptic.ModPoint  

    let g = new ModPoint(
        bigInt('95344521472007825523052856318493543457918225329593594827198878438444869079805'),
        bigInt('85802951166965653834180459665017008093029170635302396883361952917601245373882')
    )
    if (g.toString() !== '{"x":"d2cb1636c8800502112f346f10a62e256d42b5ea46b3a55e2ff4607167afd2fd","y":"bdb2bfd6280aca239796dc4eb6283ad2d31a5ef417620efb095887c7dc56a5ba"}') {
        throw 'mod point toString() failed'
    }
    if (g.sec1Compressed !== '02d2cb1636c8800502112f346f10a62e256d42b5ea46b3a55e2ff4607167afd2fd') {
        throw 'invalid sec1 (compressed)'
    }
    if (g.sec1Uncompressed !== '04d2cb1636c8800502112f346f10a62e256d42b5ea46b3a55e2ff4607167afd2fdbdb2bfd6280aca239796dc4eb6283ad2d31a5ef417620efb095887c7dc56a5ba') {
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

    // const sec1Compressed = g_3.sec1Compressed

    // const g_4 = ModPoint.fromSec1(sec1Compressed, secp256k1)

    // console.log(g_4.toString())
    // console.log(g_3.toString())
    // if (g_4.toString() !== g_3.toString()) {
    //     throw `can't recover point from sec1 (compressed) format`
    // }

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