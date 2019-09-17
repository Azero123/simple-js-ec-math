try {
    const elliptic = require('../src/index.js')
    const ModSet = elliptic.ModSet  

  
    const inP = new ModSet(19n)
    if (inP.add(20n, 5n) !== 6n) {
        throw 'modular addition does not work'
    }

    if (inP.subtract(5n, 10n) !== 14n) {
        throw 'modular subtraction does not work'
    }

    const c = inP.multiply(4n, 5n)
    if (c !== 1n) {
        throw 'modular multiplication does not work'
    }
  
    if (inP.multiply(5n, inP.multiply(5n, 5n)) !== inP.power(5n, 3n)) {
        throw 'modular power does not work'
    }
  
    if (inP.divide(c, 4n) !== 5n) {
        throw 'modular division does not work (1)'
    }
  
    if (inP.divide(c, 5n) !== 4n) {
        throw 'modular division does not work (2)'
    }

    let roots = inP.squareRoots(16n)
    if (roots[0] !== 4n && roots[1] !== 15n) {
        throw 'modular square root does not work'
    }
    roots = inP.squareRoots(25n)
    if (roots[0] !== 5n && roots[1] !== 14n) {
        throw 'modular square root does not work'
    }
    roots = inP.squareRoots(36n)
    if (roots[0] !== 6n && roots[1] !== 13n) {
        throw 'modular square root does not work'
    }
    roots = inP.squareRoots(49n)
    if (roots[0] !== 7n && roots[1] !== 12n) {
        throw 'modular square root does not work'
    }
    let threwError = false
    try {
        inP.squareRoots(13n)
    }
    catch (e) {
        threwError = true
    }
    if (threwError === false) {
        throw 'square root should have thrown an error when given an invalid number to square root'
    }
  
    console.log('✅ modular math tests passed')
}
catch (error) {
    console.log('⚠️ failed to test modular math', error)
    throw error
} 