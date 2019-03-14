try {
    const bigInt = require('big-integer')
    const elliptic = require('../src/index.js')
    const ModSet = elliptic.ModSet  
  
    const inP = new ModSet(bigInt('19'))
    if (inP.add(20, 5) !== '6') {
        throw 'modular addition does not work'
    }
    if (inP.subtract(5, 10) !== '14') {
        throw 'modular subtraction does not work'
    }
    const c = inP.multiply(4, 5)
    if (c != '1') {
        throw 'modular multiplication does not work'
    }
  
    if (inP.multiply(5, inP.multiply(5, 5)).toString() !== inP.power(5, 3).toString()) {
        throw 'modular power does not work'
    }
  
    if (inP.divide(c, 4) !== '5') {
        throw 'modular division does not work (1)'
    }
  
    if (inP.divide(c, 5) !== '4') {
        throw 'modular division does not work (2)'
    }
  
    console.log('✅ modular math tests passed')
}
catch (error) {
    console.log('⚠️ failed to test modular math', error)
    throw error
} 