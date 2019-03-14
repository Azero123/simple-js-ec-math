try {
    const bigInt = require('big-integer')
    const elliptic = require('../src/index.js')
    const ModPoint = elliptic.ModPoint  

    const g = new ModPoint(
        bigInt('16'),
        bigInt('5')
    )

    if (g.toString() !== '{"x":"10","y":"5"}') {
        throw 'mod point toString() failed'
    }
  
    console.log('✅ mod point tests passed')
}
catch (error) {
    console.log('⚠️ failed to test mod points', error)
    throw error
} 