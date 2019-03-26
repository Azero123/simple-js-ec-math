try {
    const bigInt = require('big-integer')
    const elliptic = require('../src/index.js')
    const ModSet = elliptic.ModSet  
  
    const inP = new ModSet(bigInt('19'))
    if (inP.add(bigInt('20'), bigInt('5')).toString() !== '6') {
        throw 'modular addition does not work'
    }
    if (inP.subtract(bigInt('5'), bigInt('10')).toString() !== '14') {
        throw 'modular subtraction does not work'
    }
    const c = inP.multiply(bigInt('4'), bigInt('5'))
    if (c.toString() != '1') {
        throw 'modular multiplication does not work'
    }
  
    if (inP.multiply(bigInt('5'), inP.multiply(bigInt('5'), bigInt('5'))).toString() !== inP.power(bigInt('5'), bigInt('3')).toString()) {
        throw 'modular power does not work'
    }
  
    if (inP.divide(bigInt(c), bigInt('4')).toString() !== '5') {
        throw 'modular division does not work (1)'
    }
  
    if (inP.divide(bigInt(c), bigInt('5')).toString() !== '4') {
        throw 'modular division does not work (2)'
    }
  
    console.log('✅ modular math tests passed')
}
catch (error) {
    console.log('⚠️ failed to test modular math', error)
    throw error
} 